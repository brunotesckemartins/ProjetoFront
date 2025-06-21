import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import { AuthProvider } from './services/auth'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app-container"> {}
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="main-content" style={{ backgroundColor: '#1a1a1a' }}>
            <AppRoutes />
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;