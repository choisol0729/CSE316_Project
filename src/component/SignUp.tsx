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
        console.log(e.target.value); // 현재 입력 필드의 값을 콘솔에 출력
    }

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출을 막음
        if (isLoggedIn) {
            // 로그아웃 로직
            sessionStorage.removeItem('userId');
            setIsLoggedIn(false);
        } else {
            // 회원가입 로직
            navigate('/loginPage');
        }
    };

    let buttonValue;
    if (isLoggedIn) {
        buttonValue = "Log out";
    } else {
        buttonValue = "Sign Up";
    }

    return (
        <>
            <form id="formEdit" onSubmit={save}>
                <input type="text" onChange={myFunction} style={{ display: isLoggedIn ? 'none' : 'block' }} />
                <input type="submit" value={buttonValue} id="SignUp"></input>
            </form>
        </>
    );
}
