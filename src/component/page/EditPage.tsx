import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './Edit.css';
import axios from 'axios';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: string;
    userId: number; // 유저 ID
}

const Edit = () => {
    const [form, setForm] = useState<BlogPost>({
        id: Date.now(),
        title: '',
        content: '',
        category: '',
        userId: 1 // 예시로 사용자 ID를 1로 설정
    });
    const navigate = useNavigate();
    
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
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
            uploadImageToCloudinary(file); // Upload to Cloudinary
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 백엔드로 POST 요청 보내기
            const response = await axios.post('http://localhost:2424/api/posts', form);

            if (response.status === 201) { // 응답 상태 코드가 201인 경우 성공적으로 처리된 것
                console.log('Post created successfully', response);

                // 카테고리에 따라 페이지 이동
                if (form.category === 'AI') {
                    navigate('/ai');
                } else if (form.category === 'Unity') {
                    navigate('/unity');
                } else if (form.category === 'App') {
                    navigate('/app');
                } else if (form.category === 'Hackathon') {
                    navigate('/hackathon');
                }
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error submitting form', error);
            // 에러 처리 로직 추가 가능
        }
    };

    return (
        <>
            <Header />
            <h1 style={{ color: 'white' }}>Create or Edit a Post</h1>
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
                        <img src={profileImage as string || 'default_image_path.jpg'} alt="Profile" className="profile-image" />
                        <input type="file" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
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
