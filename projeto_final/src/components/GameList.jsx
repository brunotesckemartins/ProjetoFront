import React from 'react';
import { Link } from 'react-router-dom';

export default function GameList({ games, onEdit, onDelete }) {
  return (
    <div className="list-group">
      {games.map(game => (
        <div key={game.id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{game.title}</h5>
              <p className="mb-1">
                <strong>Desenvolvedor:</strong> {game.developer}
              </p>
              <p className="mb-1">
                <strong>Gênero:</strong> {game.genre}
              </p>
              <p>
                <strong>Ano:</strong> {game.releaseYear}
              </p>
            </div>
            <div>
              <button
                onClick={() => onEdit(game)}
                className="btn btn-sm btn-primary me-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(game.id)}
                className="btn btn-sm btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}