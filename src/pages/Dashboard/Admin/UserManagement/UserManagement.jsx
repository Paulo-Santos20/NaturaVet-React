import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view', 'password'
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dados iniciais simulados
  useEffect(() => {
    const initialUsers = [
      { 
        id: 1, 
        name: 'Maria Silva', 
        email: 'maria@email.com', 
        password: '123456', // Em produção, isso seria hash
        role: 'admin', 
        status: 'ativo',
        phone: '(11) 99999-9999',
        location: 'São Paulo, SP',
        createdAt: '2024-01-15',
        lastLogin: '2024-12-03'
      },
      { 
        id: 2, 
        name: 'João Santos', 
        email: 'joao@email.com', 
        password: '123456',
        role: 'consultant', 
        status: 'ativo',
        phone: '(11) 88888-8888',
        location: 'Rio de Janeiro, RJ',
        createdAt: '2024-02-20',
        lastLogin: '2024-12-02'
      },
      { 
        id: 3, 
        name: 'Ana Costa', 
        email: 'ana@email.com', 
        password: '123456',
        role: 'client', 
        status: 'inativo',
        phone: '(11) 77777-7777',
        location: 'Belo Horizonte, MG',
        createdAt: '2024-03-10',
        lastLogin: '2024-11-28'
      },
      { 
        id: 4, 
        name: 'Pedro Lima', 
        email: 'pedro@email.com', 
        password: '123456',
        role: 'editor', 
        status: 'ativo',
        phone: '(11) 66666-6666',
        location: 'Salvador, BA',
        createdAt: '2024-04-05',
        lastLogin: '2024-12-01'
      },
    ];
    setUsers(initialUsers);
    setFilteredUsers(initialUsers);
  }, []);

  // Filtrar usuários
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  // Funções CRUD
  const handleCreate = () => {
    setModalMode('create');
    setSelectedUser({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'client',
      status: 'ativo',
      phone: '',
      location: ''
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalMode('edit');
    setSelectedUser({ ...user, confirmPassword: '' });
    setShowModal(true);
  };

  const handleView = (user) => {
    setModalMode('view');
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleChangePassword = (user) => {
    setModalMode('password');
    setSelectedUser({ 
      ...user, 
      newPassword: '', 
      confirmPassword: '' 
    });
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSelectedUser({ ...selectedUser, password, confirmPassword: password });
  };

  const handleSave = () => {
    if (!selectedUser.name || !selectedUser.email) {
      alert('Nome e email são obrigatórios!');
      return;
    }

    if (modalMode === 'create') {
      if (!selectedUser.password) {
        alert('Senha é obrigatória para novos usuários!');
        return;
      }
      if (selectedUser.password !== selectedUser.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      if (selectedUser.password.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
      }

      const newUser = {
        ...selectedUser,
        id: Math.max(...users.map(u => u.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Nunca'
      };
      delete newUser.confirmPassword;
      setUsers([...users, newUser]);
      
    } else if (modalMode === 'edit') {
      const updatedUser = { ...selectedUser };
      delete updatedUser.confirmPassword;
      setUsers(users.map(user => 
        user.id === selectedUser.id ? updatedUser : user
      ));
      
    } else if (modalMode === 'password') {
      if (!selectedUser.newPassword) {
        alert('Nova senha é obrigatória!');
        return;
      }
      if (selectedUser.newPassword !== selectedUser.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }
      if (selectedUser.newPassword.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
      }

      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, password: selectedUser.newPassword }
          : user
      ));
    }

    setShowModal(false);
    setSelectedUser(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' }
        : user
    ));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#dc3545';
      case 'consultant': return '#28a745';
      case 'editor': return '#ffc107';
      case 'client': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'consultant': return 'Consultor';
      case 'editor': return 'Editor';
      case 'client': return 'Cliente';
      default: return role;
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>👥 Gerenciamento de Usuários</h1>
        <p style={{ color: '#666' }}>Gerencie todos os usuários do sistema</p>
      </div>

      {/* Filtros e Busca */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        alignItems: 'end'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            🔍 Buscar
          </label>
          <input
            type="text"
            placeholder="Nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            👤 Tipo
          </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todos os tipos</option>
            <option value="admin">Administrador</option>
            <option value="consultant">Consultor</option>
            <option value="editor">Editor</option>
            <option value="client">Cliente</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            📊 Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <div>
          <button
            onClick={handleCreate}
            style={{
              background: '#FC5A8D',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#e54a7a'}
            onMouseLeave={(e) => e.target.style.background = '#FC5A8D'}
          >
            ➕ Novo Usuário
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📊 Total</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {filteredUsers.length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>✅ Ativos</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
            {filteredUsers.filter(u => u.status === 'ativo').length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>❌ Inativos</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc3545', margin: 0 }}>
            {filteredUsers.filter(u => u.status === 'inativo').length}
          </p>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>
                  Nome
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>
                  Email
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>
                  Tipo
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>
                  Status
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>
                  Último Login
                </th>
                <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6', fontWeight: '600' }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                    <div>
                      <strong style={{ color: '#333' }}>{user.name}</strong>
                      <br />
                      <small style={{ color: '#666' }}>{user.phone}</small>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ 
                      background: getRoleColor(user.role),
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                    <button
                      onClick={() => toggleStatus(user.id)}
                      style={{ 
                        background: user.status === 'ativo' ? '#28a745' : '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {user.status === 'ativo' ? '✅ Ativo' : '❌ Inativo'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', fontSize: '0.9rem', color: '#666' }}>
                    {user.lastLogin}
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleView(user)}
                        style={{ 
                          background: 'none', 
                          border: '1px solid #17a2b8', 
                          color: '#17a2b8', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px', 
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                        title="Visualizar"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        style={{ 
                          background: 'none', 
                          border: '1px solid #FC5A8D', 
                          color: '#FC5A8D', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px', 
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleChangePassword(user)}
                        style={{ 
                          background: 'none', 
                          border: '1px solid #ffc107', 
                          color: '#ffc107', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px', 
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                        title="Alterar Senha"
                      >
                        🔑
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{ 
                          background: 'none', 
                          border: '1px solid #dc3545', 
                          color: '#dc3545', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '4px', 
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                        title="Excluir"
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

        {filteredUsers.length === 0 && (
          <div style={{ 
            padding: '3rem', 
            textAlign: 'center', 
            color: '#666' 
          }}>
            <p style={{ fontSize: '1.1rem' }}>📭 Nenhum usuário encontrado</p>
            <p>Tente ajustar os filtros ou criar um novo usuário</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>
              {modalMode === 'create' && '➕ Novo Usuário'}
              {modalMode === 'edit' && '✏️ Editar Usuário'}
              {modalMode === 'view' && '👁️ Visualizar Usuário'}
              {modalMode === 'password' && '🔑 Alterar Senha'}
            </h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {modalMode !== 'password' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Nome *
                    </label>
                    <input
                      type="text"
                      value={selectedUser?.name || ''}
                      onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={selectedUser?.email || ''}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Telefone
                    </label>
                    <input
                      type="text"
                      value={selectedUser?.phone || ''}
                      onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Localização
                    </label>
                    <input
                      type="text"
                      value={selectedUser?.location || ''}
                      onChange={(e) => setSelectedUser({...selectedUser, location: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Tipo de Usuário
                    </label>
                    <select
                      value={selectedUser?.role || 'client'}
                      onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    >
                      <option value="client">Cliente</option>
                      <option value="consultant">Consultor</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Status
                    </label>
                    <select
                      value={selectedUser?.status || 'ativo'}
                      onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </select>
                  </div>
                </>
              )}

              {/* Campos de Senha */}
              {(modalMode === 'create' || modalMode === 'password') && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      {modalMode === 'create' ? 'Senha *' : 'Nova Senha *'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={modalMode === 'create' ? selectedUser?.password || '' : selectedUser?.newPassword || ''}
                        onChange={(e) => setSelectedUser({
                          ...selectedUser, 
                          [modalMode === 'create' ? 'password' : 'newPassword']: e.target.value
                        })}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          paddingRight: '3rem',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.9rem'
                        }}
                        placeholder="Mínimo 6 caracteres"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {modalMode === 'create' && (
                      <button
                        type="button"
                        onClick={generatePassword}
                        style={{
                          marginTop: '0.5rem',
                          background: '#6c757d',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        🎲 Gerar Senha Aleatória
                      </button>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Confirmar Senha *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={selectedUser?.confirmPassword || ''}
                        onChange={(e) => setSelectedUser({...selectedUser, confirmPassword: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          paddingRight: '3rem',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.9rem'
                        }}
                        placeholder="Repita a senha"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem'
                        }}
                      >
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Mostrar senha atual no modo de visualização */}
              {modalMode === 'view' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Senha
                  </label>
                  <input
                    type="password"
                    value={selectedUser?.password || ''}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: '#f8f9fa'
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {modalMode === 'view' ? 'Fechar' : 'Cancelar'}
              </button>
              
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  style={{
                    background: '#FC5A8D',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {modalMode === 'create' && 'Criar Usuário'}
                  {modalMode === 'edit' && 'Salvar Alterações'}
                  {modalMode === 'password' && 'Alterar Senha'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;