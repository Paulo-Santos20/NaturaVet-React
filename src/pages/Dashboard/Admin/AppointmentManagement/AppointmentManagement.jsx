import React, { useState, useEffect } from 'react';
import { useData } from '../../../../context/DataContext';

const AppointmentManagement = () => {
  const {
    appointments,
    clients,
    pets,
    addAppointment,
    updateAppointment,
    deleteAppointment
  } = useData();

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // Função para obter data atual no horário de Brasília
  const getBrasiliaDate = () => {
    const now = new Date();
    const brasiliaOffset = -3 * 60;
    const brasiliaTime = new Date(now.getTime() + (brasiliaOffset * 60 * 1000));
    return brasiliaTime.toISOString().split('T')[0];
  };

  // Filtrar e ordenar agendamentos
  useEffect(() => {
    let filtered = [...appointments];

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.clientPhone.includes(searchTerm) ||
        appointment.consultant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === filterStatus);
    }

    // Filtro por tipo
    if (filterType !== 'all') {
      filtered = filtered.filter(appointment => appointment.type === filterType);
    }

    // Filtro por data
    if (filterDate !== 'all') {
      const today = getBrasiliaDate();
      switch (filterDate) {
        case 'today':
          filtered = filtered.filter(appointment => appointment.date === today);
          break;
        case 'tomorrow':
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          filtered = filtered.filter(appointment => appointment.date === tomorrow.toISOString().split('T')[0]);
          break;
        case 'week':
          const weekFromNow = new Date();
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          filtered = filtered.filter(appointment =>
            new Date(appointment.date) >= new Date(today) &&
            new Date(appointment.date) <= weekFromNow
          );
          break;
        case 'month':
          const monthFromNow = new Date();
          monthFromNow.setMonth(monthFromNow.getMonth() + 1);
          filtered = filtered.filter(appointment =>
            new Date(appointment.date) >= new Date(today) &&
            new Date(appointment.date) <= monthFromNow
          );
          break;
        case 'past':
          filtered = filtered.filter(appointment => appointment.date < today);
          break;
      }
    }

    // Ordenação
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date + ' ' + a.time);
          bValue = new Date(b.date + ' ' + b.time);
          break;
        case 'client':
          aValue = a.clientName.toLowerCase();
          bValue = b.clientName.toLowerCase();
          break;
        case 'pet':
          aValue = a.petName.toLowerCase();
          bValue = b.petName.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, filterStatus, filterDate, filterType, sortBy, sortOrder]);

  // Gerar horários disponíveis
  const generateAvailableSlots = (date) => {
    const slots = [];
    const startHour = 8;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        // Verificar se o horário já está ocupado
        const isOccupied = appointments.some(apt =>
          apt.date === date &&
          apt.time === time &&
          apt.status !== 'cancelado' &&
          apt.id !== selectedAppointment?.id // Permitir o mesmo horário ao editar
        );

        if (!isOccupied) {
          slots.push(time);
        }
      }
    }

    return slots;
  };

  // Funções CRUD
  const handleCreate = () => {
    setModalMode('create');
    setSelectedAppointment({
      petId: '',
      clientId: '',
      date: selectedDate,
      time: '',
      duration: 60,
      status: 'agendado',
      type: 'consulta_nutricional',
      notes: '',
      price: 120.00,
      consultant: 'Dr. Carlos Veterinário',
      observations: ''
    });
    setShowModal(true);
  };

  const handleEdit = (appointment) => {
    setModalMode('edit');
    setSelectedAppointment({ ...appointment });
    setShowModal(true);
  };

  const handleView = (appointment) => {
    setModalMode('view');
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleDelete = (appointmentId) => {
    setShowDeleteConfirm(appointmentId);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deleteAppointment(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const handleSave = () => {
    if (!selectedAppointment.petId || !selectedAppointment.date || !selectedAppointment.time) {
      alert('Pet, data e horário são obrigatórios!');
      return;
    }

    const selectedPet = pets.find(p => p.id === parseInt(selectedAppointment.petId));
    if (!selectedPet) {
      alert('Pet selecionado não encontrado!');
      return;
    }

    // Verificar conflito de horário
    const conflictingAppointment = appointments.find(apt =>
      apt.date === selectedAppointment.date &&
      apt.time === selectedAppointment.time &&
      apt.status !== 'cancelado' &&
      apt.id !== selectedAppointment.id
    );

    if (conflictingAppointment) {
      alert('Já existe um agendamento para este horário!');
      return;
    }

    if (modalMode === 'create') {
      addAppointment(selectedAppointment);
    } else if (modalMode === 'edit') {
      updateAppointment(selectedAppointment.id, selectedAppointment);
    }

    setShowModal(false);
    setSelectedAppointment(null);
  };

  const updateStatus = (appointmentId, newStatus) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      updateAppointment(appointmentId, { ...appointment, status: newStatus });
    }
  };

  const duplicateAppointment = (appointment) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setModalMode('create');
    setSelectedAppointment({
      ...appointment,
      id: undefined,
      date: tomorrow.toISOString().split('T')[0],
      status: 'agendado',
      createdAt: undefined
    });
    setShowModal(true);
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

  const getTypePrices = () => {
    return {
      'consulta_nutricional': 120.00,
      'retorno': 80.00,
      'orientacao_nutricional': 100.00,
      'emergencia': 200.00
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString, timeString) => {
    return new Date(dateString + 'T' + timeString).toLocaleString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Data', 'Horário', 'Cliente', 'Pet', 'Tipo', 'Status', 'Valor', 'Consultor'];
    const csvData = filteredAppointments.map(apt => [
      formatDate(apt.date),
      apt.time,
      apt.clientName,
      apt.petName,
      apt.type,
      apt.status,
      apt.price,
      apt.consultant
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `agendamentos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Estatísticas
  const stats = {
    total: filteredAppointments.length,
    today: filteredAppointments.filter(a => a.date === getBrasiliaDate()).length,
    confirmed: filteredAppointments.filter(a => a.status === 'confirmado').length,
    completed: filteredAppointments.filter(a => a.status === 'concluido').length,
    revenue: filteredAppointments
      .filter(a => a.status === 'concluido')
      .reduce((sum, a) => sum + a.price, 0)
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '2.5rem' }}>
          📅 Gerenciamento de Agendamentos
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Gerencie todos os agendamentos e consultas da clínica
        </p>
      </div>

      {/* Filtros e Controles */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Busca */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              🔍 Buscar
            </label>
            <input
              type="text"
              placeholder="Cliente, pet, telefone ou consultor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FC5A8D'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Status */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              📊 Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="all">Todos os status</option>
              <option value="agendado">📅 Agendado</option>
              <option value="confirmado">✅ Confirmado</option>
              <option value="concluido">🎉 Concluído</option>
              <option value="cancelado">❌ Cancelado</option>
              <option value="reagendado">🔄 Reagendado</option>
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              🏷️ Tipo
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="all">Todos os tipos</option>
              <option value="consulta_nutricional">🍽️ Consulta Nutricional</option>
              <option value="retorno">🔄 Retorno</option>
              <option value="orientacao_nutricional">📋 Orientação Nutricional</option>
              <option value="emergencia">🚨 Emergência</option>
            </select>
          </div>

          {/* Período */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              📅 Período
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="all">Todos os períodos</option>
              <option value="today">Hoje</option>
              <option value="tomorrow">Amanhã</option>
              <option value="week">Próximos 7 dias</option>
              <option value="month">Próximo mês</option>
              <option value="past">Passados</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              🔄 Ordenar por
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="date">Data</option>
                <option value="client">Cliente</option>
                <option value="pet">Pet</option>
                <option value="status">Status</option>
                <option value="price">Valor</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                style={{
                  background: '#f8f9fa',
                  border: '1px solid #ddd',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
                title={`Ordenação ${sortOrder === 'asc' ? 'crescente' : 'decrescente'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleCreate}
              style={{
                background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'transform 0.2s ease',
                boxShadow: '0 4px 6px rgba(252, 90, 141, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              ➕ Novo Agendamento
            </button>

            <button
              onClick={exportToCSV}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              📊 Exportar CSV
            </button>
          </div>

          <div style={{
            color: '#666',
            fontSize: '0.9rem',
            background: '#f8f9fa',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}>
            {filteredAppointments.length} agendamento{filteredAppointments.length !== 1 ? 's' : ''} encontrado{filteredAppointments.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Estatísticas */}
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>📊 Total</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {stats.total}
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>📅 Hoje</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107', margin: 0 }}>
            {stats.today}
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>✅ Confirmados</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8', margin: 0 }}>
            {stats.confirmed}
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>🎉 Concluídos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
            {stats.completed}
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
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>💰 Receita</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8', margin: 0 }}>
            {formatCurrency(stats.revenue)}
          </p>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div style={{
        display: 'grid',
        gap: '1rem'
      }}>
        {filteredAppointments.map(appointment => (
          <div key={appointment.id} style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            borderLeft: `5px solid ${getStatusColor(appointment.status)}`,
            border: '1px solid #f0f0f0'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}>
            <div style={{ padding: '2rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '2rem',
                alignItems: 'center'
              }}>
                {/* Informações do Pet e Cliente */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    boxShadow: '0 4px 8px rgba(252, 90, 141, 0.3)'
                  }}>
                    {appointment.petType === 'Cão' ? '🐕' : '🐱'}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.2rem' }}>
                      {appointment.petName}
                    </h3>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '1rem' }}>
                      👤 {appointment.clientName}
                    </p>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                      📞 {appointment.clientPhone}
                    </p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      👨‍⚕️ {appointment.consultant}
                    </p>
                  </div>
                </div>

                {/* Detalhes Centrais */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                      Data & Hora
                    </p>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#333', fontSize: '1rem' }}>
                      {formatDate(appointment.date)}
                    </p>
                    <p style={{ margin: 0, fontWeight: '600', color: '#FC5A8D', fontSize: '1.1rem' }}>
                      {appointment.time}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                      Tipo & Duração
                    </p>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
                      {getTypeLabel(appointment.type)}
                    </p>
                    <p style={{ margin: 0, fontWeight: '600', color: '#28a745', fontSize: '0.9rem' }}>
                      {appointment.duration} minutos
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', fontWeight: '600' }}>
                      Valor
                    </p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#17a2b8', fontSize: '1.2rem' }}>
                      {formatCurrency(appointment.price)}
                    </p>
                  </div>
                </div>

                {/* Status e Ações */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center',
                  minWidth: '150px'
                }}>
                  <select
                    value={appointment.status}
                    onChange={(e) => updateStatus(appointment.id, e.target.value)}
                    style={{
                      background: getStatusColor(appointment.status),
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      minWidth: '120px',
                      textAlign: 'center'
                    }}
                  >
                    <option value="agendado">📅 Agendado</option>
                    <option value="confirmado">✅ Confirmado</option>
                    <option value="concluido">🎉 Concluído</option>
                    <option value="cancelado">❌ Cancelado</option>
                    <option value="reagendado">🔄 Reagendado</option>
                  </select>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleView(appointment)}
                      style={{
                        background: '#17a2b8',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Visualizar"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleEdit(appointment)}
                      style={{
                        background: '#FC5A8D',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => duplicateAppointment(appointment)}
                      style={{
                        background: '#6f42c1',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Duplicar"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              {/* Notas */}
              {appointment.notes && (
                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#666',
                    fontStyle: 'italic',
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    borderLeft: '4px solid #FC5A8D'
                  }}>
                    <strong>📝 Observações:</strong> {appointment.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div style={{
          background: 'white',
          padding: '4rem 2rem',
          textAlign: 'center',
          color: '#666',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📅</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#333' }}>
            Nenhum agendamento encontrado
          </h3>
          <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Tente ajustar os filtros ou criar um novo agendamento
          </p>
          <button
            onClick={handleCreate}
            style={{
              background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            ➕ Criar Primeiro Agendamento
          </button>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteConfirm && (
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
            borderRadius: '16px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>
              Confirmar Exclusão
            </h3>
            <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
              Tem certeza que deseja excluir este agendamento? Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agendamento */}
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
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
                {modalMode === 'create' && '➕ Novo Agendamento'}
                {modalMode === 'edit' && '✏️ Editar Agendamento'}
                {modalMode === 'view' && '👁️ Visualizar Agendamento'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Pet */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Pet *
                </label>
                <select
                  value={selectedAppointment?.petId || ''}
                  onChange={(e) => {
                    const petId = e.target.value;
                    const pet = pets.find(p => p.id === parseInt(petId));
                    setSelectedAppointment({
                      ...selectedAppointment,
                      petId,
                      clientId: pet?.clientId || ''
                    });
                  }}
                  disabled={modalMode === 'view'}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: modalMode === 'view' ? '#f8f9fa' : 'white',
                    outline: 'none'
                  }}
                >
                  <option value="">Selecione um pet</option>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id}>
                      {pet.type === 'Cão' ? '🐕' : '🐱'} {pet.name} - {pet.clientName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Data e Hora */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Data *
                  </label>
                  <input
                    type="date"
                    value={selectedAppointment?.date || ''}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })}
                    disabled={modalMode === 'view'}
                    min={getBrasiliaDate()}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Horário *
                  </label>
                  <select
                    value={selectedAppointment?.time || ''}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="">Selecione um horário</option>
                    {selectedAppointment?.date && generateAvailableSlots(selectedAppointment.date).map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tipo e Duração */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Tipo de Consulta *
                  </label>
                  <select
                    value={selectedAppointment?.type || ''}
                    onChange={(e) => {
                      const type = e.target.value;
                      const prices = getTypePrices();
                      setSelectedAppointment({
                        ...selectedAppointment,
                        type,
                        price: prices[type] || 120.00
                      });
                    }}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="consulta_nutricional">🍽️ Consulta Nutricional - R$ 120,00</option>
                    <option value="retorno">🔄 Retorno - R$ 80,00</option>
                    <option value="orientacao_nutricional">📋 Orientação Nutricional - R$ 100,00</option>
                    <option value="emergencia">🚨 Emergência - R$ 200,00</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Duração (minutos)
                  </label>
                  <select
                    value={selectedAppointment?.duration || 60}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, duration: parseInt(e.target.value) })}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      outline: 'none'
                    }}
                  >
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>60 minutos</option>
                    <option value={90}>90 minutos</option>
                  </select>
                </div>
              </div>

              {/* Status e Preço */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Status
                  </label>
                  <select
                    value={selectedAppointment?.status || 'agendado'}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, status: e.target.value })}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      outline: 'none'
                    }}
                  >
                    <option value="agendado">📅 Agendado</option>
                    <option value="confirmado">✅ Confirmado</option>
                    <option value="concluido">🎉 Concluído</option>
                    <option value="cancelado">❌ Cancelado</option>
                    <option value="reagendado">🔄 Reagendado</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedAppointment?.price || ''}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, price: parseFloat(e.target.value) })}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Consultor */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Consultor
                </label>
                <select
                  value={selectedAppointment?.consultant || ''}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, consultant: e.target.value })}
                  disabled={modalMode === 'view'}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: modalMode === 'view' ? '#f8f9fa' : 'white',
                    outline: 'none'
                  }}
                >
                  <option value="Dr. Carlos Veterinário">👨‍⚕️ Dr. Carlos Veterinário</option>
                  <option value="Dra. Ana Nutricionista">👩‍⚕️ Dra. Ana Nutricionista</option>
                  <option value="Dr. Pedro Especialista">👨‍⚕️ Dr. Pedro Especialista</option>
                </select>
              </div>

              {/* Observações */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Observações
                </label>
                <textarea
                  value={selectedAppointment?.notes || ''}
                  onChange={(e) => setSelectedAppointment({ ...selectedAppointment, notes: e.target.value })}
                  disabled={modalMode === 'view'}
                  rows={4}
                  placeholder="Adicione observações sobre o agendamento..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: modalMode === 'view' ? '#f8f9fa' : 'white',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Informações do Cliente (somente visualização) */}
              {modalMode === 'view' && selectedAppointment && (
                <div style={{
                  background: '#f8f9fa',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>
                    📋 Informações Detalhadas
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                    <div>
                      <strong>🐾 Pet:</strong> {selectedAppointment.petName} ({selectedAppointment.petType})
                    </div>
                    <div>
                      <strong>👤 Cliente:</strong> {selectedAppointment.clientName}
                    </div>
                    <div>
                      <strong>📞 Telefone:</strong> {selectedAppointment.clientPhone}
                    </div>
                    <div>
                      <strong>👨‍⚕️ Consultor:</strong> {selectedAppointment.consultant}
                    </div>
                    <div>
                      <strong>📅 Data/Hora:</strong> {formatDateTime(selectedAppointment.date, selectedAppointment.time)}
                    </div>
                    <div>
                      <strong>⏱️ Duração:</strong> {selectedAppointment.duration} minutos
                    </div>
                    <div>
                      <strong>🏷️ Tipo:</strong> {getTypeLabel(selectedAppointment.type)}
                    </div>
                    <div>
                      <strong>💰 Valor:</strong> {formatCurrency(selectedAppointment.price)}
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <strong>📊 Status:</strong>
                      <span style={{
                        marginLeft: '0.5rem',
                        background: getStatusColor(selectedAppointment.status),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }}>
                        {getStatusLabel(selectedAppointment.status)}
                      </span>
                    </div>
                    {selectedAppointment.createdAt && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong>📝 Criado em:</strong> {formatDate(selectedAppointment.createdAt)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Botões do Modal */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #f0f0f0'
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                {modalMode === 'view' ? 'Fechar' : 'Cancelar'}
              </button>

              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  style={{
                    background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    boxShadow: '0 4px 6px rgba(252, 90, 141, 0.3)'
                  }}
                >
                  {modalMode === 'create' ? '➕ Criar Agendamento' : '💾 Salvar Alterações'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;