import React, { useState, useEffect } from 'react';
import { useData } from '../../../context/DataContext';

const AdminDashboard = () => {
  const { clients, pets, appointments } = useData();
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const brasiliaOffset = -3 * 60;
    const brasiliaTime = new Date(now.getTime() + (brasiliaOffset * 60 * 1000));
    return brasiliaTime.toISOString().split('T')[0];
  });
  
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    const brasiliaOffset = -3 * 60;
    const brasiliaTime = new Date(now.getTime() + (brasiliaOffset * 60 * 1000));
    return new Date(brasiliaTime.getFullYear(), brasiliaTime.getMonth(), 1);
  });

  const [revenue, setRevenue] = useState({
    thisMonth: 0,
    lastMonth: 0,
    growth: 0
  });

  // Função para obter data atual no horário de Brasília
  const getBrasiliaDate = () => {
    const now = new Date();
    const brasiliaOffset = -3 * 60;
    const brasiliaTime = new Date(now.getTime() + (brasiliaOffset * 60 * 1000));
    return brasiliaTime.toISOString().split('T')[0];
  };

  // Função para obter horário atual de Brasília formatado
  const getBrasiliaTime = () => {
    const now = new Date();
    return now.toLocaleString('pt-BR', { 
      timeZone: 'America/Sao_Paulo',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Função para criar data local sem conversão de fuso horário
  const createLocalDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Calcular receita baseada nos dados do contexto
  useEffect(() => {
    const thisMonth = appointments
      .filter(apt => apt.status === 'concluido' && apt.date.startsWith('2024-12'))
      .reduce((sum, apt) => sum + apt.price, 0);
    
    const lastMonth = 2840; // Simulado para novembro
    const growth = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth * 100).toFixed(1) : 0;

    setRevenue({
      thisMonth,
      lastMonth,
      growth: parseFloat(growth)
    });
  }, [appointments]);

  // Funções do calendário
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Adicionar dias vazios do mês anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Adicionar dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => apt.date === date);
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para formatar data em português brasileiro
  const formatDateBR = (dateString) => {
    const date = createLocalDate(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendado': return '#ffc107';
      case 'confirmado': return '#17a2b8';
      case 'concluido': return '#28a745';
      case 'cancelado': return '#dc3545';
      case 'reagendado': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'agendado': return '📅 Agendado';
      case 'confirmado': return '✅ Confirmado';
      case 'concluido': return '🎉 Concluído';
      case 'cancelado': return '❌ Cancelado';
      case 'reagendado': return '🔄 Reagendado';
      default: return status;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'consulta_nutricional': return '🍽️ Consulta Nutricional';
      case 'retorno': return '🔄 Retorno';
      case 'orientacao_nutricional': return '📋 Orientação Nutricional';
      case 'emergencia': return '🚨 Emergência';
      default: return type;
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const today = getBrasiliaDate();
  const selectedAppointments = getAppointmentsForDate(selectedDate);
  const todayAppointments = getAppointmentsForDate(today);
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today && apt.status !== 'cancelado')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  // Calcular estatísticas adicionais
  const totalRevenue = appointments
    .filter(apt => apt.status === 'concluido')
    .reduce((sum, apt) => sum + apt.price, 0);

  const appointmentsThisWeek = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return appointmentDate >= weekStart && appointmentDate <= weekEnd;
  }).length;

  const activeClients = clients.filter(client => client.status === 'ativo').length;
  const activePets = pets.filter(pet => pet.status === 'ativo').length;

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '2.5rem' }}>
          📊 Dashboard - NaturaVet
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>
          Bem-vindo ao painel administrativo. Aqui você pode acompanhar todas as métricas importantes.
        </p>
        <p style={{ 
          color: '#999', 
          fontSize: '0.9rem',
          background: '#f8f9fa',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          🕐 {getBrasiliaTime()}
        </p>
      </div>

      {/* Cards de Estatísticas Principais */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Total de Clientes */}
        <div style={{ 
          background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
          color: 'white',
          padding: '2rem', 
          borderRadius: '16px', 
          boxShadow: '0 8px 16px rgba(252, 90, 141, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👥</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', opacity: 0.9 }}>
            Clientes Ativos
          </h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {activeClients}
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            Total: {clients.length} clientes
          </p>
        </div>

        {/* Total de Pets */}
        <div style={{ 
          background: 'linear-gradient(135deg, #28a745, #1e7e34)',
          color: 'white',
          padding: '2rem', 
          borderRadius: '16px', 
          boxShadow: '0 8px 16px rgba(40, 167, 69, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🐾</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', opacity: 0.9 }}>
            Pets Cadastrados
          </h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {activePets}
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            {pets.filter(p => p.type === 'Cão').length} cães, {pets.filter(p => p.type === 'Gato').length} gatos
          </p>
        </div>

        {/* Receita do Mês */}
        <div style={{ 
          background: 'linear-gradient(135deg, #17a2b8, #117a8b)',
          color: 'white',
          padding: '2rem', 
          borderRadius: '16px', 
          boxShadow: '0 8px 16px rgba(23, 162, 184, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', opacity: 0.9 }}>
            Receita Dezembro
          </h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {formatCurrency(revenue.thisMonth)}
          </p>
          <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>
            {revenue.growth > 0 ? '📈' : revenue.growth < 0 ? '📉' : '➖'} 
            {Math.abs(revenue.growth)}% vs novembro
          </p>
        </div>

        {/* Consultas Hoje */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ffc107, #e0a800)',
          color: 'white',
          padding: '2rem', 
          borderRadius: '16px', 
          boxShadow: '0 8px 16px rgba(255, 193, 7, 0.3)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📅</div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', opacity: 0.9 }}>
            Consultas Hoje
          </h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            {todayAppointments.length}
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>
            {appointmentsThisWeek} esta semana
          </p>
        </div>
      </div>

      {/* Cards de Estatísticas Secundárias */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💯</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>
            Taxa de Conclusão
          </h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
            {((appointments.filter(a => a.status === 'concluido').length / appointments.length) * 100).toFixed(1)}%
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>
            Receita Total
          </h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#17a2b8', margin: 0 }}>
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>
            Ticket Médio
          </h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {formatCurrency(totalRevenue / appointments.filter(a => a.status === 'concluido').length || 0)}
          </p>
        </div>

        <div style={{ 
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>
            Taxa de Retorno
          </h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6f42c1', margin: 0 }}>
            {((appointments.filter(a => a.type === 'retorno').length / appointments.length) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Próximos Agendamentos */}
      <div style={{ 
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
            📋 Próximos Agendamentos
          </h2>
          <span style={{ 
            background: '#FC5A8D',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {upcomingAppointments.length} agendamentos
          </span>
        </div>
        
        {upcomingAppointments.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
              Nenhum agendamento próximo
            </h3>
            <p style={{ margin: 0 }}>
              Todos os agendamentos estão em dia!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {upcomingAppointments.map(appointment => (
              <div key={`upcoming-appointment-${appointment.id}-${appointment.date}-${appointment.time}`} style={{ 
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.5rem',
                background: '#f8f9fa',
                borderRadius: '12px',
                borderLeft: `5px solid ${getStatusColor(appointment.status)}`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ 
                  fontSize: '2rem',
                  background: 'white',
                  padding: '0.75rem',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {appointment.petType === 'Cão' ? '🐕' : '🐱'}
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.1rem' }}>
                    {appointment.petName} - {appointment.clientName}
                  </h4>
                  <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                    📞 {appointment.clientPhone}
                  </p>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    {getTypeLabel(appointment.type)}
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#333' }}>
                    {createLocalDate(appointment.date).toLocaleDateString('pt-BR', { 
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit'
                    })}
                  </p>
                  <p style={{ margin: 0, color: '#FC5A8D', fontSize: '1.1rem', fontWeight: '600' }}>
                    {appointment.time}
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <span style={{ 
                    background: getStatusColor(appointment.status),
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    display: 'inline-block',
                    minWidth: '80px'
                  }}>
                    {getStatusLabel(appointment.status)}
                  </span>
                  <p style={{ 
                    margin: '0.5rem 0 0 0', 
                    color: '#28a745', 
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {formatCurrency(appointment.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendário e Detalhes */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem'
      }}>
        {/* Calendário */}
        <div style={{ 
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
              📅 Calendário
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                onClick={() => navigateMonth(-1)}
                style={{
                  background: '#FC5A8D',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e54a7a'}
                onMouseLeave={(e) => e.target.style.background = '#FC5A8D'}
              >
                ←
              </button>
              <h3 style={{ 
                margin: 0, 
                color: '#333', 
                minWidth: '180px', 
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                {currentMonth.toLocaleDateString('pt-BR', { 
                  month: 'long', 
                  year: 'numeric' 
                }).replace(/^\w/, c => c.toUpperCase())}
              </h3>
              <button
                onClick={() => navigateMonth(1)}
                style={{
                  background: '#FC5A8D',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e54a7a'}
                onMouseLeave={(e) => e.target.style.background = '#FC5A8D'}
              >
                →
              </button>
            </div>
          </div>

          {/* Cabeçalho dos dias da semana */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '2px',
            marginBottom: '2px'
          }}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
              <div key={`weekday-${day}-${index}`} style={{ 
                padding: '1rem 0.5rem',
                textAlign: 'center',
                fontWeight: '600',
                color: '#666',
                fontSize: '0.9rem',
                background: '#f8f9fa',
                borderRadius: '6px'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Dias do calendário */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '2px',
            background: '#f0f0f0',
            borderRadius: '8px',
            padding: '2px'
          }}>
            {getDaysInMonth(currentMonth).map((day, index) => {
              if (!day) {
                return (
                  <div 
                    key={`empty-${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${index}`}
                    style={{ 
                      height: '50px', 
                      background: 'white',
                      borderRadius: '6px'
                    }} 
                  />
                );
              }

              const dateStr = formatDate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const dayAppointments = getAppointmentsForDate(dateStr);
              const isToday = dateStr === today;
              const isSelected = dateStr === selectedDate;
              const hasAppointments = dayAppointments.length > 0;

              return (
                <div
                  key={`day-${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${day}`}
                  onClick={() => {
                    console.log('📅 Calendário: Clicou no dia:', day, 'Data formatada:', dateStr);
                    setSelectedDate(dateStr);
                  }}
                  style={{
                    height: '50px',
                    background: isSelected ? '#FC5A8D' : hasAppointments ? '#e6f3ff' : 'white',
                    color: isSelected ? 'white' : isToday ? '#FC5A8D' : '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: isToday || hasAppointments || isSelected ? '600' : 'normal',
                    fontSize: '1rem',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    borderRadius: '6px',
                    border: isToday ? '2px solid #FC5A8D' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.target.style.background = hasAppointments ? '#d1ecf1' : '#f8f9fa';
                      e.target.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.target.style.background = hasAppointments ? '#e6f3ff' : 'white';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {day}
                  {hasAppointments && (
                    <div style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isSelected ? 'white' : '#FC5A8D',
                      border: isSelected ? 'none' : '1px solid white'
                    }} />
                  )}
                  {dayAppointments.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: isSelected ? 'white' : '#FC5A8D',
                      color: isSelected ? '#FC5A8D' : 'white',
                      fontSize: '0.7rem',
                      padding: '1px 4px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      minWidth: '14px',
                      textAlign: 'center'
                    }}>
                      {dayAppointments.length}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legenda */}
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>
              Legenda:
            </h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: '#FC5A8D', 
                  borderRadius: '50%' 
                }}></div>
                <span>Dia selecionado</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  background: '#e6f3ff', 
                  borderRadius: '50%',
                  border: '1px solid #17a2b8'
                }}></div>
                <span>Com agendamentos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  border: '2px solid #FC5A8D', 
                  borderRadius: '50%',
                  background: 'white'
                }}></div>
                <span>Hoje</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detalhes do Dia Selecionado */}
        <div style={{ 
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #f0f0f0'
        }}>
          <h2 style={{ margin: '0 0 1.5rem 0', color: '#333', fontSize: '1.5rem' }}>
            📋 {formatDateBR(selectedDate)}
          </h2>

          {selectedAppointments.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem 1rem',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ 
                fontSize: '1.2rem', 
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                Nenhum agendamento
              </h3>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Selecione uma data com agendamentos no calendário
              </p>
            </div>
          ) : (
            <>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <span style={{ fontWeight: '600', color: '#333' }}>
                  {selectedAppointments.length} agendamento{selectedAppointments.length > 1 ? 's' : ''}
                </span>
                <span style={{ color: '#28a745', fontWeight: '600' }}>
                  Total: {formatCurrency(selectedAppointments.reduce((sum, apt) => sum + apt.price, 0))}
                </span>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {selectedAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(appointment => (
                  <div key={`selected-appointment-${appointment.id}-${selectedDate}-${appointment.time}`} style={{ 
                    padding: '1.5rem',
                    background: '#f8f9fa',
                    borderRadius: '12px',
                    borderLeft: `5px solid ${getStatusColor(appointment.status)}`,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.1rem' }}>
                          {appointment.petType === 'Cão' ? '🐕' : '🐱'} {appointment.petName}
                        </h4>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                          👤 {appointment.clientName}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                          📞 {appointment.clientPhone}
                        </p>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                          👨‍⚕️ {appointment.consultant}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#FC5A8D', fontSize: '1.2rem' }}>
                          {appointment.time}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                          ⏱️ {appointment.duration} min
                        </p>
                        <p style={{ margin: 0, fontWeight: '600', color: '#28a745', fontSize: '1.1rem' }}>
                          {formatCurrency(appointment.price)}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e9ecef'
                    }}>
                      <span style={{ 
                        background: '#e9ecef',
                        color: '#495057',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {getTypeLabel(appointment.type)}
                      </span>
                      <span style={{ 
                        background: getStatusColor(appointment.status),
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>

                    {appointment.notes && (
                      <div style={{ 
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                      }}>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '0.9rem', 
                          color: '#666', 
                          fontStyle: 'italic',
                          lineHeight: '1.4'
                        }}>
                          <strong>📝 Observações:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;