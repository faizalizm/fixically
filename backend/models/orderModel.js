const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    order_status: {
      type: String,
      required: [true, 'Please add an order status'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
