import React, { useState } from 'react';
import blogService from '../services/blogs';

const NewBlogForm = ({ blogCreated, createNotification }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (event) => {
        event.preventDefault()
        try {
            setTitle('');
            setAuthor('');
            setUrl('');
            const blog = { title, author, url };
            const newBlog = await blogService.create(blog);
            console.log(newBlog);
            blogCreated(newBlog);
            createNotification(`A new blog "${title}" by ${author} created`, true);
        } catch (exception) {
            if (exception.response && exception.response.data.error)
                createNotification(exception.response.data.error, false);
            else
                createNotification('Creating blog failed', false);
        }
    }


    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    Title
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    Author
                    <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>
                <div>
                    Url
                    <input type="text" name="url" value={url} onChange={e => setUrl(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default NewBlogForm;