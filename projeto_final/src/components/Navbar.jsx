import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        background: "#121212",
        color: "white",
      }}
    >
      {/* logo / links principais */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>GameZone</h1>
        <Link to="/">Home</Link>
        <Link to="/games">Jogos</Link>
        {user.role === "admin" && <Link to="/users">Usuários</Link>}
      </div>

      {/* avatar + nome + menu */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
          }}
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
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #0070d1",
            }}
          />
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 0.5rem)",
              background: "#1f1f1f",
              border: "1px solid #333",
              borderRadius: 8,
              minWidth: 150,
              zIndex: 1000,
              padding: "0.5rem 0",
            }}
          >
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              style={menuBtnStyle}
            >
              Ver perfil
            </button>
            <button onClick={handleLogout} style={menuBtnStyle}>
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

const menuBtnStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem 1rem",
  background: "none",
  border: "none",
  color: "white",
  textAlign: "left",
  cursor: "pointer",
};
