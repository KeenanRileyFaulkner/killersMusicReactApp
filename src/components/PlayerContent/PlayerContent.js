import React from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';


const PlayerContent = () => {
    const [albumList, setAlbumList] = useState([]);

    let albumsFromAxios = [];
    const albumColors = ['bg-steel-blue', 'bg-vegas-yellow', 'bg-mocha-brown', 'bg-bb-black', 'bg-pearly-white', 'bg-amber-wave'];
    useEffect(() => {
        axios.get('http://localhost:4002/albumsForPlayer')
        .then(res => {
            albumsFromAxios = [...res.data];
            albumsFromAxios.forEach((album, index) => {
                album.playing = false;
                album.color = albumColors[index % 6];
            })
            setAlbumList(albumsFromAxios);
            console.log(albumsFromAxios[0].image_url);
        })
        .catch(err => console.log(err));
    }, [])

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
        <div className='contentContainer bg-pm-band-photo bg-[center_64px] centerItems'>
            <AudioPlayer src={audioControls.src} handleEnded={() => stopAllPlaying()} />
            {albumList.map((album, index) => {
                return <AlbumLink color={`${album.color}`} image={`${album.image_url}`} onClick={() => handleClick(index)} musicPlaying={album.playing} key={album.album_id} />
            })}
        </div>
    );
}



const AlbumLink = ({ color='bg-gray-800', image, onClick, musicPlaying }) => {

    console.log({image})

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