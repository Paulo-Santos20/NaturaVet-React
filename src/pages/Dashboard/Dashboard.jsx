import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import DashboardSidebar from '../../components/features/Dashboard/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../components/features/Dashboard/DashboardHeader/DashboardHeader';
import AdminDashboard from './Admin/AdminDashboard';
import EditorDashboard from './Editor/EditorDashboard';
import ConsultantDashboard from './Consultant/ConsultantDashboard';
import ClientDashboard from './Client/ClientDashboard';
import '../../styles/pages/Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
    }
  };

  // Renderizar dashboard específico baseado no role do usuário
  const renderDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'editor':
        return <EditorDashboard />;
      case 'consultant':
        return <ConsultantDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return (
          <div className="dashboard-error">
            <h2>Tipo de usuário não reconhecido</h2>
            <p>Entre em contato com o suporte.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <DashboardSidebar 
        user={user}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={toggleMobileMenu}
      />

      {/* Main Content */}
      <div className={`dashboard-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header */}
        <DashboardHeader 
          user={user}
          onToggleSidebar={toggleSidebar}
          onToggleMobileMenu={toggleMobileMenu}
          onLogout={handleLogout}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Content Area */}
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={renderDashboardContent()} />
            <Route path="/profile" element={<div>Perfil do Usuário</div>} />
            <Route path="/settings" element={<div>Configurações</div>} />
            <Route path="/pets" element={<div>Meus Pets</div>} />
            
            {/* Rotas específicas por role */}
            {user.role === 'admin' && (
              <>
                <Route path="/users" element={<div>Gerenciar Usuários</div>} />
                <Route path="/analytics" element={<div>Analytics</div>} />
                <Route path="/system" element={<div>Configurações do Sistema</div>} />
              </>
            )}
            
            {user.role === 'consultant' && (
              <>
                <Route path="/clients" element={<div>Meus Clientes</div>} />
                <Route path="/schedule" element={<div>Agenda</div>} />
                <Route path="/records" element={<div>Prontuários</div>} />
              </>
            )}
            
            {user.role === 'editor' && (
              <>
                <Route path="/content" element={<div>Gerenciar Conteúdo</div>} />
                <Route path="/blog" element={<div>Blog</div>} />
                <Route path="/comments" element={<div>Comentários</div>} />
              </>
            )}
            
            {user.role === 'client' && (
              <>
                <Route path="/appointments" element={<div>Minhas Consultas</div>} />
                <Route path="/reports" element={<div>Relatórios</div>} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;