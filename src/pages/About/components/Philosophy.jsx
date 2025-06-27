import React from 'react';
import './Philosophy.css';

const Philosophy = () => {
  const principles = [
    {
      title: 'Cuidado Individualizado',
      description: 'Cada pet recebe um plano nutricional único, baseado em suas necessidades específicas, idade, raça e condições de saúde.',
      icon: '🎯'
    },
    {
      title: 'Parceria com o Tutor',
      description: 'Trabalho em conjunto com os tutores, educando e orientando para que possam dar continuidade ao tratamento em casa.',
      icon: '🤝'
    },
    {
      title: 'Abordagem Natural',
      description: 'Priorizo soluções naturais e sustentáveis, sempre que possível, respeitando o organismo do animal.',
      icon: '🌿'
    },
    {
      title: 'Acompanhamento Contínuo',
      description: 'Monitoro constantemente a evolução de cada caso, ajustando o tratamento conforme necessário.',
      icon: '📈'
    }
  ];

  return (
    <section className="philosophy-section">
      <div className="container">
        <div className="philosophy-content">
          <div className="philosophy-quote">
            <div className="quote-content">
              <blockquote>
                "Acredito que cada animal é único, com necessidades nutricionais específicas. 
                Meu trabalho é ouvir, compreender e criar soluções personalizadas que promovam 
                não apenas a saúde, mas a felicidade dos pets e a tranquilidade dos tutores."
              </blockquote>
              <cite>- Dra. Ana Paula Silva</cite>
            </div>
            <div className="quote-decoration">
              <div className="quote-mark">"</div>
            </div>
          </div>

          <div className="philosophy-header">
            <h2>Minha Filosofia de Trabalho</h2>
          </div>

          <div className="principles-grid">
            {principles.map((principle, index) => (
              <div key={index} className="principle-card">
                <div className="principle-icon">
                  {principle.icon}
                </div>
                <div className="principle-content">
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;