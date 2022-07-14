import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AddCoverPage = () => {
    useDocumentTitle('Add Cover To DB -- Admin');
    return (
        <div className="centered-dash-page">
            <AddCoverForm />
        </div>
    )
}

const AddCoverForm = () => {
    const {serverKey} = useOutletContext();
    const reqBody = {
        serverKey: serverKey
    }

    const handleSubmit = e => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        reqBody.cover_name = inputs[0].value;
        reqBody.image_url = inputs[1].value;
        reqBody.audio_url = inputs[2].value;
        reqBody.display_order = inputs[3].value;

        axios.post('/covers', reqBody)
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
            <input placeholder="DISPLAY ORDER" type="text" className='h-[30px] w-[90%] pl-3 font-extrabold rounded-lg' />
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default AddCoverPage;