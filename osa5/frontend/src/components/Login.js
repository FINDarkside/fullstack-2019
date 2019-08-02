import React from 'react';
import * as loginService from '../services/login';
import PropTypes from 'prop-types';
import { useField } from '../hooks'

const Login = ({ changeUser, createNotification }) => {
  const { setValue: setUsername, ...usernameField } = useField('text');
  const { setValue: setPassword, ...passwordField } = useField('passowrd');

  const handleLogin = async (event) => {
    console.log('handleLogin');
    event.preventDefault();
    try {
      const user = await loginService.login(usernameField.value, passwordField.value);
      createNotification(`User ${usernameField.value} logged in`, true);
      setUsername('');
      setPassword('');
      changeUser(user);
    } catch (exception) {
      if (exception.response && exception.response.data.error)
        createNotification(exception.response.data.error, false);
      else
        createNotification('Username or password is invalid', false);
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

Login.propTypes = {
  changeUser: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
};

export default Login;
