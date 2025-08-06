import axios from 'axios';

const API_URL = '/api/order/';

// Create an order
const createOrder = async (orderData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.post(API_URL, orderData, config);

  return response.data;
};

// Get order
const getOrder = async (token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Find order
const findOrder = async (id, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL + 'search?id=' + id, config);

  return response.data;
};

// Update order status
const updateOrder = async (updateData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };
  console.log(API_URL + updateData.id);

  const response = await axios.put(API_URL + updateData.id, updateData, config);

  return response.data;
};

// Delete order
const deleteOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const orderService = {
  createOrder,
  getOrder,
  findOrder,
  updateOrder,
  deleteOrder,
};

export default orderService;
