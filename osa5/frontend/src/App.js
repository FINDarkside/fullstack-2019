import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import NotificationBar from './components/NotificationBar';

const notificationTimeout = 3000;

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notifications, setNotifications] = useState([])

  const changeUser = (newUser) => {
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    blogService.setToken(newUser ? newUser.token : null);
    setUser(newUser);
  }

  const createNotification = (message, success) => {
    const notification = { message, success }
    setNotifications([...notifications, notification])
    setTimeout(() => removeNotification(notification), notificationTimeout)
  }

  const blogCreated = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  }

  const removeNotification = (obj) => {
    setNotifications(notifications.filter(o => o !== obj))
  }

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    fetchBlogs();
    const oldUser = JSON.parse(localStorage.getItem('currentUser'));
    if (oldUser) {
      changeUser(oldUser);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <NotificationBar notifications={notifications} />
        <Login {...{ changeUser, createNotification }}></Login>
      </div>
    );
  }

  return (
    <div>
      <NotificationBar notifications={notifications} />
      <h1>Blogs</h1>
      <span>{user.name} logged in</span> <button onClick={() => changeUser(null)}>Logout</button>
      <NewBlogForm {...{ blogCreated, createNotification }} />
      {blogs.map(blog => (
        <Blog blog={blog} key={blog.id}></Blog>
      ))}
    </div>
  );
}

export default App;
