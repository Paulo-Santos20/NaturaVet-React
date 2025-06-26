import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="pet-image">
          <span>{testimonial.image}</span>
        </div>
        <div className="testimonial-info">
          <h4>{testimonial.name}</h4>
          <p>Tutor(a) de {testimonial.pet}</p>
          <div className="rating">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="star">⭐</span>
            ))}
          </div>
        </div>
      </div>
      <blockquote>
        "{testimonial.text}"
      </blockquote>
    </div>
  );
};

export default TestimonialCard;