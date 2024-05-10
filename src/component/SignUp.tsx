import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(){
    const navigate = useNavigate();
    const click = () => {
        alert('clicked');
      };
	function myFunction(e) {
	console.log(e.target.value); // 현재 입력 필드의 값을 콘솔에 출력
	}
    const save = () => {
        // const isEmpty = questions.some(question => question.value.trim() === '');
    
        
        navigate('/Login');
        
    };
	  
    return (
		<>

            <form id="formEdit">
                <input type="submit" value="Sign Up" id="SignUp" onClick={save}></input>
            </form>

		</>
    );
}