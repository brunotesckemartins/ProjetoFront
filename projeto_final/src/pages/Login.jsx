// src/pages/Login.js

import { useState } from 'react';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Validando com o JSON Server
    fetch('http://localhost:3001/usuarios')
      .then((res) => res.json())
      .then((data) => {
        const usuarioValido = data.find((user) => user.email === usuario && user.senha === senha);
        if (usuarioValido) {
          alert('Login realizado com sucesso!');
        } else {
          setErro('Credenciais inválidas');
        }
      })
      .catch((err) => setErro('Erro ao tentar realizar o login.'));
  };

  return (
    <div>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
