const asyncHandler = require('express-async-handler');

const Service = require('../models/serviceModel');

// @desc    Get all service
// @route   GET /api/service
// @access  Private
const getService = asyncHandler(async (req, res) => {
  const service = await Service.find({ fixie_id: req.user._id });
  res.status(200).json(service);
});

// @desc    Search for a Fixie service
// @route   GET /api/service/search?id
// @access  Public
const searchService = asyncHandler(async (req, res) => {
  const service = await Service.find({ fixie_id: req.query.id });
  const categories = await Service.distinct('category', {
    fixie_id: req.query.id,
  });

  res.status(200).json([service, categories]);
});

// @desc    Find specific service
// @route   GET /api/service/:id
// @access  Private
const findService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({
    fixie_id: req.user._id,
    _id: req.params.id,
  });
  res.status(200).json(service);
});

// @desc    Set service
// @route   POST /api/service/
// @access  Private
const setService = asyncHandler(async (req, res) => {
  const service = await Service.create({
    fixie_id: req.user._id,
    category: req.body.category,
    name: req.body.name,
    desc_1: req.body.desc_1,
    desc_2: req.body.desc_2,
    desc_3: req.body.desc_3,
    type: req.body.type,
    price: req.body.price,
    stock: req.body.stock,
  });

  res.status(200).json(service);
});

// @desc    Update service
// @route   PUT /api/service/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(400);
    throw new Error('Service not found');
  }

  // Make sure service belongs to fixie
  if (service.fixie_id.toString() != req.user._id) {
    res.status(401);
    throw new Error('Unauthorized access to service');
  }

  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedService);
});

// @desc    Delete service
// @route   DELETE /api/service/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(400);
    throw new Error('Service not found');
  }

  // Make sure service belongs to fixie
  if (service.fixie_id.toString() != req.user._id) {
    res.status(401);
    throw new Error('Unauthorized access to service');
  }

  await service.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getService,
  searchService,
  findService,
  setService,
  updateService,
  deleteService,
};
