import React from 'react';
import './TestimonialStats.css';

const TestimonialStats = ({ testimonials }) => {
  const totalTestimonials = testimonials.length;
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / totalTestimonials;
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
  const satisfactionRate = Math.round((fiveStarCount / totalTestimonials) * 100);

  const stats = [
    {
      number: totalTestimonials,
      label: 'Depoimentos',
      icon: '💬',
      suffix: '+'
    },
    {
      number: averageRating.toFixed(1),
      label: 'Avaliação Média',
      icon: '⭐',
      suffix: '/5'
    },
    {
      number: satisfactionRate,
      label: 'Satisfação',
      icon: '😊',
      suffix: '%'
    },
    {
      number: '100',
      label: 'Pets Atendidos',
      icon: '🐾',
      suffix: '+'
    }
  ];

  return (
    <div className="testimonial-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <span className="stat-number">
              {stat.number}{stat.suffix}
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialStats;