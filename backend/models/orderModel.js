const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    fixie_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Fixie',
    },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
    quotation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
    },
    status: {
      type: String,
      required: [true, 'Please add order status'],
    },
    item: [
      {
        service_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Service',
        },
        price: {
          type: Number,
          required: [true, 'Please add price'],
        },
        quantity: {
          type: Number,
          required: [true, 'Please add quantity'],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, 'Please add total'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
