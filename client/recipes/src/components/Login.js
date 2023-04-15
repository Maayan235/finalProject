import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5000/users/find?username=${username}&password=${password}`);
    console.log(response);
    const data = await response.json();
    console.log(data);


    if (data) {
      console.log(data.username)
      navigate(`/BasicStructure/${data._id}`);
    } else {
      setError('Invalid username or password');
    }
  };
  

  return (
    <body>
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
          <br/><br/><br/><br/><br/>
        </form>
      </div>
    </body>
  );
  
}

export default Login;
