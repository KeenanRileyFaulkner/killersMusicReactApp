import { useState } from 'react';

const AboutContent = () => {
    const initialState = {band: true, brandon: false, ronnie: false, dave: false, mark: false}
    const [displayedInfo, setDisplayedInfo] = useState(initialState);

    const toggleBandInfo = () => {
        if (displayedInfo.band) {
            setDisplayedInfo({...initialState, band: false});
        } else {
            setDisplayedInfo({...initialState, band: true });
        }
    }

    return (
        <div className="contentContainer bg-full-band-photo bg-[center_24px]">
            <BandLogo selected={displayedInfo.band} handleClick={toggleBandInfo} />
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
        <div onClick={() => handleClick()} className={`${logo} about-band-btn`} />
    )
}

export default AboutContent;