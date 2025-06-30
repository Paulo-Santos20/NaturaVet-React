import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks/userAuth'; // Hook de autenticação
import './TestimonialForm.css';

const TestimonialForm = ({ onSubmit, onClose }) => {
  const { user, isAuthenticated } = useAuth(); // Dados do usuário logado
  
  const [formData, setFormData] = useState({
    name: '',
    petName: '',
    petType: '',
    rating: 5,
    title: '',
    content: '',
    category: '',
    location: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Preencher dados automaticamente se usuário estiver logado
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        location: user.location || '',
        // Se usuário tem apenas 1 pet, seleciona automaticamente
        ...(user.pets && user.pets.length === 1 && {
          petName: user.pets[0].name || '',
          petType: user.pets[0].type || ''
        })
      }));

      // Se tem apenas 1 pet, seleciona automaticamente
      if (user.pets && user.pets.length === 1) {
        setSelectedPet(user.pets[0]);
      }
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
    setFormData(prev => ({
      ...prev,
      petName: pet.name,
      petType: pet.type
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.petName.trim()) {
      newErrors.petName = 'Nome do pet é obrigatório';
    }

    if (!formData.petType) {
      newErrors.petType = 'Tipo do pet é obrigatório';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Depoimento é obrigatório';
    } else if (formData.content.trim().length < 50) {
      newErrors.content = 'Depoimento deve ter pelo menos 50 caracteres';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simular envio com dados limpos
    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      petName: formData.petName.trim(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      location: formData.location.trim(),
      email: formData.email.trim(),
      petId: selectedPet?.id || null // ID do pet selecionado
    };

    setTimeout(() => {
      onSubmit(cleanedData);
      setIsSubmitting(false);
    }, 1500);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, rating: index + 1 }))}
        className={`star-btn ${index < formData.rating ? 'active' : ''}`}
      >
        ⭐
      </button>
    ));
  };

  const renderPetSelection = () => {
    if (!isAuthenticated || !user?.pets || user.pets.length <= 1) {
      return null;
    }

    return (
      <div className="form-group">
        <label className="form-label">Selecione o Pet *</label>
        <div className="pet-selection">
          {user.pets.map((pet) => (
            <button
              key={pet.id}
              type="button"
              onClick={() => handlePetSelection(pet)}
              className={`pet-option ${selectedPet?.id === pet.id ? 'selected' : ''}`}
            >
              <div className="pet-avatar">
                {pet.photo ? (
                  <img src={pet.photo} alt={pet.name} />
                ) : (
                  <div className="pet-placeholder">
                    {pet.type === 'cão' ? '🐕' : pet.type === 'gato' ? '🐱' : '🐾'}
                  </div>
                )}
              </div>
              <div className="pet-info">
                <span className="pet-name">{pet.name}</span>
                <span className="pet-type">{pet.type}</span>
              </div>
              {selectedPet?.id === pet.id && (
                <div className="selected-indicator">✓</div>
              )}
            </button>
          ))}
        </div>
        {errors.petName && <span className="error-message">{errors.petName}</span>}
      </div>
    );
  };

  return (
    <div className="testimonial-form-overlay">
      <div className="testimonial-form-container">
        <div className="form-header">
          <h2 className="form-title">
            ✍️ Deixar Depoimento
            {isAuthenticated && user && (
              <span className="user-greeting">Olá, {user.name}!</span>
            )}
          </h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="testimonial-form">
          {/* SELEÇÃO DE PET (se usuário tem múltiplos pets) */}
          {renderPetSelection()}

          {/* DADOS PESSOAIS (preenchidos automaticamente se logado) */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Seu Nome *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''} ${isAuthenticated ? 'auto-filled' : ''}`}
                placeholder="Digite seu nome"
                maxLength="50"
                readOnly={isAuthenticated && user?.name}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''} ${isAuthenticated ? 'auto-filled' : ''}`}
                placeholder="seu@email.com"
                maxLength="100"
                readOnly={isAuthenticated && user?.email}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          {/* DADOS DO PET (preenchidos automaticamente se selecionado) */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nome do Pet *</label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                className={`form-input ${errors.petName ? 'error' : ''} ${selectedPet ? 'auto-filled' : ''}`}
                placeholder="Nome do seu pet"
                maxLength="30"
                readOnly={selectedPet}
              />
              {errors.petName && <span className="error-message">{errors.petName}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Tipo do Pet *</label>
              <select
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                className={`form-select ${errors.petType ? 'error' : ''} ${selectedPet ? 'auto-filled' : ''}`}
                disabled={selectedPet}
              >
                <option value="">Selecione</option>
                <option value="cão">Cão</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
              {errors.petType && <span className="error-message">{errors.petType}</span>}
            </div>
          </div>

          {/* CATEGORIA E LOCALIZAÇÃO */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Categoria *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`form-select ${errors.category ? 'error' : ''}`}
              >
                <option value="">Selecione a categoria</option>
                <option value="nutrição">Nutrição</option>
                <option value="emagrecimento">Emagrecimento</option>
                <option value="saúde">Saúde Geral</option>
                <option value="comportamento">Comportamento</option>
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Localização</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-input ${isAuthenticated && user?.location ? 'auto-filled' : ''}`}
                placeholder="Cidade, Estado"
                maxLength="50"
                readOnly={isAuthenticated && user?.location}
              />
            </div>
          </div>

          {/* AVALIAÇÃO */}
          <div className="form-group">
            <label className="form-label">Avaliação *</label>
            <div className="rating-input">
              {renderStars()}
              <span className="rating-text">({formData.rating}/5)</span>
            </div>
          </div>

          {/* TÍTULO DO DEPOIMENTO */}
          <div className="form-group">
            <label className="form-label">Título do Depoimento *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Ex: Transformação incrível na saúde do meu pet"
              maxLength="100"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* DEPOIMENTO */}
          <div className="form-group">
            <label className="form-label">Seu Depoimento *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`form-textarea ${errors.content ? 'error' : ''}`}
              placeholder="Conte sua experiência com nossos serviços e como ajudamos seu pet..."
              rows="5"
              maxLength="500"
            />
            <div className="character-count">
              {formData.content.length}/500 caracteres
            </div>
            {errors.content && <span className="error-message">{errors.content}</span>}
          </div>

          {/* BOTÕES */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <span className="btn-icon">📝</span>
                  Enviar Depoimento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;