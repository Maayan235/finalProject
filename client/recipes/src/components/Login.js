import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <body>
    <div className="login-container" >
      <br/><br/><br/>
    <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label class = "my-font" htmlFor="username">Username:</label>
        <input
        className = "inputs"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <label className = "my-font" htmlFor="password">Password:</label>
        <input
        className = "inputs"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
        <br/><br/><br/><br/><br/>
      </form>
    
    </div>
    </body>
  );
}

export default Login;
