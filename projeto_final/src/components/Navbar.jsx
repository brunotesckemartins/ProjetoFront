import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../services/auth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">GameWiki</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          {user && <Link className="nav-link" to="/games">Jogos</Link>}
          {user?.role === 'admin' && <Link className="nav-link" to="/users">Usuários</Link>}
          {user 
            ? <button 
                className="btn btn-outline-light" 
                onClick={logout}
                aria-label="Sair"
              >
                Sair
              </button>
            : <Link className="nav-link" to="/login">Login</Link>
          }
        </div>
      </div>
    </nav>
  )
}