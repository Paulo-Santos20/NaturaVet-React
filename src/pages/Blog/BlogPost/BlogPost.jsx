import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Posts simulados
  const blogPosts = [
    {
      id: 1,
      title: 'Nutrição Natural para Cães: Guia Completo',
      slug: 'nutricao-natural-caes-guia-completo',
      excerpt: 'Descubra como oferecer uma alimentação natural e balanceada para seu cão, com dicas práticas e receitas saudáveis.',
      content: `
        <h2>A Importância da Nutrição Natural</h2>
        <p>A nutrição natural para cães tem ganhado cada vez mais espaço entre os tutores conscientes. Uma alimentação balanceada e natural pode proporcionar diversos benefícios para a saúde do seu pet.</p>
        
        <h3>Benefícios da Alimentação Natural</h3>
        <ul>
          <li>Melhora da digestão</li>
          <li>Pelagem mais brilhante e saudável</li>
          <li>Aumento da energia e vitalidade</li>
          <li>Fortalecimento do sistema imunológico</li>
          <li>Controle de peso mais eficaz</li>
        </ul>
        
        <h3>Ingredientes Recomendados</h3>
        <p>Para uma dieta natural equilibrada, considere incluir:</p>
        <ul>
          <li><strong>Proteínas:</strong> Frango, peixe, carne bovina magra</li>
          <li><strong>Carboidratos:</strong> Batata doce, arroz integral, quinoa</li>
          <li><strong>Vegetais:</strong> Cenoura, brócolis, espinafre</li>
          <li><strong>Gorduras saudáveis:</strong> Óleo de coco, azeite extra virgem</li>
        </ul>
        
        <h3>Receita Simples: Refeição Natural</h3>
        <p><strong>Ingredientes:</strong></p>
        <ul>
          <li>200g de frango desfiado</li>
          <li>100g de batata doce cozida</li>
          <li>50g de cenoura picada</li>
          <li>1 colher de chá de óleo de coco</li>
        </ul>
        
        <p><strong>Modo de preparo:</strong></p>
        <ol>
          <li>Cozinhe o frango sem temperos</li>
          <li>Cozinhe a batata doce e cenoura no vapor</li>
          <li>Misture todos os ingredientes</li>
          <li>Adicione o óleo de coco</li>
          <li>Sirva em temperatura ambiente</li>
        </ol>
        
        <p><em>Lembre-se: sempre consulte um veterinário nutrólogo antes de fazer mudanças significativas na dieta do seu pet.</em></p>
      `,
      author: 'Dr. Carlos Veterinário',
      date: '2024-12-01',
      category: 'Nutrição',
      tags: ['nutrição', 'alimentação natural', 'cães', 'saúde'],
      image: '/api/placeholder/800/400',
      readTime: '8 min'
    },
    {
      id: 2,
      title: 'Obesidade em Pets: Como Prevenir e Tratar',
      slug: 'obesidade-pets-prevenir-tratar',
      excerpt: 'A obesidade é um problema crescente em pets. Aprenda a identificar, prevenir e tratar o sobrepeso em cães e gatos.',
      content: `
        <h2>Obesidade em Pets: Um Problema Crescente</h2>
        <p>A obesidade em pets tornou-se uma das principais preocupações veterinárias. Estima-se que mais de 50% dos cães e gatos estejam acima do peso ideal.</p>
        
        <h3>Causas da Obesidade</h3>
        <ul>
          <li>Alimentação excessiva</li>
          <li>Falta de exercícios</li>
          <li>Predisposição genética</li>
          <li>Problemas hormonais</li>
          <li>Idade avançada</li>
        </ul>
        
        <h3>Como Identificar o Sobrepeso</h3>
        <p>Sinais de que seu pet pode estar acima do peso:</p>
        <ul>
          <li>Dificuldade para sentir as costelas</li>
          <li>Falta de cintura visível</li>
          <li>Cansaço excessivo</li>
          <li>Dificuldade para se movimentar</li>
        </ul>
        
        <h3>Estratégias de Prevenção</h3>
        <ol>
          <li><strong>Controle das porções:</strong> Meça a quantidade de ração</li>
          <li><strong>Exercícios regulares:</strong> Caminhadas diárias</li>
          <li><strong>Evite petiscos em excesso:</strong> Limite a 10% da dieta</li>
          <li><strong>Consultas regulares:</strong> Monitore o peso mensalmente</li>
        </ol>
        
        <p>A prevenção é sempre o melhor caminho. Consulte sempre um veterinário nutrólogo para um plano personalizado.</p>
      `,
      author: 'Dra. Ana Nutricionista',
      date: '2024-11-28',
      category: 'Saúde',
      tags: ['obesidade', 'sobrepeso', 'prevenção', 'saúde'],
      image: '/api/placeholder/800/400',
      readTime: '6 min'
    },
    {
      id: 3,
      title: 'Alimentação para Gatos: Necessidades Específicas',
      slug: 'alimentacao-gatos-necessidades-especificas',
      excerpt: 'Os gatos têm necessidades nutricionais únicas. Entenda como oferecer uma dieta adequada para felinos.',
      content: `
        <h2>Necessidades Nutricionais dos Felinos</h2>
        <p>Os gatos são carnívoros obrigatórios, o que significa que têm necessidades nutricionais muito específicas e diferentes dos cães.</p>
        
        <h3>Nutrientes Essenciais para Gatos</h3>
        <ul>
          <li><strong>Taurina:</strong> Aminoácido essencial</li>
          <li><strong>Arginina:</strong> Fundamental para desintoxicação</li>
          <li><strong>Ácido araquidônico:</strong> Ácido graxo essencial</li>
          <li><strong>Vitamina A:</strong> Não conseguem converter betacaroteno</li>
        </ul>
        
        <h3>Características da Alimentação Felina</h3>
        <p>Aspectos importantes sobre como os gatos se alimentam:</p>
        <ul>
          <li>Preferem múltiplas refeições pequenas</li>
          <li>Necessitam de alta umidade na dieta</li>
          <li>Têm baixa sede natural</li>
          <li>Metabolismo mais acelerado</li>
        </ul>
        
        <h3>Dicas para uma Alimentação Saudável</h3>
        <ol>
          <li>Ofereça água fresca sempre disponível</li>
          <li>Considere ração úmida na dieta</li>
          <li>Mantenha horários regulares</li>
          <li>Evite mudanças bruscas na dieta</li>
        </ol>
        
        <p>Cada gato é único. Consulte um veterinário para determinar a melhor dieta para seu felino.</p>
      `,
      author: 'Dr. Carlos Veterinário',
      date: '2024-11-25',
      category: 'Nutrição',
      tags: ['gatos', 'felinos', 'nutrição', 'alimentação'],
      image: '/api/placeholder/800/400',
      readTime: '7 min'
    }
  ];

  useEffect(() => {
    // Simular carregamento
    setLoading(true);
    
    // Encontrar o post pelo ID
    const foundPost = blogPosts.find(p => p.id === parseInt(id));
    
    if (foundPost) {
      setPost(foundPost);
      
      // Encontrar posts relacionados (mesma categoria, exceto o atual)
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          Carregando post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#FC5A8D', margin: '0 0 1rem 0' }}>Post não encontrado</h2>
          <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
            O post que você está procurando não existe ou foi removido.
          </p>
          <Link 
            to="/blog" 
            style={{ 
              color: '#FC5A8D', 
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem 1rem' 
    }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem' }}>
        <Link 
          to="/blog" 
          style={{ 
            color: '#FC5A8D', 
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}
        >
          ← Voltar para o Blog
        </Link>
      </nav>

      {/* Header do Post */}
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ 
            background: '#FC5A8D', 
            color: 'white', 
            padding: '0.25rem 0.75rem',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}>
            {post.category}
          </span>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {new Date(post.date).toLocaleDateString('pt-BR')}
          </span>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            📖 {post.readTime} de leitura
          </span>
        </div>

        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#333', 
          margin: '0 0 1rem 0',
          lineHeight: '1.2'
        }}>
          {post.title}
        </h1>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          <span>👨‍⚕️ Por {post.author}</span>
        </div>
      </header>

      {/* Imagem do Post */}
      <div style={{ 
        marginBottom: '2rem',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <img 
          src={post.image} 
          alt={post.title}
          style={{ 
            width: '100%', 
            height: '400px', 
            objectFit: 'cover' 
          }}
        />
      </div>

      {/* Conteúdo do Post */}
      <article style={{ 
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div 
          style={{ 
            lineHeight: '1.8',
            color: '#333',
            fontSize: '1.1rem'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Tags */}
      <div style={{ 
        background: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          color: '#333',
          fontSize: '1.1rem'
        }}>
          🏷️ Tags
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {post.tags.map(tag => (
            <span key={tag} style={{ 
              background: '#f8f9fa',
              color: '#495057',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.8rem',
              border: '1px solid #e9ecef'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Posts Relacionados */}
      {relatedPosts.length > 0 && (
        <div style={{ 
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#333',
            fontSize: '1.5rem'
          }}>
            📚 Posts Relacionados
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gap: '1rem'
          }}>
            {relatedPosts.map(relatedPost => (
              <Link 
                key={relatedPost.id}
                to={`/blog/${relatedPost.id}`}
                style={{ 
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{ 
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: '#333',
                      fontSize: '1rem'
                    }}>
                      {relatedPost.title}
                    </h4>
                    <p style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: '#666',
                      fontSize: '0.9rem',
                      lineHeight: '1.4'
                    }}>
                      {relatedPost.excerpt.substring(0, 100)}...
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem',
                      fontSize: '0.8rem',
                      color: '#999'
                    }}>
                      <span>{new Date(relatedPost.date).toLocaleDateString('pt-BR')}</span>
                      <span>📖 {relatedPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;