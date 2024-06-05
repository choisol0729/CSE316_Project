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

const clickedPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const location = useLocation();
  const userInfo = { ...location.state };
  const navigate = useNavigate();
  // const [fetchedPosts, setFetchedPosts] = useState<{ title: string; category: string; content:string; id:number;}[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await axios.get<BlogPost>('http://localhost:2424/getContent?id=' + userInfo.id);
            // setFetchedPosts(response);
            // const aiPosts = response.data.filter(post => post.id === userInfo.id);
            // setPosts(aiPosts)
            

        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    fetchPosts();
}, []);


    return (
		<>
            <Header/>
            <h1 style={{color:'white'}}>clicked Page</h1>
            <div>
              {userInfo.id}
            </div>
            <div>
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
                                
                                
                                    <section>
                                        <h2>{post.title}</h2>
                                        {/* <p>{post.category}</p> */}
                                        <p>{post.content}</p>
                                        <p>{post.category}</p>

                                    </section>
                                    <br />
                                    <section>
                                        {post.url !== "" ? (<img src={post.url} className='sinom' alt=""/>) : <></>}
                                    </section>
                                </div>
                                
                                
                            
                        ))
                    ) : (
                        <p style={{ color: 'white' }}>No posts available for AI category.</p>
                    )}
            </div>
            
		</>
    );
}


export default clickedPage;
