const mongoose = require('mongoose');

const fixieSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, 'Please add owner'],
    },
    mail: {
      type: String,
      required: [true, 'Please add your email'],
    },
    password: {
      type: String,
      required: [true, 'Please add your password'],
    },
    name: {
      type: String,
      required: [true, 'Please add company name'],
    },
    phone: {
      type: String,
      required: [true, 'Please add company phone number'],
    },
    description: {
      type: String,
      required: [true, 'Please add company description'],
    },
    ssm: {
      type: String,
      required: [true, 'Please add company ssm registration number'],
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
    os_support: {
      type: Array,
    },
    application: {
      status: {
        type: String,
        // CREATED APPROVED REJECTED
      },
      create_date: {
        type: Date,
      },
      result_date: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Fixie', fixieSchema);
