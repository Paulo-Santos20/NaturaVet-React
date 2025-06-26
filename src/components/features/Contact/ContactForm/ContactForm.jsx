import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petName: '',
    petType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      petName: '',
      petType: '',
      message: ''
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome Completo *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">E-mail *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Telefone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="petName">Nome do Pet</label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="petType">Tipo de Animal</label>
          <select
            id="petType"
            name="petType"
            value={formData.petType}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="cao">Cão</option>
            <option value="gato">Gato</option>
            <option value="passaro">Pássaro</option>
            <option value="coelho">Coelho</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Mensagem *</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder="Conte-nos sobre as necessidades do seu pet ou suas dúvidas..."
          required
        ></textarea>
      </div>
      
      <button type="submit" className="btn contact-btn">
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm;