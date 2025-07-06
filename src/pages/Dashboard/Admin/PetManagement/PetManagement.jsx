import React, { useState, useEffect } from 'react';

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterClient, setFilterClient] = useState('all');

  // Dados iniciais simulados
  useEffect(() => {
    const initialClients = [
      { id: 1, name: 'Maria Silva', email: 'maria@email.com' },
      { id: 2, name: 'João Santos', email: 'joao@email.com' },
      { id: 3, name: 'Ana Costa', email: 'ana@email.com' },
      { id: 4, name: 'Pedro Lima', email: 'pedro@email.com' },
      { id: 5, name: 'Carla Oliveira', email: 'carla@email.com' },
    ];

    const initialPets = [
      { 
        id: 1, 
        name: 'Rex', 
        type: 'Cão', 
        breed: 'Golden Retriever', 
        clientId: 1,
        clientName: 'Maria Silva',
        age: 3,
        weight: 25.5,
        color: 'Dourado',
        gender: 'Macho',
        birthDate: '2021-03-15',
        microchip: 'MC123456789',
        vaccinated: true,
        neutered: true,
        observations: 'Pet muito dócil e brincalhão',
        createdAt: '2024-01-15',
        photo: null
      },
      { 
        id: 2, 
        name: 'Mimi', 
        type: 'Gato', 
        breed: 'Persa', 
        clientId: 2,
        clientName: 'João Santos',
        age: 2,
        weight: 4.2,
        color: 'Branco',
        gender: 'Fêmea',
        birthDate: '2022-06-20',
        microchip: 'MC987654321',
        vaccinated: true,
        neutered: false,
        observations: 'Gata muito carinhosa, gosta de colo',
        createdAt: '2024-02-20',
        photo: null
      },
      { 
        id: 3, 
        name: 'Thor', 
        type: 'Cão', 
        breed: 'Pastor Alemão', 
        clientId: 3,
        clientName: 'Ana Costa',
        age: 5,
        weight: 35.0,
        color: 'Preto e Marrom',
        gender: 'Macho',
        birthDate: '2019-08-10',
        microchip: 'MC456789123',
        vaccinated: true,
        neutered: true,
        observations: 'Cão de guarda, muito protetor',
        createdAt: '2024-03-10',
        photo: null
      },
      { 
        id: 4, 
        name: 'Luna', 
        type: 'Gato', 
        breed: 'Siamês', 
        clientId: 4,
        clientName: 'Pedro Lima',
        age: 1,
        weight: 3.8,
        color: 'Creme e Marrom',
        gender: 'Fêmea',
        birthDate: '2023-05-12',
        microchip: 'MC789123456',
        vaccinated: true,
        neutered: false,
        observations: 'Gatinha muito ativa e curiosa',
        createdAt: '2024-04-05',
        photo: null
      },
    ];

    setClients(initialClients);
    setPets(initialPets);
    setFilteredPets(initialPets);
  }, []);

  // Filtrar pets
  useEffect(() => {
    let filtered = pets;

    if (searchTerm) {
      filtered = filtered.filter(pet => 
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(pet => pet.type === filterType);
    }

    if (filterClient !== 'all') {
      filtered = filtered.filter(pet => pet.clientId === parseInt(filterClient));
    }

    setFilteredPets(filtered);
  }, [pets, searchTerm, filterType, filterClient]);

  // Funções CRUD
  const handleCreate = () => {
    setModalMode('create');
    setSelectedPet({
      name: '',
      type: 'Cão',
      breed: '',
      clientId: '',
      age: '',
      weight: '',
      color: '',
      gender: 'Macho',
      birthDate: '',
      microchip: '',
      vaccinated: false,
      neutered: false,
      observations: '',
      photo: null
    });
    setShowModal(true);
  };

  const handleEdit = (pet) => {
    setModalMode('edit');
    setSelectedPet({ ...pet });
    setShowModal(true);
  };

  const handleView = (pet) => {
    setModalMode('view');
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleDelete = (petId) => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      setPets(pets.filter(pet => pet.id !== petId));
    }
  };

  const handleSave = () => {
    if (!selectedPet.name || !selectedPet.breed || !selectedPet.clientId) {
      alert('Nome, raça e cliente são obrigatórios!');
      return;
    }

    const selectedClient = clients.find(c => c.id === parseInt(selectedPet.clientId));
    if (!selectedClient) {
      alert('Cliente selecionado não encontrado!');
      return;
    }

    if (modalMode === 'create') {
      const newPet = {
        ...selectedPet,
        id: Math.max(...pets.map(p => p.id)) + 1,
        clientId: parseInt(selectedPet.clientId),
        clientName: selectedClient.name,
        age: parseInt(selectedPet.age) || 0,
        weight: parseFloat(selectedPet.weight) || 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPets([...pets, newPet]);
    } else if (modalMode === 'edit') {
      const updatedPet = {
        ...selectedPet,
        clientId: parseInt(selectedPet.clientId),
        clientName: selectedClient.name,
        age: parseInt(selectedPet.age) || 0,
        weight: parseFloat(selectedPet.weight) || 0
      };
      setPets(pets.map(pet => 
        pet.id === selectedPet.id ? updatedPet : pet
      ));
    }

    setShowModal(false);
    setSelectedPet(null);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    return Math.floor(ageInMonths / 12);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Cão': return '🐕';
      case 'Gato': return '🐱';
      case 'Pássaro': return '🐦';
      case 'Coelho': return '🐰';
      case 'Hamster': return '🐹';
      default: return '🐾';
    }
  };

  const getGenderIcon = (gender) => {
    return gender === 'Macho' ? '♂️' : '♀️';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🐾 Gerenciamento de Pets</h1>
        <p style={{ color: '#666' }}>Gerencie todos os pets cadastrados no sistema</p>
      </div>

      {/* Filtros e Busca */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        alignItems: 'end'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            🔍 Buscar
          </label>
          <input
            type="text"
            placeholder="Nome, raça ou tutor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            🐾 Tipo
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todos os tipos</option>
            <option value="Cão">Cão</option>
            <option value="Gato">Gato</option>
            <option value="Pássaro">Pássaro</option>
            <option value="Coelho">Coelho</option>
            <option value="Hamster">Hamster</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            👤 Cliente
          </label>
          <select
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todos os clientes</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={handleCreate}
            style={{
              background: '#FC5A8D',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#e54a7a'}
            onMouseLeave={(e) => e.target.style.background = '#FC5A8D'}
          >
            ➕ Novo Pet
          </button>
        </div>
      </div>

      {/* Estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📊 Total</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {filteredPets.length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🐕 Cães</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
            {filteredPets.filter(pet => pet.type === 'Cão').length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🐱 Gatos</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffc107', margin: 0 }}>
            {filteredPets.filter(pet => pet.type === 'Gato').length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>💉 Vacinados</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#17a2b8', margin: 0 }}>
            {filteredPets.filter(pet => pet.vaccinated).length}
          </p>
        </div>
      </div>

      {/* Cards de Pets */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '1.5rem'
      }}>
        {filteredPets.map(pet => (
          <div key={pet.id} style={{ 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          }}>
            {/* Header do Card */}
            <div style={{ 
              background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
              color: 'white',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                {getTypeIcon(pet.type)}
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                {pet.name} {getGenderIcon(pet.gender)}
              </h3>
              <p style={{ margin: 0, opacity: 0.9 }}>
                {pet.breed} • {pet.age} {pet.age === 1 ? 'ano' : 'anos'}
              </p>
            </div>

            {/* Conteúdo do Card */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  <strong>👤 Tutor:</strong> {pet.clientName}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  <strong>⚖️ Peso:</strong> {pet.weight}kg
                </p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                  <strong>🎨 Cor:</strong> {pet.color}
                </p>
              </div>

              {/* Status */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}>
                <span style={{ 
                  background: pet.vaccinated ? '#28a745' : '#dc3545',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {pet.vaccinated ? '💉 Vacinado' : '❌ Não Vacinado'}
                </span>
                <span style={{ 
                  background: pet.neutered ? '#17a2b8' : '#ffc107',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {pet.neutered ? '✂️ Castrado' : '🔄 Não Castrado'}
                </span>
              </div>

              {/* Observações */}
              {pet.observations && (
                <div style={{ 
                  background: '#f8f9fa',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  marginBottom: '1rem'
                }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.85rem', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    "{pet.observations}"
                  </p>
                </div>
              )}

              {/* Ações */}
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => handleView(pet)}
                  style={{ 
                    background: 'none', 
                    border: '1px solid #17a2b8', 
                    color: '#17a2b8', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#17a2b8';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#17a2b8';
                  }}
                >
                  👁️ Ver
                </button>
                <button
                  onClick={() => handleEdit(pet)}
                  style={{ 
                    background: 'none', 
                    border: '1px solid #FC5A8D', 
                    color: '#FC5A8D', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#FC5A8D';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#FC5A8D';
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(pet.id)}
                  style={{ 
                    background: 'none', 
                    border: '1px solid #dc3545', 
                    color: '#dc3545', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#dc3545';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#dc3545';
                  }}
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div style={{ 
          background: 'white',
          padding: '3rem', 
          textAlign: 'center', 
          color: '#666',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐾</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Nenhum pet encontrado</p>
          <p>Tente ajustar os filtros ou cadastrar um novo pet</p>
        </div>
      )}

      {/* Modal */}
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>
              {modalMode === 'create' && '➕ Novo Pet'}
              {modalMode === 'edit' && '✏️ Editar Pet'}
              {modalMode === 'view' && '👁️ Visualizar Pet'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {/* Informações Básicas */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📋 Informações Básicas</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Nome do Pet *
                  </label>
                  <input
                    type="text"
                    value={selectedPet?.name || ''}
                    onChange={(e) => setSelectedPet({...selectedPet, name: e.target.value})}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Tipo *
                  </label>
                  <select
                    value={selectedPet?.type || 'Cão'}
                    onChange={(e) => setSelectedPet({...selectedPet, type: e.target.value})}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white'
                    }}
                  >
                    <option value="Cão">🐕 Cão</option>
                    <option value="Gato">🐱 Gato</option>
                    <option value="Pássaro">🐦 Pássaro</option>
                    <option value="Coelho">🐰 Coelho</option>
                    <option value="Hamster">🐹 Hamster</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Raça *
                  </label>
                  <input
                    type="text"
                    value={selectedPet?.breed || ''}
                    onChange={(e) => setSelectedPet({...selectedPet, breed: e.target.value})}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Cliente *
                  </label>
                  <select
                    value={selectedPet?.clientId || ''}
                    onChange={(e) => setSelectedPet({...selectedPet, clientId: e.target.value})}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white'
                    }}
                  >
                    <option value="">Selecione um cliente</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Sexo
                    </label>
                    <select
                      value={selectedPet?.gender || 'Macho'}
                      onChange={(e) => setSelectedPet({...selectedPet, gender: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    >
                      <option value="Macho">♂️ Macho</option>
                      <option value="Fêmea">♀️ Fêmea</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Cor
                    </label>
                    <input
                      type="text"
                      value={selectedPet?.color || ''}
                      onChange={(e) => setSelectedPet({...selectedPet, color: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Informações Detalhadas */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📊 Informações Detalhadas</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={selectedPet?.birthDate || ''}
                      onChange={(e) => {
                        const age = calculateAge(e.target.value);
                        setSelectedPet({...selectedPet, birthDate: e.target.value, age});
                      }}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={selectedPet?.weight || ''}
                      onChange={(e) => setSelectedPet({...selectedPet, weight: e.target.value})}
                      disabled={modalMode === 'view'}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        background: modalMode === 'view' ? '#f8f9fa' : 'white'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Microchip
                  </label>
                  <input
                    type="text"
                    value={selectedPet?.microchip || ''}
                    onChange={(e) => setSelectedPet({...selectedPet, microchip: e.target.value})}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: modalMode === 'view' ? 'default' : 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedPet?.vaccinated || false}
                        onChange={(e) => setSelectedPet({...selectedPet, vaccinated: e.target.checked})}
                        disabled={modalMode === 'view'}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontWeight: '600' }}>💉 Vacinado</span>
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: modalMode === 'view' ? 'default' : 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedPet?.neutered || false}
                        onChange={(e) => setSelectedPet({...selectedPet, neutered: e.target.checked})}
                        disabled={modalMode === 'view'}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span style={{ fontWeight: '600' }}>✂️ Castrado</span>
                    </label>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Observações
                  </label>
                  <textarea
                    value={selectedPet?.observations || ''}
                    onChange={(e) => setSelectedPet({...selectedPet, observations: e.target.value})}
                    disabled={modalMode === 'view'}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      background: modalMode === 'view' ? '#f8f9fa' : 'white',
                      resize: 'vertical'
                    }}
                    placeholder="Informações adicionais sobre o pet..."
                  />
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '2rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {modalMode === 'view' ? 'Fechar' : 'Cancelar'}
              </button>
              
              {modalMode !== 'view' && (
                <button
                  onClick={handleSave}
                  style={{
                    background: '#FC5A8D',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {modalMode === 'create' ? 'Cadastrar Pet' : 'Salvar Alterações'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetManagement;