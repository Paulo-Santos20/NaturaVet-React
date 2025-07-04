import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔍 AuthProvider: useEffect executado');
    
    const checkAuth = () => {
      console.log('🔍 AuthProvider: Verificando autenticação...');
      
      try {
        const userData = localStorage.getItem('user');
        console.log('🔍 AuthProvider: Dados do localStorage:', userData);
        
        if (userData) {
          const parsedUser = JSON.parse(userData);
          console.log('🔍 AuthProvider: Usuário parseado:', parsedUser);
          
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log('✅ AuthProvider: Usuário autenticado');
        } else {
          console.log('❌ AuthProvider: Nenhum usuário encontrado');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('❌ AuthProvider: Erro ao parsear dados:', error);
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        console.log('🔍 AuthProvider: Finalizando loading...');
        setLoading(false);
      }
    };

    // Executar verificação
    checkAuth();
  }, []); // Array vazio para executar apenas uma vez

  const login = (userData) => {
    console.log('🔍 AuthProvider: Login executado com:', userData);
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('🔍 AuthProvider: Logout executado');
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

  console.log('🔍 AuthProvider: Estado atual:', { 
    user: user?.name, 
    isAuthenticated, 
    loading 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };