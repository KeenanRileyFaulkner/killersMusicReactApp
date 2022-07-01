import axios from 'axios';

const UpdateAlbumPage = ({ serverKey }) => {
    return (
        <div className="centered-dash-page">
            <UpdateAlbumForm serverKey={serverKey} />
        </div>
    )
}

const UpdateAlbumForm = ({serverKey}) => {
    const updateBody = {
        serverKey: serverKey
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let inputs = document.querySelectorAll('input');
        if(inputs[0].value === '') {
            alert ('You must include the album id number in your request');
            return;
        }
        updateBody.album_id = inputs[0].value;
        if(inputs[1].value !== '') {
            updateBody.album_name = inputs[1].value;
        }
        if(inputs[2].value !== '') {
            updateBody.release_year = inputs[2].value;
        }
        if(inputs[3].value !== '') {
            updateBody.image_url = inputs[3].value;
        }
        if(inputs[4].value !== '') {
            updateBody.num_tracks = inputs[4].value;
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

        axios.put('http://localhost:4002/albums', updateBody)
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
        <form className="add-cover-form" onSubmit={handleSubmit} >
            <h1 className="text-white font-extrabold">UPDATE ALBUM IN DATABASE</h1>
            <input placeholder="ALBUM ID#" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW ALBUM NAME (OPTIONAL)" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW ALBUM RELEASE YEAR (OPTIONAL)" type="password" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW ALBUM IMG URL (OPTIONAL)" type="password" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="NEW NUM TRACKS (OPTIONAL)" type="password" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default UpdateAlbumPage;