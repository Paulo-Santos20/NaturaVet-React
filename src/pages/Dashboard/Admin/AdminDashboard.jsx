import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/pages/AdminDashboard.css';

const AdminDashboard = ({ user, activeTab }) => {
  // Estados para modais
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showClientDetailsModal, setShowClientDetailsModal] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showPetDetailsModal, setShowPetDetailsModal] = useState(false);
  
  // Estados para edição
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [viewingPet, setViewingPet] = useState(null);

  // Formulários
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    duration: '30',
    petName: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    consultationType: '',
    notes: '',
    status: 'pending'
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
    notes: ''
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
    vaccinated: true,
    neutered: false,
    allergies: '',
    medications: '',
    dietaryRestrictions: '',
    notes: ''
  });

  // Dados simulados de clientes
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      birthDate: '1985-05-15',
      profession: 'Professora',
      registrationDate: '2024-01-15',
      status: 'active',
      notes: 'Cliente muito cuidadosa com os pets',
      pets: [
        {
          id: 1,
          name: 'Luna',
          species: 'Cão',
          breed: 'Golden Retriever',
          age: '3 anos',
          weight: '28kg',
          lastConsultation: '2024-03-15'
        },
        {
          id: 2,
          name: 'Mel',
          species: 'Gato',
          breed: 'Siamês',
          age: '2 anos',
          weight: '4kg',
          lastConsultation: '2024-02-20'
        }
      ],
      totalAppointments: 8,
      lastAppointment: '2024-03-15'
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@email.com',
      phone: '(11) 88888-8888',
      address: 'Av. Paulista, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      birthDate: '1978-12-03',
      profession: 'Engenheiro',
      registrationDate: '2024-02-10',
      status: 'active',
      notes: 'Sempre pontual nos agendamentos',
      pets: [
        {
          id: 3,
          name: 'Rex',
          species: 'Cão',
          breed: 'Pastor Alemão',
          age: '5 anos',
          weight: '35kg',
          lastConsultation: '2024-03-10'
        }
      ],
      totalAppointments: 5,
      lastAppointment: '2024-03-10'
    },
    {
      id: 3,
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      address: 'Rua Augusta, 789',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000',
      birthDate: '1990-08-22',
      profession: 'Designer',
      registrationDate: '2024-03-01',
      status: 'active',
      notes: 'Primeira vez como tutora',
      pets: [
        {
          id: 4,
          name: 'Mimi',
          species: 'Gato',
          breed: 'Persa',
          age: '1 ano',
          weight: '3kg',
          lastConsultation: '2024-03-05'
        }
      ],
      totalAppointments: 2,
      lastAppointment: '2024-03-05'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      phone: '(11) 66666-6666',
      address: 'Rua Oscar Freire, 321',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001',
      birthDate: '1982-11-18',
      profession: 'Médico',
      registrationDate: '2023-12-15',
      status: 'inactive',
      notes: 'Cliente antigo, sem consultas recentes',
      pets: [
        {
          id: 5,
          name: 'Thor',
          species: 'Cão',
          breed: 'Rottweiler',
          age: '4 anos',
          weight: '45kg',
          lastConsultation: '2023-12-20'
        }
      ],
      totalAppointments: 12,
      lastAppointment: '2023-12-20'
    }
  ]);

  // Dados simulados de pets
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Luna',
      species: 'Cão',
      breed: 'Golden Retriever',
      birthDate: '2021-03-15',
      weight: '28',
      color: 'Dourado',
      gender: 'Fêmea',
      clientId: 1,
      clientName: 'Maria Silva',
      microchip: '123456789012345',
      vaccinated: true,
      neutered: true,
      allergies: 'Nenhuma alergia conhecida',
      medications: 'Nenhuma medicação atual',
      dietaryRestrictions: 'Ração premium para cães adultos',
      registrationDate: '2024-01-15',
      lastConsultation: '2024-03-15',
      totalConsultations: 8,
      status: 'active',
      notes: 'Pet muito dócil e bem cuidado'
    },
    {
      id: 2,
      name: 'Mel',
      species: 'Gato',
      breed: 'Siamês',
      birthDate: '2022-01-10',
      weight: '4',
      color: 'Seal Point',
      gender: 'Fêmea',
      clientId: 1,
      clientName: 'Maria Silva',
      microchip: '987654321098765',
      vaccinated: true,
      neutered: true,
      allergies: 'Sensível a frango',
      medications: 'Nenhuma medicação atual',
      dietaryRestrictions: 'Ração hipoalergênica',
      registrationDate: '2024-01-15',
      lastConsultation: '2024-02-20',
      totalConsultations: 5,
      status: 'active',
      notes: 'Gata muito carinhosa, mas tímida'
    },
    {
      id: 3,
      name: 'Rex',
      species: 'Cão',
      breed: 'Pastor Alemão',
      birthDate: '2019-08-22',
      weight: '35',
      color: 'Preto e Marrom',
      gender: 'Macho',
      clientId: 2,
      clientName: 'João Santos',
      microchip: '456789123456789',
      vaccinated: true,
      neutered: false,
      allergies: 'Nenhuma alergia conhecida',
      medications: 'Suplemento para articulações',
      dietaryRestrictions: 'Ração para cães grandes',
      registrationDate: '2024-02-10',
      lastConsultation: '2024-03-10',
      totalConsultations: 5,
      status: 'active',
      notes: 'Cão muito protetor e leal'
    },
    {
      id: 4,
      name: 'Mimi',
      species: 'Gato',
      breed: 'Persa',
      birthDate: '2023-02-14',
      weight: '3',
      color: 'Branco',
      gender: 'Fêmea',
      clientId: 3,
      clientName: 'Ana Costa',
      microchip: '789123456789123',
      vaccinated: true,
      neutered: false,
      allergies: 'Nenhuma alergia conhecida',
      medications: 'Nenhuma medicação atual',
      dietaryRestrictions: 'Ração para filhotes',
      registrationDate: '2024-03-01',
      lastConsultation: '2024-03-05',
      totalConsultations: 2,
      status: 'active',
      notes: 'Primeira vez como pet, muito brincalhona'
    },
    {
      id: 5,
      name: 'Thor',
      species: 'Cão',
      breed: 'Rottweiler',
      birthDate: '2020-05-30',
      weight: '45',
      color: 'Preto e Marrom',
      gender: 'Macho',
      clientId: 4,
      clientName: 'Carlos Oliveira',
      microchip: '321654987321654',
      vaccinated: false,
      neutered: true,
      allergies: 'Alergia a alguns tipos de ração',
      medications: 'Anti-inflamatório ocasional',
      dietaryRestrictions: 'Ração específica para alergias',
      registrationDate: '2023-12-15',
      lastConsultation: '2023-12-20',
      totalConsultations: 12,
      status: 'inactive',
      notes: 'Pet com histórico de alergias alimentares'
    }
  ]);

  // Dados simulados de agendamentos
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-27',
      time: '09:00',
      duration: 30,
      petName: 'Luna',
      ownerName: 'Maria Silva',
      ownerEmail: 'maria@email.com',
      ownerPhone: '(11) 99999-9999',
      consultationType: 'Consulta Nutricional',
      status: 'confirmed',
      notes: 'Primeira consulta para avaliação nutricional'
    },
    {
      id: 2,
      date: '2024-03-27',
      time: '10:30',
      duration: 60,
      petName: 'Rex',
      ownerName: 'João Santos',
      ownerEmail: 'joao@email.com',
      ownerPhone: '(11) 88888-8888',
      consultationType: 'Acompanhamento',
      status: 'pending',
      notes: 'Retorno para verificar progresso da dieta'
    },
    {
      id: 3,
      date: '2024-03-27',
      time: '14:00',
      duration: 45,
      petName: 'Mimi',
      ownerName: 'Ana Costa',
      ownerEmail: 'ana@email.com',
      ownerPhone: '(11) 77777-7777',
      consultationType: 'Primeira Consulta',
      status: 'confirmed',
      notes: 'Gato persa com problemas de peso'
    },
    {
      id: 4,
      date: '2024-03-28',
      time: '15:30',
      duration: 30,
      petName: 'Thor',
      ownerName: 'Carlos Oliveira',
      ownerEmail: 'carlos@email.com',
      ownerPhone: '(11) 66666-6666',
      consultationType: 'Reavaliação',
      status: 'confirmed',
      notes: 'Reavaliação após 30 dias de tratamento'
    }
  ]);

  // Configurações e dados estáticos
  const workingHours = {
    start: '08:00',
    end: '18:00',
    lunchBreak: {
      start: '12:00',
      end: '13:00'
    }
  };

  const consultationTypes = [
    { name: 'Consulta Nutricional', duration: 45 },
    { name: 'Primeira Consulta', duration: 60 },
    { name: 'Acompanhamento', duration: 30 },
    { name: 'Reavaliação', duration: 30 },
    { name: 'Consulta de Emergência', duration: 30 },
    { name: 'Orientação Alimentar', duration: 15 }
  ];

  const stats = [
    { title: 'Agendados Hoje', value: appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length.toString(), icon: '📅', change: '+2 desde ontem' },
    { title: 'Total de Clientes', value: clients.length.toString(), icon: '👥', change: '+12 este mês' },
    { title: 'Total de Pets', value: pets.length.toString(), icon: '🐕', change: '+18 este mês' }
  ];

  const recentMessages = [
    {
      id: 1,
      sender: 'Maria Silva',
      message: 'Gostaria de reagendar a consulta da Luna',
      time: '10 min atrás',
      unread: true
    },
    {
      id: 2,
      sender: 'Dr. João',
      message: 'Relatório do Rex está pronto',
      time: '25 min atrás',
      unread: true
    },
    {
      id: 3,
      sender: 'Ana Costa',
      message: 'Obrigada pelas orientações!',
      time: '1 hora atrás',
      unread: false
    },
    {
      id: 4,
      sender: 'Sistema',
      message: 'Backup realizado com sucesso',
      time: '2 horas atrás',
      unread: false
    }
  ];

  // Funções utilitárias
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const calculatePetAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12;
    ageInMonths -= birth.getMonth();
    ageInMonths += today.getMonth();
    
    if (today.getDate() < birth.getDate()) {
      ageInMonths--;
    }
    
    if (ageInMonths < 12) {
      return `${ageInMonths} ${ageInMonths === 1 ? 'mês' : 'meses'}`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      if (months === 0) {
        return `${years} ${years === 1 ? 'ano' : 'anos'}`;
      } else {
        return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`;
      }
    }
  };

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

  // Funções para agendamentos
  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date(`2000-01-01 ${workingHours.start}`);
    const end = new Date(`2000-01-01 ${workingHours.end}`);
    const lunchStart = new Date(`2000-01-01 ${workingHours.lunchBreak.start}`);
    const lunchEnd = new Date(`2000-01-01 ${workingHours.lunchBreak.end}`);

    let current = new Date(start);
    
    while (current < end) {
      const timeString = current.toTimeString().slice(0, 5);
      
      if (current < lunchStart || current >= lunchEnd) {
        slots.push(timeString);
      }
      
      current.setMinutes(current.getMinutes() + 15);
    }
    
    return slots;
  };

  const isTimeSlotOccupied = (date, time, duration, excludeId = null) => {
    const dateAppointments = appointments.filter(apt => 
      apt.date === date && apt.id !== excludeId
    );

    const requestedStart = new Date(`2000-01-01 ${time}`);
    const requestedEnd = new Date(requestedStart.getTime() + duration * 60000);

    return dateAppointments.some(apt => {
      const aptStart = new Date(`2000-01-01 ${apt.time}`);
      const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);

      return (requestedStart < aptEnd && requestedEnd > aptStart);
    });
  };

  const getAvailableTimeSlots = (date, duration) => {
    const allSlots = generateTimeSlots();
    const durationNum = parseInt(duration);
    
    return allSlots.filter(time => {
      const slotStart = new Date(`2000-01-01 ${time}`);
      const slotEnd = new Date(slotStart.getTime() + durationNum * 60000);
      const workEnd = new Date(`2000-01-01 ${workingHours.end}`);
      
      if (slotEnd > workEnd) return false;
      
      const lunchStart = new Date(`2000-01-01 ${workingHours.lunchBreak.start}`);
      const lunchEnd = new Date(`2000-01-01 ${workingHours.lunchBreak.end}`);
      
      if (slotStart < lunchEnd && slotEnd > lunchStart) return false;
      
      return !isTimeSlotOccupied(date, time, durationNum, editingAppointment?.id);
    });
  };

  const availableTimeSlots = appointmentForm.date && appointmentForm.duration 
    ? getAvailableTimeSlots(appointmentForm.date, appointmentForm.duration)
    : [];

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

  // Handlers para agendamentos
  const handleCreateAppointment = () => {
    setEditingAppointment(null);
    setAppointmentForm({
      date: '',
      time: '',
      duration: '30',
      petName: '',
      ownerName: '',
      ownerEmail: '',
      ownerPhone: '',
      consultationType: '',
      notes: '',
      status: 'pending'
    });
    setShowAppointmentModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration.toString(),
      petName: appointment.petName,
      ownerName: appointment.ownerName,
      ownerEmail: appointment.ownerEmail,
      ownerPhone: appointment.ownerPhone,
      consultationType: appointment.consultationType,
      notes: appointment.notes,
      status: appointment.status
    });
    setShowAppointmentModal(true);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    }
  };

  const handleSaveAppointment = (e) => {
    e.preventDefault();
    
    const formData = {
      ...appointmentForm,
      duration: parseInt(appointmentForm.duration)
    };
    
    if (editingAppointment) {
      setAppointments(appointments.map(apt => 
        apt.id === editingAppointment.id 
          ? { ...apt, ...formData }
          : apt
      ));
    } else {
      const newAppointment = {
        id: Math.max(...appointments.map(apt => apt.id)) + 1,
        ...formData
      };
      setAppointments([...appointments, newAppointment]);
    }
    
    setShowAppointmentModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'consultationType') {
      const selectedType = consultationTypes.find(type => type.name === value);
      setAppointmentForm(prev => ({
        ...prev,
        [name]: value,
        duration: selectedType ? selectedType.duration.toString() : prev.duration,
        time: ''
      }));
    } else if (name === 'duration' || name === 'date') {
      setAppointmentForm(prev => ({
        ...prev,
        [name]: value,
        time: ''
      }));
    } else {
      setAppointmentForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handlers para clientes
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
      notes: client.notes
    });
    setShowClientModal(true);
  };

  const handleViewClient = (client) => {
    setViewingClient(client);
    setShowClientDetailsModal(true);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const handleSaveClient = (e) => {
    e.preventDefault();
    
    if (editingClient) {
      setClients(clients.map(client => 
        client.id === editingClient.id 
          ? { ...client, ...clientForm }
          : client
      ));
    } else {
      const newClient = {
        id: Math.max(...clients.map(client => client.id)) + 1,
        ...clientForm,
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'active',
        pets: [],
        totalAppointments: 0,
        lastAppointment: null
      };
      setClients([...clients, newClient]);
    }
    
    setShowClientModal(false);
  };

  const handleClientFormChange = (e) => {
    const { name, value } = e.target;
    setClientForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handlers para pets
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
      vaccinated: true,
      neutered: false,
      allergies: '',
      medications: '',
      dietaryRestrictions: '',
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
      clientId: pet.clientId.toString(),
      microchip: pet.microchip,
      vaccinated: pet.vaccinated,
      neutered: pet.neutered,
      allergies: pet.allergies,
      medications: pet.medications,
      dietaryRestrictions: pet.dietaryRestrictions,
      notes: pet.notes
    });
    setShowPetModal(true);
  };

  const handleViewPet = (pet) => {
    setViewingPet(pet);
    setShowPetDetailsModal(true);
  };

  const handleDeletePet = (petId) => {
    if (window.confirm('Tem certeza que deseja excluir este pet? Esta ação não pode ser desfeita.')) {
      setPets(pets.filter(pet => pet.id !== petId));
    }
  };

  const handleSavePet = (e) => {
    e.preventDefault();
    
    const selectedClient = clients.find(client => client.id === parseInt(petForm.clientId));
    
    if (editingPet) {
      setPets(pets.map(pet => 
        pet.id === editingPet.id 
          ? { 
              ...pet, 
              ...petForm, 
              clientId: parseInt(petForm.clientId),
              clientName: selectedClient?.name || ''
            }
          : pet
      ));
    } else {
      const newPet = {
        id: Math.max(...pets.map(pet => pet.id)) + 1,
        ...petForm,
        clientId: parseInt(petForm.clientId),
        clientName: selectedClient?.name || '',
        registrationDate: new Date().toISOString().split('T')[0],
        lastConsultation: null,
        totalConsultations: 0,
        status: 'active'
      };
      setPets([...pets, newPet]);
    }
    
    setShowPetModal(false);
  };

  const handlePetFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPetForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Renderização do conteúdo
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
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
                            <div className="appointment-actions">
                              <button className="action-btn edit" onClick={() => handleEditAppointment(appointment)}>✏️</button>
                              <button className="action-btn delete" onClick={() => handleDeleteAppointment(appointment.id)}>🗑️</button>
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

      case 'appointments':
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
                <label>Status:</label>
                <select>
                  <option value="">Todos</option>
                  <option value="confirmed">Confirmados</option>
                  <option value="pending">Pendentes</option>
                  <option value="cancelled">Cancelados</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Data:</label>
                <input type="date" />
              </div>
              <div className="filter-group">
                <label>Buscar:</label>
                <input type="text" placeholder="Nome do pet ou tutor..." />
              </div>
            </div>

            {/* Lista de Agendamentos */}
            <div className="appointments-table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Pet</th>
                    <th>Tutor</th>
                    <th>Contato</th>
                    <th>Tipo de Consulta</th>
                    <th>Duração</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>
                        <div className="datetime-cell">
                          <span className="date">{new Date(appointment.date).toLocaleDateString('pt-BR')}</span>
                          <span className="time">{appointment.time}</span>
                        </div>
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
                          <span className="phone">{appointment.ownerPhone}</span>
                          <span className="email">{appointment.ownerEmail}</span>
                        </div>
                      </td>
                      <td>
                        <span className="consultation-badge">{appointment.consultationType}</span>
                      </td>
                      <td>
                        <span className="duration-badge">{formatDuration(appointment.duration)}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${appointment.status}`}>
                          {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
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
                            title="Excluir"
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
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
                    <button className="modal-close" onClick={() => setShowAppointmentModal(false)}>×</button>
                  </div>
                  
                  <form className="appointment-form" onSubmit={handleSaveAppointment}>
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
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Selecione o tipo</option>
                          {consultationTypes.map((type) => (
                            <option key={type.name} value={type.name}>
                              {type.name} ({formatDuration(type.duration)})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Duração *</label>
                        <select
                          name="duration"
                          value={appointmentForm.duration}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="15">15 minutos</option>
                          <option value="30">30 minutos</option>
                          <option value="45">45 minutos</option>
                          <option value="60">1 hora</option>
                          <option value="90">1h 30min</option>
                          <option value="120">2 horas</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Horário Disponível *</label>
                        <select
                          name="time"
                          value={appointmentForm.time}
                          onChange={handleFormChange}
                          required
                          disabled={!appointmentForm.date || !appointmentForm.duration}
                        >
                          <option value="">
                            {!appointmentForm.date ? 'Selecione uma data primeiro' : 
                             !appointmentForm.duration ? 'Selecione a duração primeiro' : 
                             'Selecione um horário'}
                          </option>
                          {availableTimeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {appointmentForm.date && appointmentForm.duration && availableTimeSlots.length === 0 && (
                          <span className="no-slots-message">
                            Nenhum horário disponível para esta data e duração
                          </span>
                        )}
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
                        <label>Email *</label>
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
                        <label>Telefone *</label>
                        <input
                          type="tel"
                          name="ownerPhone"
                          value={appointmentForm.ownerPhone}
                          onChange={handleFormChange}
                          placeholder="(11) 99999-9999"
                          required
                        />
                      </div>
                                            <div className="form-group">
                        <label>Status</label>
                        <select
                          name="status"
                          value={appointmentForm.status}
                          onChange={handleFormChange}
                        >
                          <option value="pending">Pendente</option>
                          <option value="confirmed">Confirmado</option>
                        </select>
                      </div>
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
                    
                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setShowAppointmentModal(false)}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingAppointment ? 'Salvar Alterações' : 'Criar Agendamento'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );

      case 'clients':
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
                <select>
                  <option value="">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Cidade:</label>
                <select>
                  <option value="">Todas</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Buscar:</label>
                <input type="text" placeholder="Nome, email ou telefone..." />
              </div>
            </div>

            {/* Estatísticas dos Clientes */}
            <div className="clients-stats">
              <div className="stat-item">
                <span className="stat-number">{clients.filter(c => c.status === 'active').length}</span>
                <span className="stat-label">Clientes Ativos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{clients.filter(c => c.status === 'inactive').length}</span>
                <span className="stat-label">Clientes Inativos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{clients.reduce((total, client) => total + client.pets.length, 0)}</span>
                <span className="stat-label">Total de Pets</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{clients.filter(c => c.registrationDate >= '2024-03-01').length}</span>
                <span className="stat-label">Novos este Mês</span>
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
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className="client-info">
                          <div className="client-avatar">
                            {client.name.charAt(0)}
                          </div>
                          <div className="client-details">
                            <span className="client-name">{client.name}</span>
                            <span className="client-age">{calculateAge(client.birthDate)} anos</span>
                            <span className="client-profession">{client.profession}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span className="email">{client.email}</span>
                          <span className="phone">{client.phone}</span>
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
                          <span className="pets-count">{client.pets.length} pet(s)</span>
                          <div className="pets-list">
                            {client.pets.slice(0, 2).map((pet, index) => (
                              <span key={index} className="pet-name">{pet.name}</span>
                            ))}
                            {client.pets.length > 2 && (
                              <span className="more-pets">+{client.pets.length - 2} mais</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="appointments-count">{client.totalAppointments}</span>
                      </td>
                      <td>
                        <span className="last-appointment">
                          {client.lastAppointment 
                            ? new Date(client.lastAppointment).toLocaleDateString('pt-BR')
                            : 'Nunca'
                          }
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${client.status}`}>
                          {client.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal de Cliente */}
            {showClientModal && (
              <div className="modal-overlay" onClick={() => setShowClientModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</h3>
                    <button className="modal-close" onClick={() => setShowClientModal(false)}>×</button>
                  </div>
                  
                  <form className="client-form" onSubmit={handleSaveClient}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nome Completo *</label>
                        <input
                          type="text"
                          name="name"
                          value={clientForm.name}
                          onChange={handleClientFormChange}
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
                          onChange={handleClientFormChange}
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
                          onChange={handleClientFormChange}
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
                          onChange={handleClientFormChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Profissão</label>
                        <input
                          type="text"
                          name="profession"
                          value={clientForm.profession}
                          onChange={handleClientFormChange}
                          placeholder="Profissão do cliente"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>CEP</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={clientForm.zipCode}
                          onChange={handleClientFormChange}
                          placeholder="00000-000"
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Endereço</label>
                        <input
                          type="text"
                          name="address"
                          value={clientForm.address}
                          onChange={handleClientFormChange}
                          placeholder="Rua, número, complemento"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Cidade</label>
                        <input
                          type="text"
                          name="city"
                          value={clientForm.city}
                          onChange={handleClientFormChange}
                          placeholder="Cidade"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Estado</label>
                        <select
                          name="state"
                          value={clientForm.state}
                          onChange={handleClientFormChange}
                        >
                          <option value="">Selecione</option>
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          <option value="RS">Rio Grande do Sul</option>
                          <option value="PR">Paraná</option>
                          <option value="SC">Santa Catarina</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Observações</label>
                      <textarea
                        name="notes"
                        value={clientForm.notes}
                        onChange={handleClientFormChange}
                        placeholder="Observações sobre o cliente..."
                        rows="3"
                      ></textarea>
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
                          <span className="label">Idade:</span>
                          <span className="value">{calculateAge(viewingClient.birthDate)} anos</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Profissão:</span>
                          <span className="value">{viewingClient.profession}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Data de Cadastro:</span>
                          <span className="value">{new Date(viewingClient.registrationDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>

                      {/* Contato */}
                      <div className="details-section">
                        <h4>Contato</h4>
                        <div className="details-item">
                          <span className="label">Email:</span>
                          <span className="value">{viewingClient.email}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Telefone:</span>
                          <span className="value">{viewingClient.phone}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Endereço:</span>
                          <span className="value">{viewingClient.address}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Cidade/Estado:</span>
                          <span className="value">{viewingClient.city}, {viewingClient.state}</span>
                        </div>
                      </div>

                      {/* Estatísticas */}
                      <div className="details-section">
                        <h4>Estatísticas</h4>
                        <div className="details-item">
                          <span className="label">Total de Consultas:</span>
                          <span className="value">{viewingClient.totalAppointments}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Última Consulta:</span>
                          <span className="value">
                            {viewingClient.lastAppointment 
                              ? new Date(viewingClient.lastAppointment).toLocaleDateString('pt-BR')
                              : 'Nunca'
                            }
                          </span>
                        </div>
                        <div className="details-item">
                          <span className="label">Status:</span>
                          <span className={`value status-${viewingClient.status}`}>
                            {viewingClient.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>

                      {/* Observações */}
                      <div className="details-section full-width">
                        <h4>Observações</h4>
                        <p className="notes-text">{viewingClient.notes || 'Nenhuma observação registrada.'}</p>
                      </div>
                    </div>

                    {/* Pets do Cliente */}
                    <div className="pets-section">
                      <h4>Pets ({viewingClient.pets.length})</h4>
                      <div className="pets-grid">
                        {viewingClient.pets.map((pet) => (
                          <div key={pet.id} className="pet-card">
                            <div className="pet-avatar">🐾</div>
                            <div className="pet-info">
                              <h5>{pet.name}</h5>
                              <p>{pet.species} - {pet.breed}</p>
                              <p>{pet.age} • {pet.weight}</p>
                              <span className="last-consultation">
                                Última consulta: {new Date(pet.lastConsultation).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'pets':
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
                <select>
                  <option value="">Todas</option>
                  <option value="Cão">Cães</option>
                  <option value="Gato">Gatos</option>
                  <option value="Pássaro">Pássaros</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Status:</label>
                <select>
                  <option value="">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Cliente:</label>
                <select>
                  <option value="">Todos os clientes</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Buscar:</label>
                <input type="text" placeholder="Nome do pet, raça ou microchip..." />
              </div>
            </div>

            {/* Estatísticas dos Pets */}
            <div className="pets-stats">
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
                  {pets.map((pet) => (
                    <tr key={pet.id}>
                      <td>
                        <div className="pet-info">
                          <div className="pet-avatar">
                            {pet.species === 'Cão' ? '🐕' : pet.species === 'Gato' ? '🐱' : '🐾'}
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
                          <span className="owner-name">{pet.clientName}</span>
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
                          <span className="age">{calculatePetAge(pet.birthDate)}</span>
                          <span className="weight">{pet.weight}kg</span>
                        </div>
                      </td>
                      <td>
                        <div className="vaccination-info">
                          <span className={`vaccination-status ${pet.vaccinated ? 'vaccinated' : 'not-vaccinated'}`}>
                            {pet.vaccinated ? '✅ Em dia' : '❌ Pendente'}
                          </span>
                          <span className={`neutered-status ${pet.neutered ? 'neutered' : 'not-neutered'}`}>
                            {pet.neutered ? '🔸 Castrado' : '🔹 Não castrado'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="consultations-count">{pet.totalConsultations}</span>
                      </td>
                      <td>
                        <span className="last-consultation">
                          {pet.lastConsultation 
                            ? new Date(pet.lastConsultation).toLocaleDateString('pt-BR')
                            : 'Nunca'
                          }
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${pet.status}`}>
                          {pet.status === 'active' ? 'Ativo' : 'Inativo'}
                        </span>
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal de Pet */}
            {showPetModal && (
              <div className="modal-overlay" onClick={() => setShowPetModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{editingPet ? 'Editar Pet' : 'Novo Pet'}</h3>
                    <button className="modal-close" onClick={() => setShowPetModal(false)}>×</button>
                  </div>
                  
                  <form className="pet-form" onSubmit={handleSavePet}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nome do Pet *</label>
                        <input
                          type="text"
                          name="name"
                          value={petForm.name}
                          onChange={handlePetFormChange}
                          placeholder="Nome do pet"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Tutor *</label>
                        <select
                          name="clientId"
                          value={petForm.clientId}
                          onChange={handlePetFormChange}
                          required
                        >
                          <option value="">Selecione o tutor</option>
                          {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Espécie *</label>
                        <select
                          name="species"
                          value={petForm.species}
                          onChange={handlePetFormChange}
                          required
                        >
                          <option value="">Selecione a espécie</option>
                          <option value="Cão">Cão</option>
                          <option value="Gato">Gato</option>
                          <option value="Pássaro">Pássaro</option>
                          <option value="Coelho">Coelho</option>
                          <option value="Hamster">Hamster</option>
                          <option value="Outros">Outros</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Raça</label>
                        <input
                          type="text"
                          name="breed"
                          value={petForm.breed}
                          onChange={handlePetFormChange}
                          placeholder="Raça do pet"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Data de Nascimento</label>
                        <input
                          type="date"
                          name="birthDate"
                          value={petForm.birthDate}
                          onChange={handlePetFormChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Peso (kg)</label>
                        <input
                          type="number"
                          name="weight"
                          value={petForm.weight}
                          onChange={handlePetFormChange}
                          placeholder="Peso em kg"
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
                          onChange={handlePetFormChange}
                          placeholder="Cor do pet"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Sexo</label>
                        <select
                          name="gender"
                          value={petForm.gender}
                          onChange={handlePetFormChange}
                        >
                          <option value="">Selecione</option>
                          <option value="Macho">Macho</option>
                          <option value="Fêmea">Fêmea</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Microchip</label>
                        <input
                          type="text"
                          name="microchip"
                          value={petForm.microchip}
                          onChange={handlePetFormChange}
                          placeholder="Número do microchip"
                        />
                      </div>
                      
                      <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="vaccinated"
                            checked={petForm.vaccinated}
                            onChange={handlePetFormChange}
                          />
                          <span className="checkmark"></span>
                          Vacinação em dia
                        </label>
                      </div>
                      
                      <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="neutered"
                            checked={petForm.neutered}
                            onChange={handlePetFormChange}
                          />
                          <span className="checkmark"></span>
                          Castrado
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Alergias</label>
                      <textarea
                        name="allergies"
                        value={petForm.allergies}
                        onChange={handlePetFormChange}
                        placeholder="Alergias conhecidas..."
                        rows="2"
                      ></textarea>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Medicações</label>
                      <textarea
                        name="medications"
                        value={petForm.medications}
                        onChange={handlePetFormChange}
                        placeholder="Medicações em uso..."
                        rows="2"
                      ></textarea>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Restrições Alimentares</label>
                      <textarea
                        name="dietaryRestrictions"
                        value={petForm.dietaryRestrictions}
                        onChange={handlePetFormChange}
                        placeholder="Restrições alimentares..."
                        rows="2"
                      ></textarea>
                    </div>
                    
                    <div className="form-group full-width">
                      <label>Observações</label>
                      <textarea
                        name="notes"
                        value={petForm.notes}
                        onChange={handlePetFormChange}
                        placeholder="Observações gerais sobre o pet..."
                        rows="3"
                      ></textarea>
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
                          <span className="label">Idade:</span>
                          <span className="value">{calculatePetAge(viewingPet.birthDate)}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Peso:</span>
                          <span className="value">{viewingPet.weight}kg</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Cor:</span>
                          <span className="value">{viewingPet.color}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Sexo:</span>
                          <span className="value">{viewingPet.gender}</span>
                        </div>
                      </div>

                      {/* Tutor */}
                      <div className="details-section">
                        <h4>Tutor</h4>
                        <div className="details-item">
                          <span className="label">Nome:</span>
                          <span className="value">{viewingPet.clientName}</span>
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
                      </div>

                      {/* Estatísticas */}
                      <div className="details-section">
                        <h4>Estatísticas</h4>
                        <div className="details-item">
                          <span className="label">Total de Consultas:</span>
                          <span className="value">{viewingPet.totalConsultations}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Última Consulta:</span>
                          <span className="value">
                            {viewingPet.lastConsultation 
                              ? new Date(viewingPet.lastConsultation).toLocaleDateString('pt-BR')
                              : 'Nunca'
                            }
                          </span>
                        </div>
                        <div className="details-item">
                          <span className="label">Data de Cadastro:</span>
                          <span className="value">{new Date(viewingPet.registrationDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="details-item">
                          <span className="label">Status:</span>
                          <span className={`value status-${viewingPet.status}`}>
                            {viewingPet.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>

                      {/* Informações Médicas */}
                      <div className="details-section full-width">
                        <h4>Informações Médicas</h4>
                        <div className="medical-info">
                          <div className="medical-item">
                            <h5>Alergias:</h5>
                            <p>{viewingPet.allergies || 'Nenhuma alergia conhecida'}</p>
                          </div>
                          <div className="medical-item">
                            <h5>Medicações:</h5>
                            <p>{viewingPet.medications || 'Nenhuma medicação atual'}</p>
                          </div>
                          <div className="medical-item">
                            <h5>Restrições Alimentares:</h5>
                            <p>{viewingPet.dietaryRestrictions || 'Nenhuma restrição alimentar'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Observações */}
                      <div className="details-section full-width">
                        <h4>Observações</h4>
                        <p className="notes-text">{viewingPet.notes || 'Nenhuma observação registrada.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'users':
        return (
          <div className="admin-users">
            <div className="section-header">
              <h2>Gerenciamento de Usuários</h2>
              <button className="btn-primary">+ Novo Usuário</button>
            </div>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Maria Silva</td>
                    <td>maria@email.com</td>
                    <td>Cliente</td>
                    <td><span className="status active">Ativo</span></td>
                    <td>
                      <button className="btn-edit">✏️</button>
                      <button className="btn-delete">🗑️</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Dr. João Santos</td>
                    <td>joao@naturavet.com</td>
                    <td>Consultor</td>
                    <td><span className="status active">Ativo</span></td>
                    <td>
                      <button className="btn-edit">✏️</button>
                      <button className="btn-delete">🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return <div className="coming-soon">🚧 Em desenvolvimento...</div>;
    }
  };

  return renderContent();
};

export default AdminDashboard;