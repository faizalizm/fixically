import axios from 'axios';

const FIXIE_API = '/api/fixie/';
const MEMBER_API = '/api/member/';

// Register member
const register = async (userData) => {
  const API_URL = userData.userType === 1 ? FIXIE_API : MEMBER_API;
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login member
const login = async (userData) => {
  const API_URL = userData.userType === 1 ? FIXIE_API : MEMBER_API;
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout member
const logout = () => {
  localStorage.removeItem('user');
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
