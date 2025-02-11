const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route.js");
const app = express();

// Middleware Configuration JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

mongoose
  .connect(
    "mongodb+srv://darkpiodos:VcaPhulnRpzQDqCY@backenddb.xzdc4.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to the Database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })

  .catch(() => {
    console.log("Connection Failed!");
  });
