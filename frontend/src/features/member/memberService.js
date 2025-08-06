import axios from 'axios';

const API_URL = '/api/member/';

// Get all member
const allMember = async (token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get(API_URL + 'all', config);

  return response.data;
};

// Get a member
const profileMember = async (member_id, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  if (member_id) {
    member_id = '?id=' + member_id;
  }

  const response = await axios.get(API_URL + 'profile' + member_id, config);

  return response.data;
};

// Search for members
const searchMember = async (searchData) => {
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

const memberService = {
  allMember,
  profileMember,
  searchMember,
};

export default memberService;
