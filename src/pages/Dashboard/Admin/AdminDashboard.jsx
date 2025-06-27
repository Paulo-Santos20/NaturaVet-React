import React, { useState } from 'react';
import Overview from './components/Overview/Overview';
import Appointments from './components/Appointments/Appointments';
import Clients from './components/Clients/Clients';
import Pets from './components/Pets/Pets';
import Users from './components/Users/Users';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import { 
  initialUsers, 
  initialClients, 
  initialPets, 
  initialAppointments 
} from './data';
import '../../../styles/pages/admin/AdminDashboard.css';

const AdminDashboard = ({ user, activeTab }) => {
  // Estados globais compartilhados
  const [users, setUsers] = useState(initialUsers);
  const [clients, setClients] = useState(initialClients);
  const [pets, setPets] = useState(initialPets);
  const [appointments, setAppointments] = useState(initialAppointments);

  // Props comuns para todos os componentes
  const commonProps = {
    users,
    setUsers,
    clients,
    setClients,
    pets,
    setPets,
    appointments,
    setAppointments,
    currentUser: user
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview {...commonProps} />;
      case 'appointments':
        return <Appointments {...commonProps} />;
      case 'clients':
        return <Clients {...commonProps} />;
      case 'pets':
        return <Pets {...commonProps} />;
      case 'users':
        return <Users {...commonProps} />;
      case 'analytics':
        return <Analytics {...commonProps} />;
      case 'settings':
        return <Settings {...commonProps} />;
      default:
        return (
          <div className="coming-soon">
            🚧 Em desenvolvimento...
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;