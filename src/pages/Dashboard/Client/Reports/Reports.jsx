import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import './Reports.css';

const Reports = () => {
  const { user } = useAuth();
  const [selectedPet, setSelectedPet] = useState(user.pets?.[0] || null);
  const [selectedPeriod, setSelectedPeriod] = useState('3m');

  // Dados mockados de relatórios
  const mockReports = {
    weightProgress: [
      { date: '2023-10-01', weight: 28 },
      { date: '2023-11-01', weight: 27.2 },
      { date: '2023-12-01', weight: 26.5 },
      { date: '2024-01-01', weight: 25.8 },
      { date: '2024-01-15', weight: 25.0 }
    ],
    consultations: [
      {
        id: 1,
        date: '2024-01-15',
        type: 'Consulta Nutricional',
        veterinarian: 'Dra. Maria Silva',
        diagnosis: 'Sobrepeso controlado',
        recommendations: 'Manter dieta atual, aumentar exercícios',
        nextConsultation: '2024-02-15'
      },
      {
        id: 2,
        date: '2023-12-10',
        type: 'Avaliação Inicial',
        veterinarian: 'Dra. Maria Silva',
        diagnosis: 'Sobrepeso moderado',
        recommendations: 'Dieta hipocalórica, exercícios regulares',
        nextConsultation: '2024-01-15'
      }
    ],
    nutritionPlan: {
      currentPlan: 'Dieta de Emagrecimento',
      startDate: '2023-12-10',
      targetWeight: 24,
      currentWeight: 25,
      progress: 75,
      dailyCalories: 1200,
      meals: [
        { time: '07:00', food: 'Ração Premium Light', amount: '80g' },
        { time: '12:00', food: 'Petisco Natural', amount: '20g' },
        { time: '18:00', food: 'Ração Premium Light', amount: '80g' }
      ]
    },
    achievements: [
      { icon: '🎯', title: 'Meta de Peso', description: 'Perdeu 3kg em 3 meses', date: '2024-01-15' },
      { icon: '💪', title: 'Exercício Regular', description: '30 dias consecutivos de atividade', date: '2024-01-10' },
      { icon: '🥗', title: 'Dieta Consistente', description: 'Seguiu o plano por 2 meses', date: '2024-01-01' }
    ]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateWeightLoss = () => {
    const progress = mockReports.weightProgress;
    if (progress.length < 2) return 0;
    const initial = progress[0].weight;
    const current = progress[progress.length - 1].weight;
    return (initial - current).toFixed(1);
  };

  const getProgressPercentage = () => {
    const current = mockReports.nutritionPlan.currentWeight;
    const target = mockReports.nutritionPlan.targetWeight;
    const initial = mockReports.weightProgress[0]?.weight || current;
    const progress = ((initial - current) / (initial - target)) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(0);
  };

  return (
    <div className="reports">
      <div className="page-header">
        <div className="header-content">
          <h1>📊 Relatórios</h1>
          <p>Acompanhe o progresso e evolução do seu pet</p>
        </div>
        <div className="header-controls">
          {user.pets && user.pets.length > 1 && (
            <select 
              value={selectedPet?.id || ''} 
              onChange={(e) => {
                const pet = user.pets.find(p => p.id === parseInt(e.target.value));
                setSelectedPet(pet);
              }}
              className="pet-select"
            >
              {user.pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} - {pet.type}
                </option>
              ))}
            </select>
          )}
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="1m">Último mês</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último ano</option>
          </select>
        </div>
      </div>

      {selectedPet ? (
        <div className="reports-content">
          {/* Pet Summary */}
          <div className="pet-summary-card">
            <div className="pet-info">
              <div className="pet-avatar">
                {selectedPet.type === 'cão' ? '🐕' : selectedPet.type === 'gato' ? '🐱' : '🐾'}
              </div>
              <div className="pet-details">
                <h2>{selectedPet.name}</h2>
                <p>{selectedPet.breed} • {selectedPet.age} anos</p>
                <p>Peso atual: {mockReports.nutritionPlan.currentWeight}kg</p>
              </div>
            </div>
            <div className="progress-summary">
              <div className="progress-item">
                <span className="progress-label">Progresso da Meta</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <span className="progress-text">{getProgressPercentage()}%</span>
              </div>
              <div className="weight-loss">
                <span className="weight-loss-label">Peso perdido:</span>
                <span className="weight-loss-value">-{calculateWeightLoss()}kg</span>
              </div>
            </div>
          </div>

          {/* Weight Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>📈 Evolução do Peso</h3>
              <p>Acompanhe a evolução do peso ao longo do tempo</p>
            </div>
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart-data">
                  {mockReports.weightProgress.map((point, index) => (
                    <div key={index} className="data-point">
                      <div className="point-value">{point.weight}kg</div>
                      <div className="point-date">{formatDate(point.date)}</div>
                    </div>
                  ))}
                </div>
                <div className="chart-info">
                  <p>📊 Gráfico interativo será implementado aqui</p>
                  <p>Dados disponíveis: {mockReports.weightProgress.length} medições</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Plan */}
          <div className="nutrition-card">
            <div className="nutrition-header">
              <h3>🥗 Plano Nutricional Atual</h3>
              <span className="plan-status">Ativo desde {formatDate(mockReports.nutritionPlan.startDate)}</span>
            </div>
            <div className="nutrition-content">
              <div className="plan-overview">
                <div className="plan-item">
                  <span className="plan-label">Plano:</span>
                  <span className="plan-value">{mockReports.nutritionPlan.currentPlan}</span>
                </div>
                <div className="plan-item">
                  <span className="plan-label">Meta de Peso:</span>
                  <span className="plan-value">{mockReports.nutritionPlan.targetWeight}kg</span>
                </div>
                <div className="plan-item">
                  <span className="plan-label">Calorias Diárias:</span>
                  <span className="plan-value">{mockReports.nutritionPlan.dailyCalories} kcal</span>
                </div>
              </div>
              <div className="meals-schedule">
                <h4>Cronograma de Alimentação</h4>
                <div className="meals-list">
                  {mockReports.nutritionPlan.meals.map((meal, index) => (
                    <div key={index} className="meal-item">
                      <span className="meal-time">{meal.time}</span>
                      <span className="meal-food">{meal.food}</span>
                      <span className="meal-amount">{meal.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Consultations History */}
          <div className="consultations-card">
            <div className="consultations-header">
              <h3>🩺 Histórico de Consultas</h3>
              <span className="consultations-count">
                {mockReports.consultations.length} consulta{mockReports.consultations.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="consultations-list">
              {mockReports.consultations.map(consultation => (
                <div key={consultation.id} className="consultation-item">
                  <div className="consultation-date">
                    <div className="date-circle">
                      {formatDate(consultation.date).split('/')[0]}
                      <small>{formatDate(consultation.date).split('/')[1]}</small>
                    </div>
                  </div>
                  <div className="consultation-details">
                    <div className="consultation-header-info">
                      <h4>{consultation.type}</h4>
                      <span className="consultation-vet">{consultation.veterinarian}</span>
                    </div>
                    <div className="consultation-content">
                      <p><strong>Diagnóstico:</strong> {consultation.diagnosis}</p>
                      <p><strong>Recomendações:</strong> {consultation.recommendations}</p>
                      {consultation.nextConsultation && (
                        <p className="next-consultation">
                          <strong>Próxima consulta:</strong> {formatDate(consultation.nextConsultation)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="achievements-card">
            <div className="achievements-header">
              <h3>🏆 Conquistas</h3>
              <p>Marcos importantes na jornada do seu pet</p>
            </div>
            <div className="achievements-list">
              {mockReports.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    <span className="achievement-date">{formatDate(achievement.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="export-card">
            <div className="export-header">
              <h3>📄 Exportar Relatórios</h3>
              <p>Baixe os relatórios em diferentes formatos</p>
            </div>
            <div className="export-options">
              <button className="export-btn pdf">
                <span>📄</span>
                Relatório PDF
              </button>
              <button className="export-btn excel">
                <span>📊</span>
                Planilha Excel
              </button>
              <button className="export-btn email">
                <span>📧</span>
                Enviar por Email
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-pets">
          <div className="no-pets-icon">🐾</div>
          <h3>Nenhum pet cadastrado</h3>
          <p>Cadastre um pet para visualizar relatórios</p>
          <button className="btn btn-primary">Cadastrar Pet</button>
        </div>
      )}
    </div>
  );
};

export default Reports;