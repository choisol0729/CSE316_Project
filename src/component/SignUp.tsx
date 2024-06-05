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

    const DeleteBtn = () => {
        console.log('Additional button clicked');
        navigate('/deletePage');
    };

    let buttonValue;
    if (isLoggedIn) {
        buttonValue = "Log out";
    } else {
        buttonValue = "Log in";
    }

    return (
        <>  
            {/* {isLoggedIn && (
                <h4>welcome</h4>
            )} */}

            
            <form id="formEdit" onSubmit={save}>
                <input type="submit" value={buttonValue} id="SignUp"></input>
                
            </form>
            

            {isLoggedIn && (
                <button type="button" onClick={DeleteBtn} id='SignUp'>
                    Delete Account
                </button>
                    

                )}
        </>
    );
}
