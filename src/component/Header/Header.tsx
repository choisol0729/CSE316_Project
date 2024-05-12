import React from 'react';
import { Link } from "react-router-dom";
import SignUp from '../SignUp';
import './Header.css';

export default function Header() {
    return (
        <header id="header">
            <div className="wrapper">
                {/* 메인 페이지로 이동하는 로고 */}
                <div className="logo">
                    <Link to="/">
                        <i className="fas fa-kiss-wink-heart"></i>Decompiler
                    </Link>
                </div>
                <ul className="lists">
                    <li className="li"><Link to="/ai">AI</Link></li>
                    <li className="li"><Link to="/app">App</Link></li>
                    <li className="li"><Link to="/unity">Unity</Link></li>
                    <li className="li"><Link to="/hackathon">Hackathon</Link></li>
                </ul>
                <SignUp />
            </div>
        </header>
    );
}
