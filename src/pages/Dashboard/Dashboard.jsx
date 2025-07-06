import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import DashboardSidebar from '../../components/features/Dashboard/DashboardSidebar/DashboardSidebar';

// Importar componentes das abas
import AdminDashboard from './Admin/AdminDashboard';
import UserManagement from './Admin/UserManagement/UserManagement';
import PetManagement from './Admin/PetManagement/PetManagement';
import ClientManagement from './Admin/ClientManagement/ClientManagement';
import AppointmentManagement from './Admin/AppointmentManagement/AppointmentManagement';
import Settings from './Admin/Settings/Settings'; // ✅ IMPORTAR CONFIGURAÇÕES
import Profile from './Profile/Profile';

// Componentes temporários para outras abas
const Analytics = () => <div style={{ padding: '2rem' }}><h1>📊 Analytics</h1><p>Em desenvolvimento...</p></div>;

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f8f9fa'
      }}>
        <div style={{ 
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          Carregando dashboard...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderDashboardHome = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#f8f9fa' 
    }}>
      {/* Sidebar */}
      <DashboardSidebar 
        user={user}
        collapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        marginLeft: sidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
        <Routes>
          <Route path="/" element={renderDashboardHome()} />
          <Route path="/profile" element={<Profile />} />
          
          {user.role === 'admin' && (
            <>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/pets" element={<PetManagement />} />
              <Route path="/clients" element={<ClientManagement />} />
              <Route path="/appointments" element={<AppointmentManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} /> {/* ✅ ROTA CONFIGURAÇÕES */}
            </>
          )}
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;