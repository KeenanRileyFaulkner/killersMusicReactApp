import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import { useState } from 'react';

function App() {
  const [currPage, setCurrPage] = useState({ player: true, about: false })

  return (
    <div className='page-container'>
      <NavBar />
      <PlayerContent />
    </div>
  );
}

export default App;
