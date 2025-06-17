import React, { useState } from 'react'

export default function UserForm({ userData = {}, onSave }) {
  const [user, setUser] = useState({
    name: userData.name || '',
    email: userData.email || '',
    password: userData.password || '',
    role: userData.role || 'user',
    createdAt: userData.createdAt || new Date().toISOString().split('T')[0]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      onSave(user)
    }}>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Tipo de Usuário</label>
        <select
          className="form-select"
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="user">Usuário Normal</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary">
        Salvar Usuário
      </button>
    </form>
  )
}