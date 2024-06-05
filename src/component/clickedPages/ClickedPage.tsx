import Header from '../Header/Header';
// import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
export default function ClickedPage(){
	  
  const location = useLocation();
  const userInfo = { ...location.state };
  const navigate = useNavigate();

    return (
		<>
            <Header/>
            <h1 style={{color:'white'}}>clicked Page</h1>
            <div>
              {userInfo.id}
            </div>
            <div>
              {userInfo.content}
            </div>
            <div>
              {userInfo.title}
            </div>
		</>
    );
}