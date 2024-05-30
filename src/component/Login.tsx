import React, { useState } from 'react';
import Header from './Header/Header';
import axios from 'axios';

const Login = () => {
    const [acc, setAcc] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState(''); // 로그인 결과 메시지를 저장할 상태

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // var acc;
        // var pwd;
	    console.log("submitted" + acc + pwd);

        var query = "http://localhost:2424/login?acc=" + acc + "?pwd=" + pwd;
        axios.get(query).then((res) => {
            
                // Account with matching information
                console.log(res);

            })
	}

    // Update account state
    const accUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcc(e.target.value);
    };

    const pwdUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };

    return (
        <>
            <Header/>
            <section className="container">
                <form id="my-form" onSubmit={submit}>
                    <h1>Login</h1>
                    <div className="msg">{message}</div>
                    <div className="form-input">
                        <label htmlFor="name">Student ID:</label>
                        <input type="text" id="name" value={acc} onChange={accUpdate} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" id="pwd" value={pwd} onChange={pwdUpdate} />
                    </div>
                    <input className="btn" type="submit" value="Submit" />
                </form>
            </section>
        </>
    );
}

export default Login;
