import React, { useEffect } from 'react';
import Login from './components/Login';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';
import NotificationBar from './components/NotificationBar';
import Togglable from './components/Togglable';
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser, setUser } from './reducers/userReducer'
import { createNotification } from './reducers/notificationReducer'

function App({ blogs, initBlogs, initUser, user }) {

  useEffect(() => {
    initUser();
    initBlogs();
  }, [initUser, initBlogs]);

  const blogFormToggleRef = React.createRef();

  const loginForm = () => (
    <div>
      <Login />
    </div>
  );

  const blogsView = () => (
    <div>
      <h1>Blogs</h1>
      <span>{user.name} logged in</span> <button onClick={() => setUser(null)}>Logout</button>
      <Togglable buttonLabel="Create blog" ref={blogFormToggleRef}>
        <NewBlogForm />
      </Togglable>
      {
        blogs.map(blog => (
          <Blog key={blog.id} {...{ blog }} ></Blog>
        ))
      }
    </div>
  );

  return (
    <div>
      <NotificationBar />
      {user ? blogsView() : loginForm()}
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.sort((a, b) => b.likes - a.likes),
  user: state.user,
})

const ConnectedApp = connect(mapStateToProps, { initBlogs, initUser, createNotification, setUser })(App)
export default ConnectedApp
