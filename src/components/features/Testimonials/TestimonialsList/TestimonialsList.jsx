import TestimonialCard from '../TestimonialCard';
import '../../../../styles/components/Testimonials.css';
import React, { useState, useEffect, useRef } from 'react';


const TestimonialsList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Maria Silva',
      pet: 'Luna (Golden Retriever)',
      image: '🐕',
      text: 'A NaturaVet transformou a vida da Luna! Ela perdeu peso de forma saudável e está muito mais ativa e feliz. O acompanhamento foi excepcional!',
      rating: 5,
      date: '2025-01-15'
    },
    {
      id: 2,
      name: 'João Santos',
      pet: 'Mimi (Gato Persa)',
      image: '🐱',
      text: 'Excelente atendimento! A Mimi tinha problemas digestivos graves e agora está completamente recuperada. Muito obrigado pela dedicação!',
      rating: 5,
      date: '2025-01-10'
    },
    {
      id: 3,
      name: 'Ana Costa',
      pet: 'Rex (Pastor Alemão)',
      image: '🐕‍🦺',
      text: 'Profissionalismo excepcional. O Rex nunca esteve tão saudável e cheio de energia. Recomendo a todos os tutores responsáveis!',
      rating: 5,
      date: '2025-01-08'
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      pet: 'Bella (Labrador)',
      image: '🦮',
      text: 'A Bella tinha diabetes e com o plano nutricional personalizado da NaturaVet conseguimos controlar perfeitamente. Vida nova!',
      rating: 5,
      date: '2025-01-05'
    },
    {
      id: 5,
      name: 'Fernanda Lima',
      pet: 'Thor (Rottweiler)',
      image: '🐕',
      text: 'O Thor estava com sobrepeso e agora está no peso ideal. O cuidado e atenção da equipe fazem toda a diferença!',
      rating: 5,
      date: '2025-01-03'
    },
    {
      id: 6,
      name: 'Roberto Mendes',
      pet: 'Princesa (Yorkshire)',
      image: '🐕',
      text: 'A Princesa era muito seletiva com comida. Hoje ela come de tudo e está super saudável. Serviço incrível!',
      rating: 5,
      date: '2024-12-28'
    }
  ];

  // Calcular número total de páginas (2 testimonials por página)
  const totalPages = Math.ceil(testimonials.length / 2);

  // Auto-play do carrossel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
    }, 5000); // Muda a cada 5 segundos

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalPages]);

  // Controles manuais
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
  };

  // Obter testimonials da página atual
  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * 2;
    return testimonials.slice(startIndex, startIndex + 2);
  };

  return (
    <section id="depoimentos" className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">Opiniões Mais Recentes</h2>
          <p className="testimonials-subtitle">
            Histórias reais de transformação e cuidado com nossos pacientes peludos
          </p>
        </div>

        <div className="testimonials-carousel">
          {/* Controles Laterais */}
          <button 
            className="carousel-btn carousel-btn-prev" 
            onClick={goToPrevious}
            aria-label="Depoimentos anteriores"
          >
            ‹
          </button>
          
          <button 
            className="carousel-btn carousel-btn-next" 
            onClick={goToNext}
            aria-label="Próximos depoimentos"
          >
            ›
          </button>

          {/* Container dos Testimonials */}
          <div className="testimonials-display">
            {getCurrentTestimonials().map((testimonial) => (
              <div key={testimonial.id} className="testimonial-item">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsList;