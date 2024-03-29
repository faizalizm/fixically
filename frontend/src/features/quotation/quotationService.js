import axios from 'axios';

const API_URL = '/api/quotation/';

// Create an quotation
const createQuotation = async (quotationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, quotationData, config);

  return response.data;
};

// Get quotation
const getQuotation = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

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
  deleteQuotation,
};

export default quotationService;
