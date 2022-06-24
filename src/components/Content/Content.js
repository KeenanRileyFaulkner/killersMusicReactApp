import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';
import albumsArr from './albums';

const Content = ({ albums=albumsArr }) => {
    const [albumState, setAlbumState] = useState(albums);

    const handleClick = i => {
        let albumsCopy;
        if (albumState[i].playing) {
            albumsCopy = albumState.map((album, index) => {
                return({...album, playing: false });
        })} else {
            albumsCopy = albumState.map((album, index) => {
                if(index === i) {
                    return({ ...album, playing: true });
                } else {
                    return({ ...album, playing: false });
                }
            });
        }

        // axios.get('someURL').then()
        
        setAlbumState(albumsCopy);
    }

    return (
        <div className='contentContainer'>  
            {albumState.map((album, index) => {
                return <AlbumLink color={`${album.color}`} image={`${album.image}`} onClick={() => handleClick(index)} musicPlaying={album.playing} />
            })}
        </div>
    );
}



const AlbumLink = ({ color='bg-gray-800', image='bg-logo', onClick, musicPlaying }) => {

    return (
        <div className={`${image} ${color} albumLink`}>
            <button onClick={onClick}>
                {musicPlaying ? (
                    <MdPauseCircleFilled size='58' className='audio-icon' />
                ) : (
                    <FaPlayCircle size='50' className='audio-icon' />
                )}
            </button>
        </div>
    );
}

export default Content;