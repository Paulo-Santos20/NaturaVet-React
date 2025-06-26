import React from 'react';
import '../../../styles/components/Hero.css';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Nutrição Especializada para o Seu Pet</h1>
            <p>
              Cuidamos da saúde e bem-estar do seu companheiro através de 
              planos nutricionais personalizados e acompanhamento profissional.
            </p>
            <div className="hero-buttons">
              <a href="#contato" className="btn">Agendar Consulta</a>
              <a href="#servicos" className="btn btn-outline">Nossos Serviços</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">
              <span>🐕🐱</span>
              <p>Imagem do Pet Feliz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;