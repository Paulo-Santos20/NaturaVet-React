import React from 'react';
import './Map.css';

const Map = () => {
  return (
    <div className="map-container">
      <div className="map-wrapper">
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6918!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwNDEnMzAuNSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
          className="map-iframe"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização NaturaVet"
        ></iframe>
        
        {/* Overlay com informações */}
        <div className="map-overlay">
          <div className="overlay-content">
            <h4 className="overlay-title">NaturaVet</h4>
            <p className="overlay-address">
              Rua das Flores, 123<br />
              Vila Madalena, São Paulo - SP
            </p>
            <div className="overlay-buttons">
              <a 
                href="https://maps.google.com/?q=Rua+das+Flores+123+Vila+Madalena+São+Paulo"
                
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <span className="btn-icon">🗺️</span>
                <span className="btn-text">Abrir no Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Informações adicionais */}
      <div className="map-info">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-icon">🚗</span>
            <div className="info-content">
              <h5>Estacionamento</h5>
              <p>Vagas gratuitas disponíveis</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🚌</span>
            <div className="info-content">
              <h5>Transporte Público</h5>
              <p>Próximo ao metrô Vila Madalena</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">♿</span>
            <div className="info-content">
              <h5>Acessibilidade</h5>
              <p>Local totalmente acessível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;