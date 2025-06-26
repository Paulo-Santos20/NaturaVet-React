import React from 'react';
import '../../../styles/components/About.css';

const About = () => {
  return (
    <section id="sobre" className="section about">
      <div className="container">
        <h2 className="section-title">Sobre a NaturaVet</h2>
        <p className="section-subtitle">
          Especialistas em nutrição animal com foco no bem-estar e saúde dos seus pets
        </p>
        
        <div className="about-content">
          <div className="about-image">
            <div className="about-placeholder">
              <span>👩‍⚕️</span>
              <p>Dra. Nutricionista</p>
            </div>
          </div>
          
          <div className="about-text">
            <h3>Nossa Missão</h3>
            <p>
              Promover a saúde e longevidade dos animais de estimação através de 
              nutrição especializada, oferecendo planos alimentares personalizados 
              que respeitam as necessidades individuais de cada pet.
            </p>
            
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">🎓</span>
                <div>
                  <h4>Especialização</h4>
                  <p>Formação especializada em nutrição veterinária</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">❤️</span>
                <div>
                  <h4>Cuidado Personalizado</h4>
                  <p>Cada pet recebe atenção individual e plano único</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">📊</span>
                <div>
                  <h4>Acompanhamento</h4>
                  <p>Monitoramento contínuo dos resultados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;