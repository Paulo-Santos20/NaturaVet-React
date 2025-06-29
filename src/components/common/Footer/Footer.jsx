import React from 'react';
import '../../../styles/components/Footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo e Redes Sociais */}
          <div className="footer-logo">
            <h3>NaturaVet</h3>
            <p>
              Cuidado nutricional especializado para pets, com amor, dedicação e 
              mais de 10 anos de experiência em nutrição animal.
            </p>
            
            <div className="footer-social">
              <a 
                href="https://wa.me/5511999999999" 
                className="whatsapp"
                 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                📱
              </a>
              <a 
                href="https://instagram.com/naturavet" 
                className="instagram"
                 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                📷
              </a>
              <a 
                href="mailto:contato@naturavet.com.br" 
                className="email"
                aria-label="Email"
              >
                ✉️
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
              <li><Link to="/servicos">Serviços</Link></li>
              <li><Link to="/depoimentos">Depoimentos</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Serviços */}
          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li><Link to="/servicos">Consulta Nutricional</Link></li>
              <li><Link to="/servicos">Plano Alimentar</Link></li>
              <li><Link to="/servicos">Acompanhamento</Link></li>
              <li><Link to="/servicos">Orientação Online</Link></li>
              <li><Link to="/servicos">Emergências</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-section footer-contact">
            <h4>Contato</h4>
            <p>
              <span className="contact-icon">📍</span>
              São Paulo, SP
            </p>
            <p>
              <span className="contact-icon">📞</span>
              (11) 99999-9999
            </p>
            <p>
              <span className="contact-icon">✉️</span>
              contato@naturavet.com.br
            </p>
            <p>
              <span className="contact-icon">🕒</span>
              Seg-Sex: 8h às 18h
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 NaturaVet. Todos os direitos reservados.</p>
          <div className="footer-links">
            <Link to="/privacidade">Política de Privacidade</Link>
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/contato">Contato</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;