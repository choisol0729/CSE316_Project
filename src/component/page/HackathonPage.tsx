import { useState, useEffect, MouseEventHandler } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './page.css'
import axios from 'axios'

interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: string;
    url: string;
}

const HackathonPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate();
    const [fetchedPosts, setFetchedPosts] = useState<{ title: string; category: string; content:string; id:number;}[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<BlogPost[]>('http://localhost:2424/getAllContents');
                setFetchedPosts(response.data);
                const hackathonPosts = response.data.filter(post => post.category === 'Hackathon');
                setPosts(hackathonPosts)
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);
    

    const moveToEditPage = () => {
        const storedUserId = sessionStorage.getItem('userId'); 
        console.log(storedUserId);
        if(storedUserId === 'admin'){
            navigate('/edit');
        }else{
            alert('Login with Admin account')
        }
        
    }

    const toClickedPage = async (id: number) => {
        const response = await axios.get<BlogPost[]>('http://localhost:2424/getAllContents');
        setFetchedPosts(response.data);

        console.log("ID: ", id);

        const hackathonPosts = response.data.filter(post => post.category === 'AI');
        setPosts(hackathonPosts)
        navigate('/clickedPage', { state: {
            id: id
        }})
    }

    

    return (
        <>
            <Header />
            {/* <div className='form-group'>
                wow
            </div> */}

            <div className="center" style={{ padding: '20px' }}>
                <h1 style={{ color: 'white' }}>Hackathon Page</h1>
                <button style={{ color: 'white'}} onClick={moveToEditPage}>Add New Post</button>
                <div style={{ marginTop: '20px' }}>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post.id} style={{
                                backgroundColor: 'white', 
                                color: 'black', 
                                marginBottom: '10px', 
                                padding: '10px', 
                                borderRadius: '5px',

                                // display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                                {/* check possible to click page or not */}
                                
                                <div onClick={() => toClickedPage(post.id)}>
                                    <section>
                                        <h2>{post.title}</h2>
                                        {/* <p>{post.category}</p> */}
                                        <p>{post.content}</p>
                                    </section>
                                    <br />
                                    <section>
                                        {post.url !== "" ? (<img src={post.url} className='sinom' alt=""/>) : <></>}
                                    </section>
                                </div>
                                
                                
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'white' }}>No posts available for Hackathon category.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default HackathonPage;
