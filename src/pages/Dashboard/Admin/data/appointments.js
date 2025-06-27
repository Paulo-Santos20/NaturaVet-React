export const initialAppointments = [
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
];

export const consultationTypes = [
  { name: 'Consulta Nutricional', duration: 45 },
  { name: 'Primeira Consulta', duration: 60 },
  { name: 'Acompanhamento', duration: 30 },
  { name: 'Reavaliação', duration: 30 },
  { name: 'Consulta de Emergência', duration: 30 },
  { name: 'Orientação Alimentar', duration: 15 }
];

export const workingHours = {
  start: '08:00',
  end: '18:00',
  lunchBreak: {
    start: '12:00',
    end: '13:00'
  }
};