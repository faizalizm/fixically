import axios from 'axios';

// Register user
const register = async (userData) => {
  const response = await axios.post(
    '/api/' + userData.userType + '/register',
    userData
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(
    '/api/' + userData.userType + '/login',
    userData
  );

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Get user details
const getProfile = async (token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get('/api/' + role + '/profile', config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Get user dashboard
const getDashboard = async (token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  const response = await axios.get('/api/' + role + '/dashboard', config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Update user details
const updateProfile = async (updateData, token, role) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Role: role,
    },
  };

  let url = '';
  if (updateData.role === 'Fixie') {
    url = '/api/Fixie/update';
  } else if (updateData.role === 'Member') {
    url = '/api/Member/update';
  } else {
    url = '/api/Admin/update';
  }

  if (updateData.id) {
    url += `?id=${updateData.id}`;
  }

  const response = await axios.put(url, updateData, config);

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
  getProfile,
  getDashboard,
  updateProfile,
  logout,
};

export default authService;
