import axios from 'axios';

const AddAlbumSongPage = ({ serverKey }) => {
    return (
        <div className="centered-dash-page">
            <AddSongForm serverKey={serverKey} />
        </div>
    )
}

const AddSongForm = ({ serverKey }) => {
    const reqBody = {
        serverKey: serverKey
    }

    const handleSubmit = e => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        reqBody.song_name = inputs[0].value;
        reqBody.album_name = inputs[1].value;
        reqBody.audio_url = inputs[2].value;

        axios.post('http://localhost:4002/songs', reqBody)
            .then(res => {
                alert(res.data);
                inputs[0].value = '';
                inputs[1].value = '';
                inputs[2].value = '';
            })
            .catch(err => {
                alert(err.response.data);
                inputs[0].value = '';
                inputs[1].value = '';
                inputs[2].value = '';
            });
    }

    return (
        <form className="add-cover-form" onSubmit={handleSubmit}>
            <h1 className="text-white font-extrabold">ADD SONG TO DATABASE</h1>
            <input placeholder="SONG NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="ALBUM NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="AUDIO URL" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    );
}

export default AddAlbumSongPage;