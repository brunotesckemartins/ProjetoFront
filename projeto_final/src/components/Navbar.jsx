import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../services/auth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <h1>GameZone</h1>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/games">Jogos</Link>
        <Link to="/users">Usuários</Link>
      </nav>
    </nav>
  )
}
