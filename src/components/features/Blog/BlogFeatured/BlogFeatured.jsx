import React from 'react';
import './BlogFeatured.css';

const BlogFeatured = ({ post, onReadArticle }) => {
  if (!post) return null;

  const {
    id,
    title,
    excerpt,
    image,
    author,
    date,
    readTime,
    category,
    tags
  } = post;

  const handleReadArticle = () => {
    onReadArticle(id);
  };

  return (
    <article className="blog-featured">
      <div className="featured-image">
        <img src={image} alt={title} />
        <div className="featured-badge">
          <span className="badge-icon">⭐</span>
          <span className="badge-text">Artigo em Destaque</span>
        </div>
      </div>
      
      <div className="featured-content">
        <div className="featured-meta">
          <span className="meta-category">{category}</span>
          <span className="meta-separator">•</span>
          <span className="meta-date">{date}</span>
          <span className="meta-separator">•</span>
          <span className="meta-time">{readTime}</span>
        </div>
        
        <h2 className="featured-title">
          <button onClick={handleReadArticle} className="featured-title-link">{title}</button>
        </h2>
        
        <p className="featured-excerpt">{excerpt}</p>
        
        <div className="featured-tags">
          {tags.slice(0, 4).map((tag, index) => (
            <span key={index} className="featured-tag">#{tag}</span>
          ))}
        </div>
        
        <div className="featured-footer">
          <div className="featured-author">
            <span className="author-icon">👩‍⚕️</span>
            <span className="author-name">Por {author}</span>
          </div>
          
          <button onClick={handleReadArticle} className="featured-btn">
            <span className="btn-text">Ler Artigo Completo</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogFeatured;