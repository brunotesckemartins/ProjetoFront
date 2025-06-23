import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Explore o Universo dos Games</h1>
          <p>Descubra os melhores lançamentos, jogos clássicos e tudo o que o mundo gamer tem a oferecer.</p>
          <Link to="/games" className="hero-button">Ir para o jogo</Link>
        </div>
        <div className="hero-image">
          <img
            src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg?t=1749182199"
            alt="Banner destaque"
          />
        </div>
      </div>
    </div>
  );
}
