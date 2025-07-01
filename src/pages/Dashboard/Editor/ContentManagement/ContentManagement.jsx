import React from 'react';
import './ContentManagement.css';

const ContentManagement = () => {
  return (
    <div className="content-management">
      <div className="page-header">
        <h1>📝 Gerenciamento de Conteúdo</h1>
        <p>Crie e gerencie artigos, posts e materiais educativos</p>
      </div>

      <div className="content-placeholder">
        <div className="placeholder-icon">📝</div>
        <h3>Gerenciamento de Conteúdo</h3>
        <p>Esta funcionalidade será implementada em breve.</p>
        <p>Aqui você poderá:</p>
        <ul>
          <li>Criar novos artigos para o blog</li>
          <li>Editar conteúdo existente</li>
          <li>Gerenciar categorias e tags</li>
          <li>Agendar publicações</li>
          <li>Moderar comentários</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentManagement;