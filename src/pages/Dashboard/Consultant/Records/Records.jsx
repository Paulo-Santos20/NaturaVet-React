import React, { useState } from 'react';
import './Records.css';

const Records = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados de prontuários
  const mockRecords = [
    {
      id: 1,
      petName: 'Rex',
      petType: 'Cão',
      breed: 'Golden Retriever',
      ownerName: 'Carlos Oliveira',
      lastConsultation: '2024-01-15',
      status: 'Em tratamento',
      weight: 25,
      age: 3,
      consultations: [
        {
          id: 1,
          date: '2024-01-15',
          type: 'Consulta Nutricional',
          diagnosis: 'Sobrepeso',
          treatment: 'Dieta hipocalórica + exercícios',
          notes: 'Pet apresenta 3kg acima do peso ideal. Iniciado plano alimentar restritivo.',
          nextConsultation: '2024-02-15'
        },
        {
          id: 2,
          date: '2023-12-10',
          type: 'Avaliação Inicial',
          diagnosis: 'Avaliação geral',
          treatment: 'Orientações gerais',
          notes: 'Pet saudável, apenas orientações preventivas sobre alimentação.',
          nextConsultation: '2024-01-15'
        }
      ]
    },
    {
      id: 2,
      petName: 'Mimi',
      petType: 'Gato',
      breed: 'Persa',
      ownerName: 'Maria Santos',
      lastConsultation: '2024-01-10',
      status: 'Acompanhamento',
      weight: 4,
      age: 2,
      consultations: [
        {
          id: 3,
          date: '2024-01-10',
          type: 'Retorno',
          diagnosis: 'Alergia alimentar controlada',
          treatment: 'Dieta hipoalergênica',
          notes: 'Melhora significativa após mudança de ração. Manter dieta atual.',
          nextConsultation: '2024-03-10'
        }
      ]
    },
    {
      id: 3,
      petName: 'Buddy',
      petType: 'Cão',
      breed: 'Labrador',
      ownerName: 'Ana Costa',
      lastConsultation: '2024-01-08',
      status: 'Finalizado',
      weight: 30,
      age: 5,
      consultations: [
        {
          id: 4,
          date: '2024-01-08',
          type: 'Consulta Final',
          diagnosis: 'Peso ideal alcançado',
          treatment: 'Manutenção',
          notes: 'Objetivo alcançado. Pet atingiu peso ideal. Orientações para manutenção.',
          nextConsultation: null
        }
      ]
    }
  ];

  const filteredRecords = mockRecords.filter(record =>
    record.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'Em tratamento': '#f39c12',
      'Acompanhamento': '#3498db',
      'Finalizado': '#27ae60',
      'Cancelado': '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  const getPetIcon = (type) => {
    return type === 'Cão' ? '🐕' : type === 'Gato' ? '🐱' : '🐾';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="records">
      <div className="page-header">
        <div className="header-content">
          <h1>📋 Prontuários</h1>
          <p>Gerencie o histórico médico e nutricional dos pets</p>
        </div>
        <button className="btn btn-primary">
          <span>➕</span>
          Novo Prontuário
        </button>
      </div>

      <div className="records-container">
        {/* Sidebar com lista de pets */}
        <div className="pets-sidebar">
          <div className="sidebar-header">
            <h3>Pets em Atendimento</h3>
            <div className="search-container">
              <input
                type="search"
                placeholder="Buscar pet ou tutor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="pets-list">
            {filteredRecords.map(record => (
              <div
                key={record.id}
                className={`pet-item ${selectedPet?.id === record.id ? 'active' : ''}`}
                onClick={() => setSelectedPet(record)}
              >
                <div className="pet-avatar">
                  {getPetIcon(record.petType)}
                </div>
                <div className="pet-info">
                  <h4>{record.petName}</h4>
                  <p>{record.breed}</p>
                  <span className="owner-name">{record.ownerName}</span>
                  <div className="pet-meta">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(record.status) }}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="records-content">
          {selectedPet ? (
            <>
              {/* Informações do Pet */}
              <div className="pet-header">
                <div className="pet-details">
                  <div className="pet-avatar-large">
                    {getPetIcon(selectedPet.petType)}
                  </div>
                  <div className="pet-main-info">
                    <h2>{selectedPet.petName}</h2>
                    <p className="pet-breed">{selectedPet.breed} • {selectedPet.petType}</p>
                    <p className="pet-owner">Tutor: {selectedPet.ownerName}</p>
                  </div>
                </div>
                <div className="pet-stats">
                  <div className="stat-item">
                    <span className="stat-label">Idade</span>
                    <span className="stat-value">{selectedPet.age} anos</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Peso</span>
                    <span className="stat-value">{selectedPet.weight}kg</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Status</span>
                    <span 
                      className="stat-value status"
                      style={{ color: getStatusColor(selectedPet.status) }}
                    >
                      {selectedPet.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Histórico de Consultas */}
              <div className="consultations-section">
                <div className="section-header">
                  <h3>📅 Histórico de Consultas</h3>
                  <button className="btn btn-outline">
                    <span>➕</span>
                    Nova Consulta
                  </button>
                </div>

                <div className="consultations-timeline">
                  {selectedPet.consultations.map(consultation => (
                    <div key={consultation.id} className="consultation-card">
                      <div className="consultation-date">
                        <div className="date-circle">
                          {formatDate(consultation.date).split('/')[0]}
                          <small>{formatDate(consultation.date).split('/')[1]}</small>
                        </div>
                      </div>
                      <div className="consultation-content">
                        <div className="consultation-header">
                          <h4>{consultation.type}</h4>
                          <span className="consultation-full-date">
                            {formatDate(consultation.date)}
                          </span>
                        </div>
                        <div className="consultation-details">
                          <div className="detail-row">
                            <strong>Diagnóstico:</strong>
                            <span>{consultation.diagnosis}</span>
                          </div>
                          <div className="detail-row">
                            <strong>Tratamento:</strong>
                            <span>{consultation.treatment}</span>
                          </div>
                          <div className="detail-row">
                            <strong>Observações:</strong>
                            <span>{consultation.notes}</span>
                          </div>
                          {consultation.nextConsultation && (
                            <div className="detail-row next-consultation">
                              <strong>Próxima Consulta:</strong>
                              <span>{formatDate(consultation.nextConsultation)}</span>
                            </div>
                          )}
                        </div>
                        <div className="consultation-actions">
                          <button className="btn-icon" title="Editar">✏️</button>
                          <button className="btn-icon" title="Imprimir">🖨️</button>
                          <button className="btn-icon" title="Anexos">📎</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="no-selection-icon">📋</div>
              <h3>Selecione um pet</h3>
              <p>Escolha um pet da lista ao lado para visualizar seu prontuário completo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Records;