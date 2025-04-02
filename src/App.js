
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Trainings from './components/Trainings';
import TrainingDetails from './components/TrainingDetails';
import Content from './components/Content';
import Contact from './components/Contact';
import TrainingCreate from './components/TrainingCreate';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Partners from './components/Partners';
import AdminEditor from './components/AdminEditor';

function App() {
  const [activeLink, setActiveLink] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const location = useLocation();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsAuthenticated(false); // Update authentication state
  };

  // Define routes where Navbar and Footer should not be displayed
  const noNavbarFooterRoutes = ['/', '/login', '/register'];

  // Check if the current route is in the noNavbarFooterRoutes array
  const shouldShowNavbarFooter = !noNavbarFooterRoutes.includes(location.pathname);

  return (
    <div className="app">
      {/* Conditionally render Navbar */}
      {shouldShowNavbarFooter && (
        <Navbar
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
      )}

      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/partners" element={<Partners />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/home" element={<><Content />  <Partners /> <Contact /></>} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/training/:id" element={<TrainingDetails />} />
            <Route path="/train" element={<TrainingCreate />} />
            <Route path="/admin" element={<AdminEditor />} />

          </Route>

          {/* Fallback Route (Redirect to Login if no route matches) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {shouldShowNavbarFooter && <Footer />}
    </div>
  );
}

export default App;