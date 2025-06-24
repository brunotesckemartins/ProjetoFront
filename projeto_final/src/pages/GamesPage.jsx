import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from "../services/gameService";
import { getUsers } from "../services/userService";
import GameList from "../components/GameList";
import GameForm from "../components/GameForm";
import { useAuth } from "../services/auth";
import "./GamesPage.css";

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      const allUsers = await getUsers();
      setUsers(allUsers);

      const allGames = await getGames();
      if (user.role === "admin") {
        setGames(allGames);
      } else {
        const userGames = allGames.filter((game) => game.ownerId === user.id);
        setGames(userGames);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSave = async (gameData) => {
    try {
      if (editingGame && editingGame.id) {
        await updateGame(editingGame.id, gameData);
      } else {
        const gameWithOwner = { ...gameData, ownerId: user.id };
        await createGame(gameWithOwner);
      }
      loadData();
      setEditingGame(null);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este jogo?")) {
      try {
        await deleteGame(id);
        loadData();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="games-page-container">
      <div className="games-page-header">
        <h1 className="games-page-title">Catálogo de Jogos</h1>
        {!editingGame && (
          <button
            onClick={() => setEditingGame({})}
            className="games-page-add-button"
          >
            <i className="fas fa-plus"></i> Adicionar Jogo
          </button>
        )}
      </div>

      {editingGame && (
        <div className="game-edit-container">
          <div className="game-image-preview">
            {editingGame.imageUrl ? (
              <img
                src={editingGame.imageUrl}
                alt={`Capa do jogo ${editingGame.title}`}
                className="game-preview-image"
              />
            ) : (
              <div className="game-preview-placeholder">
                Pré-visualização da capa
              </div>
            )}
          </div>

          <div className="game-form-container">
            <GameForm gameData={editingGame} onSave={handleSave} />
            <div className="game-form-actions">
              <button
                onClick={() => setEditingGame(null)}
                className="games-page-cancel-button"
              >
                <i className="fas fa-times"></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <GameList
        games={games}
        users={users}
        isAdmin={user.role === "admin"}
        onEdit={(game) => {
          setEditingGame(game);
          window.scrollTo(0, 0);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}