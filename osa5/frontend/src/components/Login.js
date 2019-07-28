import React, { useState } from 'react';
import * as loginService from '../services/login';
import PropTypes from 'prop-types';

const Login = ({ changeUser, createNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      createNotification(`User ${username} logged in`, true);
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
          <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          Password
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
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
