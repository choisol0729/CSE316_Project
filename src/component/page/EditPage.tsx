import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import FileUpload from '../FileUpload';
import './Edit.css';
import axios from 'axios';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 백엔드로 POST 요청 보내기
            const response = await axios.post('/api/posts', form);

            if (response.status === 201) { // 응답 상태 코드가 201인 경우 성공적으로 처리된 것
                console.log('Post created successfully');

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
                        required
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
