import { Link } from "react-router-dom";
import SignUp from '../SignUp';
import './Header.css';

export default function Header() {
    return (
        <>
        <div className="signup-container">
            <SignUp />
        </div>
        
        
        <header id="header">
            <div className="wrapper">
                
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
                
            </div>
        </header>
        </>
    );
}
