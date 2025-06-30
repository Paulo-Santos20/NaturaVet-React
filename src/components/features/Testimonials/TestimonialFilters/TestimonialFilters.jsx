import React from 'react';
import './TestimonialFilters.css';

const TestimonialFilters = ({ selectedFilter, onFilterChange, testimonials }) => {
  const filters = [
    { id: 'all', name: 'Todos', icon: '📋', count: testimonials.length },
    { id: 'nutrição', name: 'Nutrição', icon: '🥗', count: testimonials.filter(t => t.category === 'nutrição').length },
    { id: 'emagrecimento', name: 'Emagrecimento', icon: '⚖️', count: testimonials.filter(t => t.category === 'emagrecimento').length },
    { id: 'saúde', name: 'Saúde Geral', icon: '🏥', count: testimonials.filter(t => t.category === 'saúde').length },
    { id: 'comportamento', name: 'Comportamento', icon: '🐕', count: testimonials.filter(t => t.category === 'comportamento').length },
    { id: '5', name: '5 Estrelas', icon: '⭐', count: testimonials.filter(t => t.rating === 5).length },
    { id: '4', name: '4+ Estrelas', icon: '⭐', count: testimonials.filter(t => t.rating >= 4).length }
  ];

  return (
    <div className="testimonial-filters">
      <h3 className="filters-title">🔍 Filtrar Depoimentos</h3>
      <div className="filters-list">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`filter-item ${
              selectedFilter === filter.id ? 'active' : ''
            }`}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-name">{filter.name}</span>
            <span className="filter-count">({filter.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialFilters;