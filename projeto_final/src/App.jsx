import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <h1>Minha Aplicação</h1>
        <nav>
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Usuários</a>
        </nav>
      </header>

      <main className="main-content">
        <h2>Bem-vindo ao sistema</h2>
        <p>Aqui vai o conteúdo principal...</p>
      </main>

      <footer className="footer">
        <p>© 2025 - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;
