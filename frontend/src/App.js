import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Compo from './pages/Compo';
import Login from './pages/Login';
import Register from './pages/Register';

import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <>
      <Router>
        <Header />
        {/* <div className="container"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compo" element={<Compo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* </div> */}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
