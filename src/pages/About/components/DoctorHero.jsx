import React from 'react';
import './DoctorHero.css';

const DoctorHero = () => {
  return (
    <section className="doctor-hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Conheça a <span className="highlight">Dra. Ana Paula Silva</span>
            </h1>
            <p className="hero-subtitle">
              Nutróloga Veterinária especializada em bem-estar animal
            </p>
            <p className="hero-description">
              Mais de 10 anos dedicados à nutrição e saúde dos animais de estimação, 
              com foco em tratamentos personalizados e cuidado integral.
            </p>
            
            <div className="hero-badges">
              <div className="badge">
                <span className="badge-icon">👩‍⚕️</span>
                <div className="badge-content">
                  <span className="badge-title">Dra. Ana Paula Silva</span>
                  <span className="badge-subtitle">Especialista</span>
                </div>
              </div>
              
              <div className="badge">
                <span className="badge-icon">📅</span>
                <div className="badge-content">
                  <span className="badge-title">10+ Anos</span>
                  <span className="badge-subtitle">Experiência</span>
                </div>
              </div>
              
              <div className="badge">
                <span className="badge-icon">🐕</span>
                <div className="badge-content">
                  <span className="badge-title">500+ Pets</span>
                  <span className="badge-subtitle">Atendidos</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-container">
              <img 
                src="/api/placeholder/500/600" 
                alt="Dra. Ana Paula Silva"
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