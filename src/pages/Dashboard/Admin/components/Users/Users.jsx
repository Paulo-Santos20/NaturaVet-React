import React, { useState } from 'react';
import { userTypes, permissionLabels, defaultPermissions } from '../../data';
import '../../../../../styles/pages/admin/Users.css';

const Users = ({ users, setUsers }) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    status: 'active',
    permissions: {
      dashboard: false,
      appointments: false,
      clients: false,
      pets: false,
      users: false,
      analytics: false,
      settings: false,
      reports: false,
      backup: false,
      content: false,
      moderation: false
    },
    notes: ''
  });

  const handleCreateUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      userType: '',
      status: 'active',
      permissions: {
        dashboard: false,
        appointments: false,
        clients: false,
        pets: false,
        users: false,
        analytics: false,
        settings: false,
        reports: false,
        backup: false,
        content: false,
        moderation: false
      },
      notes: ''
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: '',
      confirmPassword: '',
      userType: user.userType,
      status: user.status,
      permissions: { ...user.permissions },
      notes: user.notes
    });
    setShowUserModal(true);
  };

  const handleViewUser = (user) => {
    setViewingUser(user);
    setShowUserDetailsModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    
    if (userForm.password && userForm.password !== userForm.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    if (editingUser) {
      const updatedUser = {
        ...editingUser,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
        userType: userForm.userType,
        status: userForm.status,
        permissions: { ...userForm.permissions },
        notes: userForm.notes
      };
      
      setUsers(users.map(user => 
        user.id === editingUser.id ? updatedUser : user
      ));
    } else {
      const newUser = {
        id: Math.max(...users.map(user => user.id)) + 1,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
        userType: userForm.userType,
        status: userForm.status,
        permissions: { ...userForm.permissions },
        notes: userForm.notes,
        registrationDate: new Date().toISOString().split('T')[0],
        lastLogin: null
      };
      setUsers([...users, newUser]);
    }
    
    setShowUserModal(false);
  };

  const handleUserFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('permissions.')) {
      const permissionKey = name.split('.')[1];
      setUserForm(prev => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permissionKey]: checked
        }
      }));
    } else {
      setUserForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleUserTypeChange = (e) => {
    const newUserType = e.target.value;
    const userTypePermissions = defaultPermissions[newUserType] || {};
    
    setUserForm(prev => ({
      ...prev,
      userType: newUserType,
      permissions: userTypePermissions
    }));
  };

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Nunca';
    
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    if (diffInHours < 48) return 'Ontem';
    
    return date.toLocaleDateString('pt-BR');
  };

  const getUserTypeLabel = (userType) => {
    return userTypes[userType] || userType;
  };

  const getPermissionLabel = (permission) => {
    return permissionLabels[permission] || permission;
  };

  return (
    <div className="users-management">
      <div className="section-header">
        <h2>Gerenciar Usuários</h2>
        <button className="btn-primary" onClick={handleCreateUser}>
          + Novo Usuário
        </button>
      </div>

      {/* Filtros */}
      <div className="users-filters">
        <div className="filter-group">
          <label>Tipo:</label>
          <select>
            <option value="">Todos</option>
            <option value="admin">Administrador</option>
            <option value="consultant">Consultor</option>
            <option value="editor">Editor</option>
            <option value="client">Cliente</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select>
            <option value="">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Último Login:</label>
          <select>
            <option value="">Todos</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
            <option value="never">Nunca</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Buscar:</label>
          <input type="text" placeholder="Nome, email ou telefone..." />
        </div>
      </div>

      {/* Estatísticas dos Usuários */}
      <div className="users-stats">
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.status === 'active').length}</span>
          <span className="stat-label">Usuários Ativos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.userType === 'admin').length}</span>
          <span className="stat-label">Administradores</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.userType === 'consultant').length}</span>
          <span className="stat-label">Consultores</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.userType === 'editor').length}</span>
          <span className="stat-label">Editores</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.userType === 'client').length}</span>
          <span className="stat-label">Clientes</span>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Contato</th>
              <th>Tipo</th>
              <th>Permissões</th>
              <th>Último Login</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-registration">
                        Cadastrado em {new Date(user.registrationDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <span className="email">{user.email}</span>
                    <span className="phone">{user.phone}</span>
                  </div>
                </td>
                <td>
                  <span className={`user-type-badge ${user.userType}`}>
                    {getUserTypeLabel(user.userType)}
                  </span>
                </td>
                <td>
                  <div className="permissions-summary">
                    <span className="permissions-count">
                      {Object.values(user.permissions).filter(Boolean).length} de {Object.keys(user.permissions).length}
                    </span>
                    <div className="permissions-list">
                      {Object.entries(user.permissions)
                        .filter(([_, hasPermission]) => hasPermission)
                        .slice(0, 3)
                        .map(([permission, _]) => (
                          <span key={permission} className="permission-tag">
                            {getPermissionLabel(permission)}
                          </span>
                        ))}
                      {Object.values(user.permissions).filter(Boolean).length > 3 && (
                        <span className="more-permissions">
                          +{Object.values(user.permissions).filter(Boolean).length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="last-login">
                    {formatLastLogin(user.lastLogin)}
                  </span>
                </td>
                <td>
                  <div className="status-controls">
                    <span className={`status-badge ${user.status}`}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                    <button 
                      className={`toggle-status-btn ${user.status}`}
                      onClick={() => handleToggleUserStatus(user.id)}
                      title={user.status === 'active' ? 'Desativar usuário' : 'Ativar usuário'}
                    >
                      {user.status === 'active' ? '🔒' : '🔓'}
                    </button>
                  </div>
                </td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="action-btn view" 
                      onClick={() => handleViewUser(user)}
                      title="Visualizar"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn edit" 
                      onClick={() => handleEditUser(user)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleDeleteUser(user.id)}
                      title="Excluir"
                      disabled={user.userType === 'admin' && user.id === 1}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Usuário */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h3>
              <button className="modal-close" onClick={() => setShowUserModal(false)}>×</button>
            </div>
            
            <form className="user-form" onSubmit={handleSaveUser}>
              <div className="form-sections">
                {/* Informações Básicas */}
                <div className="form-section">
                  <h4>Informações Básicas</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={userForm.name}
                        onChange={handleUserFormChange}
                        placeholder="Nome completo do usuário"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={userForm.email}
                        onChange={handleUserFormChange}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userForm.phone}
                        onChange={handleUserFormChange}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Tipo de Usuário *</label>
                      <select
                        name="userType"
                        value={userForm.userType}
                        onChange={handleUserTypeChange}
                        required
                      >
                        <option value="">Selecione o tipo</option>
                        {Object.entries(userTypes).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={userForm.status}
                        onChange={handleUserFormChange}
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Senha */}
                <div className="form-section">
                  <h4>{editingUser ? 'Alterar Senha (deixe em branco para manter atual)' : 'Senha'}</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>{editingUser ? 'Nova Senha' : 'Senha *'}</label>
                      <input
                        type="password"
                        name="password"
                        value={userForm.password}
                        onChange={handleUserFormChange}
                        placeholder="Digite a senha"
                        required={!editingUser}
                        minLength="6"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Confirmar Senha {!editingUser && '*'}</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={userForm.confirmPassword}
                        onChange={handleUserFormChange}
                        placeholder="Confirme a senha"
                        required={!editingUser}
                        minLength="6"
                      />
                    </div>
                  </div>
                </div>

                {/* Permissões */}
                <div className="form-section">
                  <h4>Permissões do Sistema</h4>
                  <div className="permissions-grid">
                    {Object.entries(userForm.permissions).map(([permission, hasPermission]) => (
                      <div key={permission} className="permission-item">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name={`permissions.${permission}`}
                            checked={hasPermission}
                            onChange={handleUserFormChange}
                          />
                          <span className="checkmark"></span>
                          {getPermissionLabel(permission)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações */}
                <div className="form-section">
                  <h4>Observações</h4>
                  <div className="form-group full-width">
                    <textarea
                      name="notes"
                      value={userForm.notes}
                      onChange={handleUserFormChange}
                      placeholder="Observações sobre o usuário..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowUserModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingUser ? 'Salvar Alterações' : 'Cadastrar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Usuário */}
      {showUserDetailsModal && viewingUser && (
        <div className="modal-overlay" onClick={() => setShowUserDetailsModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes do Usuário - {viewingUser.name}</h3>
              <button className="modal-close" onClick={() => setShowUserDetailsModal(false)}>×</button>
            </div>
            
            <div className="user-details-content">
              <div className="user-details-grid">
                {/* Informações Pessoais */}
                <div className="details-section">
                  <h4>Informações Pessoais</h4>
                  <div className="details-item">
                    <span className="label">Nome:</span>
                    <span className="value">{viewingUser.name}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Email:</span>
                    <span className="value">{viewingUser.email}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Telefone:</span>
                    <span className="value">{viewingUser.phone}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Tipo:</span>
                    <span className="value">{getUserTypeLabel(viewingUser.userType)}</span>
                  </div>
                </div>

                {/* Status e Atividade */}
                <div className="details-section">
                  <h4>Status e Atividade</h4>
                  <div className="details-item">
                    <span className="label">Status:</span>
                    <span className={`value status-${viewingUser.status}`}>
                      {viewingUser.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="details-item">
                    <span className="label">Último Login:</span>                    <span className="value">{formatLastLogin(viewingUser.lastLogin)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Data de Cadastro:</span>
                    <span className="value">{new Date(viewingUser.registrationDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                {/* Permissões */}
                <div className="details-section full-width">
                  <h4>Permissões do Sistema</h4>
                  <div className="permissions-display">
                    {Object.entries(viewingUser.permissions).map(([permission, hasPermission]) => (
                      <div key={permission} className="permission-display-item">
                        <span className={`permission-status ${hasPermission ? 'granted' : 'denied'}`}>
                          {hasPermission ? '✅' : '❌'}
                        </span>
                        <span className="permission-name">{getPermissionLabel(permission)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações */}
                <div className="details-section full-width">
                  <h4>Observações</h4>
                  <p className="notes-text">{viewingUser.notes || 'Nenhuma observação registrada.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;