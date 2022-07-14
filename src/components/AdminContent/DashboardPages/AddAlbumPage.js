import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AddAlbumPage = () => {
    useDocumentTitle('Add Album To DB -- Admin');
    return(
        <div className="centered-dash-page">
            <AddAlbumForm />
        </div>
    );
}

const AddAlbumForm = () => {
    const {serverKey} = useOutletContext();
    const reqBody = {
        serverKey: serverKey
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        reqBody.album_name = inputs[0].value;
        reqBody.release_year = inputs[1].value;
        reqBody.image_url = inputs[2].value;
        reqBody.display_order = inputs[3].value;
        reqBody.num_tracks = inputs[4].value;

        axios.post('/albums', reqBody)
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
            <h1 className="text-white font-extrabold">ADD ALBUM TO DATABASE</h1>
            <input placeholder="ALBUM NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="RELEASE YEAR" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="IMAGE URL" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg" />
            <input placeholder= "DISPLAY ORDER" type="text" className='h-[30px] w-[90%] pl-3 font-extrabold rounded-lg' />
            <input placeholder="NUMBER OF TRACKS (OPTIONAL)" type="text" className='h-[30px] w-[90%] pl-3 font-extrabold rounded-lg' />
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default AddAlbumPage;