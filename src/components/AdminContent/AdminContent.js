import { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

//For all POST, PUT, and DELETE requests made on this page, the user must send a connection string with the request that matches the one in the db.

const AdminContent = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [serverKey, setServerKey] = useState('');

    const displayDashboardAndStoreKey = (key) => {
        setLoggedIn(true);
        setServerKey(key);
    }


    let loginPageAlign;
    let display;
    if(!loggedIn) {
        loginPageAlign = 'centerItems';
        display = <LoginBox passKeyUp={(key) => displayDashboardAndStoreKey(key)} />
    } else {
        loginPageAlign = '';
        display = <Dashboard serverKey={serverKey} />
    }

    return (
        <div className={`contentContainer ${loginPageAlign} bg-gray-700 py-0 px-0`}>
            {display}
        </div>
    )
}

const LoginBox = ({ passKeyUp }) => {
    const loginBody = {};

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        loginBody.username = inputs[0].value;
        loginBody.password = inputs[1].value;

        axios
            .post('http://localhost:4002/login', loginBody)
            .then(res => {
                passKeyUp(res.data);
            })
            .catch(err => {
                alert(err.response.data);
                inputs[0].value = '';
                inputs[1].value = '';
            });
    }

    return (
        <form className={`login-box`} onSubmit={handleSubmit}>
            <h2 className='font-work-sans text-white text-center text-[18pt] font-extrabold mb-auto mt-6 justify-self-start'>LOGIN</h2>
            <input type='text' placeholder='USERNAME' className={`login-field`} />
            <input type='password' placeholder='PASSWORD' className={`login-field mb-auto`} />
            <button className='login-submit-btn'>SUBMIT</button>
        </form>
    )
}

export default AdminContent;