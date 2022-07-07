import NavBar from './components/NavBar/NavBar';
import PlayerContent from './components/PlayerContent/PlayerContent';
import AboutContent from './components/AboutContent/AboutContent';
import CoversContent from './components/CoversContent/CoversContent';
import AdminContent from './components/AdminContent/AdminContent';
import { LoginBox } from './components/AdminContent/AdminContent';
import Dashboard from './components/AdminContent/Dashboard';
import {LandingPage} from './components/AdminContent/Dashboard';
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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import {useAuth} from "./hooks/useAuth";
import {useOutletContext} from 'react-router-dom'

function App() {
  const {authed, login, logout} = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<><NavBar titleLinkName='music-player'/><AboutContent /></>} />
        <Route path="/music-player" element={<><NavBar titleLinkName='covers-player'/><PlayerContent /></>} />
        <Route path="/covers-player" element={<><NavBar titleLinkName='about' /><CoversContent /></>} />
        <Route path="/admin" element={<AdminContent authed={authed} login={login} logout={logout} />} >
          <Route path="login" element={<LoginBox />} />
          <Route path="dashboard" element={<RequireAuth children={<Dashboard />} />}>
            <Route path="add-album" element={<RequireAuth children={<AddAlbumPage />} />} />
            <Route path="view-albums" element={<RequireAuth children={<ViewAlbumsPage />} />} />
            <Route path="update-album" element={<RequireAuth children={<UpdateAlbumPage />} />} />
            <Route path="remove-album" element={<RequireAuth children={<RemoveAlbumPage />} />} />
            <Route path="add-song" element={<RequireAuth children={<AddAlbumSongPage />} />} />
            <Route path="view-songs" element={<RequireAuth children={<ViewSongsPage />} />} />
            <Route path="update-song" element={<RequireAuth children={<UpdateSongPage />} />} />
            <Route path="remove-song" element={<RequireAuth children={<RemoveSongPage />} />} />
            <Route path="add-cover" element={<RequireAuth children={<AddCoverPage />} />} />
            <Route path="view-covers" element={<RequireAuth children={<CoversPlayCountPage />} />} />
            <Route path="update-cover" element={<RequireAuth children={<UpdateCoverPage />} />} />
            <Route path="remove-cover" element={<RequireAuth children={<RemoveCoverPage />} />} />
            <Route index element={<RequireAuth children={<LandingPage />} />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const {authed} = useOutletContext();

  return authed ? children : <Navigate to="/admin/login" replace state={{path: location.pathname}} />
}

export default App;