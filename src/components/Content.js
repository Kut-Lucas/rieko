import React from "react";
import "./Content.css";
import sampleImage from "./images/photo1.png";

const Content = () => {
  return (
    <div className="content-container">
      <div className="top-section">
        <div className="welcome-box">Wisdom for Transformative Solutions</div>
        <div className="image-box">
          <img src={sampleImage} alt="Welcome" className="styled-image" />
        </div>
      </div>
      
      <div className="about-content">
        <h2 className="section-heading about-heading">About Us</h2>
        <hr className="underline" />
        <div className="about-section">
            <div className="info-box">
                <h3 className="text-center">Who We Are</h3>
                <p className="text-center">We are a team of professionals dedicated to providing the best services.</p>
            </div>
            <div className="info-box">
                <h3 className="text-center">What We Do</h3>
                <p className="text-center">We specialize in various fields to cater to diverse client needs.</p>
                <ul>
                    <li>Consulting</li>
                    <li>Development</li>
                    <li>Marketing</li>
                </ul>
            </div>
            <div className="info-box">
                <h3 className="text-center">Why Work With Us</h3>
                <p className="text-center">We bring experience, innovation, and dedication to our clients.</p>
                <ul>
                    <li>Proven track record</li>
                    <li>Expert team</li>
                    <li>Reliable support</li>
                </ul>
            </div>
        </div>
      </div>
      
      <h2 className="section-heading">Our Approach</h2>
      <p className="approach-text">We tackle problems with a strategic and client-centered approach.</p>
      
    </div>
  );
};

export default Content;