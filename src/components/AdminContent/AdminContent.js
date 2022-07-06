import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import NavBar from '../NavBar/NavBar';
import {Outlet, useOutletContext, useNavigate } from 'react-router-dom'
import { logDOM } from '@testing-library/react';



//For all POST, PUT, and DELETE requests made on this page, the user must send a connection string with the request that matches the one in the db.

const AdminContent = () => {
    useDocumentTitle('Admin -- The Killers Music Player');
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


    console.log('Rendered')
    return (
        <div>
            <NavBar titleLinkName='about' />
            <Outlet context={{passKeyUp:(key) => displayDashboardAndStoreKey(key), serverKey, loggedIn}}/>
        </div> 
    )
    
}

export const LoginBox = () => {
    const {passKeyUp, loggedIn} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(loggedIn) {
            navigate('/admin/dashboard');
        }
    }, []);
    
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
                navigate("/admin/dashboard");
            })
            .catch(err => {
                alert(err.response.data);
                inputs[0].value = '';
                inputs[1].value = '';
            });
    }

    console.log('Login Box')
    return (
        <div  className={`contentContainer centerItems bg-gray-700 py-0 px-0`}>
            <form className={`login-box`} onSubmit={handleSubmit}>
            <h2 className='font-work-sans text-white text-center text-[18pt] font-extrabold mb-auto mt-6 justify-self-start'>LOGIN</h2>
            <input type='text' placeholder='USERNAME' className={`login-field`} />
            <input type='password' placeholder='PASSWORD' className={`login-field mb-auto`} />
            <button className='login-submit-btn'>SUBMIT</button>
            </form>
        </div>
        
    )
}

export default AdminContent;