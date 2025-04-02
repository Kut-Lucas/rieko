

// import React, { useState } from 'react';
// import './Navbar.css';
// import logo from './images/logo.png';
// import { FaHeadphones, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaBars, FaTimes } from 'react-icons/fa';
// import { useLocation, Link } from 'react-router-dom';

// function Navbar() {
//   const location = useLocation(); // Hook to get current path
//   const currentPath = location.pathname;
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <div>
//       {/* Top Navbar */}
//       <div className="navbar-top">
//         <p>
//           <FaHeadphones /> <span className="navbar-top-left">+1234567890</span>{' '}
//           <FaEnvelope className="navbar-top-right" />{' '}
//           <span>example@email.com</span>
//         </p>
//       </div>

//       {/* Main Navbar */}
//       <div className="navbar-main">
//         <div className="navbar-logo">
//           <img src={logo} alt="Logo" />
//         </div>

//         {/* Hamburger Button for Mobile */}
//         <button className="navbar-toggle" onClick={toggleMenu}>
//           {isMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>

//         {/* Navigation Links */}
//         <nav className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
//           <Link
//             to="/"
//             className={currentPath === '/' ? 'active' : ''}
//             onClick={closeMenu}
//           >
//             HOME
//           </Link>
//           <Link
//             to="/trainings"
//             className={currentPath === '/trainings' ? 'active' : ''}
//             onClick={closeMenu}
//           >
//             TRAININGS
//           </Link>
//         </nav>

//         {/* Social Icons */}
//         <div className="navbar-social-icons">
//           <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//             <FaFacebook />
//           </a>
//           <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//             <FaInstagram />
//           </a>
//           <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
//             <FaLinkedin />
//           </a>
//           <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
//             <FaTiktok />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useState } from 'react';
import './Navbar.css';
import logo from './images/logo.png';
import { FaHeadphones, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout }) {
  const location = useLocation(); // Hook to get current path
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Top Navbar */}
      <div className="navbar-top">
        <p>
          <FaHeadphones /> <span className="navbar-top-left">+1234567890</span>{' '}
          <FaEnvelope className="navbar-top-right" />{' '}
          <span>example@email.com</span>
        </p>


      </div>

      {/* Main Navbar */}
      <div className="navbar-main">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Hamburger Button for Mobile */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={currentPath === '/' ? 'active' : ''}
            onClick={closeMenu}
          >
            HOME
          </Link>
          <Link
            to="/trainings"
            className={currentPath === '/trainings' ? 'active' : ''}
            onClick={closeMenu}
          >
            TRAININGS
          </Link>
          <Link
            to="/admin"
            className={currentPath === '/admin' ? 'active' : ''}
            onClick={closeMenu}
          >
            AdminEditor
          </Link>
          {/* {isAuthenticated && (
            <Link
              to="/train"
              className={currentPath === '/train' ? 'active' : ''}
              onClick={closeMenu}
            >
              CREATE TRAINING
            </Link>
          )} */}
        </nav>

        {/* Social Icons and Logout Button */}
        <div className="navbar-social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Navbar;