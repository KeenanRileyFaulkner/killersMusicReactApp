import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import AboutContent from './components/AboutContent/AboutContent';
import CoversContent from './components/CoversContent/CoversContent';
import { useState } from 'react';

function App() {
  const voidState = { player: false, about: false, covers: false, adminLogin: false}
  const [currPage, setCurrPage] = useState({...voidState, about: true});

  const setPageToAboutScreen = () => {
    setCurrPage({...voidState, about: true});
  }

  const setPageToPlayerScreen = () => {
    setCurrPage({...voidState, player: true});
  }

  const setPageToCoversScreen = () => {
    setCurrPage({...voidState, covers: true});
  }

  const setPageToAdminLoginScreen = () => {
    setCurrPage({...voidState, adminLogin: true});
  }

  const updatePageArr = [setPageToPlayerScreen, setPageToCoversScreen, setPageToAboutScreen]; //preserve order for nav links to work

  let display;
  if (currPage.player) {
    display = 
      <div className='page-container'>
        <NavBar handleTitleClick={setPageToCoversScreen} pageNavFuncs={updatePageArr} adminLogin={setPageToAdminLoginScreen} />
        <PlayerContent /> 
      </div>
  } else if (currPage.about) {
    display = 
      <div className='page-container'>
        <NavBar handleTitleClick={setPageToPlayerScreen} pageNavFuncs={updatePageArr} adminLogin={setPageToAdminLoginScreen} />
        <AboutContent />
      </div>;
  } else if (currPage.covers) {
    display =
      <div>
        <NavBar handleTitleClick={setPageToAboutScreen} pageNavFuncs={updatePageArr} adminLogin={setPageToAdminLoginScreen} />
        <CoversContent />
      </div>
  } else if (currPage.adminLogin) {
    display = 
      <div>
        <NavBar handleTitleClick={setPageToAboutScreen} pageNavFuncs={updatePageArr} adminLogin={setPageToAdminLoginScreen} />
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