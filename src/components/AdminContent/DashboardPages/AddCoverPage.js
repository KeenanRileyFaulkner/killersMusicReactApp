import axios from 'axios';

const AddCoverPage = ({ serverKey }) => {
    return (
        <div className="centered-dash-page">
            <AddCoverForm serverKey={serverKey} />
        </div>
    )
}

const AddCoverForm = ({ serverKey }) => {
    const reqBody = {
        serverKey: serverKey
    }

    const handleSubmit = e => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        reqBody.cover_name = inputs[0].value;
        reqBody.image_url = inputs[1].value;
        reqBody.audio_url = inputs[2].value;

        axios.post('http://localhost:4002/covers', reqBody)
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
            <h1 className="text-white font-extrabold">ADD COVER TO DATABASE</h1>
            <input placeholder="COVER NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="IMAGE URL" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="AUDIO URL" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default AddCoverPage;