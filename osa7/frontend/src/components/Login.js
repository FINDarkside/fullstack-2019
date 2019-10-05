import React from 'react';
import { useField } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/currentUserReducer'

const Login = ({ loginUser, createNotification }) => {
  const { setValue: setUsername, ...usernameField } = useField('text');
  const { setValue: setPassword, ...passwordField } = useField('password');

  const handleLogin = async (event) => {
    console.log('handleLogin');
    event.preventDefault();
    setUsername('');
    setPassword('');
    try {
      await loginUser(usernameField.value, passwordField.value)
      createNotification(`User ${usernameField.value} logged in`, 'success');
    } catch (err) {
      console.error(err)
      if (err.response && err.response.data.error)
        createNotification(err.response.data.error, 'error');
      else
        createNotification('Username or password is invalid', 'error');
    }
  };

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input name="username" {...usernameField} />
        </div>
        <div>
          Password
          <input name="password" {...passwordField} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const ConnectedLogin = connect(null, { createNotification, loginUser })(Login);
export default ConnectedLogin;
