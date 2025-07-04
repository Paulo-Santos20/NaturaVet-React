import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/pages/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Contas de teste
  const testAccounts = [
    {
      type: 'admin',
      name: 'Dr. João Santos',
      email: 'admin@naturavet.com',
      password: 'admin123',
      icon: '👨‍💼',
      description: 'Acesso total ao sistema',
      role: 'admin',
      location: 'São Paulo, SP',
      pets: []
    },
    {
      type: 'editor',
      name: 'Ana Costa',
      email: 'editor@naturavet.com',
      password: 'editor123',
      icon: '✍️',
      description: 'Gerenciar conteúdo e blog',
      role: 'editor',
      location: 'Rio de Janeiro, RJ',
      pets: []
    },
    {
      type: 'consultant',
      name: 'Dra. Maria Silva',
      email: 'consultor@naturavet.com',
      password: 'consultor123',
      icon: '👩‍⚕️',
      description: 'Atender clientes e pets',
      role: 'consultant',
      location: 'Belo Horizonte, MG',
      pets: []
    },
    {
      type: 'client',
      name: 'Carlos Oliveira',
      email: 'cliente@naturavet.com',
      password: 'cliente123',
      icon: '🐕',
      description: 'Cuidar do meu pet',
      role: 'client',
      location: 'Porto Alegre, RS',
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
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (error) {
      setError('');
    }
  };

  const handleTestLogin = (account) => {
    setFormData({
      email: account.email,
      password: account.password,
      rememberMe: false
    });
    setError('');
  };

  const handleQuickLogin = async (account) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fazer login com os dados da conta
      const userData = {
        id: account.type === 'admin' ? 1 : account.type === 'editor' ? 2 : account.type === 'consultant' ? 3 : 4,
        name: account.name,
        email: account.email,
        role: account.role,
        location: account.location,
        pets: account.pets || [],
        loginTime: new Date().toISOString()
      };
      
      login(userData);
      navigate('/dashboard');
      
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Verificar se é uma conta de teste
      const testAccount = testAccounts.find(
        account => account.email === formData.email && account.password === formData.password
      );
      
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (testAccount) {
        // Fazer login com os dados da conta
        const userData = {
          id: testAccount.type === 'admin' ? 1 : testAccount.type === 'editor' ? 2 : testAccount.type === 'consultant' ? 3 : 4,
          name: testAccount.name,
          email: testAccount.email,
          role: testAccount.role,
          location: testAccount.location,
          pets: testAccount.pets || [],
          loginTime: new Date().toISOString(),
          rememberMe: formData.rememberMe
        };
        
        login(userData);
        navigate('/dashboard');
        
      } else {
        setError('Credenciais inválidas! Use uma das contas de teste.');
      }
      
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <div className="brand-logo">
              <span className="logo-icon">🐾</span>
              <h1>NaturaVet</h1>
            </div>
            <p className="brand-subtitle">
              Acesse sua conta e cuide melhor do seu pet
            </p>
          </div>
          
          <div className="login-illustration">
            <div className="illustration-placeholder">
              <span>🐕‍🦺</span>
              <p>Bem-vindo de volta!</p>
            </div>
          </div>
        </div>
        
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-header">
              <h2>Entrar na sua conta</h2>
              <p>Entre com seus dados para acessar o sistema</p>
            </div>
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
            
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    disabled={isLoading}
                  />
                  <span className="input-icon">📧</span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              
              <div className="form-options">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  Lembrar de mim
                </label>
                
                <a href="#forgot" className="forgot-link">
                  Esqueceu a senha?
                </a>
              </div>
              
              <button 
                type="submit" 
                className={`login-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
            
            <div className="login-divider">
              <span>ou</span>
            </div>
            
            <div className="social-login">
              <button className="social-btn google-btn" disabled={isLoading}>
                <span className="social-icon">🔍</span>
                Entrar com Google
              </button>
              
              <button className="social-btn facebook-btn" disabled={isLoading}>
                <span className="social-icon">📘</span>
                Entrar com Facebook
              </button>
            </div>
            
            <div className="login-footer">
              <p>
                Não tem uma conta? 
                <a href="#register" className="register-link">Cadastre-se</a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Painel de Contas de Teste */}
        <div className="test-accounts-panel">
          <div className="test-accounts-header">
            <h3>🧪 Contas de Teste</h3>
            <p>Clique para preencher automaticamente ou fazer login direto</p>
          </div>
          
          <div className="test-accounts-list">
            {testAccounts.map((account, index) => (
              <div 
                key={index}
                className="test-account-card"
              >
                <div className="account-icon">{account.icon}</div>
                <div className="account-info">
                  <h4>{account.name}</h4>
                  <p className="account-email">{account.email}</p>
                  <p className="account-description">{account.description}</p>
                  <div className="account-credentials">
                    <span>Senha: {account.password}</span>
                  </div>
                </div>
                <div className="account-actions">
                  <button
                    className="fill-btn"
                    onClick={() => handleTestLogin(account)}
                    disabled={isLoading}
                    title="Preencher formulário"
                  >
                    📝
                  </button>
                  <button
                    className="quick-login-btn"
                    onClick={() => handleQuickLogin(account)}
                    disabled={isLoading}
                    title="Login direto"
                  >
                    🚀
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="test-accounts-footer">
            <p>💡 Estas são contas fictícias apenas para demonstração</p>
            <div className="test-accounts-legend">
              <span>📝 = Preencher formulário</span>
              <span>🚀 = Login direto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;