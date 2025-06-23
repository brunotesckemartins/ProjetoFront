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
    <div style={{
      maxWidth: '1280px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'rgba(25, 25, 30, 0.9)',
      borderRadius: '10px',
      border: '1px solid rgba(0, 112, 209, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', color: '#fff' }}>Catálogo de Jogos</h1>
        {!editingGame && (
          <button 
            onClick={() => setEditingGame({})}
            style={{
              padding: '0.7rem 1.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'none',
              background: '#0070d1',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="fas fa-plus"></i> Adicionar Jogo
          </button>
        )}
      </div>

      {editingGame && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#24242c',
            borderRadius: '10px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'fit-content',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {editingGame.imageUrl ? (
              <img 
                src={editingGame.imageUrl} 
                alt={`Capa do jogo ${editingGame.title}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  borderRadius: '5px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                }}
              />
            ) : (
              <div style={{ color: '#a0a0a0' }}>Pré-visualização da capa</div>
            )}
          </div>
          
          <div style={{
            background: '#1a1a1f',
            padding: '2rem',
            borderRadius: '10px'
          }}>
            <GameForm 
              gameData={editingGame} 
              onSave={handleSave} 
            />
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setEditingGame(null)}
                style={{
                  padding: '0.7rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'transparent',
                  border: '1px solid #0070d1',
                  color: '#0070d1',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className="fas fa-times"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

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