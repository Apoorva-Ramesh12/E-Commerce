// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: Number,
    priceAtPurchase: Number
  }],
  total: Number,
  status: { type: String, default: 'placed' } // placed, shipped, delivered etc.
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
