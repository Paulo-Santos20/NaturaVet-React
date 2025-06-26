import React from 'react';
import ServiceCard from '../../components/features/Services/ServiceCard';
import '../../styles/pages/Services.css';
import '../../styles/components/Services.css';

const Services = () => {
  const services = [
    {
      icon: '🔍',
      title: 'Avaliação Nutricional',
      description: 'Análise completa das necessidades nutricionais do seu pet com base em idade, peso, raça e condições de saúde.',
      features: ['Exame físico completo', 'Análise do histórico alimentar', 'Exames laboratoriais', 'Relatório detalhado'],
      price: 'R$ 150,00',
      duration: '60 minutos'
    },
    {
      icon: '📋',
      title: 'Plano Alimentar Personalizado',
      description: 'Desenvolvimento de dieta específica para as necessidades individuais do seu animal de estimação.',
      features: ['Receitas exclusivas', 'Cálculo de porções', 'Cronograma de refeições', 'Lista de compras'],
      price: 'R$ 200,00',
      duration: '90 minutos'
    },
    {
      icon: '📊',
      title: 'Acompanhamento Contínuo',
      description: 'Monitoramento regular dos resultados e ajustes no plano nutricional conforme necessário.',
      features: ['Consultas de retorno', 'Ajustes na dieta', 'Controle de peso', 'Suporte via WhatsApp'],
      price: 'R$ 100,00',
      duration: '30 minutos'
    },
    {
      icon: '🏥',
      title: 'Nutrição Terapêutica',
      description: 'Tratamento nutricional especializado para pets com condições de saúde específicas.',
      features: ['Tratamento para diabetes', 'Controle de obesidade', 'Alergias alimentares', 'Problemas renais'],
      price: 'R$ 250,00',
      duration: '120 minutos'
    },
    {
      icon: '🍽️',
      title: 'Consultoria Alimentar',
      description: 'Orientação sobre escolha de rações e alimentos adequados para seu pet.',
      features: ['Análise de rações', 'Recomendações de marcas', 'Dicas de alimentação', 'Orientação de compra'],
      price: 'R$ 80,00',
      duration: '45 minutos'
    },
    {
      icon: '📱',
      title: 'Acompanhamento Online',
      description: 'Suporte nutricional através de consultas virtuais e monitoramento remoto.',
      features: ['Consultas por videochamada', 'Chat de suporte', 'Envio de relatórios', 'Ajustes remotos'],
      price: 'R$ 120,00',
      duration: '45 minutos'
    }
  ];

  return (
    <div className="services-page">
      <section className="hero-services">
        <div className="container">
          <h1>Nossos Serviços</h1>
          <p>Cuidado nutricional completo para garantir a saúde e bem-estar do seu pet</p>
        </div>
      </section>
      
      <section className="section services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card-full">
                <ServiceCard service={service} />
                <div className="service-details">
                  <div className="service-price">
                    <span className="price">{service.price}</span>
                    <span className="duration">{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section cta-services">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para Começar?</h2>
            <p>Entre em contato conosco e agende uma consulta para seu pet</p>
            <a href="#contato" className="btn btn-large">Agendar Consulta</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;