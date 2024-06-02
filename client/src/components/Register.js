import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Register = () => {
  const [Name, setUserName] = useState('');
  const [Surname, setUserSurname] = useState('');
  const [Mail, setUserMail] = useState('');
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(Name, Surname, Mail);
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
            value={Name}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            value={Surname}
            onChange={(e) => setUserSurname(e.target.value)}
          />
        </label>
        <label>
          Mail:
          <input
            type="mail"
            value={Mail}
            onChange={(e) => setUserMail(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
