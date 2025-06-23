import React from 'react';
import './GameList.css';

export default function GameList({ games, onEdit, onDelete }) {
  return (
    <div className="game-list">
      {games.map(game => (
        <div key={game.id} className="game-card">
          <div className="game-image-area">
            {game.imageUrl ? (
              <img src={game.imageUrl} alt="" />
            ) : (
              <div style={{ color: '#a0a0a0' }}>
                <i className="fas fa-image" style={{ fontSize: '2rem' }}></i>
              </div>
            )}
          </div>

          <div className="game-content">
            <h3>{game.title}</h3>
            <p>{game.description}</p>

            <div className="game-actions">
              <button className="btn-edit" onClick={() => onEdit(game)}>
                <i className="fas fa-edit"></i> Editar
              </button>
              <button className="btn-delete" onClick={() => onDelete(game.id)}>
                <i className="fas fa-trash"></i> Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
