import React from 'react';
import '../../styles/pages/About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="hero-about">
        <div className="container">
          <h1>Sobre a NaturaVet</h1>
          <p>Especialistas em nutrição animal dedicados ao bem-estar dos seus pets</p>
        </div>
      </section>
      
      <section className="section about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <div className="about-placeholder">
                <span>👩‍⚕️</span>
                <p>Dra. Nutricionista</p>
              </div>
            </div>
            
            <div className="about-text">
              <h2>Nossa Missão</h2>
              <p>
                Promover a saúde e longevidade dos animais de estimação através de 
                nutrição especializada, oferecendo planos alimentares personalizados 
                que respeitam as necessidades individuais de cada pet.
              </p>
              
              <h3>Nossa História</h3>
              <p>
                Fundada em 2020, a NaturaVet nasceu da paixão pela saúde animal e 
                da necessidade de oferecer cuidados nutricionais especializados. 
                Nossa equipe é formada por profissionais qualificados que entendem 
                que cada pet é único.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section values">
        <div className="container">
          <h2 className="section-title">Nossos Valores</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎓</div>
              <h3>Especialização</h3>
              <p>Formação contínua e especializada em nutrição veterinária</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Cuidado</h3>
              <p>Cada pet recebe atenção individual e carinhosa</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3>Ciência</h3>
              <p>Baseamos nossos tratamentos em evidências científicas</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Parceria</h3>
              <p>Trabalhamos junto com tutores para o melhor resultado</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;