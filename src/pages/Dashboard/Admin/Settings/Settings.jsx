import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'NaturaVet',
      siteDescription: 'Plataforma de nutrição veterinária',
      contactEmail: 'contato@naturavet.com',
      contactPhone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      workingHours: {
        monday: { start: '08:00', end: '18:00', active: true },
        tuesday: { start: '08:00', end: '18:00', active: true },
        wednesday: { start: '08:00', end: '18:00', active: true },
        thursday: { start: '08:00', end: '18:00', active: true },
        friday: { start: '08:00', end: '18:00', active: true },
        saturday: { start: '08:00', end: '14:00', active: true },
        sunday: { start: '08:00', end: '14:00', active: false }
      }
    },
    appointments: {
      defaultDuration: 60,
      maxAdvanceBooking: 30,
      minAdvanceBooking: 24,
      allowCancellation: true,
      cancellationDeadline: 24,
      autoConfirmation: false,
      reminderEmail: true,
      reminderSMS: false,
      reminderTime: 24
    },
    pricing: {
      consultaNutricional: 120.00,
      retorno: 80.00,
      orientacaoNutricional: 100.00,
      emergencia: 200.00,
      desconto: {
        enabled: true,
        percentage: 10,
        minAppointments: 5
      }
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newAppointment: true,
      appointmentReminder: true,
      paymentConfirmation: true,
      systemUpdates: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5,
      ipWhitelist: '',
      auditLog: true
    },
    integrations: {
      googleCalendar: false,
      whatsapp: false,
      mercadoPago: false,
      pagseguro: false,
      email: {
        provider: 'smtp',
        host: '',
        port: 587,
        username: '',
        password: '',
        encryption: 'tls'
      }
    }
  });

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const tabs = [
    { id: 'general', label: '🏢 Geral', icon: '🏢' },
    { id: 'appointments', label: '📅 Agendamentos', icon: '📅' },
    { id: 'pricing', label: '💰 Preços', icon: '💰' },
    { id: 'notifications', label: '🔔 Notificações', icon: '🔔' },
    { id: 'security', label: '🔒 Segurança', icon: '🔒' },
    { id: 'integrations', label: '🔗 Integrações', icon: '🔗' }
  ];

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleNestedSettingChange = (category, parentField, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentField]: {
          ...prev[category][parentField],
          [field]: value
        }
      }
    }));
    setUnsavedChanges(true);
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        workingHours: {
          ...prev.general.workingHours,
          [day]: {
            ...prev.general.workingHours[day],
            [field]: value
          }
        }
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Simular salvamento
    console.log('Salvando configurações:', settings);
    setShowSaveMessage(true);
    setUnsavedChanges(false);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todas as configurações?')) {
      // Resetar para valores padrão
      window.location.reload();
    }
  };

  const dayLabels = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  const renderGeneralSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🏢 Informações Gerais</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Nome do Site
            </label>
            <input
              type="text"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
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
              Descrição
            </label>
            <textarea
              value={settings.general.siteDescription}
              onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Email de Contato
              </label>
              <input
                type="email"
                value={settings.general.contactEmail}
                onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
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
                Telefone de Contato
              </label>
              <input
                type="text"
                value={settings.general.contactPhone}
                onChange={(e) => handleSettingChange('general', 'contactPhone', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Endereço
            </label>
            <input
              type="text"
              value={settings.general.address}
              onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🕐 Horários de Funcionamento</h3>
        
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {Object.entries(settings.general.workingHours).map(([day, hours]) => (
            <div key={day} style={{ 
              display: 'grid', 
              gridTemplateColumns: '150px 1fr 1fr auto', 
              gap: '1rem', 
              alignItems: 'center',
              padding: '0.75rem',
              background: hours.active ? '#f8f9fa' : '#f0f0f0',
              borderRadius: '6px'
            }}>
              <label style={{ fontWeight: '600' }}>
                {dayLabels[day]}
              </label>
              
              <input
                type="time"
                value={hours.start}
                onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                disabled={!hours.active}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
              
              <input
                type="time"
                value={hours.end}
                onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                disabled={!hours.active}
                style={{
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hours.active}
                  onChange={(e) => handleWorkingHoursChange(day, 'active', e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ fontSize: '0.9rem' }}>Ativo</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointmentSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📅 Configurações de Agendamento</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Duração Padrão (minutos)
            </label>
            <select
              value={settings.appointments.defaultDuration}
              onChange={(e) => handleSettingChange('appointments', 'defaultDuration', parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            >
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>60 minutos</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Máximo de Dias para Agendamento
            </label>
            <input
              type="number"
              value={settings.appointments.maxAdvanceBooking}
              onChange={(e) => handleSettingChange('appointments', 'maxAdvanceBooking', parseInt(e.target.value))}
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
              Mínimo de Horas para Agendamento
            </label>
            <input
              type="number"
              value={settings.appointments.minAdvanceBooking}
              onChange={(e) => handleSettingChange('appointments', 'minAdvanceBooking', parseInt(e.target.value))}
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
              Prazo para Cancelamento (horas)
            </label>
            <input
              type="number"
              value={settings.appointments.cancellationDeadline}
              onChange={(e) => handleSettingChange('appointments', 'cancellationDeadline', parseInt(e.target.value))}
              disabled={!settings.appointments.allowCancellation}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>⚙️ Opções Avançadas</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.appointments.allowCancellation}
              onChange={(e) => handleSettingChange('appointments', 'allowCancellation', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Permitir Cancelamento pelo Cliente</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.appointments.autoConfirmation}
              onChange={(e) => handleSettingChange('appointments', 'autoConfirmation', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Confirmação Automática</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.appointments.reminderEmail}
              onChange={(e) => handleSettingChange('appointments', 'reminderEmail', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Lembrete por Email</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.appointments.reminderSMS}
              onChange={(e) => handleSettingChange('appointments', 'reminderSMS', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Lembrete por SMS</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPricingSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>💰 Tabela de Preços</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <label style={{ fontWeight: '600' }}>🍽️ Consulta Nutricional</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>R$</span>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.consultaNutricional}
                onChange={(e) => handleSettingChange('pricing', 'consultaNutricional', parseFloat(e.target.value))}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <label style={{ fontWeight: '600' }}>🔄 Retorno</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>R$</span>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.retorno}
                onChange={(e) => handleSettingChange('pricing', 'retorno', parseFloat(e.target.value))}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <label style={{ fontWeight: '600' }}>📋 Orientação Nutricional</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>R$</span>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.orientacaoNutricional}
                onChange={(e) => handleSettingChange('pricing', 'orientacaoNutricional', parseFloat(e.target.value))}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <label style={{ fontWeight: '600' }}>🚨 Emergência</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>R$</span>
              <input
                type="number"
                step="0.01"
                value={settings.pricing.emergencia}
                onChange={(e) => handleSettingChange('pricing', 'emergencia', parseFloat(e.target.value))}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🎯 Descontos</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.pricing.desconto.enabled}
              onChange={(e) => handleNestedSettingChange('pricing', 'desconto', 'enabled', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Ativar Desconto por Fidelidade</span>
          </label>

          {settings.pricing.desconto.enabled && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginLeft: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Percentual de Desconto (%)
                </label>
                <input
                  type="number"
                  value={settings.pricing.desconto.percentage}
                  onChange={(e) => handleNestedSettingChange('pricing', 'desconto', 'percentage', parseInt(e.target.value))}
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
                  Mínimo de Consultas
                </label>
                <input
                  type="number"
                  value={settings.pricing.desconto.minAppointments}
                  onChange={(e) => handleNestedSettingChange('pricing', 'desconto', 'minAppointments', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🔔 Configurações de Notificação</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>📧 Notificações por Email</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.smsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>📱 Notificações por SMS</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>🔔 Notificações Push</span>
          </label>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📋 Tipos de Notificação</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.newAppointment}
              onChange={(e) => handleSettingChange('notifications', 'newAppointment', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Novo Agendamento</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.appointmentReminder}
              onChange={(e) => handleSettingChange('notifications', 'appointmentReminder', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Lembrete de Consulta</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.paymentConfirmation}
              onChange={(e) => handleSettingChange('notifications', 'paymentConfirmation', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Confirmação de Pagamento</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications.systemUpdates}
              onChange={(e) => handleSettingChange('notifications', 'systemUpdates', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>Atualizações do Sistema</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🔒 Configurações de Segurança</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>🔐 Autenticação de Dois Fatores</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.security.auditLog}
              onChange={(e) => handleSettingChange('security', 'auditLog', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>📊 Log de Auditoria</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Timeout de Sessão (minutos)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
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
                Expiração de Senha (dias)
              </label>
              <input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
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
                Máximo de Tentativas de Login
              </label>
              <input
                type="number"
                value={settings.security.maxLoginAttempts}
                onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Lista de IPs Permitidos (separados por vírgula)
            </label>
            <textarea
              value={settings.security.ipWhitelist}
              onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
              placeholder="192.168.1.1, 10.0.0.1, ..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🔗 Integrações Externas</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.integrations.googleCalendar}
              onChange={(e) => handleSettingChange('integrations', 'googleCalendar', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>📅 Google Calendar</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.integrations.whatsapp}
              onChange={(e) => handleSettingChange('integrations', 'whatsapp', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>📱 WhatsApp Business</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.integrations.mercadoPago}
              onChange={(e) => handleSettingChange('integrations', 'mercadoPago', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>💳 Mercado Pago</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.integrations.pagseguro}
              onChange={(e) => handleSettingChange('integrations', 'pagseguro', e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontWeight: '600' }}>💳 PagSeguro</span>
          </label>
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📧 Configurações de Email</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Provedor de Email
            </label>
            <select
              value={settings.integrations.email.provider}
              onChange={(e) => handleNestedSettingChange('integrations', 'email', 'provider', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            >
              <option value="smtp">SMTP</option>
              <option value="gmail">Gmail</option>
              <option value="outlook">Outlook</option>
              <option value="sendgrid">SendGrid</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Servidor SMTP
              </label>
              <input
                type="text"
                value={settings.integrations.email.host}
                onChange={(e) => handleNestedSettingChange('integrations', 'email', 'host', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
                placeholder="smtp.gmail.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Porta
              </label>
              <input
                type="number"
                value={settings.integrations.email.port}
                onChange={(e) => handleNestedSettingChange('integrations', 'email', 'port', parseInt(e.target.value))}
                style={{
                  width: '100px',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Usuário
              </label>
              <input
                type="text"
                value={settings.integrations.email.username}
                onChange={(e) => handleNestedSettingChange('integrations', 'email', 'username', e.target.value)}
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
                Senha
              </label>
              <input
                type="password"
                value={settings.integrations.email.password}
                onChange={(e) => handleNestedSettingChange('integrations', 'email', 'password', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Criptografia
            </label>
            <select
              value={settings.integrations.email.encryption}
              onChange={(e) => handleNestedSettingChange('integrations', 'email', 'encryption', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}
            >
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">Nenhuma</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appointments':
        return renderAppointmentSettings();
      case 'pricing':
        return renderPricingSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>⚙️ Configurações do Sistema</h1>
        <p style={{ color: '#666' }}>Gerencie todas as configurações da plataforma</p>
      </div>

      {/* Mensagem de Salvamento */}
      {showSaveMessage && (
        <div style={{
          background: '#d4edda',
          color: '#155724',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          border: '1px solid #c3e6cb'
        }}>
          ✅ Configurações salvas com sucesso!
        </div>
      )}

      {/* Aviso de Alterações Não Salvas */}
      {unsavedChanges && (
        <div style={{
          background: '#fff3cd',
          color: '#856404',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          border: '1px solid #ffeaa7'
        }}>
          ⚠️ Você tem alterações não salvas. Lembre-se de salvar antes de sair.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Sidebar de Tabs */}
        <div style={{ 
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '1rem',
          height: 'fit-content'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>Categorias</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#FC5A8D' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#333',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div style={{ 
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}>
          {renderTabContent()}
        </div>
      </div>

      {/* Botões de Ação */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginTop: '2rem',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={handleReset}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          🔄 Resetar
        </button>
        
        <button
          onClick={handleSave}
          style={{
            background: '#FC5A8D',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            opacity: unsavedChanges ? 1 : 0.7
          }}
        >
          💾 Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default Settings;