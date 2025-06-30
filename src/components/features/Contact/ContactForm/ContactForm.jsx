import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
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
    
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        petName: '',
        petType: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'error' : ''}`}
            placeholder="Seu nome completo"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'error' : ''}`}
            placeholder="seu@email.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? 'error' : ''}`}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="petName" className="form-label">
            Nome do Pet
          </label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            className="form-control"
            placeholder="Nome do seu pet"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="petType" className="form-label">
            Tipo de Animal
          </label>
          <select
            id="petType"
            name="petType"
            value={formData.petType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Selecione o tipo</option>
            <option value="cao">Cão</option>
            <option value="gato">Gato</option>
            <option value="passaro">Pássaro</option>
            <option value="coelho">Coelho</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="urgency" className="form-label">
            Urgência
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="form-control"
          >
            <option value="normal">Normal</option>
            <option value="urgente">Urgente</option>
            <option value="emergencia">Emergência</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-control"
          placeholder="Assunto da sua mensagem"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`form-control ${errors.message ? 'error' : ''}`}
          rows="5"
          placeholder="Descreva sua necessidade, dúvida ou como podemos ajudar..."
        ></textarea>
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      <div className="form-group">
  <label className="form-label">Forma preferida de contato</label>
  <div className="radio-group">
    <label 
      className={`radio-label ${formData.preferredContact === 'email' ? 'selected' : ''}`}
      data-option="email"
    >
      <input
        type="radio"
        name="preferredContact"
        value="email"
        checked={formData.preferredContact === 'email'}
        onChange={handleChange}
      />
      <span className="radio-custom"></span>
      Email
    </label>
    <label 
      className={`radio-label ${formData.preferredContact === 'phone' ? 'selected' : ''}`}
      data-option="phone"
    >
      <input
        type="radio"
        name="preferredContact"
        value="phone"
        checked={formData.preferredContact === 'phone'}
        onChange={handleChange}
      />
      <span className="radio-custom"></span>
      Telefone
    </label>
    <label 
      className={`radio-label ${formData.preferredContact === 'whatsapp' ? 'selected' : ''}`}
      data-option="whatsapp"
    >
      <input
        type="radio"
        name="preferredContact"
        value="whatsapp"
        checked={formData.preferredContact === 'whatsapp'}
        onChange={handleChange}
      />
      <span className="radio-custom"></span>
      WhatsApp
    </label>
  </div>
</div>

      <button 
        type="submit" 
        className={`btn btn-primary form-submit ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading-spinner"></span>
            <span className="btn-text">Enviando...</span>
          </>
        ) : (
          <>
            <span className="btn-icon">📧</span>
            <span className="btn-text">Enviar Mensagem</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;