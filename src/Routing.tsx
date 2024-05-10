import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ai from "./component/page/Ai";
import App from "./component/page/App";
import Unity from "./component/page/Unity";
import './App.css';
import Hackathon from './component/page/Hackathon';
import Login from './component/Login'
import Main from './component/Main'


function Routing() {
  return(
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Main />} />
        
        <Route path="/ai" element={<Ai />} />
        
        <Route path="/app" element={<App />} />

        <Route path="/unity" element={<Unity />} />

        <Route path="/hackathon" element={<Hackathon />} />

        <Route path="/Login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default Routing;
