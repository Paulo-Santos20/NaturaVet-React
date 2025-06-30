import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

const DashboardHeader = ({ 
  user, 
  onToggleSidebar, 
  onToggleMobileMenu, 
  onLogout, 
  sidebarCollapsed 
}) => {
  const navigate = useNavigate();

  const handleBackToSite = () => {
    navigate('/');
  };

  const getRoleDisplayName = (role) => {
    const roles = {
      admin: 'Administrador',
      consultant: 'Consultor',
      editor: 'Editor',
      client: 'Cliente'
    };
    return roles[role] || 'Usuário';
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Desktop Sidebar Toggle */}
        <button
          className="sidebar-toggle desktop-only"
          onClick={onToggleSidebar}
          title={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <span className="toggle-icon">
            {sidebarCollapsed ? '→' : '←'}
          </span>
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle mobile-only"
          onClick={onToggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="header-title">
          <h1>Dashboard - {getRoleDisplayName(user.role)}</h1>
          <p className="header-subtitle">Bem-vindo, {user.name}</p>
        </div>
      </div>

      <div className="header-right">
        <button
          className="btn btn-secondary"
          onClick={handleBackToSite}
          title="Voltar ao site"
        >
          <span className="btn-icon">🌐</span>
          <span className="btn-text">Site</span>
        </button>

        <button
          className="btn btn-outline"
          onClick={onLogout}
          title="Fazer logout"
        >
          <span className="btn-icon">🚪</span>
          <span className="btn-text">Sair</span>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;