import React from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';

const Content = () => {
    return (
        <div className='contentContainer'>
            <AlbumLink color='bg-steel-blue' image='bg-hf'/>
            <AlbumLink color='bg-vegas-yellow' image='bg-st'/>
            <AlbumLink color='bg-mocha-brown' image='bg-sd'/>
            <AlbumLink color='bg-bb-black' image='bg-da'/>
            <AlbumLink color='bg-pearly-white' image='bg-bb'/>
            <AlbumLink color='bg-amber-wave' image='bg-ww'/>
            <AlbumLink color='bg-steel-blue' image='bg-itm'/>
            <AlbumLink color='bg-vegas-yellow' image='bg-pm'/>
        </div>
    );
}

const AlbumLink = ({ color='bg-gray-800', image='bg-logo'}) => {
    const [musicPlaying, setMusicPlaying] = useState(false);

    const handleClick = () => setMusicPlaying(prev => !prev);

    return (
        <div className={`${image} ${color} albumLink`}>
            <button onClick={handleClick}>
                {musicPlaying ? (
                    <MdPauseCircleFilled size='58' className='text-white opacity-70' />
                ) : (
                    <FaPlayCircle size='50' className='text-white opacity-70' />
                )}
            </button>
        </div>
    );
}

export default Content;