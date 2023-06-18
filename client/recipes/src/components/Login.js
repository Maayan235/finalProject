import { useState } from 'react';
import './Login.css';
import Register from './Register';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5000/users/find?username=${username}&password=${password}`);
    const data = await response.json();

    if (response.status === 200) {
      onLogin(data._id); 
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(!showRegister);
  };
  

  return (
    <body>
      {showRegister ? (
        <Register afterRegister={onLogin} backToLogin={handleRegisterClick}/>
      ) : (
        <div className="login-container">
          <br/><br/><br/>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label className="my-font" htmlFor="username">Username:</label>
            <input
              className="inputs"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <label className="my-font" htmlFor="password">Password:</label>
            <input
              className="inputs"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
            {error && <div className="error">{error}</div>}
            <br></br>
            <div>Don't have an account? <a style={{ textDecoration: "underline", color: "blue" }} onClick={handleRegisterClick}>Sign up</a></div>
            <br/><br/><br/><br/><br/>
          </form>
        </div>
      )}

    </body>
  );
  
}

export default Login;
