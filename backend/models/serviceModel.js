const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    fixie_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Fixie',
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
