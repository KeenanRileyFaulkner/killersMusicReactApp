import { useState } from 'react';

const AboutContent = () => {
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

    return (
        <div className="contentContainer bg-full-band-photo bg-[center_24px] flex-col">
            <FullBand selectedState={displayedInfo} selectBrandon={selectBrandon} 
                selectRonnie={selectRonnie} selectMark={selectMark} selectDave={selectDave} />

            <BandLogo selected={displayedInfo.band} handleClick={selectBandInfo} />
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
        <div onClick={() => handleClick()} className={`${logo} about-band-btn self-center justify-center`} />
    )
}

const FullBand = ({ selectedState, selectBrandon, selectRonnie, selectMark, selectDave}) => {
    return (
        <div className='flex flew-row justify-center items-center p-2 flex-wrap'>
            <BandMember name='brandon' selected={selectedState.brandon} handleSelect={selectBrandon} key='brandon'/>
            <BandMember name='ronnie' selected={selectedState.ronnie} handleSelect={selectRonnie} key='ronnie' />
            <BandMember name='mark' selected={selectedState.mark} handleSelect={selectMark} key='mark' />
            <BandMember name='dave' selected={selectedState.dave} handleSelect={selectDave} key='dave' />
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
        <div className={`${colorPhoto} w-[150px] h-[150px] bg-cover hover:opacity-90 hover:cursor-pointer ml-4 mt-4`} onClick={() => handleSelect()} />
    ) : (
        <div className={`${bwPhoto} w-[150px] h-[150px] bg-cover hover:opacity-90 hover:cursor-pointer ml-4 mt-4`} onClick={() => handleSelect()} />
    );
}

export default AboutContent;