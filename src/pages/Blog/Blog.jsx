import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../components/features/Blog/BlogCard/BlogCard';
import BlogCategories from '../../components/features/Blog/BlogCategories/BlogCategories';
import BlogSearch from '../../components/features/Blog/BlogSearch/BlogSearch';
import BlogFeatured from '../../components/features/Blog/BlogFeatured/BlogFeatured';
import { blogPosts } from '../../data/blogPosts';
import '../../styles/pages/Blog.css';

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(blogPosts);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const postsPerPage = 6;
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  // Filtrar posts por categoria e busca
  useEffect(() => {
    let filtered = posts;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post =>
        post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, posts]);

  // Paginação
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryChange = (category) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setLoading(false);
    }, 300);
  };

  const handleSearch = (term) => {
    setLoading(true);
    setTimeout(() => {
      setSearchTerm(term);
      setLoading(false);
    }, 300);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadArticle = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="container">
          <div className="hero-content">
           
            <h1 className="hero-title">
              Blog <span className="highlight">NaturaVet</span>
            </h1>
            <p className="hero-description">
              Dicas, informações e novidades sobre nutrição e saúde animal.
              Conteúdo especializado para cuidar melhor do seu pet.
            </p>

            {/* BARRA DE BUSCA CENTRALIZADA */}
            {/* BARRA DE BUSCA CENTRALIZADA */}
            <div className="hero-search">
              <BlogSearch
                onSearch={handleSearch}
                variant="hero"
                placeholder="Busque por artigos, dicas, receitas..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="blog-content">
        <div className="container">
          <div className="blog-layout">
            {/* SIDEBAR */}
            <aside className="blog-sidebar">
              <div className="sidebar-content">
                <BlogCategories
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />

                {/* NEWSLETTER */}
                <div className="newsletter-widget">
                  <div className="widget-header">
                    <h3 className="widget-title">📧 Newsletter</h3>
                    <p className="widget-subtitle">
                      Receba dicas semanais sobre nutrição animal
                    </p>
                  </div>
                  <form className="newsletter-form">
                    <input
                      type="email"
                      placeholder="Seu melhor email"
                      className="newsletter-input"
                    />
                    <button type="submit" className="newsletter-btn">
                      Inscrever
                    </button>
                  </form>
                </div>

                {/* POSTS POPULARES */}
                <div className="popular-widget">
                  <h3 className="widget-title">🔥 Mais Lidos</h3>
                  <div className="popular-posts">
                    {blogPosts
                      .filter(post => post.popular)
                      .slice(0, 3)
                      .map(post => (
                        <div
                          key={post.id}
                          className="popular-item"
                          onClick={() => handleReadArticle(post.id)}
                        >
                          <img
                            src={post.image}
                            alt={post.title}
                            className="popular-image"
                          />
                          <div className="popular-content">
                            <h4 className="popular-title">{post.title}</h4>
                            <span className="popular-date">{post.date}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="blog-main">
              {/* ARTIGO EM DESTAQUE */}
              <div className="featured-section">
                <div className="section-header">
                  <h2 className="section-title">⭐ Artigo em Destaque</h2>
                </div>
                <BlogFeatured post={featuredPost} onReadArticle={handleReadArticle} />
              </div>

              {/* FILTROS ATIVOS */}
              <div className="blog-header">
                <div className="blog-filters">
                  <span className="results-count">
                    {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''} encontrado{filteredPosts.length !== 1 ? 's' : ''}
                  </span>
                  {(selectedCategory !== 'all' || searchTerm) && (
                    <div className="active-filters">
                      {selectedCategory !== 'all' && (
                        <span className="filter-tag">
                          Categoria: {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className="filter-remove"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="filter-tag">
                          Busca: "{searchTerm}"
                          <button
                            onClick={() => setSearchTerm('')}
                            className="filter-remove"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* POSTS GRID */}
              <div className={`blog-grid ${loading ? 'loading' : ''}`}>
                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando artigos...</p>
                  </div>
                ) : currentPosts.length > 0 ? (
                  currentPosts.map(post => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onReadArticle={handleReadArticle}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>Nenhum artigo encontrado</h3>
                    <p>Tente ajustar os filtros ou buscar por outros termos.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchTerm('');
                      }}
                      className="btn btn-primary"
                    >
                      Limpar Filtros
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
                          className={`pagination-number ${currentPage === page ? 'active' : ''
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
            </main>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="blog-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Precisa de Ajuda Personalizada?</h2>
            <p className="cta-description">
              Agende uma consulta e receba orientações específicas para seu pet
            </p>
            <div className="cta-buttons">
              <a href="/contato" className="btn btn-primary cta-btn">
                <span className="btn-icon">📅</span>
                <span className="btn-text">Agendar Consulta</span>
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

export default Blog;