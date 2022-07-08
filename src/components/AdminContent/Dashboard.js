import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import {useOutletContext, useNavigate, Outlet, Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Dashboard = () => {
    const {serverKey, authed, logout, forgetKey} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!authed) {
            navigate('/admin/login');
        }
    }, []);

    return (
        <div className="dashboard-container">
            <RightSideNav logout={logout} forgetKey={forgetKey} />
            <Outlet context={{serverKey, authed}} />
        </div>
    )
}

const RightSideNav = ({logout, forgetKey}) => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        forgetKey();
        navigate('/admin/login');
    }

    return (
        <nav className='admin-dashboard-nav'>
            <div className='mt-8'><Link to={'/admin/dashboard'} className='hover:cursor-pointer'>MENU</Link></div>            
            <MenuDropdown header='BAND ALBUM LINKS' selections={['ADD ALBUM', 'VIEW ALBUMS', 'UPDATE ALBUM INFO', 'REMOVE ALBUM']} linkNames={['add-album', 'view-albums', 'update-album', 'remove-album']} />
            <MenuDropdown header='BAND ALBUM SONGS' selections={['ADD SONG', 'VIEW SONGS', 'UPDATE SONG INFO', 'REMOVE SONG']} linkNames={['add-song', 'view-songs', 'update-song', 'remove-song']} />
            <MenuDropdown header='PERSONAL COVER LINKS' selections={['ADD COVER','VIEW COVERS', 'UPDATE COVER INFO', 'REMOVE COVER']} linkNames={['add-cover', 'view-covers', 'update-cover', 'remove-cover']} />
            <div className='text-[14pt] mt-2 ml-[33px] font-medium hover:text-white hover:cursor-pointer'><Link to='/admin/dashboard/specs'>SPECS FOR IMG/MP3</Link></div>
            <button className='text-[14pt] font-medium mt-2 ml-[33px] hover:text-white hover:cursor-pointer' onClick={() => handleLogout()}>LOGOUT</button>
        </nav>
    )
}

const MenuDropdown = ({ header, selections, linkNames }) => {
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
                            <InternalMenuItem selection={selection} key={selection} link={linkNames[index]} />
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

const InternalMenuItem = ({ selection, link }) => (
    <div>
        <Link to={`/admin/dashboard/${link}`} className='menu-item-link admin-menu-item-link'>
            {selection}
        </Link>
    </div>
);

export const LandingPage = () => {
    useDocumentTitle('Dashboard -- Admin');
    return(
        <div className='centered-dash-page'>
            <div className='bg-killer-k bg-cover h-[293px] w-[176px]' />
        </div>
    )
}

export default Dashboard;