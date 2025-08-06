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
      // CREATED REPLIED ACCEPTED REJECTED
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
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quotation', quotationSchema);
