import React from 'react';
import './ClientManagement.css';

const ClientManagement = () => {
  return (
    <div className="client-management">
      <div className="page-header">
        <h1>👤 Gerenciamento de Clientes</h1>
        <p>Visualize e gerencie todos os clientes cadastrados</p>
      </div>

      <div className="content-placeholder">
        <div className="placeholder-icon">👥</div>
        <h3>Gerenciamento de Clientes</h3>
        <p>Esta funcionalidade será implementada em breve.</p>
        <p>Aqui você poderá:</p>
        <ul>
          <li>Visualizar todos os clientes</li>
          <li>Editar informações dos clientes</li>
          <li>Ver histórico de consultas</li>
          <li>Gerenciar pets associados</li>
          <li>Enviar comunicações</li>
        </ul>
      </div>
    </div>
  );
};

export default ClientManagement;