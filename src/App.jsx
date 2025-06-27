import React from 'react';
import './styles/globals.css';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  // Verificar se há usuário logado no localStorage
  React.useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.isLoggedIn) {
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const getPageFromHash = () => {
    const hash = window.location.hash.slice(1);
    
    // Se há um usuário logado e está tentando acessar dashboard
    if (hash.startsWith('dashboard-')) {
      const userType = hash.replace('dashboard-', '');
      
      // Verificar se o usuário tem permissão para este dashboard
      if (currentUser && currentUser.type === userType) {
        return <Dashboard userType={userType} />;
      } else if (currentUser) {
        // Redirecionar para o dashboard correto do usuário
        window.location.hash = `dashboard-${currentUser.type}`;
        return <Dashboard userType={currentUser.type} />;
      } else {
        // Não está logado, redirecionar para login
        window.location.hash = 'login';
        return <Login />;
      }
    }
    
    // Rotas normais
    switch(hash) {
      case 'sobre': return <About />;
      case 'servicos': return <Services />;
      case 'login': 
        // Se já está logado, redirecionar para dashboard
        if (currentUser && currentUser.isLoggedIn) {
          window.location.hash = `dashboard-${currentUser.type}`;
          return <Dashboard userType={currentUser.type} />;
        }
        return <Login />;
      default: 
        // Se está logado e tenta acessar home, redirecionar para dashboard
        if (currentUser && currentUser.isLoggedIn) {
          window.location.hash = `dashboard-${currentUser.type}`;
          return <Dashboard userType={currentUser.type} />;
        }
        return <Home />;
    }
  };

  const [currentPage, setCurrentPage] = React.useState(getPageFromHash());

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  // Atualizar página quando currentUser mudar
  React.useEffect(() => {
    setCurrentPage(getPageFromHash());
  }, [currentUser]);

  // Se estiver no dashboard, não usar o Layout padrão
  const isDashboard = window.location.hash.includes('dashboard');

  if (isDashboard) {
    return <div className="App">{currentPage}</div>;
  }

  return (
    <div className="App">
      <Layout>
        {currentPage}
      </Layout>
    </div>
  );
}

export default App;