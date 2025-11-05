// routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {auth,requireAdmin} = require("../middleware/auth");

// ✅ View all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ View single product (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// ✅ Add new product (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    if (!name || !price || stock == null)
      return res.status(400).json({ error: "Missing required fields" });

    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// ✅ Update product (admin only)
router.put("/:id", auth, async (req, res) => {

  try {
    const { name, price, description, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    // update fields only if provided
    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (description) product.description = description;
    if (stock !== undefined) product.stock = stock;

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ✅ Delete product (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
