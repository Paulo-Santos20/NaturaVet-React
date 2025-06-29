import React from 'react';
import '../../../styles/components/Hero.css';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Nutrição Especializada para seu <span className="highlight">Pet</span>
            </h1>
            <p className="hero-description">
              Cuidamos da saúde e bem-estar do seu animal de estimação com 
              planos nutricionais personalizados e acompanhamento profissional.
            </p>
            <div className="hero-buttons">
              <Link to="/contato" className="btn btn-primary hero-btn">
                <span className="btn-text">Agendar Consulta</span>
                <span className="btn-icon">📅</span>
              </Link>
              <Link to="/servicos" className="btn btn-secondary hero-btn">
                <span className="btn-text">Saiba Mais</span>
                <span className="btn-icon">→</span>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="/cuidado.jpg" 
              alt="Pet saudável com nutrição adequada"
              className="hero-img"
            />
            <div className="hero-stats">
              <span className="stats-text">💖 +500 Pets Atendidos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;