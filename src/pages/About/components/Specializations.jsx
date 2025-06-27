import React from 'react';
import './Specializations.css';

const Specializations = () => {
  const specializations = [
    {
      title: 'Controle de Peso',
      description: 'Programas especializados para pets com sobrepeso ou obesidade, com foco em emagrecimento saudável e sustentável.',
      icon: '⚖️',
      features: [
        'Dietas hipocalóricas balanceadas',
        'Planos de exercícios adaptados',
        'Monitoramento contínuo'
      ]
    },
    {
      title: 'Doenças Crônicas',
      description: 'Nutrição terapêutica para pets com diabetes, doenças renais, cardíacas e outras condições crônicas.',
      icon: '🏥',
      features: [
        'Dietas terapêuticas específicas',
        'Controle glicêmico',
        'Suporte nutricional especializado'
      ]
    },
    {
      title: 'Filhotes e Idosos',
      description: 'Nutrição adequada para cada fase da vida, desde filhotes em crescimento até pets idosos com necessidades especiais.',
      icon: '👶',
      features: [
        'Nutrição para crescimento',
        'Cuidados geriátricos',
        'Suplementação adequada'
      ]
    },
    {
      title: 'Alergias Alimentares',
      description: 'Diagnóstico e tratamento de alergias e intolerâncias alimentares através de dietas de eliminação e hipoalergênicas.',
      icon: '🚫',
      features: [
        'Testes de eliminação',
        'Dietas hipoalergênicas',
        'Identificação de alérgenos'
      ]
    },
    {
      title: 'Performance Esportiva',
      description: 'Nutrição especializada para cães atletas e de trabalho, otimizando performance e recuperação.',
      icon: '🏃',
      features: [
        'Dietas de alta performance',
        'Suplementação esportiva',
        'Recuperação muscular'
      ]
    },
    {
      title: 'Nutrição Natural',
      description: 'Alimentação natural e caseira balanceada, com ingredientes frescos e naturais adequados para cada pet.',
      icon: '🥗',
      features: [
        'Dietas caseiras balanceadas',
        'Ingredientes naturais',
        'Receitas personalizadas'
      ]
    }
  ];

  return (
    <section className="specializations-section">
      <div className="container">
        <div className="section-header">
          <h2>Áreas de Especialização</h2>
          <p>Expertise focada nas principais necessidades nutricionais dos pets</p>
        </div>

        <div className="specializations-grid">
          {specializations.map((spec, index) => (
            <div key={index} className="specialization-card">
              <div className="spec-header">
                <div className="spec-icon">
                  {spec.icon}
                </div>
                <h3>{spec.title}</h3>
              </div>
              
              <div className="spec-content">
                <p className="spec-description">{spec.description}</p>
                
                <ul className="spec-features">
                  {spec.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <span className="feature-bullet">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="spec-action">
                <button className="spec-btn">
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="specializations-cta">
          <div className="cta-content">
            <h3>Precisa de Ajuda Especializada?</h3>
            <p>Entre em contato para descobrir como posso ajudar seu pet com uma nutrição personalizada.</p>
            <button className="cta-button">
              Agendar Consulta Especializada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specializations;