// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/auth";

export default function PrivateRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ color: "white", padding: "2rem" }}>Carregando...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && user.role !== "admin") {
    return (
      <div style={{ color: "white", padding: "2rem" }}>
        Acesso negado: apenas administradores podem acessar esta página.
      </div>
    );
  }

  return children;
}
