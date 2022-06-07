import { HiOutlineMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const albumNames = ['HOT FUSS', "SAM'S TOWN", 'SAWDUST', 'DAY & AGE', 
    'BATTLE BORN', 'WONDERFUL WONDERFUL', 'IMPLODING THE MIRAGE', 'PRESSURE MACHINE'];

const links = ['SHOWTIME', 'MUSIC', 'VIDEOS', 'PHOTOS', 'MERCH'];

const NavBar = () => {
    
    return (
        <div className='bg-black-static w-screen fixed h-16 flex flex-row items-center justify-between shadow-xl'>
            <Menu />
            <h2 className='text-white font-work-sans font-extrabold text-3xl justify-self-center m-auto hover:cursor-pointer hover:text-gray-200'>
                THE KILLERS
            </h2>
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
                (<AiOutlineClose size='30' className='text-white mx-4 my-auto justify-self-flexstart' />)
                : (<HiOutlineMenu size='30' className='text-white hover:text-gray-200 mx-4 my-auto justify-self-flexstart'/>)
            }
          </button>
          <ul className={`menuNav ${menuOpen ? "showMenu" : ""}`}>
              <MenuDropdown header='ALBUMS' selections={albumNames} />
              <MenuDropdown header='LINKS' selections={links}/>
          </ul>
        </nav>
    );
};

const MenuDropdown = ({ header, selections }) => {
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
                        selections.map((selection) => 
                            <MenuItem selection={selection}/>
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

const MenuItem = ({ selection }) => (
    <div>
        <h5 className='text-white text-sm font-work-sans font-medium my-2 hover:cursor-pointer'>
            {selection}
        </h5>
    </div>
);

export default NavBar;
