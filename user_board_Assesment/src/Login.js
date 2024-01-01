import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!userId || !password) {
      setError('Please enter both User ID and Password.');
      return;
    }

    // Update the API endpoint to a placeholder endpoint for user authentication
    axios.post(`${BASE_URL}/users`, { username: userId, password })
      .then((response) => {
        // Assuming the server returns user data upon successful login
        const userData = response.data;

        // For simplicity, we're just calling onLogin with the user ID
        onLogin(userData.id);
      })
      .catch((error) => {
        setError('Invalid credentials. Please try again.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
