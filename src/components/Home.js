import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">RIEKO</h1>
        <h2 className="home-subheading">Resolving Issues through Engagement, Knowledge, and Optimization</h2>
        <div className="home-links">
          <Link to="/login" className="home-link">Log In</Link>
          <Link to="/register" className="home-link">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;