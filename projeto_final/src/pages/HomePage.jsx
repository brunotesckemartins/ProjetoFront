import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Explore o Universo dos Games</h1>
          <p>Mostre para o mundo os seus jogos favoritos e compartilhe aqui sua experiência.</p>
          <Link to="/games" className="hero-button">Faça a sua própria lista de jogos</Link>
        </div>
        <div className="hero-image">
          <img
            src="https://static1.thegamerimages.com/wordpress/wp-content/uploads/2023/09/collage-maker-18-sep-2023-10-44-pm-51.jpg?q=70&fit=contain&w=1200&h=628&dpr=1"
            alt="Banner destaque"
          />
        </div>
      </div>
    </div>
  );
}
