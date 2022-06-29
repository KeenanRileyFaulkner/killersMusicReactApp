import { useState } from 'react';

//For all POST, PUT, and DELETE requests made on this page, the user must send a connection string with the request that matches the one in the db.

const AdminContent = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    let loginPageAlign;
    let display;
    if(!loggedIn) {
        loginPageAlign = 'centerItems';
        display = <LoginBox />
    } else {
        loginPageAlign = '';
        display = <div></div>
    }

    return (
        <div className={`contentContainer ${loginPageAlign} bg-gray-700`}>
            {display}
        </div>
    )
}

const LoginBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('click');
    }

    return (
        <form className={`login-box`} onSubmit={handleSubmit}>
            <h2 className='font-work-sans text-white text-center text-[18pt] font-extrabold mb-auto mt-6 justify-self-start'>LOGIN</h2>
            <input type='text' placeholder='USERNAME' className={`login-field`} />
            <input type='text' placeholder='PASSWORD' className={`login-field mb-auto`} />
            <button className='login-submit-btn'>SUBMIT</button>
        </form>
    )
}

export default AdminContent;