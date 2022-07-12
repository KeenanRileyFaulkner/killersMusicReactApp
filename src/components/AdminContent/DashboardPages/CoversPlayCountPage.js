import axios from "axios";
import { useState, useEffect } from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const CoversPlayCountPage = () => {
    useDocumentTitle('View Covers -- Admin');
    return(
        <div className="top-dash-page grid grid-rows-[1fr_12fr]">
            <TableHeader />
            <EntriesContainer />
        </div>
    )
}

const TableHeader = () => {
    const cols = ['IMAGE', 'COVER_ID', 'URL', 'NAME', 'TOTAL PLAYS', 'DISPLAY ORDER'];
    return (
        <header className="grid grid-cols-6 border-b-[2px] border-gray-800 text-[#121212] font-semibold font-work-sans items-center">
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

const EntriesContainer = () => {
    const[entriesArr, setEntriesArr] = useState();

    useEffect(() => {
        axios.get('/covers')
        .then(res => {
            setEntriesArr(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    let display;
    if(typeof entriesArr !== 'undefined') {
        display = entriesArr.map((cover) => {
                    return (
                        <TableEntry imageURL={cover.image_url} coverID={cover.cover_id} audioURL={cover.audio_url} name={cover.cover_name} playCount={cover.total_plays} displayOrder={cover.display_order} key={cover.cover_name} />
                    );
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

const TableEntry = ({ imageURL, coverID, audioURL, name, playCount, displayOrder }) => {
    return (
        <div className="grid grid-cols-6 h-[120px] w-[100%] text-[8pt] text-gray-400 border-b-[2px] border-gray-800">
            <section className="flex centerItems">
                <img src={imageURL} className='h-[100px] w-[100px]' />
            </section>
            <section className="flex centerItems">
                <h2>{coverID}</h2>
            </section>
            <section className="flex flex-wrap items-center overflow-auto  truncate scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-900">
                <h2>{audioURL}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{name}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{playCount}</h2>
            </section>
            <section className="flex centerItems">
                <h2>{displayOrder}</h2>
            </section>
        </div>
    )
}

export default CoversPlayCountPage;