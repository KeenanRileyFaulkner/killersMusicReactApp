import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import AddAlbumPage from './DashboardPages/AddAlbumPage';
import ViewAlbumsPage from './DashboardPages/ViewAlbumsPage';
import UpdateAlbumPage from './DashboardPages/UpdateAlbumPage';
import RemoveAlbumPage from './DashboardPages/RemoveAlbumPage';
import AddAlbumSongPage from './DashboardPages/AddAlbumSongPage';
import ViewSongsPage from './DashboardPages/ViewSongsPage';
import UpdateSongPage from './DashboardPages/UpdateSongPage';
import RemoveSongPage from './DashboardPages/RemoveSongPage';
import AddCoverPage from './DashboardPages/AddCoverPage';
import CoversPlayCountPage from './DashboardPages/CoversPlayCountPage';
import UpdateCoverPage from './DashboardPages/UpdateCoverPage';
import RemoveCoverPage from './DashboardPages/RemoveCoverPage';
import {useOutletContext, useNavigate, Outlet, Link} from 'react-router-dom';
const Dashboard = () => {
    const {serverKey, loggedIn} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!loggedIn) {
            console.log('navigating away')
            navigate('/admin/login');
            
        }
    }, []);
    
    const voidState = { 
        addAlbum: false, 
        viewAlbums: false,
        updateAlbum: false, 
        removeAlbum: false, 
        addAlbumSong: false,
        viewSongs: false,
        updateSongInfo: false,
        removeAlbumSong: false,
        addCover: false, 
        updateCover: false, 
        removeCover: false,
        getViews: false
    }

    const [currDisplay, setCurrDisplay] = useState(voidState);

    const setDisplayToAddAlbum = () => {
        setCurrDisplay({...voidState, addAlbum: true});
    }

    const setDisplayToViewAlbums = () => {
        setCurrDisplay({...voidState, viewAlbums: true});
    }

    const setDisplayToUpdateAlbum = () => {
        setCurrDisplay({...voidState, updateAlbum: true});
    }

    const setDisplayToRemoveAlbum = () => {
        setCurrDisplay({...voidState, removeAlbum: true});
    }

    const setDisplayToAddAlbumSong = () => {
        setCurrDisplay({...voidState, addAlbumSong: true});
    }

    const setDisplayToViewSongs = () => {
        setCurrDisplay({...voidState, viewSongs: true});
    }

    const setDisplayToUpdateSongInfo = () => {
        setCurrDisplay({...voidState, updateSongInfo: true});
    }

    const setDisplayToRemoveAlbumSong = () => {
        setCurrDisplay({...voidState, removeAlbumSong: true});
    }

    const setDisplayToAddCover = () => {
        setCurrDisplay({...voidState, addCover: true});
    }

    const setDisplayToUpdateCover = () => {
        setCurrDisplay({...voidState, updateCover: true});
    }

    const setDisplayToRemoveCover = () => {
        setCurrDisplay({...voidState, removeCover: true});
    }

    const setDisplayToGetViews = () => {
        setCurrDisplay({...voidState, getViews: true});
    }

    const resetDash = () => {
        setCurrDisplay({...voidState});
    }

    const dashboardUpdateArrAlbumLinks = [
        setDisplayToAddAlbum,
        setDisplayToViewAlbums,
        setDisplayToUpdateAlbum,
        setDisplayToRemoveAlbum
    ];

    const dashboardUpdateArrAlbumSongs = [
        setDisplayToAddAlbumSong,
        setDisplayToViewSongs,
        setDisplayToUpdateSongInfo,
        setDisplayToRemoveAlbumSong
    ];

    const dashboardUpdateArrCoverLinks = [
        setDisplayToAddCover,
        setDisplayToGetViews,
        setDisplayToUpdateCover,
        setDisplayToRemoveCover
    ]

    let dashboardDisplay;
    if(currDisplay.addAlbum) {
        dashboardDisplay = <AddAlbumPage serverKey={serverKey} />
    } else if (currDisplay.updateAlbum) {
        dashboardDisplay = <UpdateAlbumPage serverKey={serverKey} />;
    } else if (currDisplay.viewAlbums) {
        dashboardDisplay = <ViewAlbumsPage />;
    } else if (currDisplay.removeAlbum) {
        dashboardDisplay = <RemoveAlbumPage serverKey={serverKey} />;
    } else if (currDisplay.addAlbumSong) {
        dashboardDisplay = <AddAlbumSongPage serverKey={serverKey} />
    } else if (currDisplay.viewSongs) {
        dashboardDisplay = <ViewSongsPage />;
    } else if (currDisplay.updateSongInfo) {
        dashboardDisplay = <UpdateSongPage serverKey={serverKey} />;
    } else if (currDisplay.removeAlbumSong) {
        dashboardDisplay = <RemoveSongPage serverKey={serverKey} />;
    } else if (currDisplay.addCover) {
        dashboardDisplay = <AddCoverPage serverKey={serverKey} />
    } else if (currDisplay.updateCover) {
        dashboardDisplay = <UpdateCoverPage serverKey={serverKey} />;
    } else if (currDisplay.removeCover) {
        dashboardDisplay = <RemoveCoverPage serverKey={serverKey} />;
    } else if (currDisplay.getViews) {
        dashboardDisplay = <CoversPlayCountPage />;
    } else {
        dashboardDisplay = <LandingPage />
    }

    return (
        <div className="dashboard-container">
            <RightSideNav resetDash={resetDash} albumLinksStateUpdate={dashboardUpdateArrAlbumLinks} albumSongsStateUpdate={dashboardUpdateArrAlbumSongs} coverLinksStateUpdate={dashboardUpdateArrCoverLinks} />
            <Outlet context={{serverKey}} />
        </div>
    )
}

const RightSideNav = ({ resetDash, albumLinksStateUpdate, albumSongsStateUpdate, coverLinksStateUpdate }) => {
    return (
        <nav className='admin-dashboard-nav'>
            <h2 className='mt-8 hover:cursor-pointer' onClick={() => resetDash()}>MENU</h2>
            <MenuDropdown header='BAND ALBUM LINKS' selections={['ADD ALBUM', 'VIEW ALBUMS', 'UPDATE ALBUM INFO', 'REMOVE ALBUM']} updateFunctions={albumLinksStateUpdate} linkNames={['add-album', 'view-albums', 'update-album', 'remove-album']} />
            <MenuDropdown header='BAND ALBUM SONGS' selections={['ADD SONG', 'VIEW SONGS', 'UPDATE SONG INFO', 'REMOVE SONG']} updateFunctions={albumSongsStateUpdate} linkNames={['add-song', 'view-songs', 'update-song', 'remove-song']} />
            <MenuDropdown header='PERSONAL COVER LINKS' selections={['ADD COVER','VIEW COVERS', 'UPDATE COVER INFO', 'REMOVE COVER']} updateFunctions={coverLinksStateUpdate} linkNames={['add-cover', 'view-covers', 'update-cover', 'remove-cover']} />
        </nav>
    )
}

const MenuDropdown = ({ header, selections, updateFunctions, linkNames }) => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <div className='menuDropdown '>
            <div className='dropdown'>
                <div className='dropdownHeader w-[300px]' onClick={() => toggleExpanded()}>
                    <div className='additionalChevronStyles'>
                        <ChevronIcon expanded={expanded} />
                    </div>
                    <h5 className='ml-2 hover:cursor-pointer text-[14pt]'>
                        {header}
                    </h5>
                </div>
                
                
                <ul className='menuItem'>
                    {expanded && selections &&
                        selections.map((selection, index) => 
                            <InternalMenuItem selection={selection} updateFunction={updateFunctions[index]} key={selection} link={linkNames[index]} />
                        )
                    }
                </ul>
            </div>
        </div> 
    );
};

const ChevronIcon = ({ expanded, handleClick }) => {
    return expanded ? (
        <FaChevronDown size='14' className='chevClass hover:cursor-pointer' onClick={() => handleClick()} />
    ) : (
        <FaChevronRight size='14' className='chevClass hover:cursor-pointer' onClick={() => handleClick()} />
    );
};

const InternalMenuItem = ({ selection, updateFunction, link }) => (
    <div>
        <Link to={`/admin/dashboard/${link}`} className='menu-item-link admin-menu-item-link'>
            {selection}
        </Link>
    </div>
);

export const LandingPage = () => {
    return(
        <div className='centered-dash-page'>
            <div className='bg-killer-k bg-cover h-[293px] w-[176px]' />
        </div>
    )
}

export default Dashboard;