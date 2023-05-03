const asyncHandler = require('express-async-handler');

const Service = require('../models/serviceModel');

// @desc    Get service
// @route   GET /api/service
// @access  Private
const getService = asyncHandler(async (req, res) => {
  const service = await Service.find({ fixie_id: req.fixie.id });
  res.status(200).json(service);
});

// @desc    Find service
// @route   GET /api/service/:id
// @access  Private
const findService = asyncHandler(async (req, res) => {
  const service = await Service.find({ fixie_id: req.fixie.id });
  res.status(200).json(service);
});

// @desc    Set service
// @route   POST /api/service/
// @access  Private
const setService = asyncHandler(async (req, res) => {
  if (!req.body.category) {
    res.status(400);
    throw new Error('Please indicate category');
  }

  if (!req.body.tag) {
    res.status(400);
    throw new Error('Please indicate tag');
  }

  if (!req.body.brand) {
    res.status(400);
    throw new Error('Please indicate brand');
  }

  if (!req.body.type) {
    res.status(400);
    throw new Error('Please indicate type');
  }

  if (!req.body.capacity) {
    res.status(400);
    throw new Error('Please indicate capacity');
  }

  if (!req.body.speed) {
    res.status(400);
    throw new Error('Please indicate speed');
  }

  if (!req.body.price) {
    res.status(400);
    throw new Error('Please indicate price');
  }

  if (!req.body.labour) {
    res.status(400);
    throw new Error('Please indicate labour');
  }

  const service = await Service.create({
    fixie_id: req.fixie.id,
    category: req.body.category,
    tag: req.body.tag,
    brand: req.body.brand,
    type: req.body.type,
    capacity: req.body.capacity,
    speed: req.body.speed,
    price: req.body.price,
    labour: req.body.labour,
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

  // Check for fixie
  if (!req.fixie) {
    res.status(401);
    throw new Error('Fixie not found');
  }

  // Make sure service belongs to fixie
  if (service.fixie_id.toString() !== req.fixie.id) {
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

  // Check for fixie
  if (!req.fixie) {
    res.status(401);
    throw new Error('Fixie not found');
  }

  // Make sure service belongs to fixie
  if (service.fixie_id.toString() !== req.fixie.id) {
    res.status(401);
    throw new Error('Unauthorized access to service');
  }

  await service.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getService,
  setService,
  updateService,
  deleteService,
};
