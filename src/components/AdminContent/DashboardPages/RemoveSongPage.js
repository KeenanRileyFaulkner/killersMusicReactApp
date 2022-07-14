import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const RemoveSongPage = () => {
    useDocumentTitle('Remove Song From DB -- Admin');
    return (
        <div className="centered-dash-page">
            <RemoveSongForm />
        </div>
    )
}

const RemoveSongForm = () => {
    const {serverKey} = useOutletContext();
    const authBody = {
        serverKey: serverKey
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        let songToDelete = inputs[0].value;
        authBody.username = inputs[1].value;
        authBody.password = inputs[2].value;
        let successfullAuth = false;

        axios.post('/authenticate', authBody)
            .then(res => {
                if(res.status === 200)   {
                    successfullAuth = true;
                }

                if(successfullAuth) {
                    axios.delete(`/songs/${songToDelete}`)
                        .then(res => {
                            alert(res.data);
                            inputs.forEach(input => input.value = '');
                        })
                        .catch(err => {
                            alert(err.response.data);
                            inputs.forEach(input => input.value = '');
                        })
                } else {
                    alert('You are not authorized to make that request');
                    inputs.forEach(input => input.value = '');
                }
            })
            .catch(err => {
                alert(err.response.data);
                inputs.forEach(input => input.value = '');
            });
    }

    return (
        <form onSubmit={handleSubmit} >
            <h1 className="text-white font-extrabold">REMOVE SONG FROM DATABASE</h1>
            <input placeholder="SONG NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="USERNAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="PASSWORD" type="password" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default RemoveSongPage;