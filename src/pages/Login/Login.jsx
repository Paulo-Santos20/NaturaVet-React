import React, { useState } from 'react';
import '../../styles/pages/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Contas de teste
  const testAccounts = [
    {
      type: 'admin',
      name: 'Administrador',
      email: 'admin@naturavet.com',
      password: 'admin123',
      icon: '👨‍💼',
      description: 'Acesso total ao sistema'
    },
    {
      type: 'editor',
      name: 'Editor',
      email: 'editor@naturavet.com',
      password: 'editor123',
      icon: '✍️',
      description: 'Gerenciar conteúdo e blog'
    },
    {
      type: 'consultant',
      name: 'Consultor',
      email: 'consultor@naturavet.com',
      password: 'consultor123',
      icon: '👩‍⚕️',
      description: 'Atender clientes e pets'
    },
    {
      type: 'client',
      name: 'Cliente',
      email: 'cliente@naturavet.com',
      password: 'cliente123',
      icon: '🐕',
      description: 'Cuidar do meu pet'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTestLogin = (account) => {
    setFormData({
      email: account.email,
      password: account.password,
      rememberMe: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Verificar se é uma conta de teste
    const testAccount = testAccounts.find(
      account => account.email === formData.email && account.password === formData.password
    );
    
    setTimeout(() => {
      if (testAccount) {
        // Salvar dados do usuário no localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          ...testAccount,
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }));
        
        alert(`Login realizado como ${testAccount.name}!\nRedirecionando para o dashboard...`);
        
        // Redirecionar para o dashboard específico
        window.location.hash = `dashboard-${testAccount.type}`;
        
        // Forçar recarregamento da página para garantir que o App.jsx detecte a mudança
        window.location.reload();
        
      } else {
        alert('Credenciais inválidas! Use uma das contas de teste.');
      }
      setIsLoading(false);
    }, 1500);
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
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
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
              <button className="social-btn google-btn">
                <span className="social-icon">🔍</span>
                Entrar com Google
              </button>
              
              <button className="social-btn facebook-btn">
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
            <p>Clique para preencher automaticamente</p>
          </div>
          
          <div className="test-accounts-list">
            {testAccounts.map((account, index) => (
              <div 
                key={index}
                className="test-account-card"
                onClick={() => handleTestLogin(account)}
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
                <div className="account-arrow">→</div>
              </div>
            ))}
          </div>
          
          <div className="test-accounts-footer">
            <p>💡 Estas são contas fictícias apenas para demonstração</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;