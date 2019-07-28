import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import NotificationBar from './components/NotificationBar';
import Togglable from './components/Togglable';

const notificationTimeout = 3000;

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef(notifications);
  notificationsRef.current = notifications;

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const changeUser = (newUser) => {
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    blogService.setToken(newUser ? newUser.token : null);
    setUser(newUser);
  };

  const createNotification = (message, success) => {
    const notification = { message, success };
    notification.id = setTimeout(() => removeNotification(notification), notificationTimeout);
    setNotifications([...notifications, notification]);
  };

  const blogCreated = (newBlog) => {
    setBlogs([...blogs, newBlog]);
  };

  const removeNotification = (obj) => {
    setNotifications(notificationsRef.current.filter(n => n !== obj));
  };

  const likeBlog = async (blog) => {
    try {
      await blogService.like(blog);
      const newBlogs = [...blogs];
      newBlogs[blogs.findIndex((b) => b.id === blog.id)].likes++;
      setBlogs(newBlogs);
      createNotification('Blog liked', true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error)
        createNotification(err.response.data.error, false);
      else
        createNotification('Liking blog failed', false);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (!window.confirm(`Delete blog "${blog.name}" by ${blog.author}?`))
        return;
      await blogService.delete(blog);
      setBlogs([...blogs].filter(b => b.id !== blog.id));
      createNotification('Blog deleted', true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data.error)
        createNotification(err.response.data.error, false);
      else
        createNotification('Deleting blog failed', false);
    }
  };

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

  const blogFormToggleRef = React.createRef();

  const loginForm = () => (
    <div>
      <NotificationBar notifications={notifications} />
      <Login {...{ changeUser, createNotification }}></Login>
    </div>
  );

  const blogsView = () => (
    <div>
      <h1>Blogs</h1>
      <span>{user.name} logged in</span> <button onClick={() => changeUser(null)}>Logout</button>
      <Togglable buttonLabel="Create blog" ref={blogFormToggleRef}>
        <NewBlogForm {...{ blogCreated, createNotification, likeBlog }} />
      </Togglable>
      {
        sortedBlogs.map(blog => (
          <Blog key={blog.id} {...{ blog, likeBlog, deleteBlog }} showDeleteButton={blog.user.id === (user.id)}></Blog>
        ))
      }
    </div>
  );

  return (
    <div>
      <NotificationBar notifications={notifications} />
      {user ? blogsView() : loginForm()}
    </div>
  );
}

export default App;
