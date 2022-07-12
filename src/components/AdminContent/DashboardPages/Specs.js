import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Specs = () => {
    useDocumentTitle('IMG/MP3 Specs -- Admin');
    return (
        <div className="centered-dash-page">
            <div className="w-[850px] bg-black-static border-white border-[6px] rounded-3xl text-white flex flex-col p-8">
                <h2 className="text-[18pt] font-extrabold">IMAGES</h2>
                <p className="mt-5 font-medium">
                    IMAGES SHOULD USE THE RESOURCE {" "}
                    <a 
                        href="https://drive.google.com/file/d/10-hNaOwjx823kKVx2YSJsxAvHAVusrcM/view?usp=sharing" 
                        target="_blank" 
                        className="text-[#008baa] hover:text-[#88e4ee] underline">
                        HERE
                        </a> 
                    {" "} AS BACKGROUND AT 350PX SQUARE WITH WHATEVER COVER ART NEEDS TO BE USED INLAID ON THE BACKGROUND, 
                    CENTERED AND 300PX SQUARE. 
                    <br />
                    <br />
                    THE COMBINED BACKGROUND AND COVER ART SHOULD BE HOSTED PUBLICLY AND UPLOADED TO THE DATABASE THROUGH 
                    THE "ADD ALBUM" OR "ADD COVER" PAGE UNDER "IMAGE URL". IF USING GOOGLE DRIVE FOR HOSTING, USE THE FORMAT {" "}
                    <span className="text-[#f7f781] underline">https://drive.google.com/thumbnail?id={`{ID}`}</span> WHERE {`{ID} `}
                    IS REPLACED BY THE ID OF THE RESOURCE PROVIDED IN THE GOOGLE DRIVE SHARE LINK.
                </p>
                <h2 className="text-[18pt] font-extrabold mt-5">AUDIOS</h2>
                <p className="mt-5 font-medium">
                    AUDIOS FOR ALBUMS SHOULD BE TRIMMED TO 25 SECONDS, THEN HOSTED PUBLICLY AS MP3. THEY CAN BE UPLOADED TO 
                    THE DATABASE THROUGH THE "ADD SONG" PAGE UNDER "AUDIO URL". IF USING GOOGLE DRIVE FOR HOSTING,
                    USE THE FORMAT <span className="text-[#f7f781] underline">https://docs.google.com/uc?export=download&id={"{ID}"}</span> WHERE 
                    {` {ID} `} IS REPLACED BY THE ID OF THE RESOURCE PROVIDED IN THE GOOGLE DRIVE SHARE LINK.
                    <br />
                    <br />
                    AUDIOS FOR COVERS MAY BE KEPT AT FULL LENGTH BUT SHOULD BE HOSTED PUBLICLY AS MP3 AND UPLOADED THROUGH THE SAME PROCESS
                    AS WITH ALBUM AUDIOS {'(THROUGH THE "ADD COVER" PAGE UNDER "AUDIO URL")'}.
                </p>
            </div>
        </div>
    )
}

export default Specs;