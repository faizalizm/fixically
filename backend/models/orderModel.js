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
    item: [
      {
        service_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Service',
        },
        quote_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Quotation',
        },
      },
    ],
    status: {
      type: String,
      required: [true, 'Please add an order status'],
    },
    total: {
      type: String,
      required: [true, 'Please add tag'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
