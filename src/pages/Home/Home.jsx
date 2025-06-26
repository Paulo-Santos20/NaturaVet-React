import React from 'react';
import Hero from '../../components/features/Hero';
import '../../styles/pages/Home.css';
import '../../styles/components/Hero.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* Seção de Prévia dos Serviços */}
      <section className="section services-preview">
        <div className="container">
          <h2 className="section-title">Por Que Escolher a NaturaVet?</h2>
          <p className="section-subtitle">
            Cuidado especializado e personalizado para o seu melhor amigo
          </p>
          
          <div className="preview-grid">
            <div className="preview-card">
              <div className="preview-icon">🎓</div>
              <h3>Especialização</h3>
              <p>Profissionais qualificados em nutrição veterinária</p>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">❤️</div>
              <h3>Cuidado Individual</h3>
              <p>Cada pet recebe atenção personalizada</p>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">📊</div>
              <h3>Acompanhamento</h3>
              <p>Monitoramento contínuo dos resultados</p>
            </div>
            
            <div className="preview-card">
              <div className="preview-icon">🏆</div>
              <h3>Resultados</h3>
              <p>Comprovada melhoria na saúde dos pets</p>
            </div>
          </div>
          
          <div className="cta-section">
            <a href="#servicos" className="btn btn-large">Ver Todos os Serviços</a>
            <a href="#contato" className="btn btn-outline btn-large">Agendar Consulta</a>
          </div>
        </div>
      </section>
      
      {/* Seção de Call to Action */}
      <section className="section cta-section-home">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para Transformar a Vida do Seu Pet?</h2>
            <p>Agende uma consulta e descubra como a nutrição adequada pode fazer toda a diferença</p>
            <a href="#contato" className="btn btn-large">Começar Agora</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;