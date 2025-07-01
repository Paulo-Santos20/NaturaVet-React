import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const mockData = {
    totalUsers: 1247,
    totalPets: 892,
    totalConsultations: 356,
    revenue: 45780,
    growthUsers: 12.5,
    growthPets: 8.3,
    growthConsultations: 15.7,
    growthRevenue: 22.1
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="analytics">
      <div className="page-header">
        <div className="header-content">
          <h1>📈 Analytics</h1>
          <p>Acompanhe as métricas e performance do sistema</p>
        </div>
        <div className="period-selector">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="1y">Último ano</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon users">👥</div>
            <div className="kpi-trend positive">
              <span>↗️</span>
              +{mockData.growthUsers}%
            </div>
          </div>
          <div className="kpi-content">
            <h3>{mockData.totalUsers.toLocaleString('pt-BR')}</h3>
            <p>Total de Usuários</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon pets">🐾</div>
            <div className="kpi-trend positive">
              <span>↗️</span>
              +{mockData.growthPets}%
            </div>
          </div>
          <div className="kpi-content">
            <h3>{mockData.totalPets.toLocaleString('pt-BR')}</h3>
            <p>Pets Cadastrados</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon consultations">📅</div>
            <div className="kpi-trend positive">
              <span>↗️</span>
              +{mockData.growthConsultations}%
            </div>
          </div>
          <div className="kpi-content">
            <h3>{mockData.totalConsultations.toLocaleString('pt-BR')}</h3>
            <p>Consultas Realizadas</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon revenue">💰</div>
            <div className="kpi-trend positive">
              <span>↗️</span>
              +{mockData.growthRevenue}%
            </div>
          </div>
          <div className="kpi-content">
            <h3>{formatCurrency(mockData.revenue)}</h3>
            <p>Receita Total</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>📊 Crescimento de Usuários</h3>
            <p>Novos cadastros por período</p>
          </div>
          <div className="chart-placeholder">
            <div className="chart-icon">📈</div>
            <p>Gráfico de crescimento será implementado aqui</p>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>🐕 Distribuição de Pets</h3>
            <p>Tipos de pets mais comuns</p>
          </div>
          <div className="chart-placeholder">
            <div className="chart-icon">🥧</div>
            <p>Gráfico de pizza será implementado aqui</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="activity-card">
          <div className="activity-header">
            <h3>🕒 Atividades Recentes</h3>
            <button className="btn btn-outline">Ver Todas</button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon new-user">👤</div>
              <div className="activity-content">
                <p><strong>Novo usuário cadastrado:</strong> Maria Santos</p>
                <span className="activity-time">há 2 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon consultation">📅</div>
              <div className="activity-content">
                <p><strong>Consulta agendada:</strong> Rex - Golden Retriever</p>
                <span className="activity-time">há 4 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon pet-registered">🐾</div>
              <div className="activity-content">
                <p><strong>Pet cadastrado:</strong> Mimi - Gato Persa</p>
                <span className="activity-time">há 6 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon payment">💳</div>
              <div className="activity-content">
                <p><strong>Pagamento recebido:</strong> R$ 150,00</p>
                <span className="activity-time">há 8 horas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-header">
            <h3>📋 Resumo do Sistema</h3>
          </div>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Usuários Ativos Hoje:</span>
              <span className="stat-value">127</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Consultas Hoje:</span>
              <span className="stat-value">23</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Novos Pets (Semana):</span>
              <span className="stat-value">45</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Taxa de Satisfação:</span>
              <span className="stat-value">98.5%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tempo Médio de Resposta:</span>
              <span className="stat-value">2.3h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;