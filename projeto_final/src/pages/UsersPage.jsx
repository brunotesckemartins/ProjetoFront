import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, createUser, updateUser } from '../services/userService';
import UserForm from '../components/UserForm';
import './UsersPage.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        alert(error.message);
      }
    }
  };

 const handleSave = async (userData) => {
  try {
    if (editingUser?.id) {
      await updateUser(editingUser.id, userData);
    } else {
      await createUser(userData);
    }
    setEditingUser(null);
    loadUsers();
  } catch (error) {
    alert('Erro ao salvar usuário: ' + error.message);
  }
};


  return (
    <div className="users-container">
      <div className="users-header">
        <h1>Gerenciar Usuários</h1>
        {!editingUser && (
          <button onClick={() => setEditingUser({})}>
            <i className="fas fa-plus"></i> Adicionar Usuário
          </button>
        )}
      </div>

      {editingUser ? (
        <div className="user-form-container">
          <h2>{editingUser.id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          <UserForm userData={editingUser} onSave={handleSave} />
        </div>
      ) : (
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <div className="user-avatar">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Foto do usuário"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <i className="fas fa-user" style={{ color: '#a0a0a0' }}></i>
                  )}
                </div>
                <div>
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-role" style={{ color: user.role === 'admin' ? '#0070d1' : '#a0a0a0' }}>
                    {user.role === 'admin' ? 'Administrador' : 'Usuário Normal'}
                  </p>
                </div>
              </div>

              <p className="user-description">
                {user.description || 'Nenhuma descrição fornecida'}
              </p>

              <div className="user-actions">
                <button className="btn-edit" onClick={() => setEditingUser(user)}>
                  <i className="fas fa-edit"></i> Editar
                </button>
                <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                  <i className="fas fa-trash"></i> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
