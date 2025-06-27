import React, { useState } from 'react';

const ClientDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('pet');

  const petInfo = {
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '3 anos',
    weight: '28 kg',
    photo: '🐕',
    lastConsultation: '15/03/2024'
  };

  const sidebarItems = [
    { id: 'pet', label: 'Meu Pet', icon: '🐕' },
    { id: 'appointments', label: 'Consultas', icon: '📅' },
    { id: 'nutrition', label: 'Plano Nutricional', icon: '🍽️' },
    { id: 'progress', label: 'Progresso', icon: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'pet':
        return (
          <div className="client-pet">
            <div className="pet-profile-card">
              <div className="pet-photo">{petInfo.photo}</div>
              <div className="pet-details">
                <h2>{petInfo.name}</h2>
                <p>{petInfo.breed}</p>
                <div className="pet-stats">
                  <div className="stat">
                    <span>Idade</span>
                    <strong>{petInfo.age}</strong>
                  </div>
                  <div className="stat">
                    <span>Peso</span>
                    <strong>{petInfo.weight}</strong>
                  </div>
                  <div className="stat">
                    <span>Última Consulta</span>
                    <strong>{petInfo.lastConsultation}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="pet-health-summary">
              <h3>Resumo de Saúde</h3>
              <div className="health-indicators">
                <div className="indicator good">
                  <span>🟢</span>
                  <p>Peso ideal</p>
                </div>
                <div className="indicator good">
                  <span>🟢</span>
                  <p>Nutrição adequada</p>
                </div>
                <div className="indicator warning">
                  <span>🟡</span>
                  <p>Próxima consulta em 2 semanas</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="client-appointments">
            <div className="section-header">
              <h2>Minhas Consultas</h2>
              <button className="btn-primary">+ Agendar Nova</button>
            </div>
            
            <div className="appointments-list">
              <div className="appointment-card upcoming">
                <div className="appointment-date">
                  <span className="day">28</span>
                  <span className="month">MAR</span>
                </div>
                <div className="appointment-details">
                  <h4>Consulta de Acompanhamento</h4>
                  <p>Dr. João Santos</p>
                  <span className="time">14:30</span>
                </div>
                <div className="appointment-status">
                  <span className="status confirmed">Confirmada</span>
                </div>
              </div>

              <div className="appointment-card past">
                <div className="appointment-date">
                  <span className="day">15</span>
                  <span className="month">MAR</span>
                </div>
                <div className="appointment-details">
                  <h4>Avaliação Nutricional</h4>
                  <p>Dr. João Santos</p>
                  <span className="time">10:00</span>
                </div>
                <div className="appointment-status">
                  <span className="status completed">Concluída</span>
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

export default ClientDashboard;