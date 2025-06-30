import React from 'react';
import './BlogCard.css';

const BlogCard = ({ post, onReadArticle }) => {
  const {
    id,
    title,
    excerpt,
    image,
    author,
    date,
    readTime,
    category,
    tags,
    featured,
    popular
  } = post;

  const handleReadMore = () => {
    onReadArticle(id);
  };

  return (
    <article className={`blog-card ${featured ? 'featured' : ''}`}>
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="card-badges">
          {featured && <span className="badge badge-featured">⭐ Destaque</span>}
          {popular && <span className="badge badge-popular">🔥 Popular</span>}
          <span className="badge badge-category">{category}</span>
        </div>
        <div className="card-overlay">
          <button onClick={handleReadMore} className="read-more-overlay">
            <span className="overlay-text">Ler Artigo</span>
            <span className="overlay-icon">→</span>
          </button>
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span className="meta-author">👩‍⚕️ {author}</span>
          <span className="meta-date">📅 {date}</span>
          <span className="meta-time">⏱️ {readTime}</span>
        </div>
        
        <h3 className="card-title">
          <button onClick={handleReadMore} className="title-link">{title}</button>
        </h3>
        
        <p className="card-excerpt">{excerpt}</p>
        
        <div className="card-tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        
        <div className="card-footer">
          <button onClick={handleReadMore} className="read-more-btn">
            <span className="btn-text">Ler mais</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;