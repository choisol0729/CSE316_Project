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

const UnityPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const navigate = useNavigate();
    const [fetchedPosts, setFetchedPosts] = useState<{ title: string; category: string; content:string; id:number;}[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<BlogPost[]>('http://localhost:2424/getAllContents');
                setFetchedPosts(response.data);
                const unityPosts = response.data.filter(post => post.category === 'Unity');
                setPosts(unityPosts)
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);
    

    const moveToEditPage = () => {
        const storedUserId = sessionStorage.getItem('userId'); 
        console.log(storedUserId);
        if(storedUserId!= null){
            navigate('/edit');
        }else{
            alert('Login First')
        }
        
    }

    const toClickedPage = async (id: number) => {
        const response = await axios.get<BlogPost[]>('http://localhost:2424/getAllContents');
        setFetchedPosts(response.data);

        console.log("ID: ", id);

        const unityPosts = response.data.filter(post => post.category === 'AI');
        setPosts(unityPosts)
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
                <h1 style={{ color: 'white' }}>App Page</h1>
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
                        <p style={{ color: 'white' }}>No posts available for Unity category.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default UnityPage;
