import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Header';

export default function Ai() {
    const [questions, setQuestions] = useState([]);
    const [currDate, setDates] = useState(new Date());
    const [todayDate, setTodayDate] = useState(new Date()); // find today's date to prevent to go to future
    const navigate = useNavigate();

    useEffect(() => {
        const storedQuestions = sessionStorage.getItem('questions');
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        }
    }, []);

    const save = () => {
        sessionStorage.setItem('questions', JSON.stringify(questions));
        // navigate('/');
        alert('Submitted')
    };


    

    return (
        <>
            <Header/>

            <h1 style={{ color: 'white' }}>AI Page</h1>

            
        </>
    );
}
