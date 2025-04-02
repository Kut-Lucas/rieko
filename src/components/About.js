import React from 'react';
import './About.css';
import img from './images/photo1.png';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="header-section">

        <h1 className="header-title">Wisdom for Transformative Solutions</h1>
        <img 
          src={img} 
          alt="Wisdom for transformative solutions" 
          className="header-image"
        />
      </div>

      {/* Who We Are Section */}
      <section className="who-we-are-section">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-content">
          At Rieko Global, we provide thoughtful and inclusive solutions designed to tackle complex challenges and foster growth and understanding.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <h2 className="section-title">What We Do</h2>
        <p className="section-content">
          We specialize in creating solutions that bridge gaps, resolve conflicts, and build sustainable pathways forward. Here’s what we offer:
        </p>
        <ul className="section-list">
          <li className="list-item">Conflict resolution and mediation</li>
          <li className="list-item">Strategic planning and facilitation</li>
          <li className="list-item">Leadership training and capacity building</li>
          <li className="list-item">Organizational development consulting</li>
        </ul>
      </section>

      {/* Why Work with Us Section */}
      <section className="why-work-with-us-section">
        <h2 className="section-title">Why Work with Us</h2>
        <ul className="section-list">
          <li className="list-item">Decades of experience in conflict resolution and leadership development</li>
          <li className="list-item">Client-centered, tailored approaches</li>
          <li className="list-item">Proven strategies and results-driven solutions</li>
          <li className="list-item">Commitment to fostering collaboration and inclusivity</li>
        </ul>
      </section>

      {/* Who We Work With Section */}
      <section className="who-we-work-with-section">
        <h2 className="section-title">Who We Work With</h2>
        <p className="section-content">We partner with diverse organizations and leaders across various sectors, including:</p>
        <ul className="section-list">
          <li className="list-item">Non-profits and NGOs</li>
          <li className="list-item">Corporate teams</li>
          <li className="list-item">Educational institutions</li>
          <li className="list-item">Community organizations</li>
        </ul>
        <p className="section-content">
          Whether you’re addressing internal conflicts, strengthening partnerships, or navigating complex decisions, we’re here to support you.
        </p>
      </section>

      {/* Our Approach Section */}
      <section className="our-approach-section">
        <h2 className="section-title">Our Approach</h2>
        <p className="section-content">
          At Rieko Global, we believe that every challenge can be addressed through thoughtful, inclusive processes. Here’s how we work:
        </p>
        <ul className="section-list">
          <li className="list-item"><strong>Engagement First:</strong> We listen to understand your needs, goals, and challenges.</li>
          <li className="list-item"><strong>Collaborative Solutions:</strong> We design processes with you, ensuring buy-in and practical outcomes.</li>
          <li className="list-item"><strong>Focus on Results:</strong> Using our RIEKO approach—Resolving Issues through Engagement, Knowledge, and Optimization—we equip you with skills and strategies that last.</li>
        </ul>
        <p className="section-content">
          Our methods are participatory, rooted in trust, and driven by a clear focus on achieving tangible outcomes for individuals and organizations.
        </p>
        <p className="section-content let-work-together">
          <strong>Let’s Work Together</strong>
        </p>
        <p className="section-content">
          At Rieko Global, we believe in the power of dialogue, negotiation, and mediation to transform challenges into opportunities. Whether you’re building stronger teams, resolving conflicts, or planning for a better future, we’re here to walk the journey with you.
        </p>
      </section>
    </div>
  );
};

export default About;
