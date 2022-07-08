import { MdPauseCircleFilled } from 'react-icons/md';
import { FaPlayCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';

const CoversContent = () => {
    useDocumentTitle('Covers -- The Killers Music Player')
    const [audioControls, setAudioControls] = useState({src: ''});
    const [coverList, setCoverList] = useState([]);
    const coverColors = [ 'bg-steel-blue', 'bg-vegas-yellow', 'bg-mocha-brown', 'bg-bb-black', 'bg-pearly-white', 'bg-amber-wave'];

    let coversFromAxios;
    useEffect(() => {
        axios.get('/coversForDisplay')
        .then(res => {
            coversFromAxios = [...res.data];
            coversFromAxios.forEach((cover, index) => {
                cover.playing = false;
                cover.color = coverColors[index % 6];
            })
            setCoverList(coversFromAxios);
        })
        .catch(err => console.log(err));
    }, [])

    const stopAllPlaying = () => {
        let coversCopy = coverList.map(cover => {
            return({ ...cover, playing: false });
        })
        setCoverList(coversCopy);
    }

    const handleClick = (i, coverID) => {
        let coversCopy;
        if(coverList[i].playing) {
            coversCopy = coverList.map((cover) => {
                return({...cover, playing: false });
            });
            setAudioControls({src: ''});
        } else {
            coversCopy = coverList.map((cover, index) => {
                if(index === i) {
                    return({ ...cover, playing: true });
                } else {
                    return({ ...cover, playing: false });
                }
            });

            axios.get(`/covers/${coverID}`).then((res) => { //i + 1 because each cover is stored in db using SERIAL PRIMARY KEY (1 based index)
                setAudioControls({src: res.data});
            }).catch(err => console.log(err));

            axios.put(`/covers/${coverID}`).then((res) => {
                console.log(res.data); //can add functionality here later
            }).catch(err => console.log(err));
        }

        setCoverList(coversCopy);
    } 

    return (
        <div>
            <div className='bg-itm-band-photo background-image'/>
            <div className='contentContainer centerItems'>
            <AudioPlayer src={audioControls.src} handleEnded={stopAllPlaying} />
            {coverList.map((cover, index) => {
                return <CoverLink color={cover.color} image={cover.image_url} onClick={() => handleClick(index, cover.cover_id)} musicPlaying={cover.playing} coverName={cover.cover_name} key={cover.cover_name} />
            })}
        </div>
        </div>
        
    )
}


const CoverLink = ({ color='bg-gray-800', image, onClick, musicPlaying, coverName }) => {

    let borderColor;
    switch (color) { //switch statement due to tailwind bug; color palette should be available to border utility class but is not
        case 'bg-steel-blue':
            borderColor = 'border-[#538b90]';
            break;
        case 'bg-vegas-yellow':
            borderColor = 'border-[#d8b666]';
            break;
        case 'bg-mocha-brown':
            borderColor = 'border-[#382417]';
            break;
        case 'bg-bb-black':
            borderColor = 'border-[#1f1c23]';
            break;
        case 'bg-pearly-white':
            borderColor = 'border-[#f8fbfb]';
            break;
        case 'bg-amber-wave':
            borderColor = 'border-[#9f5c0c]';
            break;
        default:
            borderColor = 'border-white';
    }

    return (
        <div className='mb-[30px]'>
            <div className={`${color} albumLink mx-8 mt-4`} style={{backgroundImage: `url(${image})`}}>
                <button onClick={onClick}>
                    {musicPlaying ? (
                        <MdPauseCircleFilled size='58' className='audio-icon' />
                    ) : (
                        <FaPlayCircle size='50' className='audio-icon' />
                    )}
                </button>
            </div>
            <div className={`cover-name ${borderColor}`}>
                {coverName}
            </div>
        </div>
        
    );
}

const AudioPlayer = ({ src, handleEnded }) => {
    return(
        <audio src={src} autoPlay onEnded={() => handleEnded()}/>
    );
}

export default CoversContent;