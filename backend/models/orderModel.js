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
    quote_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
    },
    item: [
      {
        service_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Service',
        },
        tag: {
          type: String,
          required: [true, 'Please add tag'],
        },
        brand: {
          type: String,
          required: [true, 'Please add brand'],
        },
        type: {
          type: String,
          required: [true, 'Please add type'],
        },
        capacity: {
          type: String,
          required: [true, 'Please add capacity'],
        },
        speed: {
          type: String,
          required: [true, 'Please add speed'],
        },
        price: {
          type: Number,
          required: [true, 'Please add price'],
        },
      },
    ],
    status: {
      type: String,
      required: [true, 'Please add an order status'],
    },
    total: {
      type: Number,
      required: [true, 'Please add tag'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
