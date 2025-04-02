import React, { useState } from 'react';
import './Partners.css';
import placeholderLogo from './images/placeholder-logo.png'; // Import placeholder locally

const Partners = ({ partners }) => {
  // Default partners data with locally imported placeholder
  const defaultPartners = [
    {
      id: 1,
      name: 'TechCorp',
      logo: require('./images/logo.png'), // Using require for local images
      website: 'https://techcorp.example.com'
    },
    {
      id: 2,
      name: 'InnovateCo',
      logo: require('./images/logo.png'),
      website: 'https://innovateco.example.com'
    },
    {
      id: 3,
      name: 'Digital Solutions',
      logo: require('./images/logo.png'),
      website: 'https://digitalsolutions.example.com'
    },
    {
      id: 4,
      name: 'Future Labs',
      logo: require('./images/logo.png'),
      website: 'https://futurelabs.example.com'
    },
    {
      id: 5,
      name: 'WebMasters',
      logo: require('./images/logo.png'),
      website: 'https://webmasters.example.com'
    },
    {
      id: 6,
      name: 'CloudNine',
      logo: require('./images/logo.png'),
      website: 'https://cloudnine.example.com'
    }
  ];

  const partnersToDisplay = partners || defaultPartners;

  return (
    <section className="partners-container">
      <h2 className="partners-title">Our Trusted Partners</h2>
      <div className="partners-grid">
        {partnersToDisplay.map((partner) => (
          <PartnerItem 
            key={partner.id} 
            partner={partner} 
            placeholder={placeholderLogo}
          />
        ))}
      </div>
    </section>
  );
};

// Separate component to handle each partner item with its own state
const PartnerItem = ({ partner, placeholder }) => {
  const [imgSrc, setImgSrc] = useState(partner.logo);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (imgSrc !== placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <a 
      href={partner.website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="partner-link"
    >
      <div className="partner-card">
        <img 
          src={imgSrc}
          alt={`${partner.name} logo`}
          className={`partner-logo ${loaded ? 'loaded' : 'loading'}`}
          onError={handleError}
          onLoad={() => setLoaded(true)}
        />
        <h3 className="partner-name">{partner.name}</h3>
      </div>
    </a>
  );
};

export default Partners;