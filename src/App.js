import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import AboutContent from './components/AboutContent/AboutContent';
import CoversContent from './components/CoversContent/CoversContent';
import AdminContent from './components/AdminContent/AdminContent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { LoginBox } from './components/AdminContent/AdminContent';
import Dashboard from './components/AdminContent/Dashboard';
import AddAlbumPage from './components/AdminContent/DashboardPages/AddAlbumPage';
import ViewAlbumsPage from './components/AdminContent/DashboardPages/ViewAlbumsPage';
import UpdateAlbumPage from './components/AdminContent/DashboardPages/UpdateAlbumPage';
import RemoveAlbumPage from './components/AdminContent/DashboardPages/RemoveAlbumPage';
import AddAlbumSongPage from './components/AdminContent/DashboardPages/AddAlbumSongPage';
import ViewSongsPage from './components/AdminContent/DashboardPages/ViewSongsPage';
import UpdateSongPage from './components/AdminContent/DashboardPages/UpdateSongPage';
import RemoveSongPage from './components/AdminContent/DashboardPages/RemoveSongPage';
import AddCoverPage from './components/AdminContent/DashboardPages/AddCoverPage';
import CoversPlayCountPage from './components/AdminContent/DashboardPages/CoversPlayCountPage';
import UpdateCoverPage from './components/AdminContent/DashboardPages/UpdateCoverPage';
import RemoveCoverPage from './components/AdminContent/DashboardPages/RemoveCoverPage';
import {LandingPage} from './components/AdminContent/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<><NavBar titleLinkName='music-player'/><AboutContent /></>} />
        <Route path="/music-player" element={<><NavBar titleLinkName='covers-player'/><PlayerContent /></>} />
        <Route path="/covers-player" element={<><NavBar titleLinkName='about' /><CoversContent /></>} />
        <Route path="/admin" element={<AdminContent />} >
          <Route path="login" element={<LoginBox />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="add-album" element={<AddAlbumPage />} />
            <Route path="view-albums" element={<ViewAlbumsPage />} />
            <Route path="update-album" element={<UpdateAlbumPage />} />
            <Route path="remove-album" element={<RemoveAlbumPage />} />
            <Route path="add-song" element={<AddAlbumSongPage />} />
            <Route path="view-songs" element={<ViewSongsPage />} />
            <Route path="update-song" element={<UpdateSongPage />} />
            <Route path="remove-song" element={<RemoveSongPage />} />
            <Route path="add-cover" element={<AddCoverPage />} />
            <Route path="view-covers" element={<CoversPlayCountPage />} />
            <Route path="update-cover" element={<UpdateCoverPage />} />
            <Route path="remove-cover" element={<RemoveCoverPage />} />
            <Route index element={<LandingPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;