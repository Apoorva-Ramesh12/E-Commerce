// routes/orders.js
const express = require('express');
const router = express.Router();
const { auth, requireAdmin } = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// place order from cart
router.post('/place', auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');
  if (!user.cart.length) return res.status(400).json({ msg: 'Cart empty' });

  let total = 0;
  const items = [];

  // simple stock check and total calculation
  for (const c of user.cart) {
    const p = c.product;
    if (p.stock < c.qty) return res.status(400).json({ msg: `Insufficient stock for ${p.name}` });
    items.push({ product: p._id, qty: c.qty, priceAtPurchase: p.price });
    total += p.price * c.qty;
  }

  // decrement stock
  for (const c of user.cart) {
    await Product.findByIdAndUpdate(c.product._id, { $inc: { stock: -c.qty } });
  }

  const order = new Order({ user: user._id, items, total });
  await order.save();

  // clear cart
  user.cart = [];
  await user.save();

  res.json(order);
});

// get my orders
router.get('/my', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
});

// admin: list all orders
router.get('/', auth, requireAdmin, async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.json(orders);
});

module.exports = router;
