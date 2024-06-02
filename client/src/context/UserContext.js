import React, { createContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (name) => {
    try {
      const response = await axios.get('http://localhost:3001/user/list');
      const userList = response.data;
      const user = userList.find(user => user.name == name);
      if (user) {
        setUser(user);
      } 
    } catch (error) {
      alert("User not found", error);
      console.error('Error fetching user:', error);
    }
  };

  const register = async (name, surname, email) => {
    try {
      const response = await axios.post('http://localhost:3001/user/create', { name, surname, email });
      setUser(response.data);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
