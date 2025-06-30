import React, { useState } from 'react';
import './BlogSearch.css';

const BlogSearch = ({ onSearch, variant = 'default', placeholder = 'Digite sua busca...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`blog-search ${variant === 'hero' ? 'hero-variant' : ''}`}>
      {variant === 'default' && (
        <h3 className="search-title">🔍 Buscar Artigos</h3>
      )}
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={variant === 'hero' ? 'Busque por artigos, dicas, receitas...' : placeholder}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear"
              title="Limpar busca"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          <span className="btn-icon">🔍</span>
          <span className="btn-text">
            {variant === 'hero' ? 'Buscar' : 'Buscar'}
          </span>
        </button>
      </form>
    </div>
  );
};

export default BlogSearch;