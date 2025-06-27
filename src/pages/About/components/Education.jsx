import React from 'react';
import './Education.css';

const Education = () => {
  const education = [
    {
      year: '2013',
      title: 'Medicina Veterinária',
      institution: 'Universidade de São Paulo (USP)',
      type: 'Graduação',
      icon: '🎓'
    },
    {
      year: '2015',
      title: 'Pós-graduação em Nutrição Animal',
      institution: 'Universidade Federal de Viçosa (UFV)',
      type: 'Especialização',
      icon: '📖'
    },
    {
      year: '2018',
      title: 'Certificação Internacional em Nutrição Clínica',
      institution: 'American College of Veterinary Nutrition',
      type: 'Certificação',
      icon: '🏆'
    },
    {
      year: '2021',
      title: 'Mestrado em Ciências Veterinárias',
      institution: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
      type: 'Pós-graduação',
      icon: '🎯'
    }
  ];

  const certifications = [
    {
      title: 'CRMV-SP',
      subtitle: 'Registro Profissional',
      description: 'Ativo desde 2013',
      icon: '📋'
    },
    {
      title: 'ACVN',
      subtitle: 'American College of Veterinary Nutrition',
      description: 'Membro certificado',
      icon: '🌎'
    },
    {
      title: 'WSAVA',
      subtitle: 'World Small Animal Veterinary Association',
      description: 'Associação internacional',
      icon: '🌍'
    },
    {
      title: 'CBNA',
      subtitle: 'Colégio Brasileiro de Nutrição Animal',
      description: 'Membro ativo',
      icon: '🇧🇷'
    }
  ];

  return (
    <section className="education-section">
      <div className="container">
        <div className="section-header">
          <h2>Formação & Certificações</h2>
          <p>Educação continuada e certificações que garantem o mais alto padrão de cuidado</p>
        </div>

        <div className="education-content">
          {/* Formação Acadêmica */}
          <div className="education-column">
            <h3>Formação Acadêmica</h3>
            <div className="education-timeline">
              {education.map((item, index) => (
                <div key={index} className="education-item">
                  <div className="education-year">
                    <span className="year-number">{item.year}</span>
                    <span className="year-icon">{item.icon}</span>
                  </div>
                  <div className="education-details">
                    <h4>{item.title}</h4>
                    <p className="institution">{item.institution}</p>
                    <span className="education-type">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificações */}
          <div className="certifications-column">
            <h3>Certificações Profissionais</h3>
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="cert-icon">{cert.icon}</div>
                  <div className="cert-content">
                    <h4>{cert.title}</h4>
                    <p className="cert-subtitle">{cert.subtitle}</p>
                    <span className="cert-description">{cert.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;