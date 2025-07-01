import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'Dr. João Santos',
      email: 'joao@naturavet.com',
      role: 'admin',
      status: 'ativo',
      lastLogin: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Ana Costa',
      email: 'ana@naturavet.com',
      role: 'editor',
      status: 'ativo',
      lastLogin: '2024-01-14T15:20:00Z'
    },
    {
      id: 3,
      name: 'Dra. Maria Silva',
      email: 'maria@naturavet.com',
      role: 'consultant',
      status: 'ativo',
      lastLogin: '2024-01-13T09:15:00Z'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      role: 'client',
      status: 'ativo',
      lastLogin: '2024-01-12T14:45:00Z'
    }
  ]);

  const getRoleIcon = (role) => {
    const icons = {
      admin: '👨‍💼',
      consultant: '👩‍⚕️',
      editor: '✍️',
      client: '🐕'
    };
    return icons[role] || '👤';
  };

  const getRoleLabel = (role) => {
    const labels = {
      admin: 'Administrador',
      consultant: 'Consultor',
      editor: 'Editor',
      client: 'Cliente'
    };
    return labels[role] || 'Usuário';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1>👥 Gerenciamento de Usuários</h1>
          <p>Gerencie todos os usuários do sistema</p>
        </div>
        <button className="btn btn-primary">
          <span>➕</span>
          Novo Usuário
        </button>
      </div>

      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-info">
            <h3>1</h3>
            <p>Administradores</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👩‍⚕️</div>
          <div className="stat-info">
            <h3>1</h3>
            <p>Consultores</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✍️</div>
          <div className="stat-info">
            <h3>1</h3>
            <p>Editores</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🐕</div>
          <div className="stat-info">
            <h3>1</h3>
            <p>Clientes</p>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <div className="table-header">
          <h3>Lista de Usuários</h3>
          <div className="table-actions">
            <input 
              type="search" 
              placeholder="Buscar usuários..."
              className="search-input"
            />
            <select className="filter-select">
              <option value="all">Todos os tipos</option>
              <option value="admin">Administradores</option>
              <option value="consultant">Consultores</option>
              <option value="editor">Editores</option>
              <option value="client">Clientes</option>
            </select>
          </div>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Último Acesso</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-details">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="user-role">
                      <span className="role-icon">{getRoleIcon(user.role)}</span>
                      {getRoleLabel(user.role)}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status === 'ativo' ? '✅' : '❌'} {user.status}
                    </span>
                  </td>
                  <td>{formatDate(user.lastLogin)}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Editar">✏️</button>
                      <button className="btn-icon" title="Desativar">🔒</button>
                      <button className="btn-icon danger" title="Excluir">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;