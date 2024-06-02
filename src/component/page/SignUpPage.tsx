import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';

export default function SignUpPage() {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();

    function myFunction(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
    }

    const idUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
        myFunction(e);
    };

    const pwdUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(e.target.value);
        myFunction(e);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('ID:', id);
        console.log('Password:', pwd);
        
        alert('Successfully created account');
        navigate('/loginPage');
    };

    return (
        <>
            <Header />
            <h1>Give me your personal Info slave</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="id">Create ID:</label>
                    <input type="text" required value={id} onChange={idUpdate} />
                </div>
                <div className="form-input">
                    <label htmlFor="pwd">Create Password:</label>
                    <input type="password" required value={pwd} onChange={pwdUpdate} />
                </div>
                <input className="btn" type="submit" value="Create Account" />
            </form>
        </>
    );
}
