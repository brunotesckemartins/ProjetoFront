import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>GameZone</h1>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/games">Jogos</Link>
        <Link to="/users">Usuários</Link>
        {user && (
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        )}
      </nav>
    </nav>
  );
}
