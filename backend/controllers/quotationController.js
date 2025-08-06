const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Quotation = require('../models/quotationModel');

// @desc    Get quotation
// @route   GET /api/quotation
// @access  Private
const getQuotation = asyncHandler(async (req, res) => {
  let quotation;

  if (req.headers.role == 'Fixie') {
    quotation = await Quotation.find({ fixie_id: req.user._id });
  } else if (req.headers.role == 'Member') {
    quotation = await Quotation.find({ member_id: req.user._id });
  }

  res.status(200).json(quotation);
});

// @desc    Find quotation
// @route   GET /api/quotation/search?id
// @access  Private
const findQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.query.id) } },
    {
      $lookup: {
        from: 'members',
        localField: 'member_id',
        foreignField: '_id',
        as: 'memberInfo',
      },
    },
    {
      $unwind: '$memberInfo',
    },
    {
      $project: {
        _id: 1,
        fixie_id: 1,
        member_id: 1,
        quotation_id: 1,
        brand: 1,
        model: 1,
        problem: 1,
        description: 1,
        feedback: 1,
        price: 1,
        status: 1,
        member_name: '$memberInfo.name',
        member_phone: '$memberInfo.phone',
        member_mail: '$memberInfo.mail',
      },
    },
  ]);

  if (!quotation || quotation.length === 0) {
    res.status(404); // NOT FOUND
    throw new Error('Quotation not found');
  }

  res.status(200).json(quotation[0]);
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
    member_id: req.user._id,
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

  const updatedQuotation = await Quotation.findByIdAndUpdate(
    req.params.id,
    { feedback, price, status: 'OFFERED' },
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
  findQuotation,
  setQuotation,
  updateQuotation,
  deleteQuotation,
};
