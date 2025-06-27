export const initialUsers = [
  {
    id: 1,
    name: 'Admin Sistema',
    email: 'admin@naturavet.com',
    phone: '(11) 99999-0000',
    userType: 'admin',
    status: 'active',
    lastLogin: '2024-06-27T10:30:00',
    registrationDate: '2024-01-01',
    permissions: {
      dashboard: true,
      appointments: true,
      clients: true,
      pets: true,
      users: true,
      analytics: true,
      settings: true,
      reports: true,
      backup: true,
      content: true,
      moderation: true
    },
    notes: 'Administrador principal do sistema'
  },
  {
    id: 2,
    name: 'Dr. João Santos',
    email: 'joao@naturavet.com',
    phone: '(11) 98888-1111',
    userType: 'consultant',
    status: 'active',
    lastLogin: '2024-06-27T09:15:00',
    registrationDate: '2024-01-15',
    permissions: {
      dashboard: true,
      appointments: true,
      clients: true,
      pets: true,
      users: false,
      analytics: false,
      settings: false,
      reports: true,
      backup: false,
      content: false,
      moderation: false
    },
    notes: 'Veterinário especialista em nutrição'
  },
  {
    id: 3,
    name: 'Ana Editor',
    email: 'ana@naturavet.com',
    phone: '(11) 97777-2222',
    userType: 'editor',
    status: 'active',
    lastLogin: '2024-06-26T16:45:00',
    registrationDate: '2024-02-01',
    permissions: {
      dashboard: true,
      appointments: false,
      clients: false,
      pets: false,
      users: false,
      analytics: false,
      settings: false,
      reports: false,
      backup: false,
      content: true,
      moderation: true
    },
    notes: 'Responsável pelo conteúdo do blog'
  },
  {
    id: 4,
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-9999',
    userType: 'client',
    status: 'active',
    lastLogin: '2024-06-25T14:20:00',
    registrationDate: '2024-01-15',
    permissions: {
      dashboard: true,
      appointments: true,
      clients: false,
      pets: true,
      users: false,
      analytics: false,
      settings: false,
      reports: false,
      backup: false,
      content: false,
      moderation: false
    },
    notes: 'Cliente premium com 2 pets'
  },
  {
    id: 5,
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    phone: '(11) 66666-6666',
    userType: 'client',
    status: 'inactive',
    lastLogin: '2023-12-20T10:00:00',
    registrationDate: '2023-12-15',
    permissions: {
      dashboard: true,
      appointments: true,
      clients: false,
      pets: true,
      users: false,
      analytics: false,
      settings: false,
      reports: false,
      backup: false,
      content: false,
      moderation: false
    },
    notes: 'Conta suspensa por inatividade'
  }
];

export const userTypes = {
  admin: 'Administrador',
  consultant: 'Consultor',
  editor: 'Editor',
  client: 'Cliente'
};

export const permissionLabels = {
  dashboard: 'Dashboard',
  appointments: 'Agendamentos',
  clients: 'Clientes',
  pets: 'Pets',
  users: 'Usuários',
  analytics: 'Analytics',
  settings: 'Configurações',
  reports: 'Relatórios',
  backup: 'Backup',
  content: 'Conteúdo',
  moderation: 'Moderação'
};

export const defaultPermissions = {
  admin: {
    dashboard: true,
    appointments: true,
    clients: true,
    pets: true,
    users: true,
    analytics: true,
    settings: true,
    reports: true,
    backup: true,
    content: true,
    moderation: true
  },
  consultant: {
    dashboard: true,
    appointments: true,
    clients: true,
    pets: true,
    users: false,
    analytics: false,
    settings: false,
    reports: true,
    backup: false,
    content: false,
    moderation: false
  },
  editor: {
    dashboard: true,
    appointments: false,
    clients: false,
    pets: false,
    users: false,
    analytics: false,
    settings: false,
    reports: false,
    backup: false,
    content: true,
    moderation: true
  },
  client: {
    dashboard: true,
    appointments: true,
    clients: false,
    pets: true,
    users: false,
    analytics: false,
    settings: false,
    reports: false,
    backup: false,
    content: false,
    moderation: false
  }
};