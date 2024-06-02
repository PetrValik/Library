import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Register = () => {
  const [name, setUserName] = useState('');
  const [surname, setUserSurname] = useState('');
  const [email, setUserMail] = useState('');
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, surname, email);
      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setUserSurname(e.target.value)}
          />
        </label>
        <label>
          Mail:
          <input
            type="mail"
            value={email}
            onChange={(e) => setUserMail(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
