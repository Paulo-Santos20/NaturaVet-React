import React from 'react';
import './ProfessionalJourney.css';

const ProfessionalJourney = () => {
  const journeySteps = [
    {
      id: 1,
      title: 'O Início',
      description: 'Formada em Medicina Veterinária pela USP em 2013, sempre tive interesse especial pela área de nutrição animal, percebendo como a alimentação adequada transformava a vida dos pets.',
      icon: '🎓',
      year: '2013'
    },
    {
      id: 2,
      title: 'Especialização',
      description: 'Busquei aperfeiçoamento constante, realizando pós-graduação em Nutrição Animal e diversos cursos internacionais, sempre focada nas mais modernas técnicas de nutrição veterinária.',
      icon: '🔬',
      year: '2015'
    },
    {
      id: 3,
      title: 'Missão Atual',
      description: 'Hoje, dedico-me integralmente à nutrição personalizada, ajudando tutores a proporcionarem uma vida mais saudável e feliz para seus companheiros de quatro patas.',
      icon: '🎯',
      year: '2024'
    }
  ];

  return (
    <section className="professional-journey">
      <div className="container">
        <div className="section-header">
          <h2>Minha Jornada Profissional</h2>
          <p>Uma trajetória dedicada ao cuidado e bem-estar dos animais</p>
        </div>

        <div className="journey-intro">
          <p>
            Minha paixão pelos animais começou ainda na infância, quando cuidava dos pets da família 
            e sonhava em me tornar veterinária. Hoje, após anos de estudo e dedicação, realizo esse 
            sonho todos os dias através da nutrição especializada.
          </p>
        </div>

        <div className="journey-timeline">
          {journeySteps.map((step, index) => (
            <div key={step.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="timeline-icon">
                  <span className="icon">{step.icon}</span>
                  <span className="year">{step.year}</span>
                </div>
                <div className="timeline-text">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney;