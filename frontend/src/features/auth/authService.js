import axios from 'axios';

const API_URL = '/api/member/';

// Register member
const register = async (memberData) => {
  const response = await axios.post(API_URL + 'register', memberData);

  if (response.data) {
    localStorage.setItem('member', JSON.stringify(response.data));
  }

  return response.data;
};

// Login member
const login = async (memberData) => {
  const response = await axios.post(API_URL + 'login', memberData);

  if (response.data) {
    localStorage.setItem('member', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout member
const logout = () => {
  localStorage.removeItem('member');
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
