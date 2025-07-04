import React, { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

// ✅ ADICIONAR O useAuth AQUI
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de autenticação
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erro ao parsear dados do usuário:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

// Dados de exemplo para teste
export const mockUserData = {
  id: 1,
  name: 'Maria Silva',
  email: 'maria@email.com',
  role: 'admin',
  location: 'São Paulo, SP',
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
};