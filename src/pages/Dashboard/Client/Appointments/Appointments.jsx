import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';

import './Appointments.css';

const Appointments = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  // Dados mockados de agendamentos
  const mockAppointments = {
    upcoming: [
      {
        id: 1,
        date: '2024-02-15',
        time: '09:00',
        type: 'Consulta de Retorno',
        veterinarian: 'Dra. Maria Silva',
        petName: 'Rex',
        status: 'confirmado',
        location: 'Clínica NaturaVet - Sala 2',
        notes: 'Avaliação do progresso da dieta'
      },
      {
        id: 2,
        date: '2024-02-20',
        time: '14:30',
        type: 'Teleconsulta',
        veterinarian: 'Dra. Maria Silva',
        petName: 'Mimi',
        status: 'pendente',
        location: 'Online',
        notes: 'Dúvidas sobre alimentação'
      }
    ],
    past: [
      {
        id: 3,
        date: '2024-01-15',
        time: '09:00',
        type: 'Consulta Nutricional',
        veterinarian: 'Dra. Maria Silva',
        petName: 'Rex',
        status: 'concluido',
        location: 'Clínica NaturaVet - Sala 1',
        notes: 'Primeira consulta - avaliação geral',
        diagnosis: 'Sobrepeso moderado',
        treatment: 'Dieta hipocalórica + exercícios'
      },
      {
        id: 4,
        date: '2023-12-10',
        time: '10:30',
        type: 'Avaliação Inicial',
        veterinarian: 'Dra. Maria Silva',
        petName: 'Rex',
        status: 'concluido',
        location: 'Clínica NaturaVet - Sala 1',
        notes: 'Consulta inicial',
        diagnosis: 'Avaliação geral',
        treatment: 'Orientações preventivas'
      }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      'confirmado': '#27ae60',
      'pendente': '#f39c12',
      'cancelado': '#e74c3c',
      'concluido': '#3498db'
    };
    return colors[status] || '#95a5a6';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'confirmado': '✅',
      'pendente': '⏳',
      'cancelado': '❌',
      'concluido': '✔️'
    };
    return icons[status] || '📅';
  };

  const getPetIcon = (petName) => {
    const pet = user.pets?.find(p => p.name === petName);
    return pet?.type === 'cão' ? '🐕' : pet?.type === 'gato' ? '🐱' : '🐾';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  const canCancel = (dateString) => {
    const appointmentDate = new Date(dateString);
    const now = new Date();
    const diffHours = (appointmentDate - now) / (1000 * 60 * 60);
    return diffHours > 24; // Pode cancelar se faltam mais de 24h
  };

  return (
    <div className="appointments">
      <div className="page-header">
        <div className="header-content">
          <h1>📅 Agendamentos</h1>
          <p>Gerencie suas consultas e agendamentos</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewAppointment(true)}
        >
          <span>➕</span>
          Novo Agendamento
        </button>
      </div>

      {/* Tabs */}
      <div className="appointments-tabs">
        <button
          className={`tab-btn ${selectedTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setSelectedTab('upcoming')}
        >
          <span>📅</span>
          Próximos ({mockAppointments.upcoming.length})
        </button>
        <button
          className={`tab-btn ${selectedTab === 'past' ? 'active' : ''}`}
          onClick={() => setSelectedTab('past')}
        >
          <span>📋</span>
          Histórico ({mockAppointments.past.length})
        </button>
      </div>

      {/* Appointments List */}
      <div className="appointments-content">
        {selectedTab === 'upcoming' && (
          <div className="appointments-list">
            {mockAppointments.upcoming.length > 0 ? (
              mockAppointments.upcoming.map(appointment => (
                <div key={appointment.id} className="appointment-card upcoming">
                  <div className="appointment-header">
                    <div className="appointment-date-time">
                      <div className="date-info">
                        <span className="date">{formatDate(appointment.date)}</span>
                        <span className="time">{formatTime(appointment.time)}</span>
                      </div>
                      <div 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {getStatusIcon(appointment.status)} {appointment.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="appointment-content">
                    <div className="appointment-main-info">
                      <div className="pet-info">
                        <span className="pet-icon">{getPetIcon(appointment.petName)}</span>
                        <span className="pet-name">{appointment.petName}</span>
                      </div>
                      <h3 className="appointment-type">{appointment.type}</h3>
                      <p className="veterinarian">👩‍⚕️ {appointment.veterinarian}</p>
                      <p className="location">📍 {appointment.location}</p>
                      {appointment.notes && (
                        <p className="notes">📝 {appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="appointment-actions">
                    {appointment.type === 'Teleconsulta' && (
                      <button className="action-btn join-call">
                        <span>📹</span>
                        Entrar na Chamada
                      </button>
                    )}
                    <button className="action-btn reschedule">
                      <span>📅</span>
                      Reagendar
                    </button>
                    {canCancel(appointment.date) && (
                      <button className="action-btn cancel">
                        <span>❌</span>
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <div className="no-appointments-icon">📅</div>
                <h3>Nenhum agendamento próximo</h3>
                <p>Você não tem consultas agendadas</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowNewAppointment(true)}
                >
                  Agendar Consulta
                </button>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'past' && (
          <div className="appointments-list">
            {mockAppointments.past.length > 0 ? (
              mockAppointments.past.map(appointment => (
                <div key={appointment.id} className="appointment-card past">
                  <div className="appointment-header">
                    <div className="appointment-date-time">
                      <div className="date-info">
                        <span className="date">{formatDate(appointment.date)}</span>
                        <span className="time">{formatTime(appointment.time)}</span>
                      </div>
                      <div 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {getStatusIcon(appointment.status)} {appointment.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="appointment-content">
                    <div className="appointment-main-info">
                      <div className="pet-info">
                        <span className="pet-icon">{getPetIcon(appointment.petName)}</span>
                        <span className="pet-name">{appointment.petName}</span>
                      </div>
                      <h3 className="appointment-type">{appointment.type}</h3>
                      <p className="veterinarian">👩‍⚕️ {appointment.veterinarian}</p>
                      <p className="location">📍 {appointment.location}</p>
                      {appointment.notes && (
                        <p className="notes">📝 {appointment.notes}</p>
                      )}
                      
                      {appointment.diagnosis && (
                        <div className="consultation-results">
                          <h4>Resultado da Consulta:</h4>
                          <p><strong>Diagnóstico:</strong> {appointment.diagnosis}</p>
                          <p><strong>Tratamento:</strong> {appointment.treatment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="appointment-actions">
                    <button className="action-btn view-report">
                      <span>📄</span>
                      Ver Relatório
                    </button>
                    <button className="action-btn repeat">
                      <span>🔄</span>
                      Agendar Similar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-appointments">
                <div className="no-appointments-icon">📋</div>
                <h3>Nenhuma consulta realizada</h3>
                <p>Seu histórico de consultas aparecerá aqui</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="modal-overlay" onClick={() => setShowNewAppointment(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📅 Novo Agendamento</h3>
              <button 
                className="close-btn"
                onClick={() => setShowNewAppointment(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-placeholder">
                <div className="placeholder-icon">📅</div>
                <h4>Formulário de Agendamento</h4>
                <p>Esta funcionalidade será implementada em breve.</p>
                <p>Aqui você poderá:</p>
                <ul>
                  <li>Escolher o pet</li>
                  <li>Selecionar tipo de consulta</li>
                  <li>Escolher data e horário</li>
                  <li>Adicionar observações</li>
                </ul>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowNewAppointment(false)}
                >
                  Entendi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;