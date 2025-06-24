import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../services/auth";

export default function MeusJogosPage() {
  const { user } = useAuth();
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (user) {
      api
        .get(`/games?userId=${user.id}`)
        .then((response) => {
          setGames(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar jogos:", error);
        });
    }
  }, [user]);

  return (
    <div className="container">
      <h2>Meus Jogos</h2>
      {games.length === 0 ? (
        <p>Você ainda não adicionou nenhum jogo.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <strong>{game.nome}</strong> – {game.plataforma}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
