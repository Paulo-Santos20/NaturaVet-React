export const initialClients = [
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
];

export const brazilianStates = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' }
];