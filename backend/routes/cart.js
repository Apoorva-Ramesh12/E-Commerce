const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Product = require("../models/Product");

router.post("/add-to-cart", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (product.stock <= 0) return res.status(400).json({ msg: "Out of stock" });

    // Reduce stock immediately
    product.stock -= 1;
    await product.save();

    res.json({ msg: "Added to cart", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
