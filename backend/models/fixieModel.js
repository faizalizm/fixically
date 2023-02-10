const mongoose = require('mongoose');

const fixieSchema = mongoose.Schema(
  {
    owner_name: {
      type: String,
      required: [true, 'Please add owner name'],
    },
    name: {
      type: String,
      required: [true, 'Please add company name'],
    },
    mail: {
      type: String,
      required: [true, 'Please add your email'],
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
    },
    phone: {
      type: Number,
      required: [true, 'Please add your phone number'],
    },
    description: {
      type: String,
      required: [true, 'Please add your company description'],
    },
    ssm: {
      type: String,
      required: [true, 'Please add your company ssm registration number'],
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Please add company address'],
    },
    state: {
      type: String,
      required: [true, 'Please add company state'],
    },
    city: {
      type: String,
      required: [true, 'Please add company city'],
    },
    application: {
      status: {
        type: String,
        default: 'created',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
    os_support: {
      windows: {
        type: String,
        required: [true, 'Please add fixie windows support'],
      },
      mac: {
        type: String,
        required: [true, 'Please add mac support'],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Fixie', fixieSchema);
