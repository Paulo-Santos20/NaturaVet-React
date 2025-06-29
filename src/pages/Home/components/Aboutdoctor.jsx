import React from 'react';
import { Link } from 'react-router-dom';
import './Aboutdoctor.css';

const AboutDoctor = () => {
  const specialties = [
    'Especialização em Nutrição Animal',
    'Atendimento Personalizado',
    'Acompanhamento Contínuo'
  ];

  return (
    <section className="about-doctor">
      <div className="about-container">
        <div className="about-content">
          {/* Foto da Doutora - Lado Esquerdo */}
          <div className="doctor-image-section">
            <div className="doctor-image-container">
              <div className="doctor-photo-container">
                <img 
                  src="./nutrologa.jpg" 
                  alt="Dra. [Nome da Nutróloga] - Especialista em Nutrição Animal"
                  className="doctor-photo"
                  onError={(e) => {
                    // Fallback caso a imagem não carregue
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />                
              </div>
              
              <div className="experience-badge">
                <div className="experience-number">10+</div>
                <div className="experience-text">Anos de<br />Experiência</div>
              </div>
            </div>
          </div>

          {/* Informações da Doutora - Lado Direito */}
          <div className="doctor-info-section">
            <div className="doctor-content">
              <h2 className="section-title">
                Cuidado Profissional com <span className="highlight">Amor e Dedicação</span>
              </h2>
              
              <p className="section-description">
                Sou especialista em nutrição animal com mais de 10 anos de experiência, 
                dedicada a proporcionar o melhor cuidado nutricional para pets de todas as idades.
              </p>

              <div className="specialties-list">
                {specialties.map((specialty, index) => (
                  <div key={index} className="specialty-item">
                    <div className="specialty-icon">✓</div>
                    <span className="specialty-text">{specialty}</span>
                  </div>
                ))}
              </div>

              <div className="doctor-action">
                <Link to="/sobre" className="about-btn">
                  <span className="btn-icon">👩‍⚕️</span>
                  Conheça Minha História
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;