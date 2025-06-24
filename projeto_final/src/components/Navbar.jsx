import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // não renderiza navbar sem login

  return (
    <nav className="navbar-container">
      {/* logo / links principais */}
      <div className="navbar-main-links">
        <h1 className="navbar-logo">GameWiki</h1>
        <Link to="/">Início</Link>
        <Link to="/games">Jogos</Link>
        {user.role === "admin" && <Link to="/users">Usuários</Link>}
      </div>

      {/* avatar + nome + menu */}
      <div className="navbar-user-section">
        <button
          onClick={() => setOpen((o) => !o)}
          className="navbar-user-button"
        >
          <span>{user.name}</span>
          <img
            src={
              user.profileImage?.trim()
                ? user.profileImage
                : "https://via.placeholder.com/40?text=👤"
            }
            alt="avatar"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/40?text=👤";
            }}
            className="navbar-avatar"
          />
        </button>

        {open && (
          <div className="navbar-dropdown-menu">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="navbar-menu-button"
            >
              Ver perfil
            </button>
            <button onClick={handleLogout} className="navbar-menu-button">
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}