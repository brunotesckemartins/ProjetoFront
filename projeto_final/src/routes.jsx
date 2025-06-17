import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './services/auth'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import UsersPage from './pages/UsersPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<HomePage />} />
      
      {/* Rota de login (acessível apenas para não autenticados) */}
      <Route 
        path="/login" 
        element={!user ? <LoginPage /> : <Navigate to="/" replace />} 
      />
      
      {/* Rotas protegidas */}
      <Route 
        path="/games/*" 
        element={user ? <GamesPage /> : <Navigate to="/login" replace />} 
      />
      
      <Route 
        path="/users/*" 
        element={user?.role === 'admin' ? <UsersPage /> : <Navigate to="/" replace />} 
      />
      
      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}