import React from 'react';
import './PetManagement.css';

const PetManagement = () => {
  return (
    <div className="pet-management">
      <div className="page-header">
        <h1>🐾 Gerenciamento de Pets</h1>
        <p>Visualize e gerencie todos os pets cadastrados no sistema</p>
      </div>

      <div className="content-placeholder">
        <div className="placeholder-icon">🐕</div>
        <h3>Gerenciamento de Pets</h3>
        <p>Esta funcionalidade será implementada em breve.</p>
        <p>Aqui você poderá:</p>
        <ul>
          <li>Visualizar todos os pets cadastrados</li>
          <li>Editar informações dos pets</li>
          <li>Acompanhar histórico médico</li>
          <li>Gerenciar planos nutricionais</li>
        </ul>
      </div>
    </div>
  );
};

export default PetManagement;