import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        }
    }, []);

    function myFunction(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
    }

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoggedIn) {
            // log out case
            sessionStorage.removeItem('userId');
            setIsLoggedIn(false);
        } else {
            // log in case
            navigate('/loginPage');
        }
    };

    let buttonValue;
    if (isLoggedIn) {
        buttonValue = "Log out";
    } else {
        buttonValue = "Log in";
    }

    return (
        <>
            <form id="formEdit" onSubmit={save}>
                <input type="submit" value={buttonValue} id="SignUp"></input>
            </form>
        </>
    );
}
