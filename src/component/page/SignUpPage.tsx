import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import axios from 'axios';

interface CreateAcc {
    date: string;
    userName: string;
    pwd: string;
    cDate: string;
}

export default function SignUpPage() {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const navigate = useNavigate();
    const [form, setForm] = useState<CreateAcc>({
        date: '',
        userName: '',
        pwd: '',
        cDate: ''
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('ID:', id);
        console.log('Password:', pwd);

        try {
            // 백엔드로 POST 요청 보내기
            const response = await axios.post('http://localhost:2424/signUp?username=' + id + "&pwd=" + pwd);

            
        } catch (error) {
            console.error('Error submitting form', error);
            // 에러 처리 로직 추가 가능
        }
        
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
