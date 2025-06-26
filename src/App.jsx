import React from 'react';
import './styles/globals.css';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

function App() {
  // Roteamento simples baseado no hash da URL
  const getPageFromHash = () => {
    const hash = window.location.hash.slice(1);
    switch(hash) {
      case 'sobre': return <About />;
      case 'servicos': return <Services />;
      default: return <Home />;
    }
  };

  const [currentPage, setCurrentPage] = React.useState(getPageFromHash());

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="App">
      <Layout>
        {currentPage}
      </Layout>
    </div>
  );
}

export default App;