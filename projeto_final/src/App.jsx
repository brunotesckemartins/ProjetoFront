import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jogos from './pages/Jogos';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h1>Minha Aplicação</h1>
          <nav>
            <Link to="/">Início</Link>
            <Link to="/usuarios">Usuários</Link>
            <Link to="/login">Login</Link>
            <Link to="/jogos">Jogos</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<h2>Bem-vindo ao sistema</h2>} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/jogos/editar/:id" element={<Jogos />} /> {/* Rota para edição */}
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 - Todos os direitos reservados</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
