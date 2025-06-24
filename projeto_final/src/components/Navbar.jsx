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
      <h1>GameWiki</h1>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/games">Jogos</Link>
        {user && user.role === "admin" && <Link to="/users">Usuários</Link>}
        {user && (
          <button
            onClick={handleLogout}
            className="navbar-link"
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              font: "inherit",
              padding: 0,
              marginLeft: "1rem",
            }}
          >
            Sair
          </button>
        )}
      </nav>
    </nav>
  );
}
