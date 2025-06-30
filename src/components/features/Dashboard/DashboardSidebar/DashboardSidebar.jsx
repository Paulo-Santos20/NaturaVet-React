import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './DashboardSidebar.css';

const DashboardSidebar = ({ user, collapsed, mobileOpen, onToggleMobile }) => {
  const location = useLocation();

  const getMenuItems = () => {
    const commonItems = [
      {
        path: '/dashboard',
        icon: '📊',
        label: 'Dashboard',
        exact: true
      },
      {
        path: '/dashboard/profile',
        icon: '👤',
        label: 'Meu Perfil'
      },
      {
        path: '/dashboard/settings',
        icon: '⚙️',
        label: 'Configurações'
      }
    ];

    const roleSpecificItems = {
      admin: [
        {
          path: '/dashboard/users',
          icon: '👥',
          label: 'Usuários'
        },
        {
          path: '/dashboard/analytics',
          icon: '📈',
          label: 'Analytics'
        },
        {
          path: '/dashboard/system',
          icon: '🔧',
          label: 'Sistema'
        }
      ],
      consultant: [
        {
          path: '/dashboard/clients',
          icon: '👥',
          label: 'Clientes'
        },
        {
          path: '/dashboard/schedule',
          icon: '📅',
          label: 'Agenda'
        },
        {
          path: '/dashboard/records',
          icon: '📋',
          label: 'Prontuários'
        }
      ],
      editor: [
        {
          path: '/dashboard/content',
          icon: '📝',
          label: 'Conteúdo'
        },
        {
          path: '/dashboard/blog',
          icon: '📚',
          label: 'Blog'
        },
        {
          path: '/dashboard/comments',
          icon: '💬',
          label: 'Comentários'
        }
      ],
      client: [
        {
          path: '/dashboard/pets',
          icon: '🐾',
          label: 'Meus Pets'
        },
        {
          path: '/dashboard/appointments',
          icon: '📅',
          label: 'Consultas'
        },
        {
          path: '/dashboard/reports',
          icon: '📊',
          label: 'Relatórios'
        }
      ]
    };

    return [
      ...commonItems.slice(0, 1), // Dashboard
      ...(roleSpecificItems[user.role] || []),
      ...commonItems.slice(1) // Profile e Settings
    ];
  };

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
        description: 'Acesso total',
        color: '#e74c3c'
      },
      consultant: {
        title: 'Consultor',
        description: 'Atendimento',
        color: '#3498db'
      },
      editor: {
        title: 'Editor',
        description: 'Conteúdo',
        color: '#9b59b6'
      },
      client: {
        title: 'Cliente',
        description: 'Pet care',
        color: '#2ecc71'
      }
    };
    return roleData[user.role] || roleData.client;
  };

  const roleInfo = getRoleInfo();

  return (
    <>
      <aside className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo/Brand */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <span className="brand-icon">🌿</span>
            {!collapsed && <span className="brand-text">NaturaVet</span>}
          </Link>
        </div>

        {/* User Info */}
        <div className="sidebar-user">
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
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {getMenuItems().map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActivePath(item.path, item.exact) ? 'active' : ''}`}
                  onClick={() => onToggleMobile && onToggleMobile()}
                  title={collapsed ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && <span className="nav-label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Site */}
        <div className="sidebar-footer">
          <Link
            to="/"
            className="back-to-site"
            title={collapsed ? 'Voltar ao Site' : ''}
          >
            <span className="nav-icon">🌐</span>
            {!collapsed && <span className="nav-label">Voltar ao Site</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;