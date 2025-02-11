require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const app = express();

// Middleware Configuration JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the Database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })

  .catch(() => {
    console.log("Connection Failed!");
  });
