import axios from 'axios';

const API_URL = '/api/fixie/';

// Search for fixies
const searchFixie = async (searchData) => {
  const response = axios.get(API_URL + 'search' + searchData);
  console.log(response);
  return response.data;
};

// Update fixie details
const updateFixie = async (updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = axios.put(API_URL, updateData, config);
  console.log(response);
  return response.data;
};

const fixieService = {
  searchFixie,
  updateFixie,
};

export default fixieService;
