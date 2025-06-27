import React, { useState } from 'react';
import { brazilianStates } from '../../data';
import '../../../../../styles/pages/admin/Clients.css';

const Clients = ({ clients, setClients, pets, appointments }) => {
  const [showClientModal, setShowClientModal] = useState(false);
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    city: '',
    profession: '',
    search: ''
  });
  
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    birthDate: '',
    profession: '',
    status: 'active',
    notes: ''
  });

  const handleCreateClient = () => {
    setEditingClient(null);
    setClientForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      birthDate: '',
      profession: '',
      status: 'active',
      notes: ''
    });
    setShowClientModal(true);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      birthDate: client.birthDate,
      profession: client.profession,
      status: client.status,
      notes: client.notes
    });
    setShowClientModal(true);
  };

  const handleViewClient = (client) => {
    setViewingClient(client);
    setShowClientDetailsModal(true);
  };

  const handleDeleteClient = (clientId) => {
    const clientPets = pets.filter(pet => pet.clientId === clientId);
    const clientAppointments = appointments.filter(apt => 
      clientPets.some(pet => pet.name === apt.petName)
    );

    if (clientPets.length > 0 || clientAppointments.length > 0) {
      const confirmMessage = `Este cliente possui ${clientPets.length} pet(s) e ${clientAppointments.length} agendamento(s). Tem certeza que deseja excluir? Todos os dados relacionados serão perdidos.`;
      if (!window.confirm(confirmMessage)) return;
    } else {
      if (!window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    }

    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleToggleClientStatus = (clientId) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, status: client.status === 'active' ? 'inactive' : 'active' }
        : client
    ));
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    
    // Validar email único
    const emailExists = clients.some(client => 
      client.email === clientForm.email && 
      client.id !== editingClient?.id
    );
    
    if (emailExists) {
      alert('Este email já está cadastrado para outro cliente!');
      return;
    }
    
    if (editingClient) {
      // Editar cliente existente
      const updatedClient = {
        ...editingClient,
        ...clientForm,
        registrationDate: editingClient.registrationDate
      };
      
      setClients(clients.map(client => 
        client.id === editingClient.id ? updatedClient : client
      ));
    } else {
      // Criar novo cliente
      const newClient = {
        id: Math.max(...clients.map(client => client.id), 0) + 1,
        ...clientForm,
        registrationDate: new Date().toISOString().split('T')[0],
        pets: [],
        totalAppointments: 0,
        lastAppointment: null
      };
      setClients([...clients, newClient]);
    }
    
    setShowClientModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setClientForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleZipCodeChange = async (e) => {
    const zipCode = e.target.value.replace(/\D/g, '');
    setClientForm(prev => ({ ...prev, zipCode }));

    if (zipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setClientForm(prev => ({
            ...prev,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        console.log('Erro ao buscar CEP:', error);
      }
    }
  };

  // Filtrar clientes
  const filteredClients = clients.filter(client => {
    if (filters.status && client.status !== filters.status) return false;
    if (filters.city && client.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.profession && client.profession.toLowerCase() !== filters.profession.toLowerCase()) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.phone.includes(searchLower) ||
        client.profession.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const formatZipCode = (zipCode) => {
    return zipCode.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
    return `${age} anos`;
  };

  const getClientPets = (clientId) => {
    return pets.filter(pet => pet.clientId === clientId);
  };

  const getClientAppointments = (clientId) => {
    const clientPets = getClientPets(clientId);
    return appointments.filter(apt => 
      clientPets.some(pet => pet.name === apt.petName)
    );
  };

  const getLastAppointment = (clientId) => {
    const clientAppointments = getClientAppointments(clientId);
    if (clientAppointments.length === 0) return null;
    
    return clientAppointments
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  // Obter listas únicas para filtros
  const uniqueCities = [...new Set(clients.map(client => client.city))].filter(Boolean);
  const uniqueProfessions = [...new Set(clients.map(client => client.profession))].filter(Boolean);

  return (
    <div className="clients-management">
      <div className="section-header">
        <h2>Gerenciar Clientes</h2>
        <button className="btn-primary" onClick={handleCreateClient}>
          + Novo Cliente
        </button>
      </div>

      {/* Filtros */}
      <div className="clients-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Cidade:</label>
          <select name="city" value={filters.city} onChange={handleFilterChange}>
            <option value="">Todas</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Profissão:</label>
          <select name="profession" value={filters.profession} onChange={handleFilterChange}>
            <option value="">Todas</option>
            {uniqueProfessions.map(profession => (
              <option key={profession} value={profession}>{profession}</option>
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
            placeholder="Nome, email, telefone..."
          />
        </div>
      </div>

      {/* Estatísticas dos Clientes */}
      <div className="clients-stats">
        <div className="stat-item">
          <span className="stat-number">{clients.length}</span>
          <span className="stat-label">Total de Clientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{clients.filter(c => c.status === 'active').length}</span>
          <span className="stat-label">Clientes Ativos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pets.length}</span>
          <span className="stat-label">Total de Pets</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{uniqueCities.length}</span>
          <span className="stat-label">Cidades Atendidas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {clients.filter(c => {
              const registrationDate = new Date(c.registrationDate);
              const thisMonth = new Date();
              return registrationDate.getMonth() === thisMonth.getMonth() && 
                     registrationDate.getFullYear() === thisMonth.getFullYear();
            }).length}
          </span>
          <span className="stat-label">Novos Este Mês</span>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="clients-table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contato</th>
              <th>Endereço</th>
              <th>Pets</th>
              <th>Consultas</th>
              <th>Última Consulta</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => {
              const clientPets = getClientPets(client.id);
              const clientAppointments = getClientAppointments(client.id);
              const lastAppointment = getLastAppointment(client.id);
              
              return (
                <tr key={client.id}>
                  <td>
                    <div className="client-info">
                      <div className="client-avatar">
                        {client.name.charAt(0)}
                      </div>
                      <div className="client-details">
                        <span className="client-name">{client.name}</span>
                        <span className="client-age">{calculateAge(client.birthDate)}</span>
                        <span className="client-profession">{client.profession}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span className="email">{client.email}</span>
                      <span className="phone">{formatPhone(client.phone)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="address-info">
                      <span className="address">{client.address}</span>
                      <span className="city-state">{client.city}, {client.state}</span>
                    </div>
                  </td>
                  <td>
                    <div className="pets-info">
                      <span className="pets-count">{clientPets.length} pet(s)</span>
                      <div className="pets-list">
                        {clientPets.slice(0, 2).map(pet => (
                          <span key={pet.id} className="pet-name">{pet.name}</span>
                        ))}
                        {clientPets.length > 2 && (
                          <span className="more-pets">+{clientPets.length - 2} mais</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="appointments-info">
                      <span className="appointments-count">{clientAppointments.length}</span>
                    </div>
                  </td>
                  <td>
                    <span className="last-appointment">
                      {lastAppointment ? formatDate(lastAppointment.date) : 'Nunca'}
                    </span>
                  </td>
                  <td>
                    <div className="status-controls">
                      <span className={`status-badge ${client.status}`}>
                        {client.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                      <button 
                        className={`toggle-status-btn ${client.status}`}
                        onClick={() => handleToggleClientStatus(client.id)}
                        title={client.status === 'active' ? 'Desativar cliente' : 'Ativar cliente'}
                      >
                        {client.status === 'active' ? '🔒' : '🔓'}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="action-btn view" 
                        onClick={() => handleViewClient(client)}
                        title="Visualizar"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit" 
                        onClick={() => handleEditClient(client)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete" 
                        onClick={() => handleDeleteClient(client.id)}
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal de Cliente */}
      {showClientModal && (
        <div className="modal-overlay" onClick={() => setShowClientModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</h3>
              <button className="modal-close" onClick={() => setShowClientModal(false)}>×</button>
            </div>
            
            <form className="client-form" onSubmit={handleSaveClient}>
              <div className="form-sections">
                {/* Informações Pessoais */}
                <div className="form-section">
                  <h4>Informações Pessoais</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={clientForm.name}
                        onChange={handleFormChange}
                        placeholder="Nome completo do cliente"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={clientForm.email}
                        onChange={handleFormChange}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Telefone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={clientForm.phone}
                        onChange={handleFormChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Data de Nascimento</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={clientForm.birthDate}
                        onChange={handleFormChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Profissão</label>
                      <input
                        type="text"
                        name="profession"
                        value={clientForm.profession}
                        onChange={handleFormChange}
                        placeholder="Profissão do cliente"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={clientForm.status}
                        onChange={handleFormChange}
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="form-section">
                  <h4>Endereço</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>CEP</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={clientForm.zipCode}
                        onChange={handleZipCodeChange}
                        placeholder="00000-000"
                        maxLength="8"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Estado</label>
                      <select
                        name="state"
                        value={clientForm.state}
                        onChange={handleFormChange}
                      >
                        <option value="">Selecione o estado</option>
                        {brazilianStates.map(state => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Endereço</label>
                      <input
                        type="text"
                        name="address"
                        value={clientForm.address}
                        onChange={handleFormChange}
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={clientForm.city}
                        onChange={handleFormChange}
                        placeholder="Nome da cidade"
                      />
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="form-section">
                  <h4>Observações</h4>
                  <div className="form-group full-width">
                    <textarea
                      name="notes"
                      value={clientForm.notes}
                      onChange={handleFormChange}
                      placeholder="Observações sobre o cliente..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowClientModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingClient ? 'Salvar Alterações' : 'Cadastrar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Cliente */}
      {showClientDetailsModal && viewingClient && (
        <div className="modal-overlay" onClick={() => setShowClientDetailsModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes do Cliente - {viewingClient.name}</h3>
              <button className="modal-close" onClick={() => setShowClientDetailsModal(false)}>×</button>
            </div>
            
            <div className="client-details-content">
              <div className="client-details-grid">
                {/* Informações Pessoais */}
                <div className="details-section">
                  <h4>Informações Pessoais</h4>
                  <div className="details-item">
                    <span className="label">Nome:</span>
                    <span className="value">{viewingClient.name}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Email:</span>
                    <span className="value">{viewingClient.email}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Telefone:</span>
                    <span className="value">{formatPhone(viewingClient.phone)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Idade:</span>
                    <span className="value">{calculateAge(viewingClient.birthDate)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Profissão:</span>
                    <span className="value">{viewingClient.profession}</span>
                  </div>
                </div>

                {/* Endereço */}
                <div className="details-section">
                  <h4>Endereço</h4>
                  <div className="details-item">
                    <span className="label">CEP:</span>
                    <span className="value">{formatZipCode(viewingClient.zipCode)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Endereço:</span>
                    <span className="value">{viewingClient.address}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Cidade:</span>
                    <span className="value">{viewingClient.city}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Estado:</span>
                    <span className="value">{viewingClient.state}</span>
                  </div>
                </div>

                {/* Status e Atividade */}
                <div className="details-section">
                  <h4>Status e Atividade</h4>
                  <div className="details-item">
                    <span className="label">Status:</span>
                    <span className={`value status-${viewingClient.status}`}>
                      {viewingClient.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="details-item">
                    <span className="label">Data de Cadastro:</span>
                    <span className="value">{formatDate(viewingClient.registrationDate)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Total de Pets:</span>
                    <span className="value">{getClientPets(viewingClient.id).length}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Total de Consultas:</span>
                    <span className="value">{getClientAppointments(viewingClient.id).length}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Última Consulta:</span>
                    <span className="value">
                      {(() => {
                        const lastAppt = getLastAppointment(viewingClient.id);
                        return lastAppt ? formatDate(lastAppt.date) : 'Nunca';
                      })()}
                    </span>
                  </div>
                </div>

                {/* Pets do Cliente */}
                <div className="details-section full-width">
                  <h4>Pets do Cliente</h4>
                  {(() => {
                    const clientPets = getClientPets(viewingClient.id);
                    return clientPets.length > 0 ? (
                      <div className="pets-grid">
                        {clientPets.map(pet => (
                          <div key={pet.id} className="pet-card">
                            <div className="pet-avatar">
                              {pet.species === 'Cão' ? '🐕' : pet.species === 'Gato' ? '🐱' : '🐾'}
                            </div>
                            <div className="pet-info">
                              <h5>{pet.name}</h5>
                              <p>{pet.species} - {pet.breed}</p>
                              <p>Idade: {Math.floor((new Date() - new Date(pet.birthDate)) / (365.25 * 24 * 60 * 60 * 1000))} anos</p>
                              <p>Peso: {pet.weight}kg</p>
                              {pet.lastConsultation && (
                                <span className="last-consultation">
                                  Última consulta: {formatDate(pet.lastConsultation)}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-pets">Este cliente ainda não possui pets cadastrados.</p>
                    );
                  })()}
                </div>

                {/* Observações */}
                <div className="details-section full-width">
                  <h4>Observações</h4>
                  <p className="notes-text">
                    {viewingClient.notes || 'Nenhuma observação registrada.'}
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

export default Clients;