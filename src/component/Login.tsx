import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import SignUp from './SignUp';

export default function Login(){
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
            <section class="container">
                <form id="my-form">
                    <h1>Login</h1>
                    <div class="msg"></div>
                    <div>
                    <label for="name">Student ID:</label>
                    <input type="text" id="name"></input>
                    </div>
                    <div>
                    <label for="email">Password:</label>
                    <input type="text" id="email"></input>
                    </div>
                    <input class="btn" type="submit" value="Submit"></input>
                </form>

                <ul id="users"></ul>

                
            </section>

		</>
    );
}