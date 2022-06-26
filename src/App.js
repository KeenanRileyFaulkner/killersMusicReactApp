import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import { useState } from 'react';

function App() {
  const [currPage, setCurrPage] = useState({ player: false, about: true })

  const setPageToAboutScreen = () => {
    setCurrPage({ player: false, about: true });
  }

  const setPageToPlayerScreen = () => {
    setCurrPage({ player: true, about: false });
  }

  let display;
  if (currPage.player) {
    display = 
      <div className='page-container'>
        <NavBar />
        <PlayerContent /> 
      </div>
  } else if (currPage.about) {
    display = 
      <div className='page-container'>
        <NavBar handleTitleClick={setPageToPlayerScreen} />
      </div>;
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