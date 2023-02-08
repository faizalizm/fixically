const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    // fixie_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'Fixie',
    // },
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
