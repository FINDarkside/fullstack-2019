import React from 'react';
import { useField } from '../hooks'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

const Login = ({ loginUser, createNotification }) => {
  const { setValue: setUsername, ...usernameField } = useField('text');
  const { setValue: setPassword, ...passwordField } = useField('password');

  const handleLogin = async (event) => {
    console.log('handleLogin');
    event.preventDefault();
    try {
      await loginUser(usernameField.value, passwordField.value)
      createNotification(`User ${usernameField.value} logged in`, 'success');
      setUsername('');
      setPassword('');
    } catch (exception) {
      if (exception.response && exception.response.data.error)
        createNotification(exception.response.data.error, 'error');
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

const mapStateToProps = (state) => ({
  user: state.user,
})
const ConnectedLogin = connect(mapStateToProps, { createNotification, loginUser })(Login);
export default ConnectedLogin;
