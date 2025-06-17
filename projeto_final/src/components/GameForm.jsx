import React, { useState } from 'react'

export default function GameForm({ gameData = {}, onSave }) {
  const [game, setGame] = useState({
    title: gameData.title || '',
    developer: gameData.developer || '',
    genre: gameData.genre || '',
    releaseYear: gameData.releaseYear || '',
    description: gameData.description || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setGame(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSave(game)
    }}>
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
  )
}