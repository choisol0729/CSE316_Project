import React from 'react';
import { Link } from "react-router-dom";
import SignUp from '../SignUp';
import './Header.css'; // Ensure to import the CSS file

export default function Header() {
    return (
        <header id="header">
            <div className="wrapper">
                <div className="logo"><i className="fas fa-kiss-wink-heart"></i>Decompiler</div>
                <ul className="lists">
                    <li className="li"><Link to={"/ai"}>AI</Link></li>
                    <li className="li"><Link to={"/app"}>APP</Link></li>
                    <li className="li"><Link to={"/unity"}>Unity</Link></li>
                    <li className="li"><Link to={"/hackathon"}>Hackathon</Link></li>
                </ul>
                <SignUp />
            </div>
        </header>
    );
}
