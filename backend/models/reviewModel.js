const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    fixie_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add fixie_id'],
      ref: 'Fixie',
    },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add member_id'],
      ref: 'Member',
    },
    star: {
      type: Number,
      required: [true, 'Please add star'],
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
