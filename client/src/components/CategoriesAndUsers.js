import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesAndUsers = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/list');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/list');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchCategories();
    fetchUsers();
  }, []);

  return (
    <div className="categories-and-users">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            {category.name}
          </div>
        ))}
      </div>

      <h2>Users</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesAndUsers;
