import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './Edit.css';
import axios from 'axios';

interface BlogPost {
    title: string;
    content: string;
    category: string;
    userId: string | null;
    url: string;
}

const Edit = () => {
    const uploadPreset = "laiyi8dx";
    const cloudName = "dd0npgwst";
    const [fetchedPosts, setFetchedPosts] = useState<{ title: string; category: string }[]>([]);

    const [form, setForm] = useState<BlogPost>({
        title: '',
        content: '',
        category: '',
        userId: '',
        url: ''
    });
    const navigate = useNavigate();
    
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:2424/getAllContents');
                setFetchedPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const storedUserId = sessionStorage.getItem('userId'); 
        console.log(storedUserId);
        
        // setForm({
        //     ...form,
        //     // url: url,
        //     userId: storedUserId
        // });
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
            userId: storedUserId
        });
    };

    // Function to upload image to Cloudinary
    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_preset'); // Cloudinary upload preset
        formData.append('cloud_name', 'your_cloud_name'); // Cloudinary account name

        const response = await fetch(`https://api.cloudinary.com/v1_1/${formData.get('cloud_name')}/image/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Image uploaded to Cloudinary:', data.url); // Debug log
            setProfileImage(data.url); // Set the image URL received from Cloudinary
        } else {
            console.error('Failed to upload image:', data);
        }
    };

    // Handle image file change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            // uploadImageToCloudinary(file); // Upload to Cloudinary
        }

        var img = event.target.files;
        if(img?.length !== 0 && img !== null) {
            console.log(img[0]);

            const formData = new FormData();
            formData.append('file', img[0]);
            formData.append('upload_preset', uploadPreset);
            
            axios.post("https://api-ap.cloudinary.com/v1_1/" + cloudName + "/image/upload", formData)
            .then((res) => {
                var url = res.data.url;
                const storedUserId = sessionStorage.getItem('userId'); 
                console.log(url);
                // do something with url
                setForm({
                    ...form,
                    url: url,
                    userId: storedUserId
                });
            })
            .catch(err => console.log(err));
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const storedUserId = sessionStorage.getItem('userId'); 
        console.log(storedUserId);
        
        setForm({
            ...form,
            // url: url,
            userId: storedUserId
        });
        // const response = await axios.post('http://localhost:2424/signUp?username=' + id + "&pwd=" + pwd);
        const postResponse = await axios.post('http://localhost:2424/postContents?url=' + form.url + '&title=' + form.title + '&userID=' +form.userId + '&content=' + form.content + '&category=' + form.category);
        console.log(postResponse.data);

        const getResponse = await axios.get('http://localhost:2424/postContents?title=' + form.title + '&category=' + form.category)
        
        
        // try {
        //     // 백엔드로 POST 요청 보내기
        //     const response = await axios.post('http://localhost:2424/post?formdata=' + JSON.stringify(form));

        //     if (response.status === 201) { // 응답 상태 코드가 201인 경우 성공적으로 처리된 것
        //         console.log('Post created successfully', response);


        // 카테고리에 따라 페이지 이동
        if (form.category === 'AI') {
            navigate('/ai', { state: { title: form.title, category: form.category } });
        } else if (form.category === 'Unity') {
            navigate('/unity');
        } else if (form.category === 'App') {
            navigate('/app');
        } else if (form.category === 'Hackathon') {
            navigate('/hackathon');
        }
        //     } else {
        //         console.error('Unexpected status code:', response.status);
        //     }
        // } catch (error) {
        //     console.error('Error submitting form', error);
        //     // 에러 처리 로직 추가 가능
        // }
    };

    return (
        <>
            <Header />
            <h1 style={{ color: 'white'}}>Make a New Post</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content" className="form-label">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={form.content}
                        onChange={handleInputChange}
                        rows={5}
                        className="form-textarea"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="AI">AI</option>
                        <option value="App">App</option>
                        <option value="Unity">Unity</option>
                        <option value="Hackathon">Hackathon</option>
                    </select>
                </div>

                <div className="form-group image-upload-container">
                    <div>
                        <input type="file" onChange={handleImageChange} ref={fileInputRef} accept='image/*' style={{ display: 'none' }} />
                        <button type="button" onClick={triggerFileInput} className="btn btn-light">Choose new image</button>
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </>
    );
}

export default Edit;
