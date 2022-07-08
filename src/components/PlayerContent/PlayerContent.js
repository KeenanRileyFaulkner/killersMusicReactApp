import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';


const PlayerContent = () => {
    useDocumentTitle('Listen -- The Killers Music Player');
    const [albumList, setAlbumList] = useState([]);

    let albumsFromAxios = [];
    const albumColors = ['bg-steel-blue', 'bg-vegas-yellow', 'bg-mocha-brown', 'bg-bb-black', 'bg-pearly-white', 'bg-amber-wave'];
    useEffect(() => {
        axios.get('/albumsForDisplay')
        .then(res => {
            albumsFromAxios = [...res.data];
            albumsFromAxios.forEach((album, index) => {
                album.playing = false;
                album.color = albumColors[index % 6];
            })
            setAlbumList(albumsFromAxios);
        })
        .catch(err => console.log(err));
    }, [])

    const [audioControls, setAudioControls] = useState({src: ''});

    const handleClick = (i, albumID) => {
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

            axios.get(`/albums/${albumID}`).then((res) => {
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
        <div>
            <div className='bg-pm-band-photo background-image bg-[center_64px]' />
            <div className='contentContainer centerItems'>
            <AudioPlayer src={audioControls.src} handleEnded={() => stopAllPlaying()} />
            {albumList.map((album, index) => {
                return <AlbumLink color={`${album.color}`} image={`${album.image_url}`} onClick={() => handleClick(index, album.album_id)} musicPlaying={album.playing} key={album.album_name} />
            })}
        </div>
        </div>
    );
}



const AlbumLink = ({ color='bg-gray-800', image, onClick, musicPlaying }) => {

    return (
        <div className={`${color} albumLink`} style={{backgroundImage: `url(${image})`}}>
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