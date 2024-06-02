import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header/Header';
import axios from 'axios';

export default function Delete(){
    
    const acc = sessionStorage.getItem('userId')
    const navigate = useNavigate();

	
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted", acc);

        
        const response = await axios.post('http://localhost:2424/deleteAcc?acc=' + acc);
        sessionStorage.clear()
        alert("successfully delted account")
        navigate('/');
        
    };
	  
    return (
		<>

		<Header/>
		    <h1>Delete Account</h1>
            <form onSubmit={submit}>
                <input type="submit" value="Delete Account" />
            </form>
		</>
    );
}