import React, { useState } from 'react';

export default function GameForm({ gameData = {}, onSave }) {
  const [game, setGame] = useState({
    title: gameData.title || '',
    developer: gameData.developer || '',
    genre: gameData.genre || '',
    releaseYear: gameData.releaseYear || '',
    description: gameData.description || '',
    imageUrl: gameData.imageUrl || '' // Novo campo adicionado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave(game);
    }}>
      <div className="mb-3">
        <label className="form-label">URL da Imagem</label>
        <input
          type="text"
          className="form-control"
          name="imageUrl"
          value={game.imageUrl}
          onChange={handleChange}
          placeholder="Cole a URL da imagem do jogo"
        />
        {game.imageUrl && (
          <div className="mt-2">
            <small>Pré-visualização:</small>
            <img 
              src={game.imageUrl} 
              alt="Pré-visualização" 
              className="img-thumbnail mt-1"
              style={{ maxHeight: '100px' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Imagem+Inválida';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={game.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Desenvolvedor</label>
        <input
          type="text"
          className="form-control"
          name="developer"
          value={game.developer}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Gênero</label>
        <input
          type="text"
          className="form-control"
          name="genre"
          value={game.genre}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Ano de Lançamento</label>
        <input
          type="number"
          className="form-control"
          name="releaseYear"
          value={game.releaseYear}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Descrição</label>
        <textarea
          className="form-control"
          name="description"
          value={game.description}
          onChange={handleChange}
          rows="3"
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Salvar Jogo
      </button>
    </form>
  );
}