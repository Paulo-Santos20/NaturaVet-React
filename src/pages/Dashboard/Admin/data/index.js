// Exportações dos dados
export { initialUsers, userTypes, permissionLabels, defaultPermissions } from './users';
export { initialClients, brazilianStates } from './clients';
export { initialPets, petSpecies, petGenders } from './pets';
export { initialAppointments, consultationTypes, workingHours } from './appointments';

// Dados específicos do dashboard
export const recentMessages = [
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