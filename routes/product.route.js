const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", upload.single("image"), createProduct); // Accepts a single file named "image"
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
