const asyncHandler = require('express-async-handler');

const Quotation = require('../models/quotationModel');
const Member = require('../models/memberModel');
const Fixie = require('../models/fixieModel');

// @desc    Get quotation
// @route   GET /api/quotation
// @access  Private
const getQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.find({ member_id: req.member.id });
  res.status(200).json(quotation);
});

// @desc    Set quotation
// @route   POST /api/quotation/
// @access  Private
const setQuotation = asyncHandler(async (req, res) => {
  if (!req.body.quotation_status) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const quotation = await Quotation.create({
    member_id: req.member.id,
    quotation_status: req.body.quotation_status,
  });
  // fixie_id: req.fixie.id,

  res.status(200).json(quotation);
});

// @desc    Update quotation
// @route   PUT /api/quotation/:id
// @access  Private
const updateQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    res.status(400);
    throw new Error('Quotation not found');
  }

  // Check for member
  if (!req.member) {
    res.status(401);
    throw new Error('Member not found');
  }

  // Make sure quotation belongs to member
  if (quotation.member_id.toString() !== req.member._id) {
    res.status(401);
    throw new Error('Unauthorized access to quotation');
  }

  const updatedQuotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedQuotation);
});

// @desc    Delete quotation
// @route   DELETE /api/quotation/:id
// @access  Private
const deleteQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    res.status(400);
    throw new Error('Quotation not found');
  }

  // Check for member
  if (!req.member) {
    res.status(401);
    throw new Error('Member not found');
  }

  // Make sure quotation belongs to member
  if (quotation.member_id.toString() !== req.member.id) {
    res.status(401);
    throw new Error('Unauthorized access to quotation');
  }

  await quotation.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getQuotation,
  setQuotation,
  updateQuotation,
  deleteQuotation,
};
