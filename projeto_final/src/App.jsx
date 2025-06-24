import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import UsersPage from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import MeusJogosPage from "./pages/MyGames";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="main-content" style={{ backgroundColor: "#1a1a1a" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/users"
                element={
                  <PrivateRoute requireAdmin={true}>
                    <UsersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/meus-jogos"
                element={
                  <PrivateRoute>
                    <MeusJogosPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
