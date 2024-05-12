import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 필요한 훅을 임포트
import Header from '../Header/Header';

interface BlogPost {
    id: number;
    title: string;
    content: string;
}

const Ai: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const addNewPost = () => {
        const newPost: BlogPost = {
            id: posts.length + 1,
            title: `Blog Post ${posts.length + 1}`,
            content: 'This is the content of the new blog post.'
        };
        setPosts([...posts, newPost]);
    };

    // edit page로 이동
    const moveToEditPage = () => {
        navigate('/edit');
    }

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: 'white' }}>Hackathon Page</h1>
                <button onClick={moveToEditPage}>Add New Post</button>
                <div style={{ marginTop: '20px' }}>
                    {posts.map(post => (
                        <div key={post.id} style={{
                            backgroundColor: 'white', 
                            color: 'black', 
                            marginBottom: '10px', 
                            padding: '10px', 
                            borderRadius: '5px'
                        }}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Ai;
