import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGames, createGame, updateGame, deleteGame } from '../services/gameService';
import GameList from '../components/GameList';
import GameForm from '../components/GameForm';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const gamesData = await getGames();
      setGames(gamesData);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSave = async (gameData) => {
    try {
      if (editingGame && editingGame.id) {
        await updateGame(editingGame.id, gameData);
      } else {
        await createGame(gameData);
      }
      loadGames();
      setEditingGame(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este jogo?')) {
      try {
        await deleteGame(id);
        loadGames();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{editingGame ? 'Editar Jogo' : 'Lista de Jogos'}</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingGame({});
            window.scrollTo(0, 0);
          }}
          disabled={!!editingGame}
        >
          Adicionar Jogo
        </button>
      </div>

      {editingGame ? (
        <div className="card mb-4">
          <div className="card-body">
            <GameForm 
              gameData={editingGame} 
              onSave={handleSave} 
            />
            <button 
              className="btn btn-secondary mt-3"
              onClick={() => setEditingGame(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}

      <GameList 
        games={games} 
        onEdit={(game) => {
          setEditingGame(game);
          window.scrollTo(0, 0);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}