import React, { useState } from 'react';
import { useAuth } from '../../../hooks/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aqui seria feita a atualização dos dados
    console.log('Dados atualizados:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const getRoleDisplayName = (role) => {
    const roles = {
      admin: 'Administrador',
      consultant: 'Consultor',
      editor: 'Editor',
      client: 'Cliente'
    };
    return roles[role] || 'Usuário';
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: '#e74c3c',
      consultant: '#3498db',
      editor: '#9b59b6',
      client: '#2ecc71'
    };
    return colors[role] || '#95a5a6';
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="header-content">
          <h1>👤 Meu Perfil</h1>
          <p>Gerencie suas informações pessoais</p>
        </div>
        <div className="header-actions">
          {!isEditing ? (
            <button 
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <span>✏️</span>
              Editar Perfil
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn btn-outline"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSave}
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <button className="change-avatar-btn">
              📷 Alterar Foto
            </button>
          </div>
          
          <div className="profile-basic-info">
            <div className="profile-name-section">
              <h2>{user?.name || 'Usuário'}</h2>
              <span 
                className="profile-role"
                style={{ color: getRoleColor(user?.role) }}
              >
                {getRoleDisplayName(user?.role)}
              </span>
            </div>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">Membro desde</span>
                <span className="stat-value">Janeiro 2024</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Último acesso</span>
                <span className="stat-value">Agora</span>
              </div>
              {user?.pets && (
                <div className="stat-item">
                  <span className="stat-label">Pets cadastrados</span>
                  <span className="stat-value">{user.pets.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details-grid">
          {/* Personal Information */}
          <div className="detail-card">
            <div className="card-header">
              <h3>📋 Informações Pessoais</h3>
            </div>
            <div className="card-content">
              {isEditing ? (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Digite seu email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Digite seu telefone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Localização</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Digite sua cidade/estado"
                    />
                  </div>
                </div>
              ) : (
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Nome:</span>
                    <span className="info-value">{user?.name || 'Não informado'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user?.email || 'Não informado'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Telefone:</span>
                    <span className="info-value">{formData.phone || 'Não informado'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Localização:</span>
                    <span className="info-value">{user?.location || 'Não informado'}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bio/Description */}
          <div className="detail-card">
            <div className="card-header">
              <h3>📝 Sobre mim</h3>
            </div>
            <div className="card-content">
              {isEditing ? (
                <div className="form-group">
                  <label htmlFor="bio">Biografia</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Conte um pouco sobre você..."
                    rows="4"
                  />
                </div>
              ) : (
                <p className="bio-text">
                  {formData.bio || 'Nenhuma informação adicional fornecida.'}
                </p>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="detail-card">
            <div className="card-header">
              <h3>🔒 Configurações da Conta</h3>
            </div>
            <div className="card-content">
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Alterar Senha</h4>
                    <p>Atualize sua senha para manter sua conta segura</p>
                  </div>
                  <button className="btn btn-outline">Alterar</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Autenticação de Dois Fatores</h4>
                    <p>Adicione uma camada extra de segurança</p>
                  </div>
                  <button className="btn btn-outline">Configurar</button>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Exportar Dados</h4>
                    <p>Baixe uma cópia dos seus dados</p>
                  </div>
                  <button className="btn btn-outline">Exportar</button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="detail-card">
            <div className="card-header">
              <h3>🔔 Notificações</h3>
            </div>
            <div className="card-content">
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Notificações por Email</h4>
                    <p>Receba atualizações importantes por email</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Lembretes de Consulta</h4>
                    <p>Receba lembretes antes das consultas</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Newsletter</h4>
                    <p>Receba dicas e novidades sobre nutrição animal</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="detail-card full-width">
            <div className="card-header">
              <h3>📊 Atividade Recente</h3>
            </div>
            <div className="card-content">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">🔐</div>
                  <div className="activity-content">
                    <p><strong>Login realizado</strong></p>
                    <span className="activity-time">Hoje às 14:30</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">✏️</div>
                  <div className="activity-content">
                    <p><strong>Perfil atualizado</strong></p>
                    <span className="activity-time">Ontem às 16:45</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📅</div>
                  <div className="activity-content">
                    <p><strong>Consulta agendada</strong></p>
                    <span className="activity-time">2 dias atrás</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;