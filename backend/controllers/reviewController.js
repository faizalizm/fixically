const asyncHandler = require('express-async-handler');

const Review = require('../models/reviewModel');
const Member = require('../models/memberModel');

// @desc    Get review
// @route   GET /api/review
// @access  Private
const getReview = asyncHandler(async (req, res) => {
  const review = await Review.find({ member_id: req.member.id });
  res.status(200).json(review);
});

// @desc    Set review
// @route   POST /api/review/
// @access  Private
const setReview = asyncHandler(async (req, res) => {
  if (!req.body.review_status) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const review = await Review.create({
    member_id: req.member.id,
    review_status: req.body.review_status,
  });
  // fixie_id: req.fixie.id,

  res.status(200).json(review);
});

// @desc    Update review
// @route   PUT /api/review/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(400);
    throw new Error('Review not found');
  }

  // Check for member
  if (!req.member) {
    res.status(401);
    throw new Error('Member not found');
  }

  // Make sure review belongs to member
  if (review.member_id.toString() !== req.member._id) {
    res.status(401);
    throw new Error('Unauthorized access to review');
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedReview);
});

// @desc    Delete review
// @route   DELETE /api/review/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(400);
    throw new Error('Review not found');
  }

  // Check for member
  if (!req.member) {
    res.status(401);
    throw new Error('Member not found');
  }

  // Make sure review belongs to member
  if (review.member_id.toString() !== req.member.id) {
    res.status(401);
    throw new Error('Unauthorized access to review');
  }

  await review.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getReview,
  setReview,
  updateReview,
  deleteReview,
};
