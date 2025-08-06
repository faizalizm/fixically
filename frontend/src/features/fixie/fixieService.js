import axios from 'axios';

const API_URL = '/api/fixie/';

// Get all fixie
const allFixie = async (status, token, role) => {
  if (status) {
    status = '?status=pending';
  } else status = '';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL + 'all' + status, config);

  return response.data;
};

// Get a fixie
const profileFixie = async (fixie_id, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  if (fixie_id) {
    fixie_id = '?id=' + fixie_id;
  }

  const response = await axios.get(API_URL + 'profile' + fixie_id, config);

  return response.data;
};

// Search for fixies
const searchFixie = async (searchData) => {
  let response;

  if (typeof searchData === 'object') {
    let state = '',
      category = '',
      os = '';

    if (searchData.state) state = 'state=' + searchData.state;
    if (searchData.category) {
      if (Array.isArray(searchData.category)) {
        category = 'category=' + searchData.category.join(',');
      } else {
        category = 'category=' + searchData.category;
      }
    }

    if (searchData.os) {
      if (Array.isArray(searchData.os)) {
        os = 'os=' + searchData.os.join(',');
      } else {
        os = 'os=' + searchData.os;
      }
    }

    const queryParams = [state, category, os].filter(Boolean).join('&');
    response = await axios.get(API_URL + 'search?' + queryParams);
  } else {
    response = await axios.get(API_URL + 'search?id=' + searchData);
  }
  return response.data;
};

const fixieService = {
  allFixie,
  profileFixie,
  searchFixie,
};

export default fixieService;
