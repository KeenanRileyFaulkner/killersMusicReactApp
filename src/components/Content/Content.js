import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';
import albumsArr from './albums';

const Content = ({ albums=albumsArr }) => {
    const [albumList, setAlbumList] = useState(albums);


    const handleClick = i => {
        let albumsCopy;
        if (albumList[i].playing) {
            albumsCopy = albumList.map((album, index) => {
                return({...album, playing: false });
        })} else {
            albumsCopy = albumList.map((album, index) => {
                if(index === i) {
                    return({ ...album, playing: true });
                } else {
                    return({ ...album, playing: false });
                }
            });
        }

        // axios.get('someURL').then()
        
        setAlbumList(albumsCopy);
    }

    return (
        <div className='contentContainer'>  
            {albumList.map((album, index) => {
                return <AlbumLink color={`${album.color}`} image={`${album.image}`} onClick={() => handleClick(index)} musicPlaying={album.playing} key={album.id} />
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