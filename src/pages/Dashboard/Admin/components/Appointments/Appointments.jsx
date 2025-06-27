import React, { useState } from 'react';
import { consultationTypes, workingHours } from '../../data';
import '../../../../../styles/pages/admin/Appointments.css';

const Appointments = ({ appointments, setAppointments, clients, pets }) => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [viewingAppointment, setViewingAppointment] = useState(null);
  const [filters, setFilters] = useState({
    date: '',
    status: '',
    consultationType: '',
    search: ''
  });
  
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    duration: 30,
    clientId: '',
    petId: '',
    consultationType: '',
    status: 'pending',
    notes: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    petName: ''
  });

  // Gerar horários disponíveis
  const generateTimeSlots = (date, duration = 30) => {
    const slots = [];
    const start = new Date(`${date} ${workingHours.start}`);
    const end = new Date(`${date} ${workingHours.end}`);
    const lunchStart = new Date(`${date} ${workingHours.lunchBreak.start}`);
    const lunchEnd = new Date(`${date} ${workingHours.lunchBreak.end}`);
    
    let current = new Date(start);
    
    while (current < end) {
      const timeStr = current.toTimeString().slice(0, 5);
      
      // Verificar se não está no horário de almoço
      if (current < lunchStart || current >= lunchEnd) {
        // Verificar se o horário não está ocupado
        const isOccupied = appointments.some(apt => 
          apt.date === date && 
          apt.time === timeStr && 
          apt.id !== editingAppointment?.id
        );
        
        if (!isOccupied) {
          slots.push(timeStr);
        }
      }
      
      current.setMinutes(current.getMinutes() + duration);
    }
    
    return slots;
  };

  const handleCreateAppointment = () => {
    setEditingAppointment(null);
    setAppointmentForm({
      date: '',
      time: '',
      duration: 30,
      clientId: '',
      petId: '',
      consultationType: '',
      status: 'pending',
      notes: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      petName: ''
    });
    setShowAppointmentModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      clientId: appointment.clientId || '',
      petId: appointment.petId || '',
      consultationType: appointment.consultationType,
      status: appointment.status,
      notes: appointment.notes,
      ownerName: appointment.ownerName,
      ownerEmail: appointment.ownerEmail,
      ownerPhone: appointment.ownerPhone,
      petName: appointment.petName
    });
    setShowAppointmentModal(true);
  };

  const handleViewAppointment = (appointment) => {
    setViewingAppointment(appointment);
    setShowAppointmentDetailsModal(true);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    }
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    
    if (editingAppointment) {
      // Editar agendamento existente
      const updatedAppointment = {
        ...editingAppointment,
        ...appointmentForm
      };
      
      setAppointments(appointments.map(apt => 
        apt.id === editingAppointment.id ? updatedAppointment : apt
      ));
    } else {
      // Criar novo agendamento
      const newAppointment = {
        id: Math.max(...appointments.map(apt => apt.id), 0) + 1,
        ...appointmentForm
      };
      setAppointments([...appointments, newAppointment]);
    }
    
    setShowAppointmentModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    const selectedClient = clients.find(c => c.id === parseInt(clientId));
    
    setAppointmentForm(prev => ({
      ...prev,
      clientId,
      petId: '',
      ownerName: selectedClient ? selectedClient.name : '',
      ownerEmail: selectedClient ? selectedClient.email : '',
      ownerPhone: selectedClient ? selectedClient.phone : '',
      petName: ''
    }));
  };

  const handlePetChange = (e) => {
    const petId = e.target.value;
    const selectedPet = pets.find(p => p.id === parseInt(petId));
    
    setAppointmentForm(prev => ({
      ...prev,
      petId,
      petName: selectedPet ? selectedPet.name : ''
    }));
  };

  const handleConsultationTypeChange = (e) => {
    const consultationType = e.target.value;
    const consultation = consultationTypes.find(c => c.name === consultationType);
    
    setAppointmentForm(prev => ({
      ...prev,
      consultationType,
      duration: consultation ? consultation.duration : 30
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filtrar agendamentos
  const filteredAppointments = appointments.filter(appointment => {
    if (filters.date && appointment.date !== filters.date) return false;
    if (filters.status && appointment.status !== filters.status) return false;
    if (filters.consultationType && appointment.consultationType !== filters.consultationType) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        appointment.petName.toLowerCase().includes(searchLower) ||
        appointment.ownerName.toLowerCase().includes(searchLower) ||
        appointment.ownerEmail.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
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

  const getStatusLabel = (status) => {
    const labels = {
      confirmed: 'Confirmado',
      pending: 'Pendente',
      cancelled: 'Cancelado',
      completed: 'Concluído'
    };
    return labels[status] || status;
  };

  const availableTimeSlots = appointmentForm.date ? 
    generateTimeSlots(appointmentForm.date, appointmentForm.duration) : [];

  const clientPets = appointmentForm.clientId ? 
    pets.filter(pet => pet.clientId === parseInt(appointmentForm.clientId)) : [];

  return (
    <div className="appointments-management">
      <div className="section-header">
        <h2>Gerenciar Agendamentos</h2>
        <button className="btn-primary" onClick={handleCreateAppointment}>
          + Novo Agendamento
        </button>
      </div>

      {/* Filtros */}
      <div className="appointments-filters">
        <div className="filter-group">
          <label>Data:</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Tipo de Consulta:</label>
          <select name="consultationType" value={filters.consultationType} onChange={handleFilterChange}>
            <option value="">Todos</option>
            {consultationTypes.map(type => (
              <option key={type.name} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Buscar:</label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Pet, tutor ou email..."
          />
        </div>
      </div>

      {/* Estatísticas dos Agendamentos */}
      <div className="appointments-stats">
        <div className="stat-item">
          <span className="stat-number">{appointments.length}</span>
          <span className="stat-label">Total de Agendamentos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{appointments.filter(a => a.status === 'pending').length}</span>
          <span className="stat-label">Pendentes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{appointments.filter(a => a.status === 'confirmed').length}</span>
          <span className="stat-label">Confirmados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{appointments.filter(a => a.status === 'completed').length}</span>
          <span className="stat-label">Concluídos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}</span>
          <span className="stat-label">Hoje</span>
        </div>
      </div>

      {/* Lista de Agendamentos */}
      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Duração</th>
              <th>Pet</th>
              <th>Tutor</th>
              <th>Contato</th>
              <th>Tipo de Consulta</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  <div className="datetime-cell">
                    <span className="date">{formatDate(appointment.date)}</span>
                    <span className="time">{appointment.time}</span>
                  </div>
                </td>
                <td>
                  <span className="duration-badge">
                    {formatDuration(appointment.duration)}
                  </span>
                </td>
                <td>
                  <div className="pet-cell">
                    <span className="pet-name">{appointment.petName}</span>
                  </div>
                </td>
                <td>
                  <div className="owner-cell">
                    <span className="owner-name">{appointment.ownerName}</span>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <span className="email">{appointment.ownerEmail}</span>
                    <span className="phone">{appointment.ownerPhone}</span>
                  </div>
                </td>
                <td>
                  <span className="consultation-badge">
                    {appointment.consultationType}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${appointment.status}`}>
                    {getStatusLabel(appointment.status)}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="action-btn view" 
                      onClick={() => handleViewAppointment(appointment)}
                      title="Visualizar"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn edit" 
                      onClick={() => handleEditAppointment(appointment)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      title="Cancelar"
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

      {/* Modal de Agendamento */}
      {showAppointmentModal && (
        <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
              <button className="modal-close" onClick={() => setShowAppointmentModal(false)}>×</button>
            </div>
            
            <form className="appointment-form" onSubmit={handleSaveAppointment}>
              <div className="form-sections">
                {/* Data e Horário */}
                <div className="form-section">
                  <h4>Data e Horário</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Data *</label>
                      <input
                        type="date"
                        name="date"
                        value={appointmentForm.date}
                        onChange={handleFormChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Tipo de Consulta *</label>
                      <select
                        name="consultationType"
                        value={appointmentForm.consultationType}
                        onChange={handleConsultationTypeChange}
                        required
                      >
                        <option value="">Selecione o tipo</option>
                        {consultationTypes.map(type => (
                          <option key={type.name} value={type.name}>
                            {type.name} ({formatDuration(type.duration)})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Horário *</label>
                      <select
                        name="time"
                        value={appointmentForm.time}
                        onChange={handleFormChange}
                        required
                        disabled={!appointmentForm.date || !appointmentForm.consultationType}
                      >
                        <option value="">Selecione o horário</option>
                        {availableTimeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {appointmentForm.date && appointmentForm.consultationType && availableTimeSlots.length === 0 && (
                        <span className="no-slots-message">
                          Nenhum horário disponível para esta data
                        </span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>Duração</label>
                      <input
                        type="number"
                        name="duration"
                        value={appointmentForm.duration}
                        onChange={handleFormChange}
                        min="15"
                        max="180"
                        step="15"
                        disabled
                      />
                      <small>Duração definida automaticamente pelo tipo de consulta</small>
                    </div>
                  </div>
                </div>

                {/* Cliente e Pet */}
                <div className="form-section">
                  <h4>Cliente e Pet</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Cliente</label>
                      <select
                        name="clientId"
                        value={appointmentForm.clientId}
                        onChange={handleClientChange}
                      >
                        <option value="">Selecione o cliente</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name} - {client.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Pet</label>
                      <select
                        name="petId"
                        value={appointmentForm.petId}
                        onChange={handlePetChange}
                        disabled={!appointmentForm.clientId}
                      >
                        <option value="">Selecione o pet</option>
                        {clientPets.map(pet => (
                          <option key={pet.id} value={pet.id}>
                            {pet.name} - {pet.species} ({pet.breed})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Nome do Tutor *</label>
                      <input
                        type="text"
                        name="ownerName"
                        value={appointmentForm.ownerName}
                        onChange={handleFormChange}
                        placeholder="Nome completo do tutor"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Nome do Pet *</label>
                      <input
                        type="text"
                        name="petName"
                        value={appointmentForm.petName}
                        onChange={handleFormChange}
                        placeholder="Nome do pet"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email do Tutor *</label>
                      <input
                        type="email"
                        name="ownerEmail"
                        value={appointmentForm.ownerEmail}
                        onChange={handleFormChange}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Telefone do Tutor *</label>
                      <input
                        type="tel"
                        name="ownerPhone"
                        value={appointmentForm.ownerPhone}
                        onChange={handleFormChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Status e Observações */}
                <div className="form-section">
                  <h4>Status e Observações</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={appointmentForm.status}
                        onChange={handleFormChange}
                      >
                        <option value="pending">Pendente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="completed">Concluído</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Observações</label>
                      <textarea
                        name="notes"
                        value={appointmentForm.notes}
                        onChange={handleFormChange}
                        placeholder="Observações sobre o agendamento..."
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAppointmentModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingAppointment ? 'Salvar Alterações' : 'Agendar Consulta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Agendamento */}
      {showAppointmentDetailsModal && viewingAppointment && (
        <div className="modal-overlay" onClick={() => setShowAppointmentDetailsModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes do Agendamento - {viewingAppointment.petName}</h3>
              <button className="modal-close" onClick={() => setShowAppointmentDetailsModal(false)}>×</button>
            </div>
            
            <div className="appointment-details-content">
              <div className="appointment-details-grid">
                {/* Informações da Consulta */}
                <div className="details-section">
                  <h4>Informações da Consulta</h4>
                  <div className="details-item">
                    <span className="label">Data:</span>
                    <span className="value">{formatDate(viewingAppointment.date)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Horário:</span>
                    <span className="value">{viewingAppointment.time}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Duração:</span>
                    <span className="value">{formatDuration(viewingAppointment.duration)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Tipo:</span>
                    <span className="value">{viewingAppointment.consultationType}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Status:</span>
                    <span className={`value status-${viewingAppointment.status}`}>
                      {getStatusLabel(viewingAppointment.status)}
                    </span>
                  </div>
                </div>

                {/* Informações do Pet */}
                <div className="details-section">
                  <h4>Informações do Pet</h4>
                  <div className="details-item">
                    <span className="label">Nome:</span>
                    <span className="value">{viewingAppointment.petName}</span>
                  </div>
                  {viewingAppointment.petId && (() => {
                    const pet = pets.find(p => p.id === viewingAppointment.petId);
                    return pet ? (
                      <>
                        <div className="details-item">
                          <span className="label">Espécie:</span>
                          <span className="value">{pet.species}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Raça:</span>
                          <span className="value">{pet.breed}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Idade:</span>
                          <span className="value">{Math.floor((new Date() - new Date(pet.birthDate)) / (365.25 * 24 * 60 * 60 * 1000))} anos</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Peso:</span>
                          <span className="value">{pet.weight}kg</span>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>

                {/* Informações do Tutor */}
                <div className="details-section">
                  <h4>Informações do Tutor</h4>
                  <div className="details-item">
                    <span className="label">Nome:</span>
                    <span className="value">{viewingAppointment.ownerName}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Email:</span>
                    <span className="value">{viewingAppointment.ownerEmail}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Telefone:</span>
                    <span className="value">{viewingAppointment.ownerPhone}</span>
                  </div>
                </div>

                {/* Observações */}
                <div className="details-section full-width">
                  <h4>Observações</h4>
                  <p className="notes-text">
                    {viewingAppointment.notes || 'Nenhuma observação registrada.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;