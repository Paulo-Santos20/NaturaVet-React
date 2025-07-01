import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Geral', icon: '⚙️' },
    { id: 'notifications', label: 'Notificações', icon: '🔔' },
    { id: 'security', label: 'Segurança', icon: '🔒' },
    { id: 'integrations', label: 'Integrações', icon: '🔗' },
    { id: 'backup', label: 'Backup', icon: '💾' }
  ];

  return (
    <div className="settings">
      <div className="page-header">
        <h1>⚙️ Configurações do Sistema</h1>
        <p>Gerencie as configurações globais da plataforma</p>
      </div>

      <div className="settings-container">
        {/* Tabs Navigation */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="tab-panel">
              <h3>Configurações Gerais</h3>
              <div className="settings-section">
                <div className="setting-item">
                  <label>Nome da Plataforma</label>
                  <input type="text" defaultValue="NaturaVet" />
                </div>
                <div className="setting-item">
                  <label>Fuso Horário</label>
                  <select defaultValue="America/Sao_Paulo">
                    <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                    <option value="America/Rio_Branco">Rio Branco (UTC-5)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Idioma Padrão</label>
                  <select defaultValue="pt-BR">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="tab-panel">
              <h3>Configurações de Notificações</h3>
              <div className="settings-section">
                <div className="setting-toggle">
                  <label>Notificações por Email</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-toggle">
                  <label>Notificações Push</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-toggle">
                  <label>Lembretes de Consulta</label>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-panel">
              <h3>Configurações de Segurança</h3>
              <div className="settings-section">
                <div className="setting-toggle">
                  <label>Autenticação de Dois Fatores</label>
                  <input type="checkbox" />
                </div>
                <div className="setting-item">
                  <label>Tempo de Sessão (minutos)</label>
                  <input type="number" defaultValue="60" />
                </div>
                <div className="setting-toggle">
                  <label>Log de Auditoria</label>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="tab-panel">
              <h3>Integrações</h3>
              <div className="content-placeholder">
                <div className="placeholder-icon">🔗</div>
                <p>Configurações de integrações serão implementadas em breve.</p>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="tab-panel">
              <h3>Backup e Restauração</h3>
              <div className="settings-section">
                <div className="setting-toggle">
                  <label>Backup Automático</label>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-item">
                  <label>Frequência do Backup</label>
                  <select defaultValue="daily">
                    <option value="hourly">A cada hora</option>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                  </select>
                </div>
                <div className="backup-actions">
                  <button className="btn btn-primary">Fazer Backup Agora</button>
                  <button className="btn btn-outline">Restaurar Backup</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;