const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    fixie_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Fixie',
    },
    order_item: {
      item: [
        {
          service_id: {
            type: Number,
          },
          quote_id: {
            type: Number,
          },
        },
      ],
      required: [true, 'Please add order item'],
    },
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
