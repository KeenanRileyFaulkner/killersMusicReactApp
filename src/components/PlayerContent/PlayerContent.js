import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState } from 'react';
import albumsArr from './albums';
import axios from 'axios';


const PlayerContent = ({ albums=albumsArr, bgPhoto }) => {
    const [albumList, setAlbumList] = useState(albums);
    const [audioControls, setAudioControls] = useState({src: ''});

    const handleClick = i => {
        let albumsCopy;
        if (albumList[i].playing) {
            albumsCopy = albumList.map((album) => {
                return({...album, playing: false });
            });
            setAudioControls({src: ''});
        } else {
            albumsCopy = albumList.map((album, index) => {
                if(index === i) {
                    return({ ...album, playing: true });
                } else {
                    return({ ...album, playing: false });
                }
            });

            axios.get(`http://localhost:4002/albums/${i}`).then((res) => {
                setAudioControls({src: res.data});
            }).catch(err => console.log(err));
        }
        
        setAlbumList(albumsCopy);
    }

    const stopAllPlaying = () => {
        let albumsCopy = albumList.map((album) => {
            return({...album, playing: false});
        });
        setAlbumList(albumsCopy);
    }

    return (
        <div className={`contentContainer ${bgPhoto}`}>
            <AudioPlayer src={audioControls.src} handleEnded={() => stopAllPlaying()}/>
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

const AudioPlayer = ({ src, handleEnded }) => {
    return(<audio src={src} autoPlay onEnded={handleEnded}/>);
}

export default PlayerContent;