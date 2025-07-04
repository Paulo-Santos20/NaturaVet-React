import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import '../../../styles/components/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  
  // Usar o contexto de autenticação
  const { user, isAuthenticated, logout } = useAuth();

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

  // Fechar menu ao clicar fora - MELHORADO
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fechar user menu se clicar fora
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      
      // Fechar mobile menu se clicar fora
      if (!event.target.closest('.nav') && !event.target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Adicionar listener apenas se algum menu estiver aberto
    if (isUserMenuOpen || isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside); // Para mobile
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isUserMenuOpen, isMobileMenuOpen]);

  // Fechar menu com ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen, isMobileMenuOpen]);

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
    setIsUserMenuOpen(false); // Fechar user menu se abrir mobile menu
  };

  const handleUserMenuToggle = (event) => {
    event.stopPropagation(); // Prevenir propagação do evento
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMobileMenuOpen(false); // Fechar mobile menu se abrir user menu
  };

  const handleDropdownItemClick = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
      navigate('/');
    }
  };

  const getUserTypeLabel = (userRole) => {
    const labels = {
      admin: 'Administrador',
      consultant: 'Consultor',
      editor: 'Editor',
      client: 'Cliente'
    };
    return labels[userRole] || 'Usuário';
  };

  // Verificar se está na página do dashboard
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isDashboardPage ? 'dashboard-header' : ''}`}>
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/">
            <h2>NaturaVet</h2>
          </Link>
        </div>

        {/* Mostrar navegação apenas se não estiver no dashboard */}
        {!isDashboardPage && (
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            {navigationItems.map((item) => {
              const isActive = isActivePath(item.path);
              
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
          </nav>
        )}

        {/* Área de usuário */}
        <div className="header-user-area">
          {isAuthenticated && user ? (
            <div 
              ref={userMenuRef}
              className={`user-menu ${isUserMenuOpen ? 'open' : ''}`}
            >
              <button 
                className="user-button"
                onClick={handleUserMenuToggle}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                aria-label="Menu do usuário"
              >
                <div className="user-avatar">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.name || 'Usuário'}</span>
                  <span className="user-role">{getUserTypeLabel(user.role)}</span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </button>

              <div className={`user-dropdown ${isUserMenuOpen ? 'open' : ''}`}>
                {!isDashboardPage && (
                  <Link 
                    to="/dashboard" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <span>📊</span>
                    Dashboard
                  </Link>
                )}
                
                {isDashboardPage && (
                  <Link 
                    to="/" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <span>🌐</span>
                    Voltar ao Site
                  </Link>
                )}
                
                <Link 
                  to="/dashboard/profile" 
                  className="dropdown-item"
                  onClick={handleDropdownItemClick}
                >
                  <span>👤</span>
                  Meu Perfil
                </Link>
                
                {user.pets && user.pets.length > 0 && (
                  <Link 
                    to="/dashboard/pets" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <span>🐾</span>
                    Meus Pets
                  </Link>
                )}
                
                <Link 
                  to="/dashboard/settings" 
                  className="dropdown-item"
                  onClick={handleDropdownItemClick}
                >
                  <span>⚙️</span>
                  Configurações
                </Link>
                
                <div className="dropdown-divider"></div>
                
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
        </div>

        {!isDashboardPage && (
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
        )}
      </div>
    </header>
  );
};

export default Header;