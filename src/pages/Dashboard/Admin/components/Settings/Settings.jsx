import React, { useState } from 'react';
import '../../../../../styles/pages/admin/Settings.css';

const Settings = ({ users, clients, pets, appointments }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'NaturaVet',
    siteDescription: 'Sistema de Gestão Veterinária',
    contactEmail: 'contato@naturavet.com',
    contactPhone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    currency: 'BRL'
  });

  const [appointmentSettings, setAppointmentSettings] = useState({
    workingHours: {
      start: '08:00',
      end: '18:00',
      lunchStart: '12:00',
      lunchEnd: '13:00'
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    defaultDuration: 30,
    maxAdvanceBooking: 60,
    minAdvanceBooking: 1,
    allowCancellation: true,
    cancellationHours: 24,
    reminderHours: 24,
    autoConfirm: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    appointmentConfirmations: true,
    newClientWelcome: true,
    systemAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyReports: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    twoFactorAuth: false,
    ipWhitelist: '',
    auditLog: true,
    dataRetention: 365
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    includeFiles: true,
    includeDatabase: true,
    cloudStorage: false,
    storageProvider: 'local'
  });

  const [systemInfo] = useState({
    version: '1.0.0',
    lastUpdate: '2024-06-27',
    database: 'MySQL 8.0',
    serverSpace: '15.2 GB',
    usedSpace: '2.8 GB',
    freeSpace: '12.4 GB',
    uptime: '15 dias, 8 horas',
    lastBackup: '2024-06-27 02:00:00',
    totalUsers: users.length,
    totalClients: clients.length,
    totalPets: pets.length,
    totalAppointments: appointments.length
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAppointmentChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setAppointmentSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setAppointmentSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBackupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBackupSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = (section) => {
    // Simular salvamento
    alert(`Configurações de ${section} salvas com sucesso!`);
  };

  const handleCreateBackup = () => {
    setShowBackupModal(true);
  };

  const handleImportData = () => {
    setShowImportModal(true);
  };

  const handleExportData = () => {
    // Simular exportação
    const data = {
      users: users.length,
      clients: clients.length,
      pets: pets.length,
      appointments: appointments.length,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `naturavet-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearCache = () => {
    if (window.confirm('Tem certeza que deseja limpar o cache? Esta ação pode afetar a performance temporariamente.')) {
      // Simular limpeza de cache
      alert('Cache limpo com sucesso!');
    }
  };

  const handleTestEmail = () => {
    alert('Email de teste enviado para ' + generalSettings.contactEmail);
  };

  const handleResetSettings = (section) => {
    if (window.confirm(`Tem certeza que deseja restaurar as configurações padrão de ${section}?`)) {
      // Simular reset
      alert(`Configurações de ${section} restauradas!`);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStoragePercentage = () => {
    const used = parseFloat(systemInfo.usedSpace);
    const total = parseFloat(systemInfo.serverSpace);
    return ((used / total) * 100).toFixed(1);
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: '⚙️' },
    { id: 'appointments', label: 'Agendamentos', icon: '📅' },
    { id: 'notifications', label: 'Notificações', icon: '🔔' },
    { id: 'security', label: 'Segurança', icon: '🔒' },
    { id: 'backup', label: 'Backup', icon: '💾' },
    { id: 'system', label: 'Sistema', icon: '🖥️' }
  ];

  return (
    <div className="settings-management">
      <div className="section-header">
        <h2>Configurações do Sistema</h2>
        <div className="settings-actions">
          <button className="btn-secondary" onClick={handleClearCache}>
            🗑️ Limpar Cache
          </button>
          <button className="btn-secondary" onClick={handleExportData}>
            📤 Exportar Dados
          </button>
          <button className="btn-primary" onClick={handleCreateBackup}>
            💾 Criar Backup
          </button>
        </div>
      </div>

      <div className="settings-container">
        {/* Tabs de Navegação */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo das Configurações */}
        <div className="settings-content">
          {/* Configurações Gerais */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <div className="section-header-small">
                <h3>Configurações Gerais</h3>
                <button 
                  className="btn-primary"
                  onClick={() => handleSaveSettings('gerais')}
                >
                  Salvar Alterações
                </button>
              </div>

              <div className="settings-grid">
                <div className="settings-group">
                  <h4>Informações da Empresa</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome do Sistema</label>
                      <input
                        type="text"
                        name="siteName"
                        value={generalSettings.siteName}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Descrição</label>
                      <input
                        type="text"
                        name="siteDescription"
                        value={generalSettings.siteDescription}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email de Contato</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={generalSettings.contactEmail}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Telefone</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={generalSettings.contactPhone}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Endereço</label>
                      <input
                        type="text"
                        name="address"
                        value={generalSettings.address}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={generalSettings.city}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={generalSettings.state}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={generalSettings.zipCode}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Configurações Regionais</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Fuso Horário</label>
                      <select
                        name="timezone"
                        value={generalSettings.timezone}
                        onChange={handleGeneralChange}
                      >
                        <option value="America/Sao_Paulo">Brasília (UTC-3)</option>
                        <option value="America/Manaus">Manaus (UTC-4)</option>
                        <option value="America/Rio_Branco">Rio Branco (UTC-5)</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Idioma</label>
                      <select
                        name="language"
                        value={generalSettings.language}
                        onChange={handleGeneralChange}
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Moeda</label>
                      <select
                        name="currency"
                        value={generalSettings.currency}
                        onChange={handleGeneralChange}
                      >
                        <option value="BRL">Real (R$)</option>
                        <option value="USD">Dólar ($)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Configurações de Agendamentos */}
          {activeTab === 'appointments' && (
            <div className="settings-section">
              <div className="section-header-small">
                <h3>Configurações de Agendamentos</h3>
                <button 
                  className="btn-primary"
                  onClick={() => handleSaveSettings('agendamentos')}
                >
                  Salvar Alterações
                </button>
              </div>

              <div className="settings-grid">
                <div className="settings-group">
                  <h4>Horário de Funcionamento</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Início do Expediente</label>
                      <input
                        type="time"
                        name="workingHours.start"
                        value={appointmentSettings.workingHours.start}
                        onChange={handleAppointmentChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Fim do Expediente</label>
                      <input
                        type="time"
                        name="workingHours.end"
                        value={appointmentSettings.workingHours.end}
                        onChange={handleAppointmentChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Início do Almoço</label>
                      <input
                        type="time"
                        name="workingHours.lunchStart"
                        value={appointmentSettings.workingHours.lunchStart}
                        onChange={handleAppointmentChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Fim do Almoço</label>
                      <input
                        type="time"
                        name="workingHours.lunchEnd"
                        value={appointmentSettings.workingHours.lunchEnd}
                        onChange={handleAppointmentChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Dias de Funcionamento</h4>
                  <div className="working-days">
                    {Object.entries(appointmentSettings.workingDays).map(([day, isWorking]) => (
                      <div key={day} className="working-day">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name={`workingDays.${day}`}
                            checked={isWorking}
                            onChange={handleAppointmentChange}
                          />
                          <span className="day-name">
                            {day === 'monday' && 'Segunda-feira'}
                            {day === 'tuesday' && 'Terça-feira'}
                            {day === 'wednesday' && 'Quarta-feira'}
                            {day === 'thursday' && 'Quinta-feira'}
                            {day === 'friday' && 'Sexta-feira'}
                            {day === 'saturday' && 'Sábado'}
                            {day === 'sunday' && 'Domingo'}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Configurações de Agendamento</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Duração Padrão (minutos)</label>
                      <select
                        name="defaultDuration"
                        value={appointmentSettings.defaultDuration}
                        onChange={handleAppointmentChange}
                      >
                        <option value="15">15 minutos</option>
                        <option value="30">30 minutos</option>
                        <option value="45">45 minutos</option>
                        <option value="60">60 minutos</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Agendamento Máximo (dias)</label>
                      <input
                        type="number"
                        name="maxAdvanceBooking"
                        value={appointmentSettings.maxAdvanceBooking}
                        onChange={handleAppointmentChange}
                        min="1"
                        max="365"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Agendamento Mínimo (horas)</label>
                      <input
                        type="number"
                        name="minAdvanceBooking"
                        value={appointmentSettings.minAdvanceBooking}
                        onChange={handleAppointmentChange}
                        min="1"
                        max="72"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Cancelamento (horas antes)</label>
                      <input
                        type="number"
                        name="cancellationHours"
                        value={appointmentSettings.cancellationHours}
                        onChange={handleAppointmentChange}
                        min="1"
                        max="168"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Lembrete (horas antes)</label>
                      <input
                        type="number"
                        name="reminderHours"
                        value={appointmentSettings.reminderHours}
                        onChange={handleAppointmentChange}
                        min="1"
                        max="168"
                      />
                    </div>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="allowCancellation"
                        checked={appointmentSettings.allowCancellation}
                        onChange={handleAppointmentChange}
                      />
                      Permitir cancelamento pelo cliente
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="autoConfirm"
                        checked={appointmentSettings.autoConfirm}
                        onChange={handleAppointmentChange}
                      />
                      Confirmação automática de agendamentos
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Configurações de Notificações */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <div className="section-header-small">
                <h3>Configurações de Notificações</h3>
                <div className="section-actions">
                  <button className="btn-secondary" onClick={handleTestEmail}>
                    📧 Testar Email
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleSaveSettings('notificações')}
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>

              <div className="settings-grid">
                <div className="settings-group">
                  <h4>Canais de Notificação</h4>
                  <div className="notification-channels">
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">📧 Notificações por Email</span>
                          <span className="notification-desc">Enviar notificações via email</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={notificationSettings.smsNotifications}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">📱 Notificações por SMS</span>
                          <span className="notification-desc">Enviar notificações via SMS</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="pushNotifications"
                          checked={notificationSettings.pushNotifications}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">🔔 Notificações Push</span>
                          <span className="notification-desc">Notificações no navegador</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Tipos de Notificação</h4>
                  <div className="notification-types">
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="appointmentReminders"
                          checked={notificationSettings.appointmentReminders}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Lembretes de Consulta</span>
                          <span className="notification-desc">Lembrar clientes sobre consultas</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="appointmentConfirmations"
                          checked={notificationSettings.appointmentConfirmations}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Confirmações de Agendamento</span>
                          <span className="notification-desc">Confirmar novos agendamentos</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="newClientWelcome"
                          checked={notificationSettings.newClientWelcome}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Boas-vindas a Novos Clientes</span>
                          <span className="notification-desc">Email de boas-vindas para novos clientes</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="systemAlerts"
                          checked={notificationSettings.systemAlerts}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Alertas do Sistema</span>
                          <span className="notification-desc">Notificações sobre o sistema</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Emails de Marketing</span>
                          <span className="notification-desc">Campanhas e promoções</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Relatórios Automáticos</h4>
                  <div className="notification-types">
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="weeklyReports"
                          checked={notificationSettings.weeklyReports}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Relatórios Semanais</span>
                          <span className="notification-desc">Relatório semanal de atividades</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="notification-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="monthlyReports"
                          checked={notificationSettings.monthlyReports}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <span className="notification-title">Relatórios Mensais</span>
                          <span className="notification-desc">Relatório mensal completo</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Configurações de Segurança */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <div className="section-header-small">
                <h3>Configurações de Segurança</h3>
                <div className="section-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={() => setShowSecurityModal(true)}
                  >
                    🔍 Logs de Segurança
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleSaveSettings('segurança')}
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>

              <div className="settings-grid">
                <div className="settings-group">
                  <h4>Políticas de Senha</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Comprimento Mínimo</label>
                      <input
                        type="number"
                        name="passwordMinLength"
                        value={securitySettings.passwordMinLength}
                        onChange={handleSecurityChange}
                        min="6"
                        max="32"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Timeout de Sessão (minutos)</label>
                      <input
                        type="number"
                        name="sessionTimeout"
                        value={securitySettings.sessionTimeout}
                        onChange={handleSecurityChange}
                        min="15"
                        max="480"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Máx. Tentativas de Login</label>
                      <input
                        type="number"
                        name="maxLoginAttempts"
                        value={securitySettings.maxLoginAttempts}
                        onChange={handleSecurityChange}
                        min="3"
                        max="10"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Bloqueio (minutos)</label>
                      <input
                        type="number"
                        name="lockoutDuration"
                        value={securitySettings.lockoutDuration}
                        onChange={handleSecurityChange}
                        min="5"
                        max="1440"
                      />
                    </div>
                  </div>
                  
                  <div className="password-requirements">
                    <h5>Requisitos de Senha</h5>
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="passwordRequireUppercase"
                          checked={securitySettings.passwordRequireUppercase}
                          onChange={handleSecurityChange}
                        />
                        Exigir letras maiúsculas
                      </label>
                    </div>
                    
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="passwordRequireLowercase"
                          checked={securitySettings.passwordRequireLowercase}
                          onChange={handleSecurityChange}
                        />
                        Exigir letras minúsculas
                      </label>
                    </div>
                    
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="passwordRequireNumbers"
                          checked={securitySettings.passwordRequireNumbers}
                          onChange={handleSecurityChange}
                        />
                        Exigir números
                      </label>
                    </div>
                    
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="passwordRequireSymbols"
                          checked={securitySettings.passwordRequireSymbols}
                          onChange={handleSecurityChange}
                        />
                        Exigir símbolos especiais
                      </label>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Autenticação e Acesso</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="twoFactorAuth"
                        checked={securitySettings.twoFactorAuth}
                        onChange={handleSecurityChange}
                      />
                      <div className="notification-info">
                        <span className="notification-title">Autenticação de Dois Fatores</span>
                        <span className="notification-desc">Exigir 2FA para todos os usuários</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="auditLog"
                        checked={securitySettings.auditLog}
                        onChange={handleSecurityChange}
                      />
                      <div className="notification-info">
                        <span className="notification-title">Log de Auditoria</span>
                        <span className="notification-desc">Registrar todas as ações dos usuários</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label>Lista Branca de IPs</label>
                    <textarea
                      name="ipWhitelist"
                      value={securitySettings.ipWhitelist}
                      onChange={handleSecurityChange}
                      placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                      rows="3"
                    ></textarea>
                    <small>Um IP por linha. Deixe vazio para permitir todos.</small>
                  </div>
                  
                  <div className="form-group">
                    <label>Retenção de Dados (dias)</label>
                    <input
                      type="number"
                      name="dataRetention"
                      value={securitySettings.dataRetention}
                      onChange={handleSecurityChange}
                      min="30"
                      max="2555"
                    />
                    <small>Tempo para manter logs e dados históricos</small>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Configurações de Backup */}
          {activeTab === 'backup' && (
            <div className="settings-section">
              <div className="section-header-small">
                <h3>Configurações de Backup</h3>
                <div className="section-actions">
                  <button className="btn-secondary" onClick={handleImportData}>
                    📥 Importar Dados
                  </button>
                  <button className="btn-secondary" onClick={handleCreateBackup}>
                    💾 Backup Manual
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => handleSaveSettings('backup')}
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>

              <div className="settings-grid">
                <div className="settings-group">
                  <h4>Backup Automático</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="autoBackup"
                        checked={backupSettings.autoBackup}
                        onChange={handleBackupChange}
                      />
                      <div className="notification-info">
                        <span className="notification-title">Backup Automático</span>
                        <span className="notification-desc">Realizar backup automaticamente</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Frequência</label>
                      <select
                        name="backupFrequency"
                        value={backupSettings.backupFrequency}
                        onChange={handleBackupChange}
                        disabled={!backupSettings.autoBackup}
                      >
                        <option value="daily">Diário</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensal</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Horário</label>
                      <input
                        type="time"
                        name="backupTime"
                        value={backupSettings.backupTime}
                        onChange={handleBackupChange}
                        disabled={!backupSettings.autoBackup}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Retenção (dias)</label>
                      <input
                        type="number"
                        name="retentionDays"
                        value={backupSettings.retentionDays}
                        onChange={handleBackupChange}
                        min="7"
                        max="365"
                        disabled={!backupSettings.autoBackup}
                      />
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Conteúdo do Backup</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="includeDatabase"
                        checked={backupSettings.includeDatabase}
                        onChange={handleBackupChange}
                      />
                      <div className="notification-info">
                        <span className="notification-title">Banco de Dados</span>
                        <span className="notification-desc">Incluir todos os dados do sistema</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="includeFiles"
                        checked={backupSettings.includeFiles}
                        onChange={handleBackupChange}
                      />
                      <div className="notification-info">
                        <span className="notification-title">Arquivos</span>
                        <span className="notification-desc">Incluir uploads e documentos</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Armazenamento</h4>
                  <div className="form-group">
                    <label>Provedor de Armazenamento</label>
                    <select
                      name="storageProvider"
                      value={backupSettings.storageProvider}
                      onChange={handleBackupChange}
                    >
                      <option value="local">Armazenamento Local</option>
                      <option value="aws">Amazon S3</option>
                      <option value="google">Google Drive</option>
                      <option value="dropbox">Dropbox</option>
                    </select>
                  </div>
                  
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="cloudStorage"
                        checked={backupSettings.cloudStorage}
                        onChange={handleBackupChange}
                      />
                      <div className="notification-info">
                        <span className="notification-title">Armazenamento em Nuvem</span>
                        <span className="notification-desc">Enviar backups para a nuvem</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Histórico de Backups</h4>
                  <div className="backup-history">
                    <div className="backup-item">
                      <div className="backup-info">
                        <span className="backup-date">27/06/2024 02:00</span>
                        <span className="backup-size">2.8 GB</span>
                        <span className="backup-status success">Sucesso</span>
                      </div>
                      <button className="btn-secondary small">Restaurar</button>
                    </div>
                    
                    <div className="backup-item">
                      <div className="backup-info">
                        <span className="backup-date">26/06/2024 02:00</span>
                        <span className="backup-size">2.7 GB</span>
                        <span className="backup-status success">Sucesso</span>
                      </div>
                      <button className="btn-secondary small">Restaurar</button>
                    </div>
                    
                    <div className="backup-item">
                      <div className="backup-info">
                        <span className="backup-date">25/06/2024 02:00</span>
                        <span className="backup-size">2.6 GB</span>
                        <span className="backup-status success">Sucesso</span>
                      </div>
                      <button className="btn-secondary small">Restaurar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Informações do Sistema */}
          {activeTab === 'system' && (
            <div className="settings-section">
              <div className="section-header-small">
                <h3>Informações do Sistema</h3>
                <div className="section-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={() => handleResetSettings('sistema')}
                  >
                    🔄 Restaurar Padrões
                  </button>
                </div>
              </div>

              <div className="settings-grid">
                <div className="settings-group">
                  <h4>Informações Gerais</h4>
                  <div className="system-info">
                    <div className="info-item">
                      <span className="info-label">Versão do Sistema:</span>
                      <span className="info-value">{systemInfo.version}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Última Atualização:</span>
                      <span className="info-value">{systemInfo.lastUpdate}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Banco de Dados:</span>
                      <span className="info-value">{systemInfo.database}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Tempo Online:</span>
                      <span className="info-value">{systemInfo.uptime}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Último Backup:</span>
                      <span className="info-value">{systemInfo.lastBackup}</span>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Armazenamento</h4>
                  <div className="storage-info">
                    <div className="storage-bar">
                      <div className="storage-label">
                        <span>Espaço Utilizado</span>
                        <span>{getStoragePercentage()}%</span>
                      </div>
                      <div className="storage-progress">
                        <div 
                          className="storage-fill"
                          style={{ width: `${getStoragePercentage()}%` }}
                        ></div>
                      </div>
                      <div className="storage-details">
                        <span>Usado: {systemInfo.usedSpace}</span>
                        <span>Livre: {systemInfo.freeSpace}</span>
                        <span>Total: {systemInfo.serverSpace}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Estatísticas</h4>
                  <div className="system-stats">
                    <div className="stat-card">
                      <div className="stat-icon">👥</div>
                      <div className="stat-info">
                        <span className="stat-number">{systemInfo.totalUsers}</span>
                        <span className="stat-label">Usuários</span>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">🏠</div>
                      <div className="stat-info">
                        <span className="stat-number">{systemInfo.totalClients}</span>
                        <span className="stat-label">Clientes</span>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">🐕</div>
                      <div className="stat-info">
                        <span className="stat-number">{systemInfo.totalPets}</span>
                        <span className="stat-label">Pets</span>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">📅</div>
                      <div className="stat-info">
                        <span className="stat-number">{systemInfo.totalAppointments}</span>
                        <span className="stat-label">Consultas</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-group">
                  <h4>Manutenção</h4>
                  <div className="maintenance-actions">
                    <button className="maintenance-btn" onClick={handleClearCache}>
                      <span className="btn-icon">🗑️</span>
                      <div className="btn-info">
                        <span className="btn-title">Limpar Cache</span>
                        <span className="btn-desc">Remove arquivos temporários</span>
                      </div>
                    </button>
                                    <button className="maintenance-btn" onClick={handleExportData}>
                      <span className="btn-icon">📤</span>
                      <div className="btn-info">
                        <span className="btn-title">Exportar Dados</span>
                        <span className="btn-desc">Baixar dados do sistema</span>
                      </div>
                    </button>
                    
                    <button className="maintenance-btn" onClick={handleCreateBackup}>
                      <span className="btn-icon">💾</span>
                      <div className="btn-info">
                        <span className="btn-title">Backup Manual</span>
                        <span className="btn-desc">Criar backup imediato</span>
                      </div>
                    </button>
                    
                    <button className="maintenance-btn" onClick={() => window.location.reload()}>
                      <span className="btn-icon">🔄</span>
                      <div className="btn-info">
                        <span className="btn-title">Reiniciar Sistema</span>
                        <span className="btn-desc">Recarregar aplicação</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Backup */}
      {showBackupModal && (
        <div className="modal-overlay" onClick={() => setShowBackupModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Criar Backup Manual</h3>
              <button className="modal-close" onClick={() => setShowBackupModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <p>Selecione o que deseja incluir no backup:</p>
              
              <div className="backup-options">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Banco de dados completo
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Arquivos e documentos
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Configurações do sistema
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Logs de auditoria
                  </label>
                </div>
              </div>
              
              <div className="backup-estimate">
                <p><strong>Tamanho estimado:</strong> ~3.2 GB</p>
                <p><strong>Tempo estimado:</strong> ~5-10 minutos</p>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowBackupModal(false)}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={() => {
                setShowBackupModal(false);
                alert('Backup iniciado! Você será notificado quando concluído.');
              }}>
                Iniciar Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Importação */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Importar Dados</h3>
              <button className="modal-close" onClick={() => setShowImportModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="import-warning">
                <p><strong>⚠️ Atenção:</strong> A importação de dados pode sobrescrever informações existentes. Recomendamos fazer um backup antes de continuar.</p>
              </div>
              
              <div className="form-group">
                <label>Arquivo de Backup</label>
                <input type="file" accept=".json,.sql,.zip" />
                <small>Formatos aceitos: JSON, SQL, ZIP</small>
              </div>
              
              <div className="import-options">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Sobrescrever dados existentes
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Manter IDs originais
                  </label>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    Validar dados antes da importação
                  </label>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowImportModal(false)}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={() => {
                setShowImportModal(false);
                alert('Importação iniciada! Você será notificado quando concluída.');
              }}>
                Importar Dados
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Logs de Segurança */}
      {showSecurityModal && (
        <div className="modal-overlay" onClick={() => setShowSecurityModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Logs de Segurança</h3>
              <button className="modal-close" onClick={() => setShowSecurityModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="security-logs">
                <div className="log-filters">
                  <select>
                    <option>Todos os tipos</option>
                    <option>Login</option>
                    <option>Logout</option>
                    <option>Falha de login</option>
                    <option>Alteração de dados</option>
                  </select>
                  
                  <input type="date" />
                  
                  <button className="btn-secondary">Filtrar</button>
                </div>
                
                <div className="logs-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Data/Hora</th>
                        <th>Usuário</th>
                        <th>Ação</th>
                        <th>IP</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>27/06/2024 14:30</td>
                        <td>admin@naturavet.com</td>
                        <td>Login bem-sucedido</td>
                        <td>192.168.1.100</td>
                        <td><span className="status-success">Sucesso</span></td>
                      </tr>
                      <tr>
                        <td>27/06/2024 14:25</td>
                        <td>joao@naturavet.com</td>
                        <td>Alteração de cliente</td>
                        <td>192.168.1.101</td>
                        <td><span className="status-success">Sucesso</span></td>
                      </tr>
                      <tr>
                        <td>27/06/2024 14:20</td>
                        <td>unknown</td>
                        <td>Tentativa de login</td>
                        <td>203.0.113.1</td>
                        <td><span className="status-error">Falha</span></td>
                      </tr>
                      <tr>
                        <td>27/06/2024 14:15</td>
                        <td>ana@naturavet.com</td>
                        <td>Criação de artigo</td>
                        <td>192.168.1.102</td>
                        <td><span className="status-success">Sucesso</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSecurityModal(false)}>
                Fechar
              </button>
              <button className="btn-primary">
                Exportar Logs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;