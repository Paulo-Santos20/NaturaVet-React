import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
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

// Componente interno que usa o contexto
function AppContent() {
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

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/depoimentos" element={<Testimonials />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

// Componente principal com AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App