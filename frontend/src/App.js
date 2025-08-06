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

import ListOrders from './pages/protected/ListOrders';
import ViewOrder from './pages/protected/ViewOrder';

import ListFixies from './pages/protected/ListFixies';
import ListMembers from './pages/protected/ListMembers';
import ViewUser from './pages/protected/ViewUser';

import ListQuotations from './pages/protected/ListQuotations';

import ListReviews from './pages/protected/ListReviews';

import ListServices from './pages/protected/ListServices';

import CreateService from './pages/protected/CreateService';
import ViewQuotation from './pages/protected/ViewQuotation';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/service" element={<Services />} /> */}

          {/* Search Flow */}
          <Route path="/search/" element={<FixieSearch />} />
          <Route path="/fixie/:fixie_id" element={<FixieProfile />} />
          <Route path="/fixie/reviews/:fixie_id" element={<FixieReview />} />

          {/* Login and Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/fx-admin" element={<AdminLogin />} />
          <Route path="/register/:registerType" element={<Register />} />

          {/* Protected Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/application" element={<Application />} />
          <Route path="/reviews" element={<ListReviews />} />

          <Route path="/orders" element={<ListOrders />} />
          <Route path="/orders/:order_id" element={<ViewOrder />} />
          {/* <Route path="/orders/summary" element={<SummaryOrder />} /> */}

          <Route path="/services" element={<ListServices />} />
          <Route path="/services/create" element={<CreateService />} />
          <Route path="/services/:service_id" element={<CreateService />} />

          <Route path="/quotations" element={<ListQuotations />} />
          <Route path="/quotations/:quotation_id" element={<ViewQuotation />} />

          <Route path="/fixies" element={<ListFixies />} />
          <Route path="/fixies/:fixie_id" element={<ViewUser />} />

          <Route path="/members" element={<ListMembers />} />
          <Route path="/members/:member_id" element={<ViewUser />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
