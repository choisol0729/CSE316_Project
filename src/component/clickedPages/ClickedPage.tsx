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

interface commentPost{
    comment: string;
    postId: string;
}

const ClickedPage = () => {
    const [post, setPost] = useState<BlogPost>({id: 0, title: "", content: "", category: "", url: ""});
    const location = useLocation();
    const userInfo = { ...location.state };
    const navigate = useNavigate();
    const [form, setForm] = useState<commentPost>({
        comment: '',
        postId: '',

    });

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


    const addComments = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("submitted", acc);

        
        const response = await axios.post('http://localhost:2424/postComments?comment=' + form.comment + "&postID=" + form.postId);
        // sessionStorage.clear()
        // alert("successfully delted account")
        // if(response.data.id)
        console.log(response.data)
        navigate('/');
        
    };

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
            <form id="my-form" onSubmit={addComments}>
                <h1>Add comments</h1>
                <input className="btn" type="submit" value="Add comments" />
            </form>
		</>
    );
}

export default ClickedPage;