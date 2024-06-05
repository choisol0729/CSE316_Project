import { useState, useEffect } from 'react';
import Header from '../Header/Header';
// import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

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
        try {
            axios.get<BlogPost>('http://localhost:2424/getContent?id=' + userInfo.id)
                .then((res) => {
                    console.log(res.data);
                    setPost(res.data);
                })
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    }, []);

    return (
		<>
            <Header/>
            <div style={{alignContent: 'center'}}>
                <h1 style={{color:'white'}}>{post.title}</h1>
                <div>
                    {post.url !== "" ? (<img src={post.url} style={{maxWidth: "50vw"}}/>) : null}
                    <div style={{color: 'white', fontSize: "30px"}}>{post.content}</div>
                </div>
            </div>
		</>
    );
}

export default ClickedPage;