import React, { useState, useEffect } from 'react';
import AdminDashboard from './Admin/AdminDashboard';
import EditorDashboard from './Editor/EditorDashboard';
import ConsultantDashboard from './Consultant/ConsultantDashboard';
import ClientDashboard from './Client/ClientDashboard';
import '../../styles/pages/Dashboard.css';

const Dashboard = ({ userType = 'admin' }) => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    // Verificar se há usuário logado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.isLoggedIn && userData.type === userType) {
          setUser(userData);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [userType]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.header-user-dropdown')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = 'login';
    window.location.reload();
  };

  // Função para obter os itens do menu baseado no tipo de usuário
  const getSidebarItems = () => {
    switch (userType) {
      case 'admin':
      // Na função getSidebarItems(), atualize o case 'admin':
      // Na função getSidebarItems(), atualize o case 'admin':
      case 'admin':
        return [
          { id: 'overview', label: 'Dashboard', icon: '📊' },
          { id: 'appointments', label: 'Agendamentos', icon: '📅' },
          { id: 'clients', label: 'Clientes', icon: '👥' },
          { id: 'pets', label: 'Pets', icon: '🐕' }, // Novo menu
          { id: 'users', label: 'Usuários', icon: '👤' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'settings', label: 'Configurações', icon: '⚙️' }
        ];
      case 'editor':
        return [
          { id: 'content', label: 'Conteúdo', icon: '📝' },
          { id: 'blog', label: 'Blog', icon: '📰' },
          { id: 'media', label: 'Mídia', icon: '🖼️' },
          { id: 'analytics', label: 'Analytics', icon: '📊' }
        ];
      case 'consultant':
        return [
          { id: 'clients', label: 'Clientes', icon: '👥' },
          { id: 'schedule', label: 'Agenda', icon: '📅' },
          { id: 'records', label: 'Prontuários', icon: '📋' },
          { id: 'reports', label: 'Relatórios', icon: '📊' }
        ];
      case 'client':
        return [
          { id: 'pet', label: 'Meu Pet', icon: '🐕' },
          { id: 'appointments', label: 'Consultas', icon: '📅' },
          { id: 'nutrition', label: 'Plano Nutricional', icon: '🍽️' },
          { id: 'progress', label: 'Progresso', icon: '📊' }
        ];
      default:
        return [];
    }
  };

  const renderDashboardContent = () => {
    const dashboardProps = { user, activeTab, setActiveTab };

    switch (userType) {
      case 'admin':
        return <AdminDashboard {...dashboardProps} />;
      case 'editor':
        return <EditorDashboard {...dashboardProps} />;
      case 'consultant':
        return <ConsultantDashboard {...dashboardProps} />;
      case 'client':
        return <ClientDashboard {...dashboardProps} />;
      default:
        return <AdminDashboard {...dashboardProps} />;
    }
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  const sidebarItems = getSidebarItems();

  return (
    <div className="dashboard-layout">
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🐾</span>
            {sidebarOpen && <h2>NaturaVet</h2>}
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-menu">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                title={!sidebarOpen ? item.label : ''}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {sidebarOpen && <span className="sidebar-label">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>Dashboard {user.name}</h1>
          </div>

          <div className="header-right">
            <div className="header-notifications">
              <button className="notification-btn" title="Notificações">
                🔔
                <span className="notification-badge">3</span>
              </button>
            </div>

            <div className="header-user-dropdown">
              <button
                className="header-user"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                title="Menu do usuário"
              >
                <span className="user-avatar-small">{user.icon}</span>
                <span className="user-name">{user.name}</span>
                <span className="dropdown-arrow">{userMenuOpen ? '▲' : '▼'}</span>
              </button>

              {userMenuOpen && (
                <div className="user-dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <div className="dropdown-avatar">{user.icon}</div>
                      <div className="dropdown-details">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <span className="user-role">{user.description}</span>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-items">
                    <button className="dropdown-item" onClick={() => setActiveTab('profile')}>
                      <span className="dropdown-icon">👤</span>
                      <span>Meu Perfil</span>
                    </button>

                    <button className="dropdown-item" onClick={() => setActiveTab('settings')}>
                      <span className="dropdown-icon">⚙️</span>
                      <span>Configurações</span>
                    </button>

                    <button className="dropdown-item" onClick={() => setActiveTab('help')}>
                      <span className="dropdown-icon">❓</span>
                      <span>Ajuda</span>
                    </button>
                  </div>

                  <div className="dropdown-divider"></div>

                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    <span>Sair</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;