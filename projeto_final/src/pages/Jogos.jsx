import { useEffect, useState } from 'react';

function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [erro, setErro] = useState(null);

  const [novoJogo, setNovoJogo] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    descricao: '',
    imagem: '' // Podemos remover isso da UI, mas ainda manter a chave aqui para manter o estado consistente
  });

  const [jogoEditando, setJogoEditando] = useState(null);

  useEffect(() => {
    buscarJogos();
  }, []);

  async function buscarJogos() {
    try {
      const resposta = await fetch('http://localhost:3001/jogos');
      if (!resposta.ok) throw new Error('Erro ao buscar jogos'); // Verifica se a resposta foi ok
      const dados = await resposta.json();
      setJogos(dados); // Atualiza o estado com os jogos recebidos
    } catch (err) {
      setErro('Falha ao buscar jogos: ' + err.message); // Mensagem mais informativa
      console.error('Erro ao buscar jogos:', err); // Logar o erro no console para debugging
    }
  }
  

  async function adicionarJogo(e) {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3001/jogos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoJogo)
      });
      if (!resposta.ok) throw new Error('Erro ao adicionar jogo');
      setNovoJogo({ titulo: '', genero: '', plataforma: '', descricao: '', imagem: '' });
      buscarJogos();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function excluirJogo(id) {
    try {
      const resposta = await fetch(`http://localhost:3001/jogos/${id}`, {
        method: 'DELETE',
      });
      if (!resposta.ok) throw new Error('Erro ao excluir jogo');
      buscarJogos();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function editarJogo(e) {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3001/jogos/${jogoEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoJogo)
      });
      if (!resposta.ok) throw new Error('Erro ao editar jogo');
      setNovoJogo({ titulo: '', genero: '', plataforma: '', descricao: '', imagem: '' });
      setJogoEditando(null);
      buscarJogos();
    } catch (err) {
      setErro(err.message);
    }
  }

  function iniciarEdicao(jogo) {
    setNovoJogo(jogo);
    setJogoEditando(jogo);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNovoJogo((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div>
      <h2>Jogos Cadastrados</h2>

      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}

      <form onSubmit={jogoEditando ? editarJogo : adicionarJogo} style={{ marginBottom: '2rem' }}>
        <input
          name="titulo"
          value={novoJogo.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          name="genero"
          value={novoJogo.genero}
          onChange={handleChange}
          placeholder="Gênero"
          required
        />
        <input
          name="plataforma"
          value={novoJogo.plataforma}
          onChange={handleChange}
          placeholder="Plataforma"
          required
        />
        <input
          name="descricao"
          value={novoJogo.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          required
        />
        {/* Remover o campo de URL da imagem */}
        {/* <input
          name="imagem"
          value={novoJogo.imagem}
          onChange={handleChange}
          placeholder="URL da Imagem"
          required
        /> */}
        <button type="submit">{jogoEditando ? 'Concluir' : 'Adicionar Jogo'}</button>
      </form>

      <ul>
        {jogos.map((jogo) => (
          <li key={jogo.id}>
            <strong>{jogo.titulo}</strong> - {jogo.genero} ({jogo.plataforma})
            <button onClick={() => excluirJogo(jogo.id)} style={{ marginLeft: '10px' }}>
              Excluir
            </button>
            <button onClick={() => iniciarEdicao(jogo)} style={{ marginLeft: '10px' }}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jogos;
