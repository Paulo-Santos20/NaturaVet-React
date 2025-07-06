import React, { useState, useEffect } from 'react';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCity, setFilterCity] = useState('all');

  // Dados iniciais simulados
  useEffect(() => {
    const initialClients = [
      {
        id: 1,
        name: 'Maria Silva Santos',
        email: 'maria.santos@email.com',
        phone: '(11) 99999-9999',
        whatsapp: '(11) 99999-9999',
        cpf: '123.456.789-00',
        birthDate: '1985-03-15',
        address: {
          street: 'Rua das Flores, 123',
          neighborhood: 'Jardim Paulista',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        },
        status: 'ativo',
        registrationDate: '2024-01-15',
        lastAppointment: '2024-11-28',
        totalPets: 2,
        totalAppointments: 8,
        notes: 'Cliente muito cuidadosa com os pets. Sempre pontual nas consultas.',
        emergencyContact: {
          name: 'João Silva',
          phone: '(11) 88888-8888',
          relationship: 'Esposo'
        }
      },
      {
        id: 2,
        name: 'João Santos Oliveira',
        email: 'joao.oliveira@email.com',
        phone: '(21) 88888-8888',
        whatsapp: '(21) 88888-8888',
        cpf: '987.654.321-00',
        birthDate: '1978-07-22',
        address: {
          street: 'Av. Copacabana, 456',
          neighborhood: 'Copacabana',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zipCode: '22070-001'
        },
        status: 'ativo',
        registrationDate: '2024-02-20',
        lastAppointment: '2024-12-01',
        totalPets: 1,
        totalAppointments: 5,
        notes: 'Cliente novo, muito interessado em nutrição natural.',
        emergencyContact: {
          name: 'Ana Oliveira',
          phone: '(21) 77777-7777',
          relationship: 'Filha'
        }
      },
      {
        id: 3,
        name: 'Ana Costa Lima',
        email: 'ana.lima@email.com',
        phone: '(31) 77777-7777',
        whatsapp: '(31) 77777-7777',
        cpf: '456.789.123-00',
        birthDate: '1990-12-05',
        address: {
          street: 'Rua da Liberdade, 789',
          neighborhood: 'Savassi',
          city: 'Belo Horizonte',
          state: 'MG',
          zipCode: '30112-000'
        },
        status: 'inativo',
        registrationDate: '2024-03-10',
        lastAppointment: '2024-09-15',
        totalPets: 3,
        totalAppointments: 12,
        notes: 'Cliente com múltiplos pets. Prefere consultas aos sábados.',
        emergencyContact: {
          name: 'Pedro Lima',
          phone: '(31) 66666-6666',
          relationship: 'Irmão'
        }
      },
      {
        id: 4,
        name: 'Pedro Lima Ferreira',
        email: 'pedro.ferreira@email.com',
        phone: '(71) 66666-6666',
        whatsapp: '(71) 66666-6666',
        cpf: '789.123.456-00',
        birthDate: '1982-09-18',
        address: {
          street: 'Rua do Pelourinho, 321',
          neighborhood: 'Pelourinho',
          city: 'Salvador',
          state: 'BA',
          zipCode: '40026-280'
        },
        status: 'ativo',
        registrationDate: '2024-04-05',
        lastAppointment: '2024-11-30',
        totalPets: 1,
        totalAppointments: 3,
        notes: 'Cliente recente, muito atencioso com o pet.',
        emergencyContact: {
          name: 'Carla Ferreira',
          phone: '(71) 55555-5555',
          relationship: 'Esposa'
        }
      },
      {
        id: 5,
        name: 'Carla Oliveira Santos',
        email: 'carla.santos@email.com',
        phone: '(85) 55555-5555',
        whatsapp: '(85) 55555-5555',
        cpf: '321.654.987-00',
        birthDate: '1987-11-30',
        address: {
          street: 'Av. Beira Mar, 654',
          neighborhood: 'Meireles',
          city: 'Fortaleza',
          state: 'CE',
          zipCode: '60165-121'
        },
        status: 'ativo',
        registrationDate: '2024-05-12',
        lastAppointment: '2024-12-02',
        totalPets: 2,
        totalAppointments: 6,
        notes: 'Cliente muito dedicada. Sempre segue as orientações nutricionais.',
        emergencyContact: {
          name: 'Roberto Santos',
          phone: '(85) 44444-4444',
          relationship: 'Pai'
        }
      }
    ];

    setClients(initialClients);
    setFilteredClients(initialClients);
  }, []);

  // Filtrar clientes
  useEffect(() => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.cpf.includes(searchTerm)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(client => client.status === filterStatus);
    }

    if (filterCity !== 'all') {
      filtered = filtered.filter(client => client.address.city === filterCity);
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, filterStatus, filterCity]);

  // Obter lista de cidades únicas
  const uniqueCities = [...new Set(clients.map(client => client.address.city))];

  // Funções CRUD
  const handleCreate = () => {
    setModalMode('create');
    setSelectedClient({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      cpf: '',
      birthDate: '',
      address: {
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      },
      status: 'ativo',
      notes: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    });
    setShowModal(true);
  };

  const handleEdit = (client) => {
    setModalMode('edit');
    setSelectedClient({ ...client });
    setShowModal(true);
  };

  const handleView = (client) => {
    setModalMode('view');
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleDelete = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    if (client.totalPets > 0) {
      alert('Não é possível excluir um cliente que possui pets cadastrados!');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const handleSave = () => {
    if (!selectedClient.name || !selectedClient.email || !selectedClient.phone) {
      alert('Nome, email e telefone são obrigatórios!');
      return;
    }

    if (modalMode === 'create') {
      const newClient = {
        ...selectedClient,
        id: Math.max(...clients.map(c => c.id)) + 1,
        registrationDate: new Date().toISOString().split('T')[0],
        lastAppointment: 'Nunca',
        totalPets: 0,
        totalAppointments: 0
      };
      setClients([...clients, newClient]);
    } else if (modalMode === 'edit') {
      setClients(clients.map(client =>
        client.id === selectedClient.id ? selectedClient : client
      ));
    }

    setShowModal(false);
    setSelectedClient(null);
  };

  const toggleStatus = (clientId) => {
    setClients(clients.map(client =>
      client.id === clientId
        ? { ...client, status: client.status === 'ativo' ? 'inativo' : 'ativo' }
        : client
    ));
  };

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>👥 Gerenciamento de Clientes</h1>
        <p style={{ color: '#666' }}>Gerencie todos os clientes e suas informações</p>
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
            placeholder="Nome, email, telefone ou CPF..."
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
            📊 Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            🏙️ Cidade
          </label>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">Todas as cidades</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
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
            ➕ Novo Cliente
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
            {filteredClients.length}
          </p>
        </div>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>✅ Ativos</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
            {filteredClients.filter(c => c.status === 'ativo').length}
          </p>
        </div>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🐾 Total Pets</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#17a2b8', margin: 0 }}>
            {filteredClients.reduce((sum, client) => sum + client.totalPets, 0)}
          </p>
        </div>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📅 Consultas</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffc107', margin: 0 }}>
            {filteredClients.reduce((sum, client) => sum + client.totalAppointments, 0)}
          </p>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div style={{
        display: 'grid',
        gap: '1rem'
      }}>
        {filteredClients.map(client => (
          <div key={client.id} style={{
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
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1rem', alignItems: 'center' }}>
                {/* Avatar e Info Principal */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FC5A8D, #e54a7a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}>
                    {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>{client.name}</h3>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                      📧 {client.email}
                    </p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      📱 {client.phone}
                    </p>
                  </div>
                </div>

                {/* Informações Centrais */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                      Cidade
                    </p>
                    <p style={{ margin: 0, fontWeight: '600', color: '#333' }}>
                      {client.address.city}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                      Pets
                    </p>
                    <p style={{ margin: 0, fontWeight: '600', color: '#FC5A8D' }}>
                      {client.totalPets}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                      Consultas
                    </p>
                    <p style={{ margin: 0, fontWeight: '600', color: '#28a745' }}>
                      {client.totalAppointments}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>
                      Status
                    </p>
                    <button
                      onClick={() => toggleStatus(client.id)}
                      style={{
                        background: client.status === 'ativo' ? '#28a745' : '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {client.status === 'ativo' ? '✅ Ativo' : '❌ Inativo'}
                    </button>
                  </div>
                </div>

                {/* Ações */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleView(client)}
                    style={{
                      background: 'none',
                      border: '1px solid #17a2b8',
                      color: '#17a2b8',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
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
                    title="Visualizar"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleEdit(client)}
                    style={{
                      background: 'none',
                      border: '1px solid #FC5A8D',
                      color: '#FC5A8D',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
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
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    style={{
                      background: 'none',
                      border: '1px solid #dc3545',
                      color: '#dc3545',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
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
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f0f0f0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: '0.85rem',
                color: '#666'
              }}>
                <div>
                  <strong>📍 Endereço:</strong> {client.address.street}, {client.address.neighborhood}
                </div>
                <div>
                  <strong>🆔 CPF:</strong> {client.cpf}
                </div>
                <div>
                  <strong>📅 Cadastro:</strong> {new Date(client.registrationDate).toLocaleDateString('pt-BR')}
                </div>
                <div>
                  <strong>🕒 Última Consulta:</strong> {client.lastAppointment === 'Nunca' ? 'Nunca' : new Date(client.lastAppointment).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div style={{
          background: 'white',
          padding: '3rem',
          textAlign: 'center',
          color: '#666',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Nenhum cliente encontrado</p>
          <p>Tente ajustar os filtros ou cadastrar um novo cliente</p>
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
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>
              {modalMode === 'create' && '➕ Novo Cliente'}
              {modalMode === 'edit' && '✏️ Editar Cliente'}
              {modalMode === 'view' && '👁️ Visualizar Cliente'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Informações Pessoais */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>👤 Informações Pessoais</h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.name || ''}
                    onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
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
                    Email *
                  </label>
                  <input
                    type="email"
                    value={selectedClient?.email || ''}
                    onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Telefone *
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.phone || ''}
                      onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
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
                      WhatsApp
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.whatsapp || ''}
                      onChange={(e) => setSelectedClient({ ...selectedClient, whatsapp: e.target.value })}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      CPF
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.cpf || ''}
                      onChange={(e) => setSelectedClient({ ...selectedClient, cpf: e.target.value })}
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
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={selectedClient?.birthDate || ''}
                      onChange={(e) => setSelectedClient({ ...selectedClient, birthDate: e.target.value })}
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
                    Status
                  </label>
                  <select
                    value={selectedClient?.status || 'ativo'}
                    onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}
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
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              </div>

              {/* Endereço e Contato de Emergência */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📍 Endereço</h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Rua e Número
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.address?.street || ''}
                    onChange={(e) => setSelectedClient({
                      ...selectedClient,
                      address: { ...selectedClient.address, street: e.target.value }
                    })}
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
                    Bairro
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.address?.neighborhood || ''}
                    onChange={(e) => setSelectedClient({
                      ...selectedClient,
                      address: { ...selectedClient.address, neighborhood: e.target.value }
                    })}
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.address?.city || ''}
                      onChange={(e) => setSelectedClient({
                        ...selectedClient,
                        address: { ...selectedClient.address, city: e.target.value }
                      })}
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
                      Estado
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.address?.state || ''}
                      onChange={(e) => setSelectedClient({
                        ...selectedClient,
                        address: { ...selectedClient.address, state: e.target.value }
                      })}
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

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    CEP
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.address?.zipCode || ''}
                    onChange={(e) => setSelectedClient({
                      ...selectedClient,
                      address: { ...selectedClient.address, zipCode: e.target.value }
                    })}
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

                <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>🚨 Contato de Emergência</h3>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    value={selectedClient?.emergencyContact?.name || ''}
                    onChange={(e) => setSelectedClient({
                      ...selectedClient,
                      emergencyContact: { ...selectedClient.emergencyContact, name: e.target.value }
                    })}
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Telefone
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.emergencyContact?.phone || ''}
                      onChange={(e) => setSelectedClient({
                        ...selectedClient,
                        emergencyContact: { ...selectedClient.emergencyContact, phone: e.target.value }
                      })}
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
                      Parentesco
                    </label>
                    <input
                      type="text"
                      value={selectedClient?.emergencyContact?.relationship || ''}
                      onChange={(e) => setSelectedClient({
                        ...selectedClient,
                        emergencyContact: { ...selectedClient.emergencyContact, relationship: e.target.value }
                      })}
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
            </div>

            {/* Observações */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#FC5A8D' }}>📝 Observações</h3>
              <textarea
                value={selectedClient?.notes || ''}
                onChange={(e) => setSelectedClient({ ...selectedClient, notes: e.target.value })}
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
                placeholder="Informações adicionais sobre o cliente..."
              />
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
                  {modalMode === 'create' ? 'Cadastrar Cliente' : 'Salvar Alterações'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;