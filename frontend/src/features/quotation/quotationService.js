import axios from 'axios';

const API_URL = '/api/quotation/';

// Create an quotation
const createQuotation = async (quotationData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.post(API_URL, quotationData, config);

  return response.data;
};

// Get quotation
const getQuotation = async (token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Find quotation
const findQuotation = async (id, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL + 'search?id=' + id, config);

  return response.data;
};

// Update quotation status
const updateQuotation = async (updateData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };
  console.log(API_URL + updateData._id);

  const response = await axios.put(
    API_URL + updateData._id,
    updateData,
    config
  );

  return response.data;
};

// Delete quotation
const deleteQuotation = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const quotationService = {
  createQuotation,
  getQuotation,
  findQuotation,
  updateQuotation,
  deleteQuotation,
};

export default quotationService;
