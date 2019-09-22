import React, { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import NotificationBar from './components/NotificationBar';
import Togglable from './components/Togglable';
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReduces'


const notificationTimeout = 3000;

function App({ sortedBlogs, initBlogs, initUser }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const notificationsRef = useRef(notifications);
  notificationsRef.current = notifications;

  const changeUser = (newUser) => {
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    blogService.setToken(newUser ? newUser.token : null);
    setUser(newUser);
  };

  const createNotification = (message, success) => {
    console.log('createNotification');
    const notification = { message, success };
    notification.id = setTimeout(() => removeNotification(notification), notificationTimeout);
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (obj) => {
    setNotifications(notificationsRef.current.filter(n => n !== obj));
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
    initUser();
    initBlogs();
  }, []);

  const blogFormToggleRef = React.createRef();

  const loginForm = () => (
    <div>
      <Login {...{ changeUser, createNotification }}></Login>
    </div>
  );

  const blogsView = () => (
    <div>
      <h1>Blogs</h1>
      <span>{user.name} logged in</span> <button onClick={() => changeUser(null)}>Logout</button>
      <Togglable buttonLabel="Create blog" ref={blogFormToggleRef}>
        <NewBlogForm {...{ createNotification }} />
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

const mapStateToProps = (state) => ({
  blogs: blogs.sort((a, b) => b.likes - a.likes)
})

const ConnectedApp = connect(mapStateToProps, { initBlogs, initUser })(App)
export default ConnectedApp
