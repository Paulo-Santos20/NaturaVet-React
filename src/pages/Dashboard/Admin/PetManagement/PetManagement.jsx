import React, { useState } from 'react';

const PetManagement = () => {
  const [pets] = useState([
    { id: 1, name: 'Rex', type: 'Cão', breed: 'Golden Retriever', owner: 'Maria Silva', age: 3 },
    { id: 2, name: 'Mimi', type: 'Gato', breed: 'Persa', owner: 'João Santos', age: 2 },
    { id: 3, name: 'Thor', type: 'Cão', breed: 'Pastor Alemão', owner: 'Ana Costa', age: 5 },
    { id: 4, name: 'Luna', type: 'Gato', breed: 'Siamês', owner: 'Pedro Lima', age: 1 },
  ]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>🐾 Gerenciamento de Pets</h1>
        <p>Gerencie todos os pets cadastrados no sistema</p>
      </div>

      {/* Estatísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🐕 Cães</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {pets.filter(pet => pet.type === 'Cão').length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🐱 Gatos</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {pets.filter(pet => pet.type === 'Gato').length}
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📊 Total</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FC5A8D', margin: 0 }}>
            {pets.length}
          </p>
        </div>
      </div>

      {/* Tabela de pets */}
      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Nome</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Tipo</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Raça</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Tutor</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Idade</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id}>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  <strong>{pet.name}</strong>
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  {pet.type === 'Cão' ? '🐕' : '🐱'} {pet.type}
                </td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{pet.breed}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{pet.owner}</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>{pet.age} anos</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #dee2e6' }}>
                  <button style={{ 
                    background: 'none', 
                    border: '1px solid #FC5A8D', 
                    color: '#FC5A8D', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}>
                    👁️ Ver
                  </button>
                  <button style={{ 
                    background: 'none', 
                    border: '1px solid #28a745', 
                    color: '#28a745', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px', 
                    cursor: 'pointer'
                  }}>
                    ✏️ Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetManagement;