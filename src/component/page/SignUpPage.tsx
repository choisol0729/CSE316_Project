import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Header/Header';

export default function Main(){
    const click = () => {
        alert('clicked');
      };
	function myFunction(e: React.ChangeEvent<HTMLInputElement>) {
	console.log(e.target.value); // 현재 입력 필드의 값을 콘솔에 출력
	}
	  
    return (
		<>

		<Header/>
		    <h1>Give me your personal Info slave</h1>

		</>
    );
}