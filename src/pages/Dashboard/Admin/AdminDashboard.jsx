import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>🔧 Painel do Administrador</h1>
        <p>Bem-vindo, {user?.name}! Aqui você tem acesso total ao sistema.</p>
      </div>

      {/* Cards de estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>👥 Usuários Totais</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>156</p>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>+12 este mês</p>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>🐾 Pets Cadastrados</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>289</p>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>+23 este mês</p>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📅 Consultas Hoje</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>8</p>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>3 pendentes</p>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>💰 Receita Mensal</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>R$ 15.420</p>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>+8% vs mês anterior</p>
        </div>
      </div>

      {/* Ações rápidas */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#333' }}>⚡ Ações Rápidas</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          <button style={{ 
            background: '#FC5A8D', 
            color: 'white', 
            border: 'none', 
            padding: '1rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            👥 Gerenciar Usuários
          </button>
          <button style={{ 
            background: '#FC5A8D', 
            color: 'white', 
            border: 'none', 
            padding: '1rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            🐾 Gerenciar Pets
          </button>
          <button style={{ 
            background: '#FC5A8D', 
            color: 'white', 
            border: 'none', 
            padding: '1rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            📅 Ver Agendamentos
          </button>
          <button style={{ 
            background: '#FC5A8D', 
            color: 'white', 
            border: 'none', 
            padding: '1rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            📊 Ver Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;