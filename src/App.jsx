import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Services from './pages/Services/Services'
import Testimonials from './pages/Testimonials/Testimonials'
import Contact from './pages/Contact/Contact'
import Blog from './pages/Blog/Blog'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  // FORÇAR POSIÇÃO NO TOPO - sem animação
  useEffect(() => {
    console.log('🔄 Mudando para:', location.pathname)
    
    // Forçar posição imediatamente - SEM animação
    const forceScrollToTop = () => {
      // Desabilitar scroll suave temporariamente
      const html = document.documentElement
      const body = document.body
      
      // Salvar comportamento atual
      const htmlBehavior = html.style.scrollBehavior
      const bodyBehavior = body.style.scrollBehavior
      
      // Forçar scroll instantâneo
      html.style.scrollBehavior = 'auto'
      body.style.scrollBehavior = 'auto'
      
      // Múltiplas formas de forçar posição
      window.scrollTo(0, 0)
      html.scrollTop = 0
      body.scrollTop = 0
      window.pageYOffset = 0
      
      // Restaurar comportamento após um tempo
      setTimeout(() => {
        html.style.scrollBehavior = htmlBehavior
        body.style.scrollBehavior = bodyBehavior
      }, 100)
      
      console.log('✅ Posição forçada para o topo')
    }
    
    // Executar ANTES da renderização
    forceScrollToTop()
    
    // Executar DURANTE a renderização
    const timer1 = setTimeout(forceScrollToTop, 0)
    const timer2 = setTimeout(forceScrollToTop, 1)
    
    // Executar APÓS a renderização
    requestAnimationFrame(() => {
      forceScrollToTop()
      requestAnimationFrame(forceScrollToTop)
    })
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [location.pathname])

  // Carregamento do usuário
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('naturavet_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        localStorage.removeItem('naturavet_user')
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const handleLogin = (userData) => {
    try {
      setUser(userData)
      localStorage.setItem('naturavet_user', JSON.stringify(userData))
    } catch (error) {
      console.error('Erro ao fazer login:', error)
    }
  }

  const handleLogout = () => {
    try {
      setUser(null)
      localStorage.removeItem('naturavet_user')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando NaturaVet...</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/depoimentos" element={<Testimonials />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />

          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />

          <Route 
            path="/dashboard/*" 
            element={
              user ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App