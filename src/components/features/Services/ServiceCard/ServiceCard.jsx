import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <span>{service.icon}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul className="service-features">
        {service.features.map((feature, idx) => (
          <li key={idx}>✓ {feature}</li>
        ))}
      </ul>
      <a href="#contato" className="btn service-btn">Saiba Mais</a>
    </div>
  );
};

export default ServiceCard;