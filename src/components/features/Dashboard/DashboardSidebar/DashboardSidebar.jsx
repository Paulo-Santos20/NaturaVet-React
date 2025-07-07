import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import './DashboardSidebar.css';

const DashboardSidebar = ({ user, collapsed, mobileOpen, onToggleMobile, onToggleSidebar }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      {
        path: '/dashboard',
        icon: '📊',
        label: 'Dashboard',
        description: 'Visão geral do sistema',
        exact: true
      }
    ];

    const roleSpecificItems = {
      admin: [
        {
          path: '/dashboard/appointments',
          icon: '📅',
          label: 'Agendamentos',
          description: 'Gerenciar consultas'
        },
        {
          path: '/dashboard/clients',
          icon: '👥',
          label: 'Clientes',
          description: 'Gerenciar clientes'
        },
        {
          path: '/dashboard/pets',
          icon: '🐾',
          label: 'Pets',
          description: 'Gerenciar pets'
        },
        {
          path: '/dashboard/users',
          icon: '👤',
          label: 'Usuários',
          description: 'Gerenciar usuários'
        },
        {
          path: '/dashboard/analytics',
          icon: '📈',
          label: 'Relatórios',
          description: 'Análises e métricas'
        },
        {
          path: '/dashboard/settings',
          icon: '⚙️',
          label: 'Configurações',
          description: 'Configurações do sistema'
        }
      ],
      consultor: [
        {
          path: '/dashboard/schedule',
          icon: '📅',
          label: 'Agenda',
          description: 'Minha agenda'
        },
        {
          path: '/dashboard/my-clients',
          icon: '👥',
          label: 'Meus Clientes',
          description: 'Clientes atribuídos'
        },
        {
          path: '/dashboard/pets',
          icon: '🐾',
          label: 'Pets',
          description: 'Pets dos clientes'
        },
        {
          path: '/dashboard/consultations',
          icon: '🩺',
          label: 'Consultas',
          description: 'Histórico de consultas'
        },
        {
          path: '/dashboard/nutrition-plans',
          icon: '🍽️',
          label: 'Planos Nutricionais',
          description: 'Planos criados'
        }
      ],
      editor: [
        {
          path: '/dashboard/content',
          icon: '📝',
          label: 'Conteúdo',
          description: 'Gerenciar artigos'
        },
        {
          path: '/dashboard/blog',
          icon: '📰',
          label: 'Blog',
          description: 'Posts do blog'
        },
        {
          path: '/dashboard/media',
          icon: '🖼️',
          label: 'Mídia',
          description: 'Arquivos de mídia'
        },
        {
          path: '/dashboard/comments',
          icon: '💬',
          label: 'Comentários',
          description: 'Moderar comentários'
        }
      ],
      cliente: [
        {
          path: '/dashboard/my-pets',
          icon: '🐾',
          label: 'Meus Pets',
          description: 'Perfis dos pets'
        },
        {
          path: '/dashboard/my-appointments',
          icon: '📅',
          label: 'Agendamentos',
          description: 'Minhas consultas'
        },
        {
          path: '/dashboard/nutrition',
          icon: '🍽️',
          label: 'Nutrição',
          description: 'Planos nutricionais'
        },
        {
          path: '/dashboard/profile',
          icon: '👤',
          label: 'Perfil',
          description: 'Meu perfil'
        }
      ]
    };

    return [
      ...commonItems,
      ...(roleSpecificItems[user.role] || [])
    ];
  };

  const userMenuItems = [
    { 
      label: 'Meu Perfil', 
      icon: '👤', 
      action: () => console.log('Ir para perfil') 
    },
    { 
      label: 'Configurações', 
      icon: '⚙️', 
      action: () => console.log('Ir para configurações') 
    },
    { 
      label: 'Sair', 
      icon: '🚪', 
      action: logout,
      danger: true 
    }
  ];

  const isActivePath = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const getRoleInfo = () => {
    const roleData = {
      admin: {
        title: 'Administrador',
        color: '#FC5A8D'
      },
      consultor: {
        title: 'Consultor',
        color: '#17a2b8'
      },
      editor: {
        title: 'Editor',
        color: '#6f42c1'
      },
      cliente: {
        title: 'Cliente',
        color: '#28a745'
      }
    };
    return roleData[user.role] || roleData.cliente;
  };

  const roleInfo = getRoleInfo();

  return (
    <>
      {/* Overlay para mobile */}
      {mobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onToggleMobile}
        />
      )}

      <aside className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Header do Sidebar */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <span className="brand-icon">🌿</span>
            {!collapsed && (
              <div className="brand-text">
                <span className="brand-title">NaturaVet</span>
                <span className="brand-subtitle">Dashboard</span>
              </div>
            )}
          </Link>
          
          {/* Botão de recolher - Desktop */}
          <button
            className="sidebar-toggle-btn desktop-only"
            onClick={onToggleSidebar}
            title={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <span className="toggle-icon">
              {collapsed ? '→' : '←'}
            </span>
          </button>

          {/* Botão de fechar - Mobile */}
          <button
            className="sidebar-close-btn mobile-only"
            onClick={onToggleMobile}
            title="Fechar menu"
          >
            <span className="close-icon">✕</span>
          </button>
        </div>

        {/* Informações do Usuário */}
        <div className="sidebar-user">
          <div 
            className="user-info"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="user-details">
                <h4 className="user-name">{user.name}</h4>
                <span 
                  className="user-role"
                  style={{ color: roleInfo.color }}
                >
                  {roleInfo.title}
                </span>
                <span className="user-description">
                  {roleInfo.description}
                </span>
              </div>
            )}
            {!collapsed && (
              <div className={`user-menu-arrow ${showUserMenu ? 'open' : ''}`}>
                ▼
              </div>
            )}
          </div>

          {/* Menu dropdown do usuário */}
          {showUserMenu && !collapsed && (
            <div className="user-dropdown">
              {userMenuItems.map((item, index) => (
                <button
                  key={`user-menu-${index}`}
                  className={`user-menu-item ${item.danger ? 'danger' : ''}`}
                  onClick={() => {
                    item.action();
                    setShowUserMenu(false);
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navegação Principal */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {getMenuItems().map((item, index) => (
              <li key={`nav-item-${item.path}-${index}`} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActivePath(item.path, item.exact) ? 'active' : ''}`}
                  onClick={() => onToggleMobile && onToggleMobile()}
                  title={collapsed ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && (
                    <div className="nav-content">
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  )}
                  {isActivePath(item.path, item.exact) && (
                    <div className="active-indicator"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer do Sidebar */}
        <div className="sidebar-footer">
          <Link
            to="/"
            className="back-to-site"
            title={collapsed ? 'Voltar ao Site' : ''}
          >
            <span className="nav-icon">🌐</span>
            {!collapsed && <span className="nav-label">Voltar ao Site</span>}
          </Link>
          
          {!collapsed && (
            <div className="footer-info">
              <div className="footer-version">v2.1.0</div>
              <div className="footer-support">
                <a href="mailto:suporte@naturavet.com" className="support-link">
                  💬 Suporte
                </a>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;