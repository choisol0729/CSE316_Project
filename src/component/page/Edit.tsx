import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import FileUpload from '../FileUpload';
import './Edit.css';

interface PostForm {
    title: string;
    content: string;
    category: string;
}

export default function Edit() {
    const [form, setForm] = useState<PostForm>({
        title: '',
        content: '',
        category: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // 여기에 글 저장 로직 구현
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

            <div style={{ marginTop: '20px' }}>
                <FileUpload />
            </div>
        </>
    );
}
