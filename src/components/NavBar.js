import { HiOutlineMenu } from 'react-icons/hi';

const NavBar = () => {
    return (
        <div className='bg-black-static w-screen fixed h-16 flex flex-row items-center justify-between'>
            <HiOutlineMenu size="30" className="text-white ml-4  justify-self-flexstart" />
            <h2 className='text-white font-work-sans text-3xl justify-self-center m-auto'>
                THE KILLERS
            </h2>
        </div>
    );
}

export default NavBar;