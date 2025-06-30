import React, { useState } from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial, onEdit, onDelete, showActions = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Verificar se testimonial existe e tem as propriedades necessárias
  if (!testimonial) {
    return (
      <div className="testimonial-card error">
        <p>Erro: Depoimento não encontrado</p>
      </div>
    );
  }

  // Valores padrão para evitar erros
  const {
    id = 0,
    name = 'Usuário Anônimo',
    petName = 'Pet',
    petType = 'animal',
    rating = 5,
    title = 'Sem título',
    content = '',
    category = 'geral',
    location = '',
    date = new Date().toISOString(),
    verified = false
  } = testimonial;

  // Verificar se content existe antes de usar length
  const maxLength = 150;
  const shouldTruncate = content && content.length > maxLength;
  const displayContent = shouldTruncate && !isExpanded 
    ? content.substring(0, maxLength) + '...'
    : content || 'Conteúdo não disponível';

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Data não disponível';
    }
  };

  const renderStars = (rating) => {
    const validRating = Math.max(1, Math.min(5, rating || 5));
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < validRating ? 'filled' : ''}`}
      >
        ⭐
      </span>
    ));
  };

  const getPetIcon = (type) => {
    const icons = {
      'cão': '🐕',
      'gato': '🐱',
      'cachorro': '🐕',
      'dog': '🐕',
      'cat': '🐱',
      'outro': '🐾'
    };
    return icons[type?.toLowerCase()] || '🐾';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'nutrição': '#4CAF50',
      'emagrecimento': '#FF9800',
      'saúde': '#2196F3',
      'comportamento': '#9C27B0',
      'geral': '#607D8B'
    };
    return colors[category?.toLowerCase()] || colors.geral;
  };

  const handleEdit = () => {
    if (onEdit && typeof onEdit === 'function') {
      onEdit(testimonial);
    }
  };

  const handleDelete = () => {
    if (onDelete && typeof onDelete === 'function') {
      if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
        onDelete(id);
      }
    }
  };

  return (
    <div className="testimonial-card">
      {/* Header do Card */}
      <div className="testimonial-header">
        <div className="user-info">
          <div className="user-avatar">
            <span>{name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h4 className="user-name">
              {name}
              {verified && <span className="verified-badge">✓</span>}
            </h4>
            <div className="pet-info">
              <span className="pet-icon">{getPetIcon(petType)}</span>
              <span className="pet-name">{petName}</span>
              <span className="pet-type">({petType})</span>
            </div>
            {location && (
              <p className="user-location">📍 {location}</p>
            )}
          </div>
        </div>

        {showActions && (
          <div className="card-actions">
            <button 
              onClick={handleEdit}
              className="action-btn edit-btn"
              title="Editar depoimento"
            >
              ✏️
            </button>
            <button 
              onClick={handleDelete}
              className="action-btn delete-btn"
              title="Excluir depoimento"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="testimonial-rating">
        <div className="stars">
          {renderStars(rating)}
        </div>
        <span className="rating-text">({rating}/5)</span>
      </div>

      {/* Título */}
      <h3 className="testimonial-title">{title}</h3>

      {/* Conteúdo */}
      <div className="testimonial-content">
        <p>{displayContent}</p>
        {shouldTruncate && (
          <button 
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Ler menos' : 'Ler mais'}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="testimonial-footer">
        <div className="testimonial-meta">
          <span 
            className="category-tag"
            style={{ backgroundColor: getCategoryColor(category) }}
          >
            {category}
          </span>
          <span className="testimonial-date">
            {formatDate(date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;