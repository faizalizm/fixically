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
import Profile from './pages/protected/Profile';
import Application from './pages/protected/Application';
import Orders from './pages/protected/Orders';
import Quotations from './pages/protected/Quotations';
import Reviews from './pages/protected/Reviews';
import Services from './pages/protected/Services';
import CreateService from './pages/protected/CreateService';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/service" element={<Services />} /> */}
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/application" element={<Application />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reviews" element={<Reviews />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/create" element={<CreateService />} />
          <Route path="/services/:service_id" element={<CreateService />} />

          <Route path="/quotations" element={<Quotations />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
