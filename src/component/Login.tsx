import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header/Header';
import SignUp from './SignUp';

const Login = () => {
    const [acc, setAcc] = useState(''); // State for the account
    const [pwd, setPwd] = useState(''); // State for the password

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        console.log("submitted " + acc + " " + pwd);
    }

    // Update account state
    const accUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcc(e.target.value);
    };

    // Update password state
    const pwdUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };

    return (
        <>
            <Header/>
            {/* Login section */}
            <section className="container">
                <form id="my-form" onSubmit={submit}>
                    <h1>Login</h1>
                    <div className="msg"></div>
                    <div>
                        <label htmlFor="name">Student ID:</label>
                        <input type="text" id="name" value={acc} onChange={accUpdate}></input>
                    </div>
                    <div>
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" id="pwd" value={pwd} onChange={pwdUpdate}></input>
                    </div>
                    <input className="btn" type="submit" value="Submit"></input>
                </form>

                <ul id="users"></ul>
            </section>
        </>
    );
}

export default Login;
