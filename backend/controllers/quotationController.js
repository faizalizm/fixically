const asyncHandler = require('express-async-handler');

const Quotation = require('../models/quotationModel');

// @desc    Get quotation
// @route   GET /api/quotation
// @access  Private
const getQuotation = asyncHandler(async (req, res) => {
  const quotation = req.fixie
    ? await Quotation.find({ fixie_id: req.fixie.id })
    : await Quotation.find({ member_id: req.member.id });

  res.status(200).json(quotation);
});

// @desc    Set quotation
// @route   POST /api/quotation/
// @access  Private
const setQuotation = asyncHandler(async (req, res) => {
  const { brand, model, problem, description } = req.body;

  if (!req.body.fixie_id) {
    res.status(400);
    throw new Error('Please indicate fixie_id');
  }

  const quotation = await Quotation.create({
    member_id: req.member.id,
    fixie_id: req.body.fixie_id,
    status: 'CREATED',
    brand,
    model,
    problem,
    description,
  });

  res.status(200).json(quotation);
});

// @desc    Update quotation
// @route   PUT /api/quotation/:id
// @access  Private
const updateQuotation = asyncHandler(async (req, res) => {
  const { feedback, price } = req.body;
  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    res.status(400);
    throw new Error('Quotation not found');
  }

  // Check for user
  if (!req.fixie && !req.member) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure quotation belongs to user
  if (
    req.fixie
      ? quotation.fixie_id.toString() !== req.fixie.id
      : quotation.member_id.toString() !== req.member.id
  ) {
    res.status(401);
    throw new Error('Unauthorized access to quotation');
  }

  const updatedQuotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    { feedback, price },
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
