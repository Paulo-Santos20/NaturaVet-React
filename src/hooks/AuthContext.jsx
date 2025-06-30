import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('naturavet_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('naturavet_user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('naturavet_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('naturavet_user');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    setIsAuthenticated(true);
    localStorage.setItem('naturavet_user', JSON.stringify(newUserData));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando NaturaVet...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Dados de exemplo para desenvolvimento
export const mockUsers = {
  client: {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    location: 'São Paulo, SP',
    role: 'client',
    pets: [
      {
        id: 1,
        name: 'Rex',
        type: 'cão',
        breed: 'Golden Retriever',
        age: 3,
        weight: 25,
        photo: null
      },
      {
        id: 2,
        name: 'Mimi',
        type: 'gato',
        breed: 'Persa',
        age: 2,
        weight: 4,
        photo: null
      }
    ]
  },
  admin: {
    id: 2,
    name: 'Dr. João Santos',
    email: 'joao@naturavet.com',
    location: 'Rio de Janeiro, RJ',
    role: 'admin',
    pets: []
  }
};