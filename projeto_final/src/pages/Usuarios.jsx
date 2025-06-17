
import { useEffect, useState } from 'react';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      const resposta = await fetch('http://localhost:3001/usuarios');
      if (!resposta.ok) throw new Error('Erro ao buscar usuários');
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div>
      <h2>Usuários Cadastrados</h2>
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.nome}</strong> - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
