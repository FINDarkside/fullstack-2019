import React, { useState } from 'react'

const Login = ({ login, show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show)
    return null;

  const submit = async (e) => {
    e.preventDefault()

    const res = await login({
      variables: {
        username,
        password,
      }
    });

    if (res) {
      const token = res.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setUsername('');
      setPassword('')
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login