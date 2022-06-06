import { HiOutlineMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const NavBar = () => {
    
    return (
        <div className='bg-black-static w-screen fixed h-16 flex flex-row items-center justify-between overflow-visible shadow-xl'>
            <Menu />
            <h2 className='text-white font-work-sans font-semibold text-3xl justify-self-center m-auto hover:cursor-pointer hover:text-gray-200'>
                THE KILLERS
            </h2>
        </div>
    );
}

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggle = () => {
        setMenuOpen(prev => !prev);
    }

    return (
        <nav className="menu">
          <button onClick={handleToggle} className='text-white'>{
              menuOpen ? 
                (<AiOutlineClose size='30' className='text-white mx-4 my-auto justify-self-flexstart' />)
                : (<HiOutlineMenu size='30' className='text-white mx-4 my-auto justify-self-flexstart'/>)
            }
          </button>
          <ul className={`menuNav ${menuOpen ? "showMenu" : ""} border-t-2`}>
              <MenuItem itemName='Hot Fuss' />
              <MenuItem itemName="Sam's Town" />
              <MenuItem itemName='Day & Age' />
          </ul>
        </nav>
      )
}

const MenuItem = ({itemName}) => {
    return (
        <li className='py-8 pl-5 font-work-sans font-medium text-lg border-b-2 border-white'>{itemName}</li>
    );
}

export default NavBar;