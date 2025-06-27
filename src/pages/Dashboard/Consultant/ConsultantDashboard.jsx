import React, { useState } from 'react';

const ConsultantDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('clients');

  const sidebarItems = [
    { id: 'clients', label: 'Clientes', icon: '👥' },
    { id: 'schedule', label: 'Agenda', icon: '📅' },
    { id: 'records', label: 'Prontuários', icon: '📋' },
    { id: 'reports', label: 'Relatórios', icon: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return (
          <div className="consultant-clients">
            <div className="section-header">
              <h2>Meus Clientes</h2>
              <button className="btn-primary">+ Novo Cliente</button>
            </div>
            
            <div className="clients-grid">
              <div className="client-card">
                <div className="client-pet">🐕</div>
                <div className="client-info">
                  <h4>Luna</h4>
                  <p>Golden Retriever</p>
                  <span>Maria Silva</span>
                </div>
                <div className="client-status">
                  <span className="status active">Ativo</span>
                </div>
              </div>

              <div className="client-card">
                <div className="client-pet">🐱</div>
                <div className="client-info">
                  <h4>Mimi</h4>
                  <p>Gato Persa</p>
                  <span>João Santos</span>
                </div>
                <div className="client-status">
                  <span className="status active">Ativo</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="consultant-schedule">
            <div className="section-header">
              <h2>Minha Agenda</h2>
              <button className="btn-primary">+ Nova Consulta</button>
            </div>
            
            <div className="schedule-today">
              <h3>Hoje - 26 de Março</h3>
              <div className="schedule-item">
                <span className="time">09:00</span>
                <div className="appointment-info">
                  <h4>Luna - Consulta de Acompanhamento</h4>
                  <p>Maria Silva</p>
                </div>
              </div>
              <div className="schedule-item">
                <span className="time">10:30</span>
                <div className="appointment-info">
                  <h4>Rex - Primeira Consulta</h4>
                  <p>Carlos Oliveira</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="coming-soon">🚧 Em desenvolvimento...</div>;
    }
  };

  return (
    <>
      <div className="sidebar-menu">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
      {renderContent()}
    </>
  );
};

export default ConsultantDashboard;