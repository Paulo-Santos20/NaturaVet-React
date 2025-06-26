import React from 'react';
import '../../../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>🐾 NaturaVet</h3>
              <p>Cuidando da nutrição e bem-estar dos seus pets com amor e profissionalismo.</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#depoimentos">Depoimentos</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li><a href="#servicos">Avaliação Nutricional</a></li>
              <li><a href="#servicos">Plano Alimentar</a></li>
              <li><a href="#servicos">Acompanhamento</a></li>
              <li><a href="#servicos">Nutrição Terapêutica</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contato</h4>
            <div className="footer-contact">
              <p>📍 Rua das Flores, 123<br/>Centro - São Paulo, SP</p>
              <p>📞 (11) 99999-9999</p>
              <p>✉️ contato@naturavet.com.br</p>
            </div>
            
            <div className="footer-social">
              <a href="#"  rel="noopener noreferrer">📘</a>
              <a href="#"  rel="noopener noreferrer">📷</a>
              <a href="#"  rel="noopener noreferrer">💬</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 NaturaVet. Todos os direitos reservados.</p>
          <div className="footer-links">
            <a href="#privacy">Política de Privacidade</a>
            <a href="#terms">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;