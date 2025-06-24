import React from "react";
import { useAuth } from "../services/auth";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        background: "#1a1a1a",
        color: "white",
        borderRadius: 8,
      }}
    >
      <h2>Meu Perfil</h2>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <img
          src={
            user.profileImage?.trim()
              ? user.profileImage
              : "https://via.placeholder.com/120?text=👤"
          }
          alt="avatar grande"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #0070d1",
          }}
        />
        <div>
          <p>
            <strong>Nome: </strong>
            {user.name}
          </p>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          <p>
            <strong>Descrição: </strong>
            {user.description || "—"}
          </p>
          <p>
            <strong>Função: </strong>
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
