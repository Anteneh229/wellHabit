import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setUser({ username: data.username, token: data.token });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
   
          <div className="loginContainer container">
      <h1 className="loginHeader">Login</h1>
      <form>
        <input className="loginInput" type="text" placeholder="Username" />
        <input className="loginInput" type="password" placeholder="Password" />
        <button className="loginButton" type="submit">Login</button>
      </form>
    </div>
        
  );
};

export default Login;