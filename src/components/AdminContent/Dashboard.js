import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';

const Dashboard = ({ serverKey }) => {
    const voidState = { 
        addAlbum: false, 
        updateAlbum: false, 
        removeAlbum: false, 
        addCover: false, 
        updateCover: false, 
        getViews: false
    }

    const [currDisplay, setCurrDisplay] = useState(voidState);

    let dashboardDisplay;
    if(true) {
        dashboardDisplay = 
            <div className='flex justify-center w-[1500px] items-center'>
                <div className='bg-killer-k bg-cover h-[293px] w-[176px]' />
            </div>
    }

    return (
        <div className="dashboard-container">
            <RightSideNav />
            {dashboardDisplay}
        </div>
    )
}

const RightSideNav = () => {
    return (
        <div className='admin-dashboard-nav'>
            <h2 className='mt-8'>MENU</h2>
            <MenuDropdown header='BAND ALBUM LINKS' selections={['ADD ALBUM', 'UPDATE ALBUM INFO', 'REMOVE ALBUM']} />
            <MenuDropdown header='BAND ALBUM SONGS' selections={['ADD SONG', 'VIEW SONGS', 'UPDATE SONG INFO', 'REMOVE SONG']} />
            <MenuDropdown header='PERSONAL COVER LINKS' selections={['ADD COVER', 'UPDATE COVER INFO', 'REMOVE COVER', 'GET VIEW COUNT']} />
        </div>
    )
}

const MenuDropdown = ({ header, selections }) => {
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
                            <InternalMenuItem selection={selection} updateFunction='' key={selection} />
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

const InternalMenuItem = ({ selection, updateFunction }) => (
    <div onClick={() => updateFunction()} className='menu-item-link admin-menu-item-link'>
        {selection}
    </div>
);

export default Dashboard;