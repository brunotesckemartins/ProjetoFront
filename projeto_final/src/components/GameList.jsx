import React from 'react';

export default function GameList({ games, onEdit, onDelete }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    }}>
      {games.map(game => (
        <div key={game.id} style={{
          background: '#1a1a1f',
          borderRadius: '10px',
          overflow: 'hidden',
          transition: 'transform 0.3s ease'
        }}>
          {/* Área da imagem do jogo - NOVO */}
          <div style={{
            width: '100%',
            height: '160px',
            backgroundColor: '#24242c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {game.imageUrl ? (
              <img 
                src={game.imageUrl} 
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{ color: '#a0a0a0' }}>
                <i className="fas fa-image" style={{ fontSize: '2rem' }}></i>
              </div>
            )}
          </div>
          
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>{game.title}</h3>
            <p style={{ 
              margin: '0 0 1.5rem 0',
              lineHeight: '1.5',
              color: '#a0a0a0'
            }}>{game.description}</p>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.8rem'
            }}>
              <button
                onClick={() => onEdit(game)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(0, 112, 209, 0.1)',
                  border: '1px solid #0070d1',
                  color: '#0070d1',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-edit"></i> Editar
              </button>
              <button
                onClick={() => onDelete(game.id)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 59, 48, 0.1)',
                  border: '1px solid #ff3b30',
                  color: '#ff3b30',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-trash"></i> Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}