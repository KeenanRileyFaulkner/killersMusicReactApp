import axios from "axios";
import { useState, useEffect } from 'react';

const ViewAlbumsPage = () => {
    return (
        <div className="top-dash-page w-[100%] grid grid-rows-[1fr_12fr]">
            <TableHeader />
            <AlbumsContainer />
        </div>
    )
}

const TableHeader = () => {
    const cols = ['COVER', 'NAME', 'YEAR', 'NUMBER OF TRACKS', 'ALBUM ID' ];
    return (
        <header className="grid grid-cols-5 border-b-[2px] border-gray-800 text-[#121212] font-semibold font-work-sans items-center">
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

const AlbumsContainer = () => {
    const [albumsArr, setAlbumsArr] = useState();

    useEffect(() => {
        axios.get('http://localhost:4002/albums')
        .then(res => {
            setAlbumsArr(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    let display;
    if(typeof albumsArr !== 'undefined') {
        display = albumsArr.map((album) => {
                    return <Album artworkURL={album.image_url} name={album.album_name} year={album.release_year} numTracks={album.num_tracks} albumID={album.album_id} />
                  });
    } else {
        display = <div></div>
    }

    return (
        <div className="flex flex-col overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900">
            {display}
        </div>
    );
}

const Album = ({ artworkURL, name, year, numTracks, albumID }) => {
    return (
        <div className="grid grid-cols-5 h-[150px] w-[100%] text-[8pt] text-gray-400 border-b-[2px] border-gray-800 py-2">
            <section className="flex centerItems">
                <img src={artworkURL} className="h-[100px] w-[100px] "/>
            </section>
            <section className="flex centerItems">
                <h2>{name}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{year}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{numTracks}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{albumID}</h2>
            </section>
        </div>
    )
}

export default ViewAlbumsPage;