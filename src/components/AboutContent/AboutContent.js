import { useState } from 'react';
import { bandDescription, daveDescription, brandonDescription, markDescription, ronnieDescription } from './bios';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';

const AboutContent = () => {
    useDocumentTitle('About -- The Killers Music Player');
    const initialState = {band: true, brandon: false, ronnie: false, dave: false, mark: false}
    const [displayedInfo, setDisplayedInfo] = useState(initialState);

    const selectBandInfo = () => {
        if (!displayedInfo.band) {
            setDisplayedInfo({...initialState});
        }
    }

    const selectBrandon = () => {
        if (!displayedInfo.brandon) {
            setDisplayedInfo({...initialState, band: false, brandon: true});
        }
    }

    const selectRonnie = () => {
        if (!displayedInfo.ronnie) {
            setDisplayedInfo({...initialState, band: false, ronnie: true});
        }
    }

    const selectMark = () => {
        if (!displayedInfo.mark) {
            setDisplayedInfo({...initialState, band: false, mark: true});
        }
    }

    const selectDave = () => {
        if (!displayedInfo.dave) {
            setDisplayedInfo({...initialState, band: false, dave: true});
        }
    }

    let backgroundPhoto;
    if(displayedInfo.dave) {
        backgroundPhoto = 'bg-dave-full-band-color';
    } else if (displayedInfo.brandon) {
        backgroundPhoto = 'bg-brandon-full-band-color';
    } else if (displayedInfo.mark) {
        backgroundPhoto = 'bg-mark-full-band-color';
    } else if (displayedInfo.ronnie) {
        backgroundPhoto = 'bg-ronnie-full-band-color';
    } else {
        backgroundPhoto = 'bg-full-band-photo';
    }


    return (
        <div>
            <div className={`background-image ${backgroundPhoto}`} />
            <div className={`contentContainer flex-col`}>
                <FullBand selectedState={displayedInfo} selectBrandon={selectBrandon} 
                    selectRonnie={selectRonnie} selectMark={selectMark} selectDave={selectDave} />

                <BandLogo selected={displayedInfo.band} handleClick={selectBandInfo} />

                <DescriptionBox currSelection={displayedInfo} />
            </div>
        </div>
    );
}

const BandLogo = ({ selected, handleClick }) => {

    let logo;
    if(selected) {
        logo='bg-lit-logo';
    } else {
        logo='bg-unlit-logo';
    }

    return (
        <div onClick={() => handleClick()} className={`${logo} about-band-btn self-center justify-center hover:opacity-90`} />
    )
}

const FullBand = ({ selectedState, selectBrandon, selectRonnie, selectMark, selectDave}) => {
    return (
        <div className='band-member-btns'>
            <BandMember name='dave' selected={selectedState.dave} handleSelect={selectDave} key='dave' />
            <BandMember name='brandon' selected={selectedState.brandon} handleSelect={selectBrandon} key='brandon'/>
            <BandMember name='mark' selected={selectedState.mark} handleSelect={selectMark} key='mark' />
            <BandMember name='ronnie' selected={selectedState.ronnie} handleSelect={selectRonnie} key='ronnie' />
        </div>
    );
}

const BandMember = ({ name, selected, handleSelect }) => {
    let colorPhoto;
    let bwPhoto;
    switch (name) {
        case 'brandon':
            colorPhoto = 'bg-brandon-color';
            bwPhoto = 'bg-brandon-bw';
            break;
        case 'ronnie':
            colorPhoto = 'bg-ronnie-color';
            bwPhoto = 'bg-ronnie-bw';
            break;
        case 'mark':
            colorPhoto = 'bg-mark-color';
            bwPhoto = 'bg-mark-bw';
            break;
        case 'dave':
            colorPhoto = 'bg-dave-color';
            bwPhoto = 'bg-dave-bw';
            break;

        // no default
    }

    return selected ? (
        <div className={`${colorPhoto} band-member`} onClick={() => handleSelect()} />
    ) : (
        <div className={`${bwPhoto} band-member`} onClick={() => handleSelect()} />
    );
}

const DescriptionBox = ({ currSelection }) => {
    let text;
    let borderColor;
    if(currSelection.band) {
        text = bandDescription.toUpperCase();
        borderColor = 'border-[#262626]';
    } else if (currSelection.brandon) {
        text = brandonDescription.toUpperCase();
        borderColor = 'border-[#d8b666]';
    } else if (currSelection.dave) {
        text = daveDescription.toUpperCase();
        borderColor = 'border-[#9f5c0c]';
    } else if (currSelection.mark) {
        text = markDescription.toUpperCase();
        borderColor = 'border-[#538b90]';
    } else if (currSelection.ronnie) {
        text = ronnieDescription.toUpperCase();
        borderColor = 'border-[#382417]';
    }

    return(
        <div className={`${borderColor} description-box`}>
                {text}
        </div>
    )
}

export default AboutContent;