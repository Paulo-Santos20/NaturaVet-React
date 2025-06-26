import React from 'react';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h3>Informações de Contato</h3>
      
      <div className="contact-item">
        <span className="contact-icon">📍</span>
        <div>
          <h4>Endereço</h4>
          <p>Rua das Flores, 123<br/>Centro - São Paulo, SP</p>
        </div>
      </div>
      
      <div className="contact-item">
        <span className="contact-icon">📞</span>
        <div>
          <h4>Telefone</h4>
          <p>(11) 99999-9999</p>
        </div>
      </div>
      
      <div className="contact-item">
        <span className="contact-icon">✉️</span>
        <div>
          <h4>E-mail</h4>
          <p>contato@naturavet.com.br</p>
        </div>
      </div>
      
      <div className="contact-item">
        <span className="contact-icon">🕒</span>
        <div>
          <h4>Horário de Funcionamento</h4>
          <p>Segunda a Sexta: 8h às 18h<br/>Sábado: 8h às 12h</p>
        </div>
      </div>
      
      <div className="social-links">
        <h4>Redes Sociais</h4>
        <div className="social-icons">
          <a href="#"  rel="noopener noreferrer">📘</a>
          <a href="#"  rel="noopener noreferrer">📷</a>
          <a href="#"  rel="noopener noreferrer">💬</a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;