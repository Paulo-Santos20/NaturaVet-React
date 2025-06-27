import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { recentMessages } from '../../data';
import '../../../../../styles/pages/admin/Overview.css';

const Overview = ({ users, clients, pets, appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = [
    { 
      title: 'Agendados Hoje', 
      value: appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length.toString(), 
      icon: '📅', 
      change: '+2 desde ontem' 
    },
    { 
      title: 'Total de Clientes', 
      value: clients.length.toString(), 
      icon: '👥', 
      change: '+12 este mês' 
    },
    { 
      title: 'Total de Pets', 
      value: pets.length.toString(), 
      icon: '🐕', 
      change: '+18 este mês' 
    }
  ];

  const appointmentDates = [...new Set(appointments.map(apt => apt.date))];

  const hasAppointments = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointmentDates.includes(dateStr);
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);
  const confirmedCount = selectedDateAppointments.filter(apt => apt.status === 'confirmed').length;
  const pendingCount = selectedDateAppointments.filter(apt => apt.status === 'pending').length;

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes}min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h${remainingMinutes}min` : `${hours}h`;
    }
  };

  return (
    <div className="admin-overview">
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="stat-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Próximos Agendamentos e Mensagens */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Próximos Agendamentos</h3>
            <span className="card-badge">{appointments.length}</span>
          </div>
          <div className="appointments-list">
            {appointments.slice(0, 4).map((appointment) => (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-time">
                  <span className="time">{appointment.time}</span>
                  <span className="date">{new Date(appointment.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                  <span className="duration">{formatDuration(appointment.duration)}</span>
                </div>
                <div className="appointment-info">
                  <h4>{appointment.petName}</h4>
                  <p>{appointment.ownerName}</p>
                  <span className="appointment-type">{appointment.consultationType}</span>
                </div>
                <div className="appointment-status">
                  <span className={`status ${appointment.status}`}>
                    {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn">Ver Todos os Agendamentos</button>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Mensagens Recentes</h3>
            <span className="card-badge unread">{recentMessages.filter(msg => msg.unread).length}</span>
          </div>
          <div className="messages-list">
            {recentMessages.map((message) => (
              <div key={message.id} className={`message-item ${message.unread ? 'unread' : ''}`}>
                <div className="message-avatar">
                  {message.sender.charAt(0)}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <h4>{message.sender}</h4>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <p>{message.message}</p>
                </div>
                {message.unread && <div className="unread-indicator"></div>}
              </div>
            ))}
          </div>
          <button className="view-all-btn">Ver Todas as Mensagens</button>
        </div>
      </div>

      {/* Calendário e Agendamentos do Dia */}
      <div className="calendar-section">
        <div className="calendar-container">
          <div className="dashboard-card">
            <h3>Calendário de Agendamentos</h3>
            <div className="calendar-wrapper">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                locale="pt-BR"
                tileClassName={({ date }) => {
                  return hasAppointments(date) ? 'has-appointments' : null;
                }}
                formatShortWeekday={(locale, date) => {
                  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                  return weekdays[date.getDay()];
                }}
              />
            </div>
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-color has-appointments"></div>
                <span>Dias com agendamentos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="appointments-detail">
          <div className="dashboard-card">
            <div className="appointments-header">
              <h3>Agendamentos - {formatDate(selectedDate)}</h3>
            </div>
            
            <div className="day-stats">
              <div className="day-stat">
                <span className="stat-number">{selectedDateAppointments.length}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="day-stat confirmed">
                <span className="stat-number">{confirmedCount}</span>
                <span className="stat-label">Confirmados</span>
              </div>
              <div className="day-stat pending">
                <span className="stat-number">{pendingCount}</span>
                <span className="stat-label">Pendentes</span>
              </div>
            </div>

            <div className="day-appointments">
              {selectedDateAppointments.length > 0 ? (
                selectedDateAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <div key={appointment.id} className="day-appointment-item">
                      <div className="appointment-time-detail">
                        <span className="time-large">{appointment.time}</span>
                        <span className="duration-small">{formatDuration(appointment.duration)}</span>
                      </div>
                      <div className="appointment-details">
                        <div className="pet-info">
                          <h4>{appointment.petName}</h4>
                          <p>Tutor: {appointment.ownerName}</p>
                        </div>
                        <div className="consultation-info">
                          <span className="consultation-type">{appointment.consultationType}</span>
                          <span className={`status-badge ${appointment.status}`}>
                            {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-appointments">
                  <span className="no-appointments-icon">📅</span>
                  <p>Nenhum agendamento para este dia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;