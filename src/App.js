import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import AboutContent from './components/AboutContent/AboutContent';
import CoversContent from './components/CoversContent/CoversContent';
import { useState } from 'react';

function App() {
  const [currPage, setCurrPage] = useState({ player: false, about: true, covers: false, })

  const setPageToAboutScreen = () => {
    setCurrPage({ player: false, about: true, covers: false });
  }

  const setPageToPlayerScreen = () => {
    setCurrPage({ player: true, about: false, covers: false });
  }

  const setPageToCoversScreen = () => {
    setCurrPage({ player: false, about: false, covers: true });
  }

  const updatePageArr = [setPageToPlayerScreen, setPageToCoversScreen, setPageToAboutScreen]; //preserve order for nav links to work

  let display;
  if (currPage.player) {
    display = 
      <div className='page-container'>
        <NavBar handleTitleClick={setPageToCoversScreen} pageNavFuncs={updatePageArr} />
        <PlayerContent /> 
      </div>
  } else if (currPage.about) {
    display = 
      <div className='page-container'>
        <NavBar handleTitleClick={setPageToPlayerScreen} pageNavFuncs={updatePageArr} />
        <AboutContent />
      </div>;
  } else if (currPage.covers) {
    display =
      <div>
        <NavBar handleTitleClick={setPageToAboutScreen} pageNavFuncs={updatePageArr} />
        <CoversContent />
      </div>
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