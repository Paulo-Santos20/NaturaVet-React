import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simular verificação de autenticação ao inicializar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('naturavet_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          console.log('🔍 AuthContext: Usuário encontrado no localStorage:', userData);
          setUser(userData);
        } else {
          console.log('🔍 AuthContext: Nenhum usuário encontrado no localStorage');
        }
      } catch (error) {
        console.error('🔍 AuthContext: Erro ao verificar autenticação:', error);
        localStorage.removeItem('naturavet_user');
      } finally {
        setLoading(false);
      }
    };

    // Simular delay de verificação
    setTimeout(checkAuth, 500);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      console.log('🔐 AuthContext: Tentativa de login:', { email });
      
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuários simulados
      const users = [
        {
          id: 1,
          name: 'Admin Sistema',
          email: 'admin@naturavet.com',
          role: 'admin',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: 2,
          name: 'Dr. Carlos Veterinário',
          email: 'carlos@naturavet.com',
          role: 'consultor',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: 3,
          name: 'Editor Conteúdo',
          email: 'editor@naturavet.com',
          role: 'editor',
          avatar: '/api/placeholder/40/40'
        },
        {
          id: 4,
          name: 'Cliente Teste',
          email: 'cliente@teste.com',
          role: 'cliente',
          avatar: '/api/placeholder/40/40'
        }
      ];

      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === '123456') {
        console.log('🔐 AuthContext: Login bem-sucedido:', foundUser);
        setUser(foundUser);
        localStorage.setItem('naturavet_user', JSON.stringify(foundUser));
        return { success: true, user: foundUser };
      } else {
        console.log('🔐 AuthContext: Credenciais inválidas');
        return { 
          success: false, 
          error: 'Email ou senha incorretos' 
        };
      }
    } catch (error) {
      console.error('🔐 AuthContext: Erro no login:', error);
      return { 
        success: false, 
        error: 'Erro interno. Tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('🔐 AuthContext: Fazendo logout');
    setUser(null);
    localStorage.removeItem('naturavet_user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('naturavet_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};