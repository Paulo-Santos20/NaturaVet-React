import React from 'react';
import './BlogCategories.css';

const BlogCategories = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'Todas', icon: '📚', count: 12 },
    { id: 'nutricao', name: 'Nutrição', icon: '🥗', count: 5 },
    { id: 'saude', name: 'Saúde', icon: '🏥', count: 3 },
    { id: 'dicas', name: 'Dicas', icon: '💡', count: 2 },
    { id: 'receitas', name: 'Receitas', icon: '👨‍🍳', count: 1 },
    { id: 'comportamento', name: 'Comportamento', icon: '🐕', count: 1 }
  ];

  return (
    <div className="blog-categories">
      <h3 className="categories-title">📂 Categorias</h3>
      <div className="categories-list">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`category-item ${
              selectedCategory === category.id ? 'active' : ''
            }`}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
            <span className="category-count">({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;