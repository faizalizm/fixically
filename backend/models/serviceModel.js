const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    fixie_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Fixie',
    },
    category: {
      type: String,
      required: [true, 'Please add category'],
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
    labour: {
      type: Number,
      required: [true, 'Please add labour'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
