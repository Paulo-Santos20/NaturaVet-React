import React from 'react';
import './How.css';

const HowWeCanHelp = () => {
  const services = [
    {
      id: 1,
      icon: '🔍',
      title: 'Consulta Nutricional',
      description: 'Avaliação completa das necessidades nutricionais do seu pet',
      features: [
        'Análise detalhada do histórico alimentar',
        'Avaliação do estado nutricional atual',
        'Identificação de deficiências ou excessos',
        'Recomendações personalizadas'
      ]
    },
    {
      id: 2,
      icon: '📋',
      title: 'Plano Alimentar',
      description: 'Dieta personalizada baseada na idade, peso e condições de saúde',
      features: [
        'Cardápio adaptado às necessidades específicas',
        'Receitas caseiras balanceadas',
        'Orientações sobre rações comerciais',
        'Suplementação quando necessária'
      ]
    },
    {
      id: 3,
      icon: '📈',
      title: 'Acompanhamento',
      description: 'Suporte contínuo e ajustes no plano nutricional quando necessário',
      features: [
        'Monitoramento regular do progresso',
        'Ajustes conforme evolução do pet',
        'Suporte via WhatsApp',
        'Consultas de retorno incluídas'
      ]
    }
  ];

  return (
    <section className="how-we-can-help">
      <div className="container">
        <div className="section-header">
          <h2>Como Podemos Ajudar seu Pet</h2>
          <p className="section-subtitle">
            Oferecemos soluções nutricionais completas e personalizadas
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-check">✓</span>
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="service-action">
                <button className="service-btn">
                  Saiba Mais
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>Pronto para Transformar a Alimentação do seu Pet?</h3>
            <p>Agende uma consulta e descubra como uma nutrição adequada pode melhorar a qualidade de vida do seu companheiro.</p>
          </div>
          <button className="cta-button">
            Agendar Consulta
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowWeCanHelp;