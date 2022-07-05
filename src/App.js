import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import AboutContent from './components/AboutContent/AboutContent';
import CoversContent from './components/CoversContent/CoversContent';
import AdminContent from './components/AdminContent/AdminContent';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<><NavBar titleLinkName='music-player'/><AboutContent /></>} />
        <Route path="/music-player" element={<><NavBar titleLinkName='covers-player'/><PlayerContent /></>} />
        <Route path="/covers-player" element={<><NavBar titleLinkName='about' /><CoversContent /></>} />
        <Route path="/admin" element={<><NavBar titleLinkName=''/><AdminContent /></>} />
      </Routes>
    </Router>
  );
}

export default App;