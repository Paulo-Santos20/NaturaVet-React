import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'

  // Dados mockados de agendamentos
  const mockAppointments = [
    {
      id: 1,
      time: '09:00',
      duration: 60,
      petName: 'Rex',
      petType: 'Cão',
      ownerName: 'Carlos Oliveira',
      type: 'Consulta Nutricional',
      status: 'confirmado',
      notes: 'Primeira consulta - avaliação geral'
    },
    {
      id: 2,
      time: '10:30',
      duration: 45,
      petName: 'Mimi',
      petType: 'Gato',
      ownerName: 'Maria Santos',
      type: 'Retorno',
      status: 'confirmado',
      notes: 'Acompanhamento dieta hipoalergênica'
    },
    {
      id: 3,
      time: '14:00',
      duration: 60,
      petName: 'Buddy',
      petType: 'Cão',
      ownerName: 'Ana Costa',
      type: 'Consulta Final',
      status: 'pendente',
      notes: 'Avaliação final do tratamento'
    },
    {
      id: 4,
      time: '15:30',
      duration: 30,
      petName: 'Luna',
      petType: 'Gato',
      ownerName: 'Pedro Silva',
      type: 'Teleconsulta',
      status: 'confirmado',
      notes: 'Consulta online - dúvidas sobre alimentação'
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const getStatusColor = (status) => {
    const colors = {
      'confirmado': '#27ae60',
      'pendente': '#f39c12',
      'cancelado': '#e74c3c',
      'concluido': '#3498db'
    };
    return colors[status] || '#95a5a6';
  };

  const getPetIcon = (type) => {
    return type === 'Cão' ? '🐕' : type === 'Gato' ? '🐱' : '🐾';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAppointmentForTime = (time) => {
    return mockAppointments.find(apt => apt.time === time);
  };

  return (
    <div className="schedule">
      <div className="page-header">
        <div className="header-content">
          <h1>📅 Agenda</h1>
          <p>Gerencie seus agendamentos e consultas</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              Dia
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Semana
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Mês
            </button>
          </div>
          <button className="btn btn-primary">
            <span>➕</span>
            Novo Agendamento
          </button>
        </div>
      </div>

      <div className="schedule-container">
        {/* Calendar Navigation */}
        <div className="calendar-nav">
          <button className="nav-btn">‹</button>
          <h2 className="current-date">{formatDate(selectedDate)}</h2>
          <button className="nav-btn">›</button>
        </div>

        {/* Schedule Grid */}
        <div className="schedule-grid">
          {/* Time Column */}
          <div className="time-column">
            <div className="time-header">Horário</div>
            {timeSlots.map(time => (
              <div key={time} className="time-slot">
                {time}
              </div>
            ))}
          </div>

          {/* Appointments Column */}
          <div className="appointments-column">
            <div className="appointments-header">
              <span>Consultas</span>
              <span className="appointments-count">
                {mockAppointments.length} agendamento{mockAppointments.length !== 1 ? 's' : ''}
              </span>
            </div>
            {timeSlots.map(time => {
              const appointment = getAppointmentForTime(time);
              return (
                <div key={time} className="appointment-slot">
                  {appointment && (
                    <div className="appointment-card">
                      <div className="appointment-header">
                        <div className="appointment-time">
                          {appointment.time} ({appointment.duration}min)
                        </div>
                        <div 
                          className="appointment-status"
                          style={{ backgroundColor: getStatusColor(appointment.status) }}
                        >
                          {appointment.status}
                        </div>
                      </div>
                      <div className="appointment-content">
                        <div className="pet-info">
                          <span className="pet-icon">{getPetIcon(appointment.petType)}</span>
                          <div className="pet-details">
                            <strong>{appointment.petName}</strong>
                            <span>{appointment.ownerName}</span>
                          </div>
                        </div>
                        <div className="appointment-type">
                          {appointment.type}
                        </div>
                        {appointment.notes && (
                          <div className="appointment-notes">
                            {appointment.notes}
                          </div>
                        )}
                      </div>
                      <div className="appointment-actions">
                        <button className="btn-icon" title="Editar">✏️</button>
                        <button className="btn-icon" title="Cancelar">❌</button>
                        <button className="btn-icon" title="Iniciar Consulta">▶️</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="schedule-stats">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>4</h3>
              <p>Consultas Hoje</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <h3>3h 15min</h3>
              <p>Tempo Total</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>3</h3>
              <p>Confirmadas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>1</h3>
              <p>Pendente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;