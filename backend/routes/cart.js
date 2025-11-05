const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ➕ Add to cart
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.stock <= 0)
      return res.status(400).json({ error: "Product out of stock" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (existingItem) {
      if (product.stock < 1)
        return res.status(400).json({ error: "Not enough stock" });
      existingItem.quantity += 1;
      product.stock -= 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
      product.stock -= 1;
    }

    await product.save(); // ✅ ensure stock is updated in DB
    await cart.save();

    res.json({ message: "Added to cart", cart, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🛒 Get cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 💳 Checkout
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ msg: "Cart is empty" });

    cart.items = [];
    await cart.save();
    res.json({ msg: "Checkout successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
