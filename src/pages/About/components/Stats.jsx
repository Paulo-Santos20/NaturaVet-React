import React from 'react';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      number: '500+',
      label: 'Pets Atendidos',
      icon: '🐕',
      description: 'Cães, gatos e outros pets com nutrição personalizada'
    },
    {
      number: '10+',
      label: 'Anos de Experiência',
      icon: '📅',
      description: 'Dedicação constante à nutrição animal'
    },
    {
      number: '95%',
      label: 'Satisfação dos Clientes',
      icon: '⭐',
      description: 'Tutores satisfeitos com os resultados'
    },
    {
      number: '15+',
      label: 'Cursos de Especialização',
      icon: '📚',
      description: 'Educação continuada e atualização constante'
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;