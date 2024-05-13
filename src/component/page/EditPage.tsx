import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import FileUpload from '../FileUpload';
import './Edit.css';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    category: string;
}

const Edit = () => {
    const [form, setForm] = useState<BlogPost>({
        id: Date.now(),
        title: '',
        content: '',
        category: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 기존에 저장된 게시물 목록 가져오기 -> backend
        const storedPosts = sessionStorage.getItem('allPosts');
        const posts = storedPosts ? JSON.parse(storedPosts) as BlogPost[] : [];

        // 새 게시물 추가
        posts.push(form);

        // 갱신된 게시물 목록을 다시 sessionStorage에 저장
        sessionStorage.setItem('allPosts', JSON.stringify(posts));

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
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <FileUpload />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="AI">AI</option>
                        <option value="App">App</option>
                        <option value="Unity">Unity</option>
                        <option value="Hackathon">Hackathon</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </>
    );
}

export default Edit;