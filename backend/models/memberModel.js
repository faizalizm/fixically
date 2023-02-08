const mongoose = require('mongoose');

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
    },
    mail: {
      type: String,
      required: [true, 'Please add your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
    },
    phone: {
      type: Number,
      required: [true, 'Please add your phone number'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Member', memberSchema);
