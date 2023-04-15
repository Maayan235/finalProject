import React, { useState } from 'react';
import './Register.css';

function Register({afterRegister, backToLogin}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    // Check username
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if (!usernamePattern.test(username)) {
      setUsernameError('Username must contain letters and numbers only');
      return;
    }

    if (username.length < 4 || username.length > 16) {
      setUsernameError('Username must be between 4 and 16 characters');
      return;
    }

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Check password
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter, at least one digit, at least one special character from the set !@#$%^&*, and are at least 8 characters long.');
      return;
    }

    // All checks passed, register user
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    let newUser = { username:username , email:email, password:password };

    console.log(JSON.stringify(newUser));
    await fetch("http://localhost:5000/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(data => {
      const userId = data.insertedId;
      afterRegister(userId);
    })
    .catch(error => {
      window.alert(error);
      return;
    }); 
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label className='my-font' htmlFor="username">Username:</label>
        <input
        className='inputs'
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <div className="error">{usernameError}</div>}
        <label className='my-font' htmlFor="email">Email:</label>
        <input
        className='inputs'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError && <div className="error">{emailError}</div>}
        <label className='my-font' htmlFor="password">Password:</label>
        <input
        className='inputs'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className="error">{passwordError}</div>}
        <button type="submit">Register</button>
        <br></br>
        <div>already have account? <a style={{ textDecoration: "underline", color: "blue" }} onClick={backToLogin}>Login</a></div>
      </form>
    </div>
  );
}

export default Register;
