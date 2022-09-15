import React, { useState, useEffect } from 'react';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { MagnifyingGlassPlus } from 'phosphor-react';

function App() {

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json()
      .then(data => {
        console.log(data)
      }));
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        <GameBanner bannerurl='/game-1.png' title='League of Legends' adsCount={4} />
        <GameBanner bannerurl='/game-2.png' title='Dota 2' adsCount={6} />
        <GameBanner bannerurl='/game-3.png' title='CS:GO' adsCount={2} />
      </div>

      <CreateAdBanner />
    </div>
  );
}

export default App;