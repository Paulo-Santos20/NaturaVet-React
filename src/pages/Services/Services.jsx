import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import './Services.css';

const Services = () => {

  const services = [
    {
      id: 1,
      title: 'Consulta Nutricional',
      icon: '🍽️',
      price: 'R\$ 120,00',
      duration: '60 minutos',
      description: 'Avaliação completa do estado nutricional do seu pet com desenvolvimento de plano alimentar personalizado.',
      highlights: [
        'Análise completa do histórico alimentar',
        'Avaliação do peso e condição corporal',
        'Plano nutricional personalizado',
        'Material educativo incluso'
      ]
    },
    {
      id: 2,
      title: 'Plano Alimentar Personalizado',
      icon: '📋',
      price: 'R\$ 80,00',
      duration: '45 minutos',
      description: 'Desenvolvimento de cardápio específico baseado nas necessidades individuais do seu animal.',
      highlights: [
        'Cardápio semanal detalhado',
        'Lista de ingredientes permitidos',
        'Receitas caseiras saudáveis',
        'Acompanhamento por 30 dias'
      ]
    },
    {
      id: 3,
      title: 'Acompanhamento Nutricional',
      icon: '📈',
      price: 'R\$ 60,00',
      duration: '30 minutos',
      description: 'Monitoramento contínuo do progresso nutricional com ajustes no plano alimentar conforme necessário.',
      highlights: [
        'Avaliação de progresso mensal',
        'Ajustes no plano alimentar',
        'Monitoramento de peso',
        'Suporte via WhatsApp'
      ]
    },
    {
      id: 4,
      title: 'Orientação para Filhotes',
      icon: '🐶',
      price: 'R\$ 100,00',
      duration: '50 minutos',
      description: 'Consultoria especializada para a fase mais importante da vida do seu pet: os primeiros meses.',
      highlights: [
        'Plano nutricional para crescimento',
        'Cronograma de desmame',
        'Introdução alimentar gradual',
        'Acompanhamento mensal incluso'
      ]
    },
    {
      id: 5,
      title: 'Nutrição para Pets Idosos',
      icon: '🐕‍🦺',
      price: 'R\$ 140,00',
      duration: '70 minutos',
      description: 'Cuidado nutricional especializado para pets na terceira idade, focando em qualidade de vida.',
      highlights: [
        'Avaliação geriátrica completa',
        'Plano para necessidades especiais',
        'Suplementação adequada',
        'Monitoramento renal e hepático'
      ]
    },
    {
      id: 6,
      title: 'Consultoria Online',
      icon: '💻',
      price: 'R\$ 90,00',
      duration: '45 minutos',
      description: 'Atendimento nutricional à distância com a mesma qualidade da consulta presencial.',
      highlights: [
        'Consulta por videochamada',
        'Análise de fotos e vídeos',
        'Plano nutricional digital',
        'Flexibilidade de horários'
      ]
    }
  ];

  const packages = [
    {
      id: 1,
      name: 'Pacote Básico',
      icon: '🌱',
      price: 'R\$ 180,00',
      originalPrice: 'R\$ 200,00',
      discount: '10%',
      duration: '2 meses',
      description: 'Ideal para começar a jornada nutricional do seu pet com acompanhamento inicial.',
      includes: [
        '1 Consulta Nutricional completa',
        '1 Plano Alimentar Personalizado',
        'Suporte via WhatsApp por 30 dias',
        'Material educativo digital',
        'Relatório inicial de avaliação'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Pacote Completo',
      icon: '⭐',
      price: 'R\$ 320,00',
      originalPrice: 'R\$ 380,00',
      discount: '15%',
      duration: '4 meses',
      description: 'O mais escolhido pelos nossos clientes! Acompanhamento completo com resultados garantidos.',
      includes: [
        '1 Consulta Nutricional completa',
        '1 Plano Alimentar Personalizado',
        '3 Consultas de Acompanhamento',
        'Suporte ilimitado via WhatsApp',
        'Material educativo premium',
        'Relatórios mensais de progresso',
        'Ajustes no plano quando necessário'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Pacote Premium',
      icon: '👑',
      price: 'R\$ 480,00',
      originalPrice: 'R\$ 600,00',
      discount: '20%',
      duration: '6 meses',
      description: 'Acompanhamento VIP com atendimento prioritário e resultados excepcionais garantidos.',
      includes: [
        '2 Consultas Nutricionais completas',
        '2 Planos Alimentares Personalizados',
        '4 Consultas de Acompanhamento',
        'Suporte prioritário 24/7',
        'Material educativo premium exclusivo',
        'Relatórios detalhados quinzenais',
        '1 Consultoria online inclusa',
        'Desconto de 20% em consultas futuras'
      ],
      popular: false
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Entre em Contato',
      description: 'Fale conosco via WhatsApp, telefone ou formulário online',
      details: 'Nossa equipe está disponível para esclarecer dúvidas e encontrar o melhor horário para você',
      icon: '📱',
      color: '#FC5A8D'
    },
    {
      number: 2,
      title: 'Agende sua Consulta',
      description: 'Escolha o dia e horário mais conveniente para você',
      details: 'Oferecemos horários flexíveis, incluindo fins de semana e consultas online',
      icon: '📅',
      color: '#17a2b8'
    },
    {
      number: 3,
      title: 'Avaliação Completa',
      description: 'Analisamos o histórico, hábitos e necessidades do seu pet',
      details: 'Exame físico, análise comportamental e avaliação nutricional detalhada',
      icon: '🔍',
      color: '#28a745'
    },
    {
      number: 4,
      title: 'Plano Personalizado',
      description: 'Criamos um plano nutricional específico para seu pet',
      details: 'Cardápio detalhado, cronograma de alimentação e orientações práticas',
      icon: '📋',
      color: '#6f42c1'
    },
    {
      number: 5,
      title: 'Acompanhamento',
      description: 'Monitoramos o progresso e fazemos ajustes necessários',
      details: 'Consultas de retorno, suporte contínuo e relatórios de evolução',
      icon: '📈',
      color: '#fd7e14'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'Quanto tempo dura uma consulta nutricional?',
      answer: 'As consultas variam de 30 a 70 minutos, dependendo do serviço escolhido. Consultas iniciais são mais longas (60-70 min) para uma avaliação completa, enquanto acompanhamentos são mais rápidos (30-45 min). Sempre reservamos tempo suficiente para esclarecer todas as suas dúvidas.'
    },
    {
      id: 2,
      question: 'Posso fazer consulta online? Como funciona?',
      answer: 'Sim! Nossas consultas online têm a mesma qualidade da presencial. Utilizamos videochamada para conversar, você envia fotos e vídeos do seu pet, e recebe o plano nutricional digital. É ideal para quem tem agenda corrida, mora longe ou prefere o conforto de casa.'
    },
    {
      id: 3,
      question: 'Os planos funcionam para todos os tipos de pets?',
      answer: 'Nossos planos são personalizados para cada pet individualmente. Atendemos cães e gatos de todas as idades, raças e condições de saúde. Consideramos espécie, idade, peso, atividade física, condições médicas e preferências alimentares para criar o plano ideal.'
    },
    {
      id: 4,
      question: 'Qual a diferença entre os pacotes oferecidos?',
      answer: 'Os pacotes variam na quantidade de consultas e duração do acompanhamento. O Básico é ideal para começar, o Completo oferece acompanhamento contínuo com melhor custo-benefício, e o Premium inclui atendimento VIP com máxima atenção e resultados garantidos.'
    },
    {
      id: 5,
      question: 'Vocês oferecem garantia nos resultados?',
      answer: 'Trabalhamos com metas realistas e acompanhamento contínuo. Nossos pacotes Completo e Premium incluem garantia de resultados quando as orientações são seguidas corretamente. Se não houver melhora, oferecemos consultas adicionais sem custo.'
    },
    {
      id: 6,
      question: 'Como é feito o acompanhamento nutricional?',
      answer: 'O acompanhamento inclui consultas de retorno presenciais ou online, suporte via WhatsApp para dúvidas do dia a dia, ajustes no plano conforme a evolução do pet, e relatórios de progresso. Você nunca fica sozinho nessa jornada!'
    },
    {
      id: 7,
      question: 'Preciso levar exames na primeira consulta?',
      answer: 'Exames recentes são úteis mas não obrigatórios. Se seu pet tem alguma condição de saúde específica, traga os exames mais recentes. Caso contrário, faremos a avaliação inicial e, se necessário, solicitaremos exames complementares.'
    },
    {
      id: 8,
      question: 'Quanto custa e quais são as formas de pagamento?',
      answer: 'Os preços variam de R\$ 60 a R\$ 140 para consultas individuais, e de R\$ 180 a R\$ 480 para pacotes. Aceitamos dinheiro, PIX, cartão de débito/crédito (até 12x) e transferência bancária. Pacotes têm desconto especial!'
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <Layout>
      <div className="services-page">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Nossos <span className="highlight">Serviços</span>
              </h1>
              <p className="hero-subtitle">
                Oferecemos uma gama completa de serviços nutricionais especializados para garantir a saúde e bem-estar do seu pet em todas as fases da vida.
              </p>              
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Serviços Individuais</h2>
              <p className="section-subtitle">
                Escolha o serviço ideal para as necessidades específicas do seu pet
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <div 
                  key={`service-${service.id}`} 
                  className="service-card"
                >
                  <div className="service-header">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-info">
                      <h3 className="service-title">{service.title}</h3>
                      <div className="service-meta">
                        <span className="service-price">{service.price}</span>
                        <span className="service-duration">{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="service-description">{service.description}</p>

                  <div className="service-highlights">
                    <h4>Principais pontos:</h4>
                    <ul className="highlights-list">
                      {service.highlights.map((highlight, index) => (
                        <li key={`highlight-${service.id}-${index}`}>
                          <span className="check-icon">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-actions">
                    <Link to="/contato" className="btn btn-primary">
                      Agendar Consulta
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="packages-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Pacotes Especiais</h2>
              <p className="section-subtitle">
                Economize com nossos pacotes completos e tenha acompanhamento contínuo
              </p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div 
                  key={`package-${pkg.id}`} 
                  className={`package-card ${pkg.popular ? 'popular' : ''}`}
                >
                  {pkg.popular && <div className="popular-badge">Mais Popular</div>}
                  
                  <div className="package-header">
                    <div className="package-icon">{pkg.icon}</div>
                    <h3 className="package-name">{pkg.name}</h3>
                  </div>

                  <div className="package-pricing">
                    <div className="price-info">
                      <span className="current-price">{pkg.price}</span>
                      <span className="original-price">{pkg.originalPrice}</span>
                    </div>
                    <div className="discount-badge">
                      Economia de {pkg.discount}
                    </div>
                    <span className="package-duration">{pkg.duration} de acompanhamento</span>
                  </div>

                  <div className="package-description">
                    <p>{pkg.description}</p>
                  </div>

                  <div className="package-includes">
                    <h4>O que está incluído:</h4>
                    <ul>
                      {pkg.includes.map((item, index) => (
                        <li key={`include-${pkg.id}-${index}`}>
                          <span className="check-icon">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="package-actions">
                    <Link 
                      to="/contato" 
                      className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'} btn-full`}
                    >
                      Escolher Pacote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Como Funciona Nosso Atendimento</h2>
              <p className="section-subtitle">
                Processo simples e eficaz em 5 etapas para transformar a vida do seu pet
              </p>
            </div>

            <div className="process-timeline">
              {processSteps.map((step, index) => (
                <div key={`step-${step.number}`} className="timeline-item">
                  <div className="timeline-connector">
                    {index < processSteps.length - 1 && <div className="connector-line"></div>}
                  </div>
                  
                  <div className="step-card">
                    <div className="step-number" style={{ backgroundColor: step.color }}>
                      {step.number}
                    </div>
                    
                    <div className="step-content">
                      <div className="step-icon" style={{ color: step.color }}>
                        {step.icon}
                      </div>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                      <p className="step-details">{step.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Perguntas Frequentes</h2>
              <p className="section-subtitle">
                Tire suas dúvidas sobre nossos serviços - clique nas perguntas para ver as respostas
              </p>
            </div>

            <div className="faq-container">
              {faqs.map((faq) => (
                <div 
                  key={`faq-${faq.id}`} 
                  className={`faq-item ${openFaq === faq.id ? 'open' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <h4>{faq.question}</h4>
                    <div className="faq-toggle">
                      <span className={`toggle-icon ${openFaq === faq.id ? 'open' : ''}`}>
                        +
                      </span>
                    </div>
                  </div>
                  
                  <div className={`faq-answer ${openFaq === faq.id ? 'open' : ''}`}>
                    <div className="answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </section>

        {/* CTA Section Final */}
        <section className="final-cta-section">
          <div className="container">
            <div className="final-cta-content">
              <h2>Pronto para Transformar a Vida do seu Pet?</h2>
              <p>
                Agende uma consulta hoje mesmo e descubra como a nutrição adequada pode melhorar a qualidade de vida do seu animal de estimação.
              </p>
              <div className="final-cta-actions">
                <Link to="/contato" className="btn btn-primary btn-large">
                  Agendar Consulta Agora
                </Link>
                <Link to="/sobre" className="btn btn-secondary btn-large">
                  Conhecer a Especialista
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Services;