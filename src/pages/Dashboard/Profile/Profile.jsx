import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👤 Meu Perfil</h1>
      
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nome:</label>
          <input 
            type="text" 
            value={user?.name || ''} 
            readOnly
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              background: '#f8f9fa'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email:</label>
          <input 
            type="email" 
            value={user?.email || ''} 
            readOnly
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              background: '#f8f9fa'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tipo de Usuário:</label>
          <input 
            type="text" 
            value={user?.role || ''} 
            readOnly
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              background: '#f8f9fa'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Localização:</label>
          <input 
            type="text" 
            value={user?.location || ''} 
            readOnly
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              background: '#f8f9fa'
            }}
          />
        </div>
        
        <button style={{ 
          background: '#FC5A8D', 
          color: 'white', 
          border: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '6px', 
          cursor: 'pointer'
        }}>
          ✏️ Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default Profile;