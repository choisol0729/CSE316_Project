import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SignUp from '../SignUp';

export default function Header(){
    
	  
    return (
		<>

		<section id="header">
        {/* In react, change class to className */}
            <div className="wrapper">
                <div className="logo"><i className="fas fa-kiss-wink-heart"></i>Decompiler</div>
                    <ul className="lists">
                        <li id="logPage"><Link to={"/ai"}>AI</Link></li>
                        <li id="editPage"><Link to={"/app"}>APP</Link></li>
                        <li id="viewPage"><Link to={"/unity"}>Unity</Link></li>
                        <li id="viewPage"><Link to={"/hackathon"}>Hackathon</Link></li>
                </ul>
                <div>
                    <SignUp/>

                </div>
                
            </div>
        </section>

		</>
    );
}