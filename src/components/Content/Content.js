import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';
import albums from './albums';

const Content = () => {
    return (
        <div className='contentContainer'>
            {/* This seems so redundant. Is there a better way? */}
            <AlbumLink color={`${albums[0].color}`} image={`${albums[0].image}`} />
            <AlbumLink color={`${albums[1].color}`} image={`${albums[1].image}`} />
            <AlbumLink color={`${albums[2].color}`} image={`${albums[2].image}`} />
            <AlbumLink color={`${albums[3].color}`} image={`${albums[3].image}`} />
            <AlbumLink color={`${albums[4].color}`} image={`${albums[4].image}`} />
            <AlbumLink color={`${albums[5].color}`} image={`${albums[5].image}`} />
            <AlbumLink color={`${albums[6].color}`} image={`${albums[6].image}`} />
            <AlbumLink color={`${albums[7].color}`} image={`${albums[7].image}`} />
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