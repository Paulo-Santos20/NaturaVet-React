import React from 'react';
import './DoctorHero.css';

const DoctorHero = () => {
  return (
    <section className="doctor-hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Conheça a <span className="highlight">Dra. Renata Santos</span>
            </h1>
            <p className="hero-subtitle">
              Nutróloga Veterinária especializada em bem-estar animal
            </p>
            <p className="hero-description">
              Mais de 10 anos dedicados à nutrição e saúde dos animais de estimação, 
              com foco em tratamentos personalizados e cuidado integral.
            </p>           
            
          </div>
          
          <div className="hero-image">
            <div className="image-container">
              <img 
                src="/nutrologa.jpg" 
                alt="Dra. Renata Santos"
                className="doctor-image"
              />
              <div className="image-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHero;