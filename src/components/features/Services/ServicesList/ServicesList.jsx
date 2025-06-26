import React from 'react';
import ServiceCard from '../ServiceCard';
import '../../../../styles/components/Services.css';

const ServicesList = () => {
  const services = [
    {
      icon: '🔍',
      title: 'Avaliação Nutricional',
      description: 'Análise completa das necessidades nutricionais do seu pet com base em idade, peso, raça e condições de saúde.',
      features: ['Exame físico', 'Histórico alimentar', 'Análise laboratorial', 'Relatório detalhado']
    },
    {
      icon: '📋',
      title: 'Plano Alimentar Personalizado',
      description: 'Desenvolvimento de dieta específica para as necessidades individuais do seu animal de estimação.',
      features: ['Receitas exclusivas', 'Porções calculadas', 'Cronograma de refeições', 'Lista de compras']
    },
    {
      icon: '📊',
      title: 'Acompanhamento Contínuo',
      description: 'Monitoramento regular dos resultados e ajustes no plano nutricional conforme necessário.',
      features: ['Consultas de retorno', 'Ajustes na dieta', 'Controle de peso', 'Suporte via WhatsApp']
    },
    {
      icon: '🏥',
      title: 'Nutrição Terapêutica',
      description: 'Tratamento nutricional especializado para pets com condições de saúde específicas.',
      features: ['Diabetes', 'Obesidade', 'Alergias alimentares', 'Problemas renais']
    }
  ];

  return (
    <section id="servicos" className="section services">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Oferecemos cuidado nutricional completo para garantir a saúde e bem-estar do seu pet
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;