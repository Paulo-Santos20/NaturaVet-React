import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
  const contactItems = [
    {
      icon: '📍',
      title: 'Endereço',
      info: 'Rua das Flores, 123',
      subInfo: 'Vila Madalena, São Paulo - SP',
      action: {
        text: 'Ver no Maps',
        link: 'https://maps.google.com/?q=Rua+das+Flores+123+Vila+Madalena+São+Paulo'
      }
    },
    {
      icon: '📞',
      title: 'Telefone',
      info: '(11) 99999-9999',
      subInfo: 'Segunda a Sexta: 8h às 18h',
      action: {
        text: 'Ligar Agora',
        link: 'tel:+5511999999999'
      }
    },
    {
      icon: '📧',
      title: 'Email',
      info: 'contato@naturavet.com.br',
      subInfo: 'Resposta em até 24h',
      action: {
        text: 'Enviar Email',
        link: 'mailto:contato@naturavet.com.br'
      }
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      info: '(11) 99999-9999',
      subInfo: 'Atendimento rápido',
      action: {
        text: 'Conversar',
        link: 'https://wa.me/5511999999999?text=Olá! Gostaria de mais informações.'
      }
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/naturavet',
      handle: '@naturavet'
    },
    {
      name: 'Facebook',
      icon: '👥',
      url: 'https://facebook.com/naturavet',
      handle: '/naturavet'
    },
    {
      name: 'YouTube',
      icon: '📺',
      url: 'https://youtube.com/naturavet',
      handle: '/naturavet'
    }
  ];

  return (
    <div className="contact-info">
      <div className="info-header">
        <h3 className="info-title">Informações de Contato</h3>
        <p className="info-subtitle">
          Múltiplas formas de entrar em contato conosco
        </p>
      </div>

      <div className="contact-items">
        {contactItems.map((item, index) => (
          <div key={index} className="contact-item">
            <div className="item-icon">
              <span>{item.icon}</span>
            </div>
            <div className="item-content">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-info">{item.info}</p>
              <p className="item-subinfo">{item.subInfo}</p>
              <a 
                href={item.action.link}
                className="item-action"
                target={item.action.link.startsWith('http') ? '_blank' : '_self'}
                rel={item.action.link.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                {item.action.text} →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="social-section">
        <h4 className="social-title">Siga-nos nas Redes Sociais</h4>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              
              rel="noopener noreferrer"
              className="social-link"
              title={`Seguir no ${social.name}`}
            >
              <span className="social-icon">{social.icon}</span>
              <div className="social-info">
                <span className="social-name">{social.name}</span>
                <span className="social-handle">{social.handle}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="hours-section">
        <h4 className="hours-title">Horário de Funcionamento</h4>
        <div className="hours-list">
          <div className="hours-item">
            <span className="day">Segunda a Sexta</span>
            <span className="time">8:00 - 18:00</span>
          </div>
          <div className="hours-item">
            <span className="day">Sábado</span>
            <span className="time">8:00 - 14:00</span>
          </div>
          <div className="hours-item closed">
            <span className="day">Domingo</span>
            <span className="time">Fechado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;