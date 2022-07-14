import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AddAlbumSongPage = () => {
    useDocumentTitle('Add Song To DB -- Admin');
    return (
        <div className="centered-dash-page">
            <AddSongForm />
        </div>
    )
}

const AddSongForm = () => {
    const {serverKey} = useOutletContext();
    const reqBody = {
        serverKey: serverKey
    }

    const handleSubmit = e => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        reqBody.song_name = inputs[0].value;
        reqBody.album_name = inputs[1].value;
        reqBody.audio_url = inputs[2].value;

        axios.post('/songs', reqBody)
            .then(res => {
                alert(res.data);
                inputs.forEach(input => input.value = '');
            })
            .catch(err => {
                alert(err.response.data);
                inputs.forEach(input => input.value = '');
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-white font-extrabold">ADD SONG TO DATABASE</h1>
            <input placeholder="SONG NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="ALBUM NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="AUDIO URL" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    );
}

export default AddAlbumSongPage;