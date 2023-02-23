import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/protected/Dashboard';
import Order from './pages/protected/Order';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/:registerType" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
