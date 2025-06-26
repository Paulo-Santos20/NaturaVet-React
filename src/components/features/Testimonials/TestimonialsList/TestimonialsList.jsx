import React from 'react';
import TestimonialCard from '../TestimonialCard';
import '../../../../styles/components/Testimonials.css';

const TestimonialsList = () => {
  const testimonials = [
    {
      name: 'Maria Silva',
      pet: 'Luna (Golden Retriever)',
      image: '🐕',
      text: 'A NaturaVet transformou a vida da Luna! Ela perdeu peso de forma saudável e está muito mais ativa e feliz.',
      rating: 5
    },
    {
      name: 'João Santos',
      pet: 'Mimi (Gato Persa)',
      image: '🐱',
      text: 'Excelente atendimento! A Mimi tinha problemas digestivos e agora está completamente recuperada.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      pet: 'Rex (Pastor Alemão)',
      image: '🐕‍🦺',
      text: 'Profissionalismo excepcional. O Rex nunca esteve tão saudável. Recomendo a todos os tutores!',
      rating: 5
    },
    {
      name: 'Carlos Oliveira',
      pet: 'Bella (Labrador)',
      image: '🦮',
      text: 'A Bella tinha diabetes e com o plano nutricional da NaturaVet conseguimos controlar perfeitamente.',
      rating: 5
    }
  ];

  return (
    <section id="depoimentos" className="section testimonials">
      <div className="container">
        <h2 className="section-title">O Que Nossos Clientes Dizem</h2>
        <p className="section-subtitle">
          Histórias reais de transformação e cuidado com nossos pacientes peludos
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsList;