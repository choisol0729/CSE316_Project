import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import SignUp from '../SignUp';

export default function Unity(){
    const click = () => {
        alert('clicked');
      };
	function myFunction(e) {
	console.log(e.target.value); // 현재 입력 필드의 값을 콘솔에 출력
	}
	  
    return (
		<>

		    <Header/>
			<h1 style={{ color: 'white' }}>Unity Page</h1>


		</>
    );
}