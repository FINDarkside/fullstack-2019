import React, { useEffect } from 'react';
import Login from './components/Login';
import NotificationBar from './components/NotificationBar';
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/currentUserReducer'
import { createNotification } from './reducers/notificationReducer'
import { initUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog';
import NavigationMenu from './components/NavigationMenu';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

const App = ({ initBlogs, currentUser, setUser, initUsers, users, blogs }) => {

  useEffect(() => {
    initBlogs();
    initUsers();
    const oldUser = JSON.parse(localStorage.getItem('currentUser'))
    if (oldUser)
      setUser(oldUser)
  }, [initUsers, initBlogs, setUser]);

  const getUserById = (id) => users.find(u => u.id === id);
  const blogById = (id) => blogs.find(u => u.id === id);

  if (!currentUser) {
    return (
      <div>
        <NotificationBar />
        <Login />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <NavigationMenu />
        <div className="container page">
          <NotificationBar />
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/users" render={() => <UserList />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={getUserById(match.params.id)} />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
        </div>
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.sort((a, b) => b.likes - a.likes),
  currentUser: state.currentUser,
  users: state.users,
})

const ConnectedApp = connect(mapStateToProps, { initBlogs, createNotification, setUser, initUsers })(App)
export default ConnectedApp
