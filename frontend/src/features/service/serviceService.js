import axios from 'axios';

const API_URL = '/api/service/';

// Create a service
const createService = async (serviceData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.post(API_URL, serviceData, config);

  return response.data;
};

// Get all servicefor a Fixie
const getService = async (token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Search all service for a Fixie
const searchService = async (id) => {
  const response = await axios.get(API_URL + 'search?id=' + id);

  return response.data;
};

// Find specific service
const findService = async (id, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL + id, config);

  return response.data;
};

// Update service details
const updateService = async (serviceData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.put(
    API_URL + serviceData.id,
    serviceData,
    config
  );

  return response.data;
};

// Delete service
const deleteService = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const serviceService = {
  createService,
  getService,
  searchService,
  findService,
  updateService,
  deleteService,
};

export default serviceService;
