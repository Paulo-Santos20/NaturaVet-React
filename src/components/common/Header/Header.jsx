// src/components/common/Header/Header.jsx
import React, { useState } from 'react';
import '../../../styles/components/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (hash) => {
    window.location.hash = hash;
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo" onClick={() => handleNavClick('')}>
            <h2>🐾 NaturaVet</h2>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#" onClick={() => handleNavClick('')}>Início</a>
            <a href="#sobre" onClick={() => handleNavClick('sobre')}>Sobre</a>
            <a href="#servicos" onClick={() => handleNavClick('servicos')}>Serviços</a>
            <a href="#depoimentos" onClick={() => handleNavClick('depoimentos')}>Depoimentos</a>
            <a href="#contato" onClick={() => handleNavClick('contato')}>Contato</a>
            <a href="#login" className="btn btn-header" onClick={() => handleNavClick('login')}>Login</a>
          </nav>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;