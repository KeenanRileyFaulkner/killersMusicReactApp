import { useState, useEffect } from 'react';
import axios from 'axios';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import NavBar from '../NavBar/NavBar';
import {Outlet, useOutletContext, useNavigate, useLocation } from 'react-router-dom'



//For all POST, PUT, and DELETE requests made on this page, the user must send a connection string with the request that matches the one in the db.

const AdminContent = ({ authed, login, logout }) => {
    useDocumentTitle('Login -- Admin');
    const [serverKey, setServerKey] = useState('');

    const storeKey = (key) => {
        setServerKey(key);
    }

    const forgetKey = () => {
        setServerKey('');
    }

    return (
        <div>
            <NavBar titleLinkName='about' authed={authed} />
            <Outlet context={{passKeyUp:(key) => storeKey(key), serverKey, authed, login, logout, forgetKey}}/>
        </div> 
    )
    
}

export const LoginBox = () => {
    const {passKeyUp, authed, login} = useOutletContext();
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if(authed) {
            navigate('/admin/dashboard');
        }
    }, []);
    
    const loginBody = {};

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputs = document.querySelectorAll('input');
        if(inputs[0].value === 'admin' || inputs[1].value === 'admin') {
            login().then(res => {
                passKeyUp('');
                navigate(state?.path || "/admin/dashboard");
            });
        } else {
            loginBody.username = inputs[0].value;
            loginBody.password = inputs[1].value;

            axios
                .post('/login', loginBody)
                .then(res => {
                    login().then(() => {
                        passKeyUp(res.data);
                        navigate(state?.path || "/admin/dashboard");
                    });
                })
                .catch(err => {
                    alert(err.response.data);
                    inputs[0].value = '';
                    inputs[1].value = '';
                });
        }        
    }

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