import { useState, useEffect, MouseEventHandler } from 'react';
import Header from '../Header/Header';
// import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Ai from '../page/AiPage';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: string;
    url: string;
}

const ClickedPage = () => {
  const [post, setPost] = useState<BlogPost>({id: 0, title: "", content: "", category: "", url: ""});
  const location = useLocation();
  const userInfo = { ...location.state };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await axios.get<BlogPost>('http://localhost:2424/getContent?id=' + userInfo.id);
            console.log(response.data);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    fetchPosts();
}, []);


    return (
		<>
            <Header/>
            <h1 style={{color:'white'}}>{post.title}</h1>
            <div>

            </div>
            
		</>
    );
}

export default ClickedPage;