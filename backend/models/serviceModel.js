const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    fixie_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Fixie',
    },
    price: {
      type: Number,
      required: [true, 'Please add price'],
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock'],
    },
    name: {
      type: String,
      required: [true, 'Please add name'],
    },
    category: {
      type: String,
      required: [true, 'Please add category'],
    },
    desc_1: {
      type: String,
      required: [true, 'Please add desc_1'],
    },
    desc_2: {
      type: String,
      required: [true, 'Please add desc_2'],
    },
    desc_3: {
      type: String,
      required: [true, 'Please add desc_3'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
