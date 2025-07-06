import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  // Função para garantir IDs únicos
  const ensureUniqueIds = (array, prefix = '') => {
    return array.map((item, index) => ({
      ...item,
      id: item.id || `${prefix}${Date.now()}_${index}`
    }));
  };

  // Inicializar dados simulados
  useEffect(() => {
    console.log('🔄 DataContext: Inicializando dados...');

    const initialClients = [
      { id: 1, name: 'Maria Silva Santos', email: 'maria.santos@email.com', phone: '(11) 99999-9999', whatsapp: '(11) 99999-9999', cpf: '123.456.789-00', birthDate: '1985-03-15', address: { street: 'Rua das Flores, 123', neighborhood: 'Jardim Paulista', city: 'São Paulo', state: 'SP', zipCode: '01234-567' }, status: 'ativo', registrationDate: '2024-01-15', lastAppointment: '2024-11-28', totalPets: 2, totalAppointments: 8, notes: 'Cliente muito cuidadosa com os pets. Sempre pontual nas consultas.', emergencyContact: { name: 'João Silva', phone: '(11) 88888-8888', relationship: 'Esposo' }, totalSpent: 960 },
      { id: 2, name: 'João Santos Oliveira', email: 'joao.oliveira@email.com', phone: '(21) 88888-8888', whatsapp: '(21) 88888-8888', cpf: '987.654.321-00', birthDate: '1978-07-22', address: { street: 'Av. Copacabana, 456', neighborhood: 'Copacabana', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22070-001' }, status: 'ativo', registrationDate: '2024-02-20', lastAppointment: '2024-12-01', totalPets: 1, totalAppointments: 5, notes: 'Cliente novo, muito interessado em nutrição natural.', emergencyContact: { name: 'Ana Oliveira', phone: '(21) 77777-7777', relationship: 'Filha' }, totalSpent: 600 },
      { id: 3, name: 'Ana Costa Lima', email: 'ana.lima@email.com', phone: '(31) 77777-7777', whatsapp: '(31) 77777-7777', cpf: '456.789.123-00', birthDate: '1990-12-05', address: { street: 'Rua da Liberdade, 789', neighborhood: 'Savassi', city: 'Belo Horizonte', state: 'MG', zipCode: '30112-000' }, status: 'ativo', registrationDate: '2024-03-10', lastAppointment: '2024-09-15', totalPets: 3, totalAppointments: 12, notes: 'Cliente com múltiplos pets. Prefere consultas aos sábados.', emergencyContact: { name: 'Pedro Lima', phone: '(31) 66666-6666', relationship: 'Irmão' }, totalSpent: 1440 },
      { id: 4, name: 'Pedro Lima Ferreira', email: 'pedro.ferreira@email.com', phone: '(71) 66666-6666', whatsapp: '(71) 66666-6666', cpf: '789.123.456-00', birthDate: '1982-09-18', address: { street: 'Rua do Pelourinho, 321', neighborhood: 'Pelourinho', city: 'Salvador', state: 'BA', zipCode: '40026-280' }, status: 'ativo', registrationDate: '2024-04-05', lastAppointment: '2024-11-30', totalPets: 1, totalAppointments: 3, notes: 'Cliente recente, muito atencioso com o pet.', emergencyContact: { name: 'Carla Ferreira', phone: '(71) 55555-5555', relationship: 'Esposa' }, totalSpent: 360 },
      { id: 5, name: 'Carla Oliveira Santos', email: 'carla.santos@email.com', phone: '(85) 55555-5555', whatsapp: '(85) 55555-5555', cpf: '321.654.987-00', birthDate: '1987-11-30', address: { street: 'Av. Beira Mar, 654', neighborhood: 'Meireles', city: 'Fortaleza', state: 'CE', zipCode: '60165-121' }, status: 'ativo', registrationDate: '2024-05-12', lastAppointment: '2024-12-02', totalPets: 2, totalAppointments: 6, notes: 'Cliente muito dedicada. Sempre segue as orientações nutricionais.', emergencyContact: { name: 'Roberto Santos', phone: '(85) 44444-4444', relationship: 'Pai' }, totalSpent: 720 },
      { id: 6, name: 'Roberto Silva', email: 'roberto.silva@email.com', phone: '(11) 98765-4321', whatsapp: '(11) 98765-4321', cpf: '654.321.987-00', birthDate: '1975-08-10', address: { street: 'Rua Augusta, 987', neighborhood: 'Consolação', city: 'São Paulo', state: 'SP', zipCode: '01305-100' }, status: 'ativo', registrationDate: '2024-06-15', lastAppointment: '2024-11-25', totalPets: 1, totalAppointments: 4, notes: 'Cliente pontual e organizado.', emergencyContact: { name: 'Lucia Silva', phone: '(11) 87654-3210', relationship: 'Esposa' }, totalSpent: 480 },
      { id: 7, name: 'Fernanda Costa', email: 'fernanda.costa@email.com', phone: '(21) 91234-5678', whatsapp: '(21) 91234-5678', cpf: '147.258.369-00', birthDate: '1992-04-20', address: { street: 'Rua Ipanema, 456', neighborhood: 'Ipanema', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22420-040' }, status: 'ativo', registrationDate: '2024-07-08', lastAppointment: '2024-11-20', totalPets: 2, totalAppointments: 7, notes: 'Cliente muito carinhosa com os pets.', emergencyContact: { name: 'Carlos Costa', phone: '(21) 98765-4321', relationship: 'Irmão' }, totalSpent: 840 },
      { id: 8, name: 'Carlos Mendes', email: 'carlos.mendes@email.com', phone: '(11) 87654-3210', whatsapp: '(11) 87654-3210', cpf: '963.852.741-00', birthDate: '1988-12-03', address: { street: 'Av. Paulista, 1000', neighborhood: 'Bela Vista', city: 'São Paulo', state: 'SP', zipCode: '01310-100' }, status: 'ativo', registrationDate: '2024-08-12', lastAppointment: '2024-10-15', totalPets: 1, totalAppointments: 2, notes: 'Cliente novo no sistema.', emergencyContact: { name: 'Ana Mendes', phone: '(11) 76543-2109', relationship: 'Mãe' }, totalSpent: 240 }
    ];

    const initialPets = [
      { id: 101, name: 'Rex', type: 'Cão', breed: 'Golden Retriever', age: 5, weight: 30, clientId: 1, clientName: 'Maria Silva Santos', status: 'ativo', registrationDate: '2024-01-15', lastConsultation: '2024-11-28', medicalHistory: 'Histórico de sobrepeso, dieta controlada.', notes: 'Pet muito dócil e obediente.' },
      { id: 102, name: 'Bella', type: 'Cão', breed: 'Labrador', age: 3, weight: 25, clientId: 1, clientName: 'Maria Silva Santos', status: 'ativo', registrationDate: '2024-01-15', lastConsultation: '2024-10-20', medicalHistory: 'Sem histórico relevante.', notes: 'Pet ativo e brincalhão.' },
      { id: 103, name: 'Mimi', type: 'Gato', breed: 'Persa', age: 4, weight: 4, clientId: 2, clientName: 'João Santos Oliveira', status: 'ativo', registrationDate: '2024-02-20', lastConsultation: '2024-12-01', medicalHistory: 'Histórico de problemas renais.', notes: 'Gata muito carinhosa.' },
      { id: 104, name: 'Thor', type: 'Cão', breed: 'Pastor Alemão', age: 7, weight: 35, clientId: 3, clientName: 'Ana Costa Lima', status: 'ativo', registrationDate: '2024-03-10', lastConsultation: '2024-09-15', medicalHistory: 'Displasia de quadril.', notes: 'Cão muito protetor.' },
      { id: 105, name: 'Luna', type: 'Gato', breed: 'Siamês', age: 2, weight: 3, clientId: 3, clientName: 'Ana Costa Lima', status: 'ativo', registrationDate: '2024-03-10', lastConsultation: '2024-08-10', medicalHistory: 'Sem histórico relevante.', notes: 'Gata muito ativa.' },
      { id: 106, name: 'Max', type: 'Cão', breed: 'Bulldog', age: 6, weight: 22, clientId: 3, clientName: 'Ana Costa Lima', status: 'ativo', registrationDate: '2024-03-10', lastConsultation: '2024-07-05', medicalHistory: 'Problemas respiratórios.', notes: 'Cão calmo e tranquilo.' },
      { id: 107, name: 'Simba', type: 'Gato', breed: 'Maine Coon', age: 5, weight: 6, clientId: 4, clientName: 'Pedro Lima Ferreira', status: 'ativo', registrationDate: '2024-04-05', lastConsultation: '2024-11-30', medicalHistory: 'Sem histórico relevante.', notes: 'Gato muito grande e imponente.' },
      { id: 108, name: 'Lola', type: 'Cão', breed: 'Poodle', age: 4, weight: 8, clientId: 5, clientName: 'Carla Oliveira Santos', status: 'ativo', registrationDate: '2024-05-12', lastConsultation: '2024-12-02', medicalHistory: 'Alergias alimentares.', notes: 'Cadela muito inteligente.' },
      { id: 109, name: 'Nina', type: 'Gato', breed: 'Ragdoll', age: 3, weight: 5, clientId: 5, clientName: 'Carla Oliveira Santos', status: 'ativo', registrationDate: '2024-05-12', lastConsultation: '2024-11-15', medicalHistory: 'Sem histórico relevante.', notes: 'Gata muito dócil.' },
      { id: 110, name: 'Duke', type: 'Cão', breed: 'Rottweiler', age: 8, weight: 45, clientId: 6, clientName: 'Roberto Silva', status: 'ativo', registrationDate: '2024-06-15', lastConsultation: '2024-11-25', medicalHistory: 'Artrite nas articulações.', notes: 'Cão muito leal.' },
      { id: 111, name: 'Mel', type: 'Gato', breed: 'Angorá', age: 6, weight: 4, clientId: 7, clientName: 'Fernanda Costa', status: 'ativo', registrationDate: '2024-07-08', lastConsultation: '2024-11-20', medicalHistory: 'Problemas de pele.', notes: 'Gata muito vaidosa.' },
      { id: 112, name: 'Zeus', type: 'Cão', breed: 'Doberman', age: 4, weight: 32, clientId: 7, clientName: 'Fernanda Costa', status: 'ativo', registrationDate: '2024-07-08', lastConsultation: '2024-10-30', medicalHistory: 'Sem histórico relevante.', notes: 'Cão muito atlético.' },
      { id: 113, name: 'Princesa', type: 'Gato', breed: 'Persa', age: 7, weight: 4, clientId: 8, clientName: 'Carlos Mendes', status: 'ativo', registrationDate: '2024-08-12', lastConsultation: '2024-10-15', medicalHistory: 'Problemas respiratórios.', notes: 'Gata muito elegante.' }
    ];

    const initialAppointments = [
      { id: 1001, petId: 101, petName: 'Rex', petType: 'Cão', clientId: 1, clientName: 'Maria Silva Santos', clientPhone: '(11) 99999-9999', date: '2024-12-06', time: '09:00', duration: 60, status: 'confirmado', type: 'consulta_nutricional', price: 120.00, consultant: 'Dr. Carlos Veterinário', notes: 'Primeira consulta nutricional. Pet com sobrepeso.', createdAt: '2024-12-01', observations: '' },
      { id: 1002, petId: 103, petName: 'Mimi', petType: 'Gato', clientId: 2, clientName: 'João Santos Oliveira', clientPhone: '(21) 88888-8888', date: '2024-12-06', time: '10:30', duration: 45, status: 'confirmado', type: 'retorno', price: 80.00, consultant: 'Dr. Carlos Veterinário', notes: 'Retorno para avaliação da dieta prescrita.', createdAt: '2024-12-02', observations: '' },
      { id: 1003, petId: 104, petName: 'Thor', petType: 'Cão', clientId: 3, clientName: 'Ana Costa Lima', clientPhone: '(31) 77777-7777', date: '2024-12-06', time: '14:00', duration: 60, status: 'concluido', type: 'consulta_nutricional', price: 120.00, consultant: 'Dr. Carlos Veterinário', notes: 'Consulta para cão idoso. Necessita dieta especial.', createdAt: '2024-12-03', observations: 'Cliente muito satisfeito com o atendimento.' },
      { id: 1004, petId: 105, petName: 'Luna', petType: 'Gato', clientId: 3, clientName: 'Ana Costa Lima', clientPhone: '(31) 77777-7777', date: '2024-12-07', time: '09:30', duration: 45, status: 'agendado', type: 'orientacao_nutricional', price: 100.00, consultant: 'Dr. Carlos Veterinário', notes: 'Orientação nutricional para gata jovem.', createdAt: '2024-12-04', observations: '' },
      { id: 1005, petId: 108, petName: 'Lola', petType: 'Cão', clientId: 5, clientName: 'Carla Oliveira Santos', clientPhone: '(85) 55555-5555', date: '2024-12-07', time: '15:30', duration: 60, status: 'agendado', type: 'consulta_nutricional', price: 120.00, consultant: 'Dr. Carlos Veterinário', notes: 'Consulta para cadela com alergias alimentares.', createdAt: '2024-12-05', observations: '' },
      { id: 1006, petId: 110, petName: 'Duke', petType: 'Cão', clientId: 6, clientName: 'Roberto Silva', clientPhone: '(11) 98765-4321', date: '2024-12-08', time: '10:00', duration: 60, status: 'agendado', type: 'consulta_nutricional', price: 120.00, consultant: 'Dr. Carlos Veterinário', notes: 'Consulta para cão idoso com artrite.', createdAt: '2024-12-01', observations: '' },
      { id: 1007, petId: 102, petName: 'Bella', petType: 'Cão', clientId: 1, clientName: 'Maria Silva Santos', clientPhone: '(11) 99999-9999', date: '2024-12-09', time: '11:00', duration: 45, status: 'agendado', type: 'retorno', price: 80.00, consultant: 'Dr. Carlos Veterinário', notes: 'Retorno para avaliação do peso.', createdAt: '2024-12-02', observations: '' },
      { id: 1008, petId: 111, petName: 'Mel', petType: 'Gato', clientId: 7, clientName: 'Fernanda Costa', clientPhone: '(21) 91234-5678', date: '2024-12-09', time: '14:30', duration: 60, status: 'agendado', type: 'consulta_nutricional', price: 120.00, consultant: 'Dr. Carlos Veterinário', notes: 'Consulta para gata com problemas de pele.', createdAt: '2024-12-03', observations: '' },
      { id: 1009, petId: 107, petName: 'Simba', petType: 'Gato', clientId: 4, clientName: 'Pedro Lima Ferreira', clientPhone: '(71) 66666-6666', date: '2024-12-10', time: '09:00', duration: 45, status: 'agendado', type: 'orientacao_nutricional', price: 100.00, consultant: 'Dr. Carlos Veterinário', notes: 'Orientação nutricional para gato grande.', createdAt: '2024-12-04', observations: '' },
      { id: 1010, petId: 112, petName: 'Zeus', petType: 'Cão', clientId: 7, clientName: 'Fernanda Costa', clientPhone: '(21) 91234-5678', date: '2024-12-10', time: '16:00', duration: 60, status: 'agendado', type: 'consulta_nutricional', price: 120.00, consultant: 'Dr. Carlos Veterinário', notes: 'Consulta para cão atlético.', createdAt: '2024-12-05', observations: '' }
    ];

    const initialUsers = [
      { id: 501, name: 'Admin Sistema', email: 'admin@naturavet.com', role: 'admin', status: 'ativo', createdAt: '2024-01-01', lastLogin: '2024-12-06' },
      { id: 502, name: 'Dr. Carlos Veterinário', email: 'carlos@naturavet.com', role: 'consultor', status: 'ativo', createdAt: '2024-01-15', lastLogin: '2024-12-05' },
      { id: 503, name: 'Editor Conteúdo', email: 'editor@naturavet.com', role: 'editor', status: 'ativo', createdAt: '2024-02-01', lastLogin: '2024-12-04' }
    ];

    // Verificar e garantir IDs únicos
    const uniqueClients = ensureUniqueIds(initialClients, 'client_');
    const uniquePets = ensureUniqueIds(initialPets, 'pet_');
    const uniqueAppointments = ensureUniqueIds(initialAppointments, 'appointment_');
    const uniqueUsers = ensureUniqueIds(initialUsers, 'user_');

    console.log('✅ DataContext: Dados inicializados', {
      clients: uniqueClients.length,
      pets: uniquePets.length,
      appointments: uniqueAppointments.length,
      users: uniqueUsers.length
    });

    setClients(uniqueClients);
    setPets(uniquePets);
    setAppointments(uniqueAppointments);
    setUsers(uniqueUsers);
  }, []); // ✅ Array vazio para executar apenas uma vez

  // Funções para manipular agendamentos
  const addAppointment = (appointment) => {
    const pet = pets.find(p => p.id === parseInt(appointment.petId));
    const client = clients.find(c => c.id === pet?.clientId);
    
    const newAppointment = {
      ...appointment,
      id: Math.max(...appointments.map(a => a.id), 0) + 1,
      petId: parseInt(appointment.petId),
      clientId: pet?.clientId,
      petName: pet?.name,
      petType: pet?.type,
      clientName: client?.name,
      clientPhone: client?.phone,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    console.log('➕ DataContext: Adicionando agendamento:', newAppointment.id);
    setAppointments(prev => [...prev, newAppointment]);
    
    // Atualizar contador de agendamentos do cliente
    if (client) {
      updateClient(client.id, {
        totalAppointments: appointments.filter(a => a.clientId === client.id).length + 1,
        lastAppointment: appointment.date
      });
    }
    
    return newAppointment;
  };

  const updateAppointment = (id, updatedAppointment) => {
    const pet = pets.find(p => p.id === parseInt(updatedAppointment.petId));
    const client = clients.find(c => c.id === pet?.clientId);
    
    const fullUpdatedAppointment = {
      ...updatedAppointment,
      petId: parseInt(updatedAppointment.petId),
      clientId: pet?.clientId,
      petName: pet?.name,
      petType: pet?.type,
      clientName: client?.name,
      clientPhone: client?.phone
    };
    
    console.log('🔄 DataContext: Atualizando agendamento:', id);
    setAppointments(prev => prev.map(appointment => 
      appointment.id === id ? { ...appointment, ...fullUpdatedAppointment } : appointment
    ));
  };

  const deleteAppointment = (id) => {
    console.log('🗑️ DataContext: Removendo agendamento:', id);
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
  };

  // Outras funções CRUD (simplificadas)
  const addClient = (client) => {
    const newClient = {
      ...client,
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      registrationDate: new Date().toISOString().split('T')[0],
      totalPets: 0,
      totalAppointments: 0,
      totalSpent: 0
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const updateClient = (id, updatedClient) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updatedClient } : client
    ));
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  const addPet = (pet) => {
    const newPet = {
      ...pet,
      id: Math.max(...pets.map(p => p.id), 0) + 1,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'ativo'
    };
    setPets(prev => [...prev, newPet]);
    return newPet;
  };

  const updatePet = (id, updatedPet) => {
    setPets(prev => prev.map(pet => 
      pet.id === id ? { ...pet, ...updatedPet } : pet
    ));
  };

  const deletePet = (id) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
  };

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id, updatedUser) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updatedUser } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const value = {
    // Dados
    clients,
    pets,
    appointments,
    users,
    
    // Funções de clientes
    addClient,
    updateClient,
    deleteClient,
    
    // Funções de pets
    addPet,
    updatePet,
    deletePet,
    
    // Funções de agendamentos
    addAppointment,
    updateAppointment,
    deleteAppointment,
    
    // Funções de usuários
    addUser,
    updateUser,
    deleteUser
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};