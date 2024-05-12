// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ai from './component/page/Ai'
import AppPage from './component/page/App'
import Hackathon from './component/page/Hackathon'
import Unity from './component/page/Unity'
import Login from './component/Login';
import Main from './component/Main';
import Edit from './component/page/Edit';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ai" element={<Ai />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/unity" element={<Unity />} />
                <Route path="/hackathon" element={<Hackathon />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default App;
