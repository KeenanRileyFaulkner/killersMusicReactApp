import axios from "axios";
import { useState, useEffect } from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const ViewSongsPage = () => {
    useDocumentTitle('View Songs -- Admin');
    return(
        <div className="top-dash-page w-[100%] grid grid-rows-[1fr_12fr]">
            <TableHeader />
            <SongsContainer />
        </div>
    )
}

const TableHeader = () => {
    const cols = ['NAME', 'ALBUM', 'URL', 'SONG ID' ];
    return (
        <header className="grid grid-cols-4 border-b-[2px] border-gray-800 text-[#121212] font-semibold font-work-sans items-center">
            {cols.map((col, index) => {
                if(index < cols.length - 1) {
                    return <TableCol colName={cols[index]} border={true} key={cols[index]} />
                } else {
                    return <TableCol colName={cols[index]} border={false} key={cols[index]} />
                }
            })}
        </header>
    )
}

const TableCol = ({ colName, border }) => {
    let borderStyles = '';
    if(border) {
        borderStyles = 'border-r-[2px] border-gray-800';
    }
    return (
        <section className={`flex justify-center ${borderStyles}`}>
            <h2>{colName}</h2>
        </section>
    )
}

const SongsContainer = () => {
    const [songsArr, setSongsArr] = useState();

    useEffect(() => {
        axios.get('/songs')
        .then(res => {
            setSongsArr(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    let display;
    if(typeof songsArr !== 'undefined') {
        display = songsArr.map((song) => {
                    return <Song name={song.song_name} album={song.album_name} audioURL={song.url} songID={song.song_id} key={song.song_name} />
                  });
    } else {
        display = <div></div>
    }

    return (
        <div className="flex flex-col overflow-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800">
            {display}
        </div>
    );
}

const Song = ({ name, album, audioURL, songID }) => {
    return (
        <div className="grid grid-cols-4 w-[100%] text-[8pt] text-gray-400 border-b-[2px] border-gray-800">
            <section className="flex centerItems py-6">
                <h2>{name}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{album}</h2>
            </section>
            <section className="flex flex-wrap items-center truncate overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900">
                <h2>{audioURL}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{songID}</h2>
            </section>
        </div>
    )
}

export default ViewSongsPage;