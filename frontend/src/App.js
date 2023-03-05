import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import About from './pages/About';
import FixieSearch from './pages/FixieSearch';
import FixieProfile from './pages/FixieProfile';
import FixieReview from './pages/FixieReview';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';

import Dashboard from './pages/protected/Dashboard';
import Order from './pages/protected/Orders';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/services"  /> */}
          {/* <Route path="/becomefixie"  /> */}

          {/* Search Flow */}
          <Route path="/search/:state" element={<FixieSearch />} />
          <Route path="/fixieProfile" element={<FixieProfile />} />
          <Route path="/fixieProfile/reviews" element={<FixieReview />} />

          {/* Login and Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/fx-admin" element={<AdminLogin />} />
          <Route path="/register/:registerType" element={<Register />} />

          {/* Protected Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
