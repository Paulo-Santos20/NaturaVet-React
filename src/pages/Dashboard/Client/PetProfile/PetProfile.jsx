import React, { useState } from 'react';
import { useAuth } from '../../../../hooks/AuthContext';
import './PetProfile.css';

const PetProfile = () => {
  const { user } = useAuth();
  const [selectedPet, setSelectedPet] = useState(user.pets?.[0] || null);
  const [isEditing, setIsEditing] = useState(false);

  // Dados mockados expandidos para o pet
  const mockPetData = {
    1: {
      ...user.pets?.[0],
      birthDate: '2021-03-15',
      gender: 'Macho',
      color: 'Dourado',
      microchip: 'BR123456789',
      vaccinations: [
        { name: 'V10', date: '2024-01-15', nextDue: '2025-01-15' },
        { name: 'Antirrábica', date: '2024-01-10', nextDue: '2025-01-10' }
      ],
      allergies: ['Frango', 'Corantes artificiais'],
      medications: [
        { name: 'Suplemento Articular', dosage: '1 comprimido/dia', startDate: '2024-01-01' }
      ],
      veterinarian: 'Dra. Maria Silva',
      emergencyContact: 'Clínica NaturaVet - (11) 99999-9999',
      notes: 'Pet muito ativo, gosta de brincar com bola. Sensível a mudanças na dieta.'
    },
    2: {
      ...user.pets?.[1],
      birthDate: '2022-06-20',
      gender: 'Fêmea',
      color: 'Cinza e Branco',
      microchip: 'BR987654321',
      vaccinations: [
        { name: 'Tríplice Felina', date: '2024-01-20', nextDue: '2025-01-20' },
        { name: 'Antirrábica', date: '2024-01-15', nextDue: '2025-01-15' }
      ],
      allergies: ['Peixe'],
      medications: [],
      veterinarian: 'Dra. Maria Silva',
      emergencyContact: 'Clínica NaturaVet - (11) 99999-9999',
      notes: 'Gata muito carinhosa, mas tímida com estranhos. Prefere ambientes calmos.'
    }
  };

  const currentPetData = selectedPet ? mockPetData[selectedPet.id] : null;

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} meses`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years} anos e ${months} meses` : `${years} anos`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isVaccinationDue = (nextDueDate) => {
    const dueDate = new Date(nextDueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Considera "em dia" se faltam 30 dias ou menos
  };

  const getPetIcon = (type) => {
    return type === 'cão' ? '🐕' : type === 'gato' ? '🐱' : '🐾';
  };

  return (
    <div className="pet-profile">
      <div className="page-header">
        <div className="header-content">
          <h1>🐾 Meus Pets</h1>
          <p>Gerencie as informações dos seus pets</p>
        </div>
        <div className="header-actions">
          {user.pets && user.pets.length > 1 && (
            <select 
              value={selectedPet?.id || ''} 
              onChange={(e) => {
                const pet = user.pets.find(p => p.id === parseInt(e.target.value));
                setSelectedPet(pet);
                setIsEditing(false);
              }}
              className="pet-select"
            >
              {user.pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} - {pet.type}
                </option>
              ))}
            </select>
          )}
          <button className="btn btn-primary">
            <span>➕</span>
            Adicionar Pet
          </button>
        </div>
      </div>

      {currentPetData ? (
        <div className="pet-profile-content">
          {/* Pet Header Card */}
          <div className="pet-header-card">
            <div className="pet-photo-section">
              <div className="pet-photo">
                {currentPetData.photo ? (
                  <img src={currentPetData.photo} alt={currentPetData.name} />
                ) : (
                  <span className="pet-placeholder">
                    {getPetIcon(currentPetData.type)}
                  </span>
                )}
              </div>
              <button className="change-photo-btn">
                📷 Alterar Foto
              </button>
            </div>
            
            <div className="pet-basic-info">
              <div className="pet-name-section">
                <h2>{currentPetData.name}</h2>
                <span className="pet-type">{currentPetData.breed} • {currentPetData.type}</span>
              </div>
              
              <div className="pet-stats">
                <div className="stat-item">
                  <span className="stat-label">Idade</span>
                  <span className="stat-value">{calculateAge(currentPetData.birthDate)}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Peso</span>
                  <span className="stat-value">{currentPetData.weight}kg</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Gênero</span>
                  <span className="stat-value">{currentPetData.gender}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Cor</span>
                  <span className="stat-value">{currentPetData.color}</span>
                </div>
              </div>
            </div>
            
            <div className="pet-actions">
              <button 
                className="btn btn-outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                <span>✏️</span>
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
              <button className="btn btn-secondary">
                <span>📋</span>
                Relatório
              </button>
            </div>
          </div>

          {/* Pet Details Grid */}
          <div className="pet-details-grid">
            {/* Basic Information */}
            <div className="detail-card">
              <div className="card-header">
                <h3>📋 Informações Básicas</h3>
              </div>
              <div className="card-content">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Data de Nascimento:</span>
                    <span className="info-value">{formatDate(currentPetData.birthDate)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Microchip:</span>
                    <span className="info-value">{currentPetData.microchip}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Veterinário:</span>
                    <span className="info-value">{currentPetData.veterinarian}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Contato de Emergência:</span>
                    <span className="info-value">{currentPetData.emergencyContact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vaccinations */}
            <div className="detail-card">
              <div className="card-header">
                <h3>💉 Vacinação</h3>
                <button className="btn btn-small">➕ Adicionar</button>
              </div>
              <div className="card-content">
                <div className="vaccinations-list">
                  {currentPetData.vaccinations.map((vaccination, index) => (
                    <div key={index} className="vaccination-item">
                      <div className="vaccination-info">
                        <h4>{vaccination.name}</h4>
                        <p>Aplicada em: {formatDate(vaccination.date)}</p>
                        <p className={`next-due ${isVaccinationDue(vaccination.nextDue) ? 'due-soon' : ''}`}>
                          Próxima: {formatDate(vaccination.nextDue)}
                          {isVaccinationDue(vaccination.nextDue) && ' ⚠️'}
                        </p>
                      </div>
                      <div className="vaccination-status">
                        {isVaccinationDue(vaccination.nextDue) ? (
                          <span className="status-badge due">Em dia</span>
                        ) : (
                          <span className="status-badge ok">OK</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="detail-card">
              <div className="card-header">
                <h3>⚠️ Alergias</h3>
                <button className="btn btn-small">➕ Adicionar</button>
              </div>
              <div className="card-content">
                {currentPetData.allergies.length > 0 ? (
                  <div className="allergies-list">
                    {currentPetData.allergies.map((allergy, index) => (
                      <div key={index} className="allergy-tag">
                        {allergy}
                        <button className="remove-tag">✕</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">Nenhuma alergia registrada</p>
                )}
              </div>
            </div>

            {/* Medications */}
            <div className="detail-card">
              <div className="card-header">
                <h3>💊 Medicamentos</h3>
                <button className="btn btn-small">➕ Adicionar</button>
              </div>
              <div className="card-content">
                {currentPetData.medications.length > 0 ? (
                  <div className="medications-list">
                    {currentPetData.medications.map((medication, index) => (
                      <div key={index} className="medication-item">
                        <div className="medication-info">
                          <h4>{medication.name}</h4>
                          <p>Dosagem: {medication.dosage}</p>
                          <p>Iniciado em: {formatDate(medication.startDate)}</p>
                        </div>
                        <div className="medication-actions">
                          <button className="btn-icon">✏️</button>
                          <button className="btn-icon">🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">Nenhum medicamento em uso</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="detail-card full-width">
              <div className="card-header">
                <h3>📝 Observações</h3>
                <button className="btn btn-small">✏️ Editar</button>
              </div>
              <div className="card-content">
                <p className="notes-text">{currentPetData.notes}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-pets">
          <div className="no-pets-icon">🐾</div>
          <h3>Nenhum pet cadastrado</h3>
          <p>Adicione um pet para começar a gerenciar suas informações</p>
          <button className="btn btn-primary">
            <span>➕</span>
            Cadastrar Primeiro Pet
          </button>
        </div>
      )}
    </div>
  );
};

export default PetProfile;