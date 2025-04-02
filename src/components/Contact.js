import React from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-details">
        <h1>We'd love to hear from you</h1>
        <h2>Contact Us</h2>
        <p>
          Have a question or need assistance? We’re here to help! Fill out the form below, and a member of our team will get back to you as soon as possible. Let’s work together to achieve your goals.
        </p>
        <div className="contact-info">
          <div className="info-section">
            <h3>Reach Us Through</h3>
            <p>
              <FaPhone /> +1 234 567 890
            </p>
            <p>
              <FaEnvelope /> contact@example.com
            </p>
          </div>
          <div className="social-section">
            <h3>Social Networks</h3>
            <div className="contact-social-icons">
              <a href="https://www.linkedin.com/" className="icon"><FaLinkedin /></a>
              <a href="https://www.facebook.com/" className="icon"><FaFacebook /></a>
              <a href="https://www.instagram.com/" className="icon"><FaInstagram /></a>
              <a href="https://www.tiktok.com/" className="icon"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <h2>Send Us A Message</h2>
        <form>
        <div className="input-one">
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
      </div>
        <div className="input-two">
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="tel" id="mobile" name="mobile" required />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <select id="service" name="service" required>
            <option value="">Select a Service</option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
          </select>
        </div>
        </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit">Send Message</button>

        </form>
      </div>
    </div>
  );
};

export default Contact;
