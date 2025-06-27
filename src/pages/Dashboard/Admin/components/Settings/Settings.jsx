import React from 'react';
import '../../../../../styles/pages/admin/Settings.css';

const Settings = ({ users, clients, pets, appointments }) => {
  return (
    <div className="settings-management">
      <div className="section-header">
        <h2>Configurações</h2>
      </div>
      <div className="coming-soon">
        ⚙️ Seção de Configurações em desenvolvimento...
      </div>
    </div>
  );
};

export default Settings;