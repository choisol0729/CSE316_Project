import React, {  } from 'react';
import Header from './Header/Header';
import axios from 'axios';

const Login = () =>{

    const click = () => {
        alert('clicked');
    };

	function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        var acc;
        var pwd;
	    console.log("submitted" + acc + pwd);

        var query = "http://localhost:2424/login?acc=" + acc + "?pwd=" + pwd;
        axios.get(query).then((res) => {
            
                // Account with matching information
                console.log(res);

            })
	}
	  
    return (
		<>
		    <Header/>
            {/* Login seciton */}
            <section className="container">
                <form id="my-form" onSubmit={submit}>
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