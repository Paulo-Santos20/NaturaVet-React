import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
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
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Nossos Serviços</h2>
          <p className="services-subtitle">
            Oferecemos soluções nutricionais completas e personalizadas para seu pet
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
                <Link to="/servicos" className="service-btn">
                  Saiba Mais
                </Link>
              </div>
            </div>
          ))}
        </div>       
      </div>
    </section>
  );
};

export default Services;