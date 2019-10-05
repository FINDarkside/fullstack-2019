import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/currentUserReducer'

const Login = ({ currentUser, setUser }) => {
  
  return (
    <div className="navigationMenu">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <span>{currentUser.name} logged in</span> <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})

const ConnectedLogin = connect(mapStateToProps, { setUser })(Login);
export default ConnectedLogin;
