import React, { useState, useEffect } from 'react'
import { getUsers, deleteUser } from '../services/userService'
import UserForm from '../components/UserForm'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id)
        loadUsers()
      } catch (error) {
        alert(error.message)
      }
    }
  }

  const handleSave = async (userData) => {
    // Implemente a lógica de save/update aqui
    // Depois:
    setEditingUser(null)
    loadUsers()
  }

  return (
    <div className="container mt-4">
      <h1>Gerenciar Usuários</h1>
      
      {editingUser ? (
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">
              {editingUser.id ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            <UserForm 
              userData={editingUser} 
              onSave={handleSave} 
            />
          </div>
        </div>
      ) : (
        <div className="list-group">
          {users.map(user => (
            <div key={user.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{user.name}</h5>
                  <p className="mb-1">Email: {user.email}</p>
                  <small>Tipo: {user.role === 'admin' ? 'Administrador' : 'Usuário Normal'}</small>
                </div>
                <div>
                  <button 
                    onClick={() => setEditingUser(user)} 
                    className="btn btn-sm btn-primary me-2"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="btn btn-sm btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}