const asyncHandler = require('express-async-handler');

const Review = require('../models/reviewModel');

// @desc    Get review
// @route   GET /api/review
// @access  Private
const getReview = asyncHandler(async (req, res) => {
  const review = req.fixie
    ? await Review.find({ fixie_id: req.fixie.id })
    : await Review.find({ member_id: req.member.id });
  res.status(200).json(review);
});

// @desc    Set review
// @route   POST /api/review/
// @access  Private
const setReview = asyncHandler(async (req, res) => {
  const { fixie_id, star, text } = req.body;

  const reviewed = await Review.findOne({ member_id: req.member.id });

  if (reviewed) {
    res.status(409);
    throw new Error('Already reviewed');
  }

  if (!req.body.fixie_id) {
    res.status(400);
    throw new Error('Please indicate fixie_id');
  }

  const review = await Review.create({
    member_id: req.member.id,
    fixie_id,
    star,
    text,
  });

  res.status(200).json(review);
});

// @desc    Update review
// @route   PUT /api/review/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  req.fixie ? (userType = 2) : (userType = 1);

  const { star, text, reply } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(400);
    throw new Error('Review not found');
  }

  // Check for user
  if (!req.fixie && !req.member) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure review belongs to user
  if (
    req.fixie
      ? review.fixie_id.toString() !== req.fixie.id
      : review.member_id.toString() !== req.member.id
  ) {
    res.status(401);
    throw new Error('Unauthorized access to review');
  }

  // Allow user to update corresponding fields only
  let updateObj = {};
  if (userType === 2) {
    updateObj = {
      reply,
    };
  } else if (userType === 1) {
    updateObj = {
      star,
      text,
    };
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    updateObj,
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
