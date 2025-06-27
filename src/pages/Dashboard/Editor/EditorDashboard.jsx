import React, { useState } from 'react';

const EditorDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('content');

  const sidebarItems = [
    { id: 'content', label: 'Conteúdo', icon: '📝' },
    { id: 'blog', label: 'Blog', icon: '📰' },
    { id: 'media', label: 'Mídia', icon: '🖼️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <div className="editor-content">
            <div className="section-header">
              <h2>Gerenciar Conteúdo</h2>
              <button className="btn-primary">+ Novo Artigo</button>
            </div>
            
            <div className="content-stats">
              <div className="stat-card">
                <h3>15</h3>
                <p>Artigos Publicados</p>
              </div>
              <div className="stat-card">
                <h3>3</h3>
                <p>Rascunhos</p>
              </div>
              <div className="stat-card">
                <h3>1.2k</h3>
                <p>Visualizações</p>
              </div>
            </div>

            <div className="content-list">
              <div className="content-item">
                <h4>Como Alimentar Filhotes Corretamente</h4>
                <p>Publicado em 20/03/2024</p>
                <span className="status published">Publicado</span>
              </div>
              <div className="content-item">
                <h4>Nutrição para Pets Idosos</h4>
                <p>Rascunho salvo em 18/03/2024</p>
                <span className="status draft">Rascunho</span>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="coming-soon">🚧 Em desenvolvimento...</div>;
    }
  };

  return (
    <>
      <div className="sidebar-menu">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </div>
      {renderContent()}
    </>
  );
};

export default EditorDashboard;