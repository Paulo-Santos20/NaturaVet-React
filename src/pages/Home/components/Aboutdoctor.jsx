import React from 'react';
import './AboutDoctor.css';

const AboutDoctor = () => {
  const qualifications = [
    {
      icon: '🎓',
      title: 'Formação em Medicina Veterinária',
      description: 'Graduação pela Universidade de São Paulo (USP)'
    },
    {
      icon: '🔬',
      title: 'Especialização em Nutrição Animal',
      description: 'Pós-graduação em Nutrição e Alimentação Animal'
    },
    {
      icon: '📜',
      title: 'Certificação em Nutrologia Clínica',
      description: 'Certificação internacional em Nutrologia Veterinária'
    }
  ];

  const achievements = [
    '5+ anos de experiência',
    '500+ pets atendidos',
    '98% de satisfação dos clientes',
    'Membro da ASBRAN'
  ];

  return (
    <section className="about-doctor">
      <div className="container">
        <div className="about-content">
          {/* Foto da Doutora */}
          <div className="doctor-image">
            <div className="image-container">
              <img 
                src="/api/placeholder/400/500" 
                alt="Dra. [Nome da Nutróloga]"
                className="doctor-photo"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <span className="overlay-icon">🩺</span>
                  <span className="overlay-text">Especialista em Nutrição</span>
                </div>
              </div>
            </div>
            
            {/* Conquistas */}
            <div className="achievements-card">
              <h4>Conquistas</h4>
              <div className="achievements-list">
                {achievements.map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <span className="achievement-icon">✨</span>
                    <span className="achievement-text">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Informações da Doutora */}
          <div className="doctor-info">
            <div className="doctor-header">
              <h2 className="doctor-name">Dra. [Nome da Nutróloga]</h2>
              <p className="doctor-specialty">Especialista em Nutrição Animal</p>
            </div>

            <div className="doctor-description">
              <p>
                Com mais de 5 anos de experiência em nutrição animal, dedico-me a promover 
                a saúde e bem-estar dos pets através de uma alimentação equilibrada e adequada 
                às necessidades individuais de cada animal.
              </p>
              
              <p>
                Minha abordagem é baseada em evidências científicas e no cuidado personalizado, 
                sempre considerando as particularidades de cada pet e as necessidades específicas 
                de cada família.
              </p>
            </div>

            {/* Qualificações */}
            <div className="qualifications">
              <h3>Formação e Certificações</h3>
              <div className="qualifications-grid">
                {qualifications.map((qualification, index) => (
                  <div key={index} className="qualification-item">
                    <div className="qualification-icon">
                      {qualification.icon}
                    </div>
                    <div className="qualification-content">
                      <h4>{qualification.title}</h4>
                      <p>{qualification.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filosofia de Trabalho */}
            <div className="philosophy">
              <h3>Minha Filosofia</h3>
              <blockquote>
                "Acredito que cada pet é único e merece um cuidado nutricional personalizado. 
                Meu objetivo é criar planos alimentares que não apenas nutram, mas que também 
                promovam uma vida longa, saudável e feliz para nossos companheiros de quatro patas."
              </blockquote>
            </div>

            {/* Botão de Ação */}
            <div className="doctor-actions">
              <button className="primary-btn">
                Conheça Mais Sobre Mim
              </button>
              <button className="secondary-btn">
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;