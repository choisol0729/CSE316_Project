import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: string;
}

const Ai = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const allPostsString = sessionStorage.getItem('allPosts');
        if (allPostsString) {
            const allPosts = JSON.parse(allPostsString) as BlogPost[];
            const aiPosts = allPosts.filter(post => post.category === 'AI');
            setPosts(aiPosts);
        }
    }, []);

    const moveToEditPage = () => {
        navigate('/edit');
    }

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: 'white' }}>AI Page</h1>
                <button onClick={moveToEditPage}>Add New Post</button>
                <div style={{ marginTop: '20px' }}>
                    {posts.length > 0 ? (
                        posts.map(post => (
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
                        ))
                    ) : (
                        <p style={{ color: 'white' }}>No posts available for AI category.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Ai;
