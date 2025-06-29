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
            <div className="hero-image-container">
              <img 
                src="./cuidado.jpg" 
                alt="Cachorro feliz e saudável - NaturaVet"
                className="hero-pet-image"
                onError={(e) => {
                  // Fallback caso a imagem não carregue
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              
              {/* Texto com fundo branco */}
              <div className="hero-text-overlay">
                <p>💖 +500 Pets Atendidos</p>
              </div>
              
            </div>
         
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;