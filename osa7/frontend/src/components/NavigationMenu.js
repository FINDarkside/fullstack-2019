import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../reducers/currentUserReducer';

const Login = ({ currentUser, setUser }) => {

  return (
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu container">
        <div className="navbar-start">
          <div className="navbar-item"><Link className="has-text-white" to="/">Blogs</Link></div>
          <div className="navbar-item"><Link className="has-text-white" to="/users">Users</Link></div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <span className="loggedInText">{currentUser.name} logged in</span>
            <div className="buttons">
              <button className="button is-light" onClick={() => setUser(null)}>Log out</button>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});

const ConnectedLogin = connect(mapStateToProps, { setUser })(Login);
export default ConnectedLogin;
