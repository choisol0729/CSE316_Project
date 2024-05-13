import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header/Header';
import SignUp from './SignUp';

const Login = () =>{

    const click = () => {
        alert('clicked');
    };

	function myFunction(e) {
	    console.log(e.target.value);
	}
	  
    return (
		<>
		    <Header/>
            {/* Login seciton */}
            <section className="container">
                <form id="my-form">
                    <h1>Login</h1>
                    <div className="msg"></div>
                    <div>
                    <label for="name">Student ID:</label>
                    <input type="text" id="name"></input>
                    </div>
                    <div>
                    <label for="email">Password:</label>
                    <input type="text" id="email"></input>
                    </div>
                    <input className="btn" type="submit" value="Submit"></input>
                </form>

                <ul id="users"></ul>

                
            </section>

		</>
    );
}

export default Login;