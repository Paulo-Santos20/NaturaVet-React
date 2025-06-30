import React, { useState, useEffect } from 'react';
import TestimonialCard from '../../components/features/Testimonials/TestimonialCard/TestimonialCard';
import TestimonialFilters from '../../components/features/Testimonials/TestimonialFilters/TestimonialFilters';
import TestimonialStats from '../../components/features/Testimonials/TestimonialStats/TestimonialStats';
import TestimonialForm from '../../components/features/Testimonials/TestimonialForm/TestimonialForm';
import { testimonialsData } from '../../data/testimonials';
import '../../styles/pages/Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonialsData);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const testimonialsPerPage = 6;

  // Filtrar depoimentos
  useEffect(() => {
    let filtered = testimonials;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(testimonial => 
        testimonial.category === selectedFilter ||
        testimonial.rating >= parseInt(selectedFilter)
      );
    }

    setFilteredTestimonials(filtered);
    setCurrentPage(1);
  }, [selectedFilter, testimonials]);

  // Paginação
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = filteredTestimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);
  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage);

  const handleFilterChange = (filter) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedFilter(filter);
      setLoading(false);
    }, 300);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewTestimonial = (newTestimonial) => {
    const testimonialWithId = {
      ...newTestimonial,
      id: testimonials.length + 1,
      date: new Date().toLocaleDateString('pt-BR'),
      verified: false
    };
    setTestimonials([testimonialWithId, ...testimonials]);
    setShowForm(false);
  };

  return (
    <div className="testimonials-page">
      {/* HERO SECTION */}
      <section className="testimonials-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Depoimentos de <span className="highlight">Tutores Felizes</span>
            </h1>
            <p className="hero-description">
            </p>
            
            {/* ESTATÍSTICAS */}
            <TestimonialStats testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CONTENT */}
      <section className="testimonials-content">
        <div className="container">
          {/* FILTROS HORIZONTAIS */}
          <div className="filters-section">
            <TestimonialFilters 
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
              testimonials={testimonials}
            />
          </div>

          {/* HEADER COM BOTÃO DE DEPOIMENTO */}
          <div className="testimonials-header">
            <div className="results-info">
              <span className="results-count">
                {filteredTestimonials.length} depoimento{filteredTestimonials.length !== 1 ? 's' : ''} encontrado{filteredTestimonials.length !== 1 ? 's' : ''}
              </span>
              {selectedFilter !== 'all' && (
                <button 
                  onClick={() => setSelectedFilter('all')}
                  className="clear-filter"
                >
                  Limpar filtro ×
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setShowForm(true)}
              className="btn btn-primary add-testimonial-btn"
            >
              <span className="btn-icon">✍️</span>
              <span className="btn-text">Deixar Depoimento</span>
            </button>
          </div>

          {/* TESTIMONIALS GRID */}
          <div className={`testimonials-grid ${loading ? 'loading' : ''}`}>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando depoimentos...</p>
              </div>
            ) : currentTestimonials.length > 0 ? (
              currentTestimonials.map(testimonial => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                />
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">😔</div>
                <h3>Nenhum depoimento encontrado</h3>
                <p>Tente ajustar os filtros ou seja o primeiro a deixar um depoimento!</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary"
                >
                  Deixar Depoimento
                </button>
              </div>
            )}
          </div>

          {/* PAGINAÇÃO */}
          {totalPages > 1 && !loading && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn pagination-prev"
              >
                ← Anterior
              </button>
              
              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`pagination-number ${
                        currentPage === page ? 'active' : ''
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn pagination-next"
              >
                Próximo →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MODAL DO FORMULÁRIO */}
      {showForm && (
        <TestimonialForm 
          onSubmit={handleNewTestimonial}
          onClose={() => setShowForm(false)}
        />
      )}

            {/* CTA FINAL */}
      <section className="testimonials-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Pronto para Transformar a Vida do seu Pet?</h2>
            <p className="cta-description">
              Junte-se aos nossos clientes satisfeitos e proporcione o melhor cuidado nutricional para seu animal
            </p>
            <div className="cta-buttons">
              <a href="/contato" className="btn btn-primary cta-btn">
                <span className="btn-icon">📞</span>
                <span className="btn-text">Entrar em Contato</span>
              </a>
              <a href="/servicos" className="btn btn-secondary cta-btn">
                <span className="btn-text">Ver Serviços</span>
                <span className="btn-icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;