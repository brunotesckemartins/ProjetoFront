import React, { useState } from 'react';
import './UserForm.css';

export default function UserForm({ userData = {}, onSave, onCancel, isLoading }) {
  const [user, setUser] = useState({
    name: userData.name || '',
    email: userData.email || '',
    password: '',
    role: userData.role || 'user',
    description: userData.description || '',
    profileImage: userData.profileImage || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!user.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = 'Email inválido';
    if (!userData.id && !user.password) newErrors.password = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(user);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-columns">
        <div className="form-left-column">
          <div className="avatar-preview">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Preview" />
            ) : (
              <i className="fas fa-user"></i>
            )}
          </div>
          <div className="form-group">
            <label>URL da Foto</label>
            <input
              type="text"
              name="profileImage"
              value={user.profileImage}
              onChange={handleChange}
              placeholder="Cole a URL da imagem"
            />
          </div>
        </div>

        <div className="form-right-column">
          <div className={`form-group ${errors.name ? 'error' : ''}`}>
            <label>Nome Completo *</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label>{userData.id ? 'Nova Senha' : 'Senha *'}</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required={!userData.id}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Tipo de Usuário</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
            >
              <option value="user">Usuário Normal</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={user.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </button>
        <button type="submit" className="save-button" disabled={isLoading}>
          {isLoading ? (
            <><i className="fas fa-spinner fa-spin"></i> Salvando...</>
          ) : (
            <><i className="fas fa-save"></i> Salvar Usuário</>
          )}
        </button>
      </div>
    </form>
  );
}