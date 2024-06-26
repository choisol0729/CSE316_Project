// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ai from './component/page/AiPage'
import AppPage from './component/page/AppPage'
import Hackathon from './component/page/HackathonPage'
import Unity from './component/page/UnityPage'
import Login from './component/Login';
import Main from './component/Main';
import Edit from './component/page/EditPage';
import SignUpPage from './component/page/SignUpPage';
import Delete from './component/Delete';
import ClickedPage from './component/clickedPages/ClickedPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/loginPage" element={<Login />} />
                <Route path="/ai" element={<Ai />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/unity" element={<Unity />} />
                <Route path="/hackathon" element={<Hackathon />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/signUpPage" element={<SignUpPage />} />
                <Route path="/deletePage" element={<Delete />} />
                <Route path="/clickedPage" element={<ClickedPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;
