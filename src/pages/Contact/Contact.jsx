import React, { useState } from 'react';
import ContactForm from '../../components/features/Contact/ContactForm/ContactForm';
import ContactInfo from '../../components/features/Contact/ContactInfo/ContactInfo';
import Map from '../../components/features/Contact/Map/Map';
import '../../styles/pages/Contact.css';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (formData) => {
    // Aqui você pode integrar com sua API
    console.log('Dados do formulário:', formData);
    setFormSubmitted(true);
    
    // Reset após 3 segundos
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Entre em <span className="highlight">Contato</span>
            </h1>
            <p className="hero-description">
              Estamos prontos para cuidar da saúde e nutrição do seu pet. 
              Agende uma consulta ou tire suas dúvidas conosco.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* FORMULÁRIO */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2 className="form-title">Envie sua Mensagem</h2>
                <p className="form-subtitle">
                  Preencha o formulário abaixo e entraremos em contato em até 24 horas.
                </p>
              </div>
              
              {formSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h3>Mensagem Enviada!</h3>
                  <p>Obrigado pelo contato. Responderemos em breve!</p>
                </div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </div>

            {/* INFORMAÇÕES DE CONTATO */}
            <div className="contact-info-section">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="contact-map-section">
        <div className="container">
          <div className="map-header">
            <h2 className="map-title">Nossa Localização</h2>
            <p className="map-subtitle">
              Venha nos visitar! Estamos localizados em uma região de fácil acesso.
            </p>
          </div>
          <Map />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Pronto para Cuidar do seu Pet?</h2>
            <p className="cta-description">
              Agende uma consulta personalizada e descubra como podemos melhorar 
              a qualidade de vida do seu animal de estimação.
            </p>
            <div className="cta-buttons">
              <a href="tel:+5511999999999" className="btn btn-primary cta-btn">
                <span className="btn-icon">📞</span>
                <span className="btn-text">Ligar Agora</span>
              </a>
              <a 
                href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta para meu pet." 
                 
                rel="noopener noreferrer" 
                className="btn btn-secondary cta-btn"
              >
                <span className="btn-icon">💬</span>
                <span className="btn-text">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;