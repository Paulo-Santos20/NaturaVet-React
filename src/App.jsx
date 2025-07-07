import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/common/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Testimonials from './pages/Testimonials/Testimonials';
import Contact from './pages/Contact/Contact';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost/BlogPost';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router> 
          <div className="App">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/sobre" element={<Layout><About /></Layout>} />
               <Route path="/servicos" element={<Services />} /> 
              <Route path="/services" element={<Services />} />
              <Route path="/depoimentos" element={<Layout><Testimonials /></Layout>} />
              <Route path="/contato" element={<Layout><Contact /></Layout>} />
              <Route path="/blog" element={<Layout><Blog /></Layout>} />
              <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
              <Route path="/login" element={<Login />} />
              
              {/* Rotas protegidas do dashboard */}
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;