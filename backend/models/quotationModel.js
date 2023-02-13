const mongoose = require('mongoose');

const quotationSchema = mongoose.Schema(
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
    status: {
      type: String,
      required: [true, 'Please add status'],
    },
    brand: {
      type: String,
      required: [true, 'Please add brand'],
    },
    model: {
      type: String,
      required: [true, 'Please add model'],
    },
    problem: {
      type: String,
      required: [true, 'Please add problem'],
    },
    description: {
      type: String,
      required: [true, 'Please add description'],
    },
    feedback: {
      type: String,
      required: [true, 'Please add feedback'],
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

module.exports = mongoose.model('Quotation', quotationSchema);
