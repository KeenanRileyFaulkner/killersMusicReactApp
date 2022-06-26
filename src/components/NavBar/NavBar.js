import { HiOutlineMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const albumNames = ['HOT FUSS', "SAM'S TOWN", 'SAWDUST', 'DAY & AGE', 
    'BATTLE BORN', 'WONDERFUL WONDERFUL', 'IMPLODING THE MIRAGE', 'PRESSURE MACHINE'];

const links = ['SHOWTIME', 'MUSIC', 'VIDEOS', 'PHOTOS', 'MERCH'];

const albumPlaylists = [
    'https://www.youtube.com/watch?v=MQwu08Sc2vA&list=OLAK5uy_kmy3IV3JBPfdu49IeOMbd0RoQSQxa8lxY',
    'https://www.youtube.com/watch?v=GQzDG-tILbo&list=OLAK5uy_mexj509hYSyNuPQSyVi63aHkdQXb4dYnA',
    'https://www.youtube.com/watch?v=tVNGY1pInfI&list=OLAK5uy_k6WPK2eSfDf4FQ4av-AmjtD1NCN6FlGno',
    'https://www.youtube.com/watch?v=N5N3Jk0_lKg&list=OLAK5uy_n2INn4lb24RIJAx2lBKvpCda9-rf8RzU0',
    'https://www.youtube.com/watch?v=QPW0t3ysrGc&list=OLAK5uy_kv8duUr43HpHkEtJh2YnZtq1P-MQ6g9CM',
    'https://www.youtube.com/watch?v=zWfOlNHXiAM&list=OLAK5uy_kacrcyJZw6q64-y30icAcPACQSUEwq4XM',
    'https://www.youtube.com/watch?v=4go_DzY8wHc&list=OLAK5uy_kEGStUtBZL5dTF-R1hOOzFwXGSNECsyOk',
    'https://www.youtube.com/watch?v=xAvFOrnUtSI&list=OLAK5uy_lKxn5gxay7DPrnIdNe-gUovqW0yG4h-5o'
]

const webLinks = [
    'https://www.thekillersmusic.com/tour',
    'https://www.thekillersmusic.com/music',
    'https://www.thekillersmusic.com/videos',
    'https://www.thekillersmusic.com/photos',
    'https://thekillers.lnk.to/PMStore'
]

const NavBar = ({ handleTitleClick }) => {
    
    return (
        <div className='main-bar'>
            <Menu />
            <div className='nav-title' onClick={() => handleTitleClick()}>
                THE KILLERS
            </div>
        </div>
    );
};

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(prev => !prev);
    }

    return (
        <nav className="menu">
          <button onClick={handleToggle} className='text-white'>
            {
              menuOpen ? 
                (<AiOutlineClose size='30' className='close-menu-btn' />)
                : (<HiOutlineMenu size='30' className='hamburger-btn'/>)
            }
          </button>
          <ul className={`menuNav ${menuOpen ? "showMenu" : ""}`}>
              <MenuDropdown header='ALBUMS' selections={albumNames} tagLinks={albumPlaylists} />
              <MenuDropdown header='BAND LINKS' selections={links} tagLinks={webLinks} />
          </ul>
        </nav>
    );
};

const MenuDropdown = ({ header, selections, tagLinks }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <li className='menuDropdown'>
            <div className='dropdown' onClick={() => setExpanded(!expanded)}>
                <div className='dropdownHeader'>
                    <div className='additionalChevronStyles'>
                        <ChevronIcon expanded={expanded} />
                    </div>
                    <h5 className='ml-2 hover:cursor-default'>
                        {header}
                    </h5>
                </div>
                
                
                <ul className='menuItem'>
                    {expanded && selections &&
                        selections.map((selection, index) => 
                            <MenuItem selection={selection} link={`${tagLinks[index]}`} key={selection} />
                        )
                    }
                </ul>
            </div>
        </li>
    );
};

const ChevronIcon = ({ expanded }) => {
    return expanded ? (
        <FaChevronDown size='14' className='chevClass hover:cursor-pointer' />
    ) : (
        <FaChevronRight size='14' className='chevClass hover:cursor-pointer' />
    );
};

const MenuItem = ({ selection, link }) => (
    <div>
        <a href={`${link}`}  rel="noopener noreferrer" target="_blank" className='menu-item-link'>
            {selection}
        </a>
    </div>
);

export default NavBar;
