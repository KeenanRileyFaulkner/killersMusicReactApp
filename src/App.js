import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import { useState } from 'react';

function App() {
  const [currPage, setCurrPage] = useState({ player: true, about: false })

  let display;
  if (currPage.player) {
    display = 
      <div className='page-container'>
        <NavBar />
        <PlayerContent bgPhoto='bg-pm-band-photo' /> 
      </div>
  } else if (currPage.about) {
    display = '';
  }

  return (
    <div>
      {display}
    </div>
  );
}

export default App;


/* <div className='page-container'>
  <NavBar />
  <PlayerContent bgPhoto='bg-pm-band-photo' /> 
</div> */