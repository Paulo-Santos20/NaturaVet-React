import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/components/Header.css';

const Header = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  // Detectar scroll para efeito no header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menus ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
      if (!event.target.closest('.nav') && !event.target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigationItems = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/depoimentos', label: 'Depoimentos' },
    { path: '/blog', label: 'Blog' },
    { path: '/contato', label: 'Contato' }
  ];

  // Função para verificar se a rota está ativa
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    onLogout();
  };

  const getUserTypeLabel = (userType) => {
    const labels = {
      admin: 'Administrador',
      consultant: 'Consultor',
      editor: 'Editor',
      client: 'Cliente'
    };
    return labels[userType] || 'Usuário';
  };

  // Debug: mostrar a rota atual
  console.log('Rota atual:', location.pathname);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/">
            <h2>NaturaVet</h2>
          </Link>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          {navigationItems.map((item) => {
            const isActive = isActivePath(item.path);
            console.log(`${item.label} (${item.path}):`, isActive); // Debug
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Área de usuário */}
          {user ? (
            <div className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}>
              <button 
                className="user-button"
                onClick={handleUserMenuToggle}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <div className="user-avatar">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name || 'Usuário'}</span>
                  <span className="user-role">{getUserTypeLabel(user.userType)}</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </button>

              <div className={`user-dropdown ${isUserMenuOpen ? 'open' : ''}`}>
                <Link to="/dashboard" className="dropdown-item">
                  <span>📊</span>
                  Dashboard
                </Link>
                <Link to="/dashboard/profile" className="dropdown-item">
                  <span>👤</span>
                  Meu Perfil
                </Link>
                <Link to="/dashboard/settings" className="dropdown-item">
                  <span>⚙️</span>
                  Configurações
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <span>🚪</span>
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-header">
              <span className="login-icon">🔐</span>
              <span>Entrar</span>
            </Link>
          )}
        </nav>

        <button 
          className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={handleMobileMenuToggle}
          aria-expanded={isMobileMenuOpen}
          aria-label="Menu de navegação"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;