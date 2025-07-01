import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/AuthContext';
import DashboardSidebar from '../../../../components/features/Dashboard/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../../../components/features/Dashboard/DashboardHeader/DashboardHeader';

// Importar componentes das abas
import AdminDashboard from '../../../../pages/Dashboard/Admin/AdminDashboard';
import UserManagement from '../../../../pages/Dashboard/Admin/UserManagement/UserManagement';
import PetManagement from '../../../../pages/Dashboard/Admin/PetManagement/PetManagement';
import ClientManagement from '../../../../pages/Dashboard/Admin/ClientManagement/ClientManagement';
import AppointmentManagement from '../../../../pages/Dashboard/Admin/AppointmentManagement/AppointmentManagement';
import Analytics from '../../../../pages/Dashboard/Admin/Analytics/Analytics';
import Settings from '../../../../pages/Dashboard/Admin/Settings/Settings';

import EditorDashboard from '../../../../pages/Dashboard/Editor/EditorDashboard';
import ContentManagement from '../../../../pages/Dashboard/Editor/ContentManagement/ContentManagement';

import ConsultantDashboard from '../../../../pages/Dashboard/Consultant/ConsultantDashboard';
import Schedule from '../../../../pages/Dashboard/Consultant/Schedule/Schedule';
import Records from '../../../../pages/Dashboard/Consultant/Records/Records';

import ClientDashboard from '../../../../pages/Dashboard/Client/ClientDashboard';
import PetProfile from '../../../../pages/Dashboard/Client/PetProfile/PetProfile';
import Appointments from '../../../../pages/Dashboard/Client/Appointments/Appointments';
import Reports from '../../../../pages/Dashboard/Client/Reports/Reports';

import Profile from '../../../../pages/Dashboard/Profile/Profile';

import '../../../../styles/pages/Dashboard.css';

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
    logout();
  };

  // Renderizar dashboard específico baseado no role do usuário
  const renderDashboardHome = () => {
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
        onToggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className={`dashboard-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header */}
        <DashboardHeader 
          user={user}
          onToggleMobileMenu={toggleMobileMenu}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <div className="dashboard-content">
          <Routes>
            {/* Dashboard Home */}
            <Route path="/" element={renderDashboardHome()} />
            
            {/* Perfil - Comum para todos */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Rotas específicas para ADMIN */}
            {user.role === 'admin' && (
              <>
                <Route path="/users" element={<UserManagement />} />
                <Route path="/pets" element={<PetManagement />} />
                <Route path="/clients" element={<ClientManagement />} />
                <Route path="/appointments" element={<AppointmentManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </>
            )}
            
            {/* Rotas específicas para CONSULTANT */}
            {user.role === 'consultant' && (
              <>
                <Route path="/clients" element={<ClientManagement />} />
                <Route path="/appointments" element={<Schedule />} />
                <Route path="/pets" element={<PetManagement />} />
                <Route path="/records" element={<Records />} />
              </>
            )}
            
            {/* Rotas específicas para EDITOR */}
            {user.role === 'editor' && (
              <>
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/blog" element={<div>Gerenciar Blog</div>} />
                <Route path="/comments" element={<div>Moderar Comentários</div>} />
              </>
            )}
            
            {/* Rotas específicas para CLIENT */}
            {user.role === 'client' && (
              <>
                <Route path="/pets" element={<PetProfile />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/reports" element={<Reports />} />
              </>
            )}
            
            {/* Redirect para dashboard se rota não encontrada */}
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