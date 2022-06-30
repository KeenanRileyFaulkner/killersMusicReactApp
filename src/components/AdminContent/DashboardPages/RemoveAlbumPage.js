import axios from 'axios';

const RemoveAlbumPage = ({ serverKey }) => {
    return (
        <div className="centered-dash-page">
            <RemoveAlbumForm serverKey={serverKey} />
        </div>
    )
}

const RemoveAlbumForm = ({ serverKey }) => {
    let authBody = {
        serverKey: serverKey
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        let albumToDelete = inputs[0].value;
        authBody.username = inputs[1].value;
        authBody.password = inputs[2].value;
        let successfullAuth = false;

        axios.post('http://localhost:4002/authenticate', authBody)
            .then(res => {
                if(res.status === 200)   {
                    successfullAuth = true;
                }

                if(successfullAuth) {
                    axios.delete(`http://localhost:4002/albums/${albumToDelete}`)
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
                        })
                } else {
                    alert('You are not authorized to make that request');
                    inputs[0].value = '';
                    inputs[1].value = '';
                    inputs[2].value = '';
                }
            })
            .catch(err => {
                alert(err.response.data);
                inputs[0].value = '';
                inputs[1].value = '';
                inputs[2].value = '';
            });
    }

    return (
        <form className="add-cover-form" onSubmit={handleSubmit} >
            <h1 className="text-white font-extrabold">REMOVE ALBUM FROM DATABASE</h1>
            <input placeholder="ALBUM NAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="USERNAME" type="text" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <input placeholder="PASSWORD" type="password" className="h-[30px] w-[90%] pl-3 font-extrabold rounded-lg"/>
            <button className="bg-black border-white border-[4px] w-[100px] rounded-xl font-extrabold text-white">SUBMIT</button>
        </form>
    )
}

export default RemoveAlbumPage;