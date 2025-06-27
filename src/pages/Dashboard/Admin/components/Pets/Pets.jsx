import React, { useState } from 'react';
import { petSpecies, petGenders } from '../../data';
import '../../../../../styles/pages/admin/Pets.css';

const Pets = ({ pets, setPets, clients, appointments }) => {
  const [showPetModal, setShowPetModal] = useState(false);
  const [showPetDetailsModal, setShowPetDetailsModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [viewingPet, setViewingPet] = useState(null);
  const [filters, setFilters] = useState({
    species: '',
    gender: '',
    vaccinated: '',
    neutered: '',
    clientId: '',
    search: ''
  });
  
  const [petForm, setPetForm] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    weight: '',
    color: '',
    gender: '',
    clientId: '',
    microchip: '',
    vaccinated: false,
    neutered: false,
    allergies: '',
    medications: '',
    dietaryRestrictions: '',
    status: 'active',
    notes: ''
  });

  const handleCreatePet = () => {
    setEditingPet(null);
    setPetForm({
      name: '',
      species: '',
      breed: '',
      birthDate: '',
      weight: '',
      color: '',
      gender: '',
      clientId: '',
      microchip: '',
      vaccinated: false,
      neutered: false,
      allergies: '',
      medications: '',
      dietaryRestrictions: '',
      status: 'active',
      notes: ''
    });
    setShowPetModal(true);
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      birthDate: pet.birthDate,
      weight: pet.weight,
      color: pet.color,
      gender: pet.gender,
      clientId: pet.clientId,
      microchip: pet.microchip,
      vaccinated: pet.vaccinated,
      neutered: pet.neutered,
      allergies: pet.allergies,
      medications: pet.medications,
      dietaryRestrictions: pet.dietaryRestrictions,
      status: pet.status,
      notes: pet.notes
    });
    setShowPetModal(true);
  };

  const handleViewPet = (pet) => {
    setViewingPet(pet);
    setShowPetDetailsModal(true);
  };

  const handleDeletePet = (petId) => {
    const petAppointments = appointments.filter(apt => {
      const pet = pets.find(p => p.id === petId);
      return pet && apt.petName === pet.name;
    });

    if (petAppointments.length > 0) {
      const confirmMessage = `Este pet possui ${petAppointments.length} agendamento(s). Tem certeza que deseja excluir? Todos os dados relacionados serão perdidos.`;
      if (!window.confirm(confirmMessage)) return;
    } else {
      if (!window.confirm('Tem certeza que deseja excluir este pet?')) return;
    }

    setPets(pets.filter(pet => pet.id !== petId));
  };

  const handleTogglePetStatus = (petId) => {
    setPets(pets.map(pet => 
      pet.id === petId 
        ? { ...pet, status: pet.status === 'active' ? 'inactive' : 'active' }
        : pet
    ));
  };

  const handleSavePet = (e) => {
    e.preventDefault();
    
    // Validar microchip único se fornecido
    if (petForm.microchip) {
      const microchipExists = pets.some(pet => 
        pet.microchip === petForm.microchip && 
        pet.id !== editingPet?.id
      );
      
      if (microchipExists) {
        alert('Este microchip já está cadastrado para outro pet!');
        return;
      }
    }
    
    if (editingPet) {
      // Editar pet existente
      const updatedPet = {
        ...editingPet,
        ...petForm,
        registrationDate: editingPet.registrationDate
      };
      
      setPets(pets.map(pet => 
        pet.id === editingPet.id ? updatedPet : pet
      ));
    } else {
      // Criar novo pet
      const newPet = {
        id: Math.max(...pets.map(pet => pet.id), 0) + 1,
        ...petForm,
        registrationDate: new Date().toISOString().split('T')[0],
        totalConsultations: 0,
        lastConsultation: null
      };
      setPets([...pets, newPet]);
    }
    
    setShowPetModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setPetForm(prev => ({
      ...prev,
      clientId
    }));
  };

  // Filtrar pets
  const filteredPets = pets.filter(pet => {
    if (filters.species && pet.species !== filters.species) return false;
    if (filters.gender && pet.gender !== filters.gender) return false;
    if (filters.vaccinated && pet.vaccinated.toString() !== filters.vaccinated) return false;
    if (filters.neutered && pet.neutered.toString() !== filters.neutered) return false;
    if (filters.clientId && pet.clientId.toString() !== filters.clientId) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const client = clients.find(c => c.id === pet.clientId);
      const clientName = client ? client.name.toLowerCase() : '';
      return (
        pet.name.toLowerCase().includes(searchLower) ||
        pet.species.toLowerCase().includes(searchLower) ||
        pet.breed.toLowerCase().includes(searchLower) ||
        pet.color.toLowerCase().includes(searchLower) ||
        clientName.includes(searchLower)
      );
    }
    return true;
  });

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths = Math.floor((today - birth) / (30.44 * 24 * 60 * 60 * 1000));
    
    if (ageInMonths < 12) {
      return `${ageInMonths} meses`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} anos e ${months} meses` : `${years} anos`;
    }
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  const getPetAppointments = (petId) => {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return [];
    return appointments.filter(apt => apt.petName === pet.name);
  };

  const getLastConsultation = (petId) => {
    const petAppointments = getPetAppointments(petId);
    if (petAppointments.length === 0) return null;
    
    return petAppointments
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  const getPetIcon = (species) => {
    const icons = {
      'Cão': '🐕',
      'Gato': '🐱',
      'Pássaro': '🐦',
      'Coelho': '🐰',
      'Hamster': '🐹',
      'Chinchila': '🐭',
      'Ferret': '🦔',
      'Outros': '🐾'
    };
    return icons[species] || '🐾';
  };

  // Obter listas únicas para filtros
  const uniqueSpecies = [...new Set(pets.map(pet => pet.species))].filter(Boolean);
  const uniqueBreeds = [...new Set(pets.map(pet => pet.breed))].filter(Boolean);

  return (
    <div className="pets-management">
      <div className="section-header">
        <h2>Gerenciar Pets</h2>
        <button className="btn-primary" onClick={handleCreatePet}>
          + Novo Pet
        </button>
      </div>

      {/* Filtros */}
      <div className="pets-filters">
        <div className="filter-group">
          <label>Espécie:</label>
          <select name="species" value={filters.species} onChange={handleFilterChange}>
            <option value="">Todas</option>
            {uniqueSpecies.map(species => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Gênero:</label>
          <select name="gender" value={filters.gender} onChange={handleFilterChange}>
            <option value="">Todos</option>
            {petGenders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Vacinado:</label>
          <select name="vaccinated" value={filters.vaccinated} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Castrado:</label>
          <select name="neutered" value={filters.neutered} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Cliente:</label>
          <select name="clientId" value={filters.clientId} onChange={handleFilterChange}>
            <option value="">Todos</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
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
            placeholder="Nome, raça, cor, tutor..."
          />
        </div>
      </div>

      {/* Estatísticas dos Pets */}
      <div className="pets-stats">
        <div className="stat-item">
          <span className="stat-number">{pets.length}</span>
          <span className="stat-label">Total de Pets</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pets.filter(p => p.status === 'active').length}</span>
          <span className="stat-label">Pets Ativos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pets.filter(p => p.species === 'Cão').length}</span>
          <span className="stat-label">Cães</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pets.filter(p => p.species === 'Gato').length}</span>
          <span className="stat-label">Gatos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pets.filter(p => p.vaccinated).length}</span>
          <span className="stat-label">Vacinados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{pets.filter(p => p.neutered).length}</span>
          <span className="stat-label">Castrados</span>
        </div>
      </div>

      {/* Lista de Pets */}
      <div className="pets-table-container">
        <table className="pets-table">
          <thead>
            <tr>
              <th>Pet</th>
              <th>Tutor</th>
              <th>Espécie/Raça</th>
              <th>Idade/Peso</th>
              <th>Vacinação</th>
              <th>Consultas</th>
              <th>Última Consulta</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => {
              const petAppointments = getPetAppointments(pet.id);
              const lastConsultation = getLastConsultation(pet.id);
              
              return (
                <tr key={pet.id}>
                  <td>
                    <div className="pet-info">
                      <div className="pet-avatar">
                        {getPetIcon(pet.species)}
                      </div>
                      <div className="pet-details">
                        <span className="pet-name">{pet.name}</span>
                        <span className="pet-gender">{pet.gender}</span>
                        <span className="pet-color">{pet.color}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="owner-info">
                      <span className="owner-name">{getClientName(pet.clientId)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="species-info">
                      <span className="species">{pet.species}</span>
                      <span className="breed">{pet.breed}</span>
                    </div>
                  </td>
                  <td>
                    <div className="age-weight-info">
                      <span className="age">{calculateAge(pet.birthDate)}</span>
                      <span className="weight">{pet.weight}kg</span>
                    </div>
                  </td>
                  <td>
                    <div className="vaccination-info">
                      <span className={`vaccination-status ${pet.vaccinated ? 'vaccinated' : 'not-vaccinated'}`}>
                        {pet.vaccinated ? 'Vacinado' : 'Não vacinado'}
                      </span>
                      <span className={`neutered-status ${pet.neutered ? 'neutered' : 'not-neutered'}`}>
                        {pet.neutered ? 'Castrado' : 'Não castrado'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="consultations-info">
                      <span className="consultations-count">{petAppointments.length}</span>
                    </div>
                  </td>
                  <td>
                    <span className="last-consultation">
                      {lastConsultation ? formatDate(lastConsultation.date) : 'Nunca'}
                    </span>
                  </td>
                  <td>
                    <div className="status-controls">
                      <span className={`status-badge ${pet.status}`}>
                        {pet.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                      <button 
                        className={`toggle-status-btn ${pet.status}`}
                        onClick={() => handleTogglePetStatus(pet.id)}
                        title={pet.status === 'active' ? 'Desativar pet' : 'Ativar pet'}
                      >
                        {pet.status === 'active' ? '🔒' : '🔓'}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="action-btn view" 
                        onClick={() => handleViewPet(pet)}
                        title="Visualizar"
                      >
                        👁️
                      </button>
                      <button 
                        className="action-btn edit" 
                        onClick={() => handleEditPet(pet)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="action-btn delete" 
                        onClick={() => handleDeletePet(pet.id)}
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

      {/* Modal de Pet */}
      {showPetModal && (
        <div className="modal-overlay" onClick={() => setShowPetModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPet ? 'Editar Pet' : 'Novo Pet'}</h3>
              <button className="modal-close" onClick={() => setShowPetModal(false)}>×</button>
            </div>
            
            <form className="pet-form" onSubmit={handleSavePet}>
              <div className="form-sections">
                {/* Informações Básicas */}
                <div className="form-section">
                  <h4>Informações Básicas</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome do Pet *</label>
                      <input
                        type="text"
                        name="name"
                        value={petForm.name}
                        onChange={handleFormChange}
                        placeholder="Nome do pet"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Tutor *</label>
                      <select
                        name="clientId"
                        value={petForm.clientId}
                        onChange={handleClientChange}
                        required
                      >
                        <option value="">Selecione o tutor</option>
                        {clients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name} - {client.email}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Espécie *</label>
                      <select
                        name="species"
                        value={petForm.species}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Selecione a espécie</option>
                        {petSpecies.map(species => (
                          <option key={species} value={species}>{species}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Raça *</label>
                      <input
                        type="text"
                        name="breed"
                        value={petForm.breed}
                        onChange={handleFormChange}
                        placeholder="Raça do pet"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Data de Nascimento</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={petForm.birthDate}
                        onChange={handleFormChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Peso (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        value={petForm.weight}
                        onChange={handleFormChange}
                        placeholder="0.0"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Cor</label>
                      <input
                        type="text"
                        name="color"
                        value={petForm.color}
                        onChange={handleFormChange}
                        placeholder="Cor do pet"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Gênero *</label>
                      <select
                        name="gender"
                        value={petForm.gender}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Selecione o gênero</option>
                        {petGenders.map(gender => (
                          <option key={gender} value={gender}>{gender}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Microchip</label>
                      <input
                        type="text"
                        name="microchip"
                        value={petForm.microchip}
                        onChange={handleFormChange}
                        placeholder="Número do microchip"
                        maxLength="15"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        name="status"
                        value={petForm.status}
                        onChange={handleFormChange}
                      >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Informações de Saúde */}
                <div className="form-section">
                  <h4>Informações de Saúde</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <div className="checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="vaccinated"
                            checked={petForm.vaccinated}
                            onChange={handleFormChange}
                          />
                          Pet vacinado
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="neutered"
                            checked={petForm.neutered}
                            onChange={handleFormChange}
                          />
                          Pet castrado
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Alergias</label>
                      <textarea
                        name="allergies"
                        value={petForm.allergies}
                        onChange={handleFormChange}
                        placeholder="Descreva as alergias conhecidas..."
                        rows="2"
                      ></textarea>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Medicações Atuais</label>
                      <textarea
                        name="medications"
                        value={petForm.medications}
                        onChange={handleFormChange}
                        placeholder="Liste as medicações em uso..."
                        rows="2"
                      ></textarea>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Restrições Alimentares</label>
                      <textarea
                        name="dietaryRestrictions"
                        value={petForm.dietaryRestrictions}
                        onChange={handleFormChange}
                        placeholder="Descreva as restrições alimentares..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="form-section">
                  <h4>Observações</h4>
                  <div className="form-group full-width">
                    <textarea
                      name="notes"
                      value={petForm.notes}
                      onChange={handleFormChange}
                      placeholder="Observações gerais sobre o pet..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowPetModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingPet ? 'Salvar Alterações' : 'Cadastrar Pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Pet */}
      {showPetDetailsModal && viewingPet && (
        <div className="modal-overlay" onClick={() => setShowPetDetailsModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes do Pet - {viewingPet.name}</h3>
              <button className="modal-close" onClick={() => setShowPetDetailsModal(false)}>×</button>
            </div>
            
            <div className="pet-details-content">
              <div className="pet-details-grid">
                {/* Informações Básicas */}
                <div className="details-section">
                  <h4>Informações Básicas</h4>
                  <div className="details-item">
                    <span className="label">Nome:</span>
                    <span className="value">{viewingPet.name}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Espécie:</span>
                    <span className="value">{viewingPet.species}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Raça:</span>
                    <span className="value">{viewingPet.breed}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Gênero:</span>
                    <span className="value">{viewingPet.gender}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Cor:</span>
                    <span className="value">{viewingPet.color}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Idade:</span>
                    <span className="value">{calculateAge(viewingPet.birthDate)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Peso:</span>
                    <span className="value">{viewingPet.weight}kg</span>
                  </div>
                </div>

                {/* Informações do Tutor */}
                <div className="details-section">
                  <h4>Informações do Tutor</h4>
                  {(() => {
                    const client = clients.find(c => c.id === viewingPet.clientId);
                    return client ? (
                      <>
                        <div className="details-item">
                          <span className="label">Nome:</span>
                          <span className="value">{client.name}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Email:</span>
                          <span className="value">{client.email}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Telefone:</span>
                          <span className="value">{client.phone}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Endereço:</span>
                          <span className="value">{client.address}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Cidade:</span>
                          <span className="value">{client.city}, {client.state}</span>
                        </div>
                      </>
                    ) : (
                      <p>Cliente não encontrado</p>
                    );
                  })()}
                </div>

                {/* Status e Identificação */}
                <div className="details-section">
                  <h4>Status e Identificação</h4>
                  <div className="details-item">
                    <span className="label">Status:</span>
                    <span className={`value status-${viewingPet.status}`}>
                      {viewingPet.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="details-item">
                    <span className="label">Microchip:</span>
                    <span className="value">{viewingPet.microchip || 'Não informado'}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Vacinado:</span>
                    <span className={`value ${viewingPet.vaccinated ? 'status-active' : 'status-inactive'}`}>
                      {viewingPet.vaccinated ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="details-item">
                    <span className="label">Castrado:</span>
                    <span className={`value ${viewingPet.neutered ? 'status-active' : 'status-inactive'}`}>
                      {viewingPet.neutered ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="details-item">
                    <span className="label">Data de Cadastro:</span>
                    <span className="value">{formatDate(viewingPet.registrationDate)}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Total de Consultas:</span>
                    <span className="value">{getPetAppointments(viewingPet.id).length}</span>
                  </div>
                  <div className="details-item">
                    <span className="label">Última Consulta:</span>
                    <span className="value">
                      {(() => {
                        const lastConsult = getLastConsultation(viewingPet.id);
                        return lastConsult ? formatDate(lastConsult.date) : 'Nunca';
                      })()}
                    </span>
                  </div>
                </div>

                {/* Informações Médicas */}
                <div className="details-section full-width">
                  <h4>Informações Médicas</h4>
                  <div className="medical-info">
                    <div className="medical-item">
                      <h5>Alergias</h5>
                      <p>{viewingPet.allergies || 'Nenhuma alergia conhecida.'}</p>
                    </div>
                    <div className="medical-item">
                      <h5>Medicações Atuais</h5>
                      <p>{viewingPet.medications || 'Nenhuma medicação atual.'}</p>
                    </div>
                    <div className="medical-item">
                      <h5>Restrições Alimentares</h5>
                      <p>{viewingPet.dietaryRestrictions || 'Nenhuma restrição alimentar.'}</p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="details-section full-width">
                  <h4>Observações</h4>
                  <p className="notes-text">
                    {viewingPet.notes || 'Nenhuma observação registrada.'}
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

export default Pets;