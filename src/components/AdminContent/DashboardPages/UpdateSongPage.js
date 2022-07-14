import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const UpdateSongPage = () => {
    useDocumentTitle('Update Song In DB -- Admin');
    return (
        <div className="centered-dash-page">
            <UpdateSongForm />
        </div>
    )
}

const UpdateSongForm = () => {
    const {serverKey} = useOutletContext();
    const updateBody = {
        serverKey: serverKey
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let inputs = document.querySelectorAll('input');
        if(inputs[0].value === '') {
            alert ('You must include the song id number in your request');
            return;
        }
        updateBody.song_id = inputs[0].value;
        if(inputs[1].value !== '') {
            updateBody.song_name = inputs[1].value;
        }
        if(inputs[2].value !== '') {
            updateBody.album_id = inputs[2].value;
        }
        if(inputs[3].value !== '') {
            updateBody.url = inputs[3].value;
        }

        let blankRequest = true;
        inputs.forEach((input, index) => {
            if((index > 0) && (input.value !== '')) {
                blankRequest = false;
            }
        })

        if(blankRequest) {
            alert('Nothing to update');
            inputs.forEach(input => input.value = '');
            return;
        }

        axios.put('/songs', updateBody)
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
        <form onSubmit={handleSubmit} >
            <h1 className="text-white font-extrabold">UPDATE SONG IN DATABASE</h1>
            <input placeholder="SONG ID#" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW SONG NAME (OPTIONAL)" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW ALBUM ID (OPTIONAL)" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW AUDIO URL (OPTIONAL)" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default UpdateSongPage;