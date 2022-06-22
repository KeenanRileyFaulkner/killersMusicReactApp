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

    // const handleClick = (i?) => {
    //     //Determine if music is playing.
    //         //If it is 
    //             //Determine which AlbumLink was clicked
    //             //If it that id matches the id of the playing album, pause the music and set state of musicPlaying for that link to false
    //             //If the id does not match the id of the playing album, set the state of musicPlaying for playing album to false and make a new request for the clicked album; play the music
    //         //Else
    //             //Determine which AlbumLink was clicked
    //             //Make a request for the corresponding resource and play it.
    // }
    // console.log(albumState);

    return (
        <div className='contentContainer'>  
            {albumState.map((album, index) => {
                console.log(album.color, album.image);
                return <AlbumLink color={`${album.color}`} image={`${album.image}`} onClick={() => handleClick(index)} musicPlaying={album.playing} />
            })} 

            {/* This seems so redundant. Is there a better way? Why does the above not work? */}
            {/* <AlbumLink color={`${albums[0].color}`} image={`${albums[0].image}`} />
            <AlbumLink color={`${albums[1].color}`} image={`${albums[1].image}`} />
            <AlbumLink color={`${albums[2].color}`} image={`${albums[2].image}`} />
            <AlbumLink color={`${albums[3].color}`} image={`${albums[3].image}`} />
            <AlbumLink color={`${albums[4].color}`} image={`${albums[4].image}`} />
            <AlbumLink color={`${albums[5].color}`} image={`${albums[5].image}`} />
            <AlbumLink color={`${albums[6].color}`} image={`${albums[6].image}`} />
            <AlbumLink color={`${albums[7].color}`} image={`${albums[7].image}`} /> */}
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