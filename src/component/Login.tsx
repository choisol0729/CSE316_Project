import React, { useState } from 'react';
import Header from './Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [acc, setAcc] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState(''); // 로그인 결과 메시지를 저장할 상태
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted", acc, pwd);

        // try {
        const response = await axios.get('http://localhost:2424/login?acc=' + acc + "&pwd=" + pwd);

        if (response.data.length !== 0) {
            console.log('Login successful', response);
            console.log('Login successful', response.data);

            sessionStorage.setItem('userId', acc); // userId 저장
            setMessage('Login successful!');
            
            // sessionStorage에 저장된 값 확인
            const storedUserId = sessionStorage.getItem('userId');
            if (storedUserId) {
                console.log('Stored userId:', storedUserId);
            } else {
                console.error('Failed to store userId in sessionStorage');
            }

            navigate('/');
        } else {
            console.log('login failed invalid id or pwd');
            alert('invalid id or pwd');
        }
    };

    // Update account state
    const accUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcc(e.target.value);
    };

    const pwdUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
    };

    // Navigate to signUpPage
    const navigateToSignUp = () => {
        navigate('/signUpPage');
    };

    return (
        <>
            <Header />
            <section className="container">
                <form id="my-form" onSubmit={submit}>
                    <h1>Login</h1>
                    <div className="msg">{message}</div>
                    <div className="form-input">
                        <label htmlFor="name">Student ID:</label>
                        <input type="text" required id="name" value={acc} onChange={accUpdate} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" required id="pwd" value={pwd} onChange={pwdUpdate} />
                    </div>
                    <input className="btn" type="submit" value="Submit" />
                </form>

                <button className="btn" onClick={navigateToSignUp}>Don't have account?</button>
            </section>
        </>
    );
}

export default Login;
