import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AddBook = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { user } = useContext(UserContext); // Assuming you have user context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category/list');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCategories(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        user: user.id, // Assuming user context provides user ID
        name,
        author: author.split(',').map((item) => item.trim()), // Split authors by comma
        pages: parseInt(pages, 10),
        releaseDate: parseInt(releaseDate, 10),
        description,
        categories: selectedCategories
      };
      await axios.post('http://localhost:3001/book/create', bookData);
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Author (comma separated):
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label>
          Pages:
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </label>
        <label>
          Release Date:
          <input
            type="number"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Categories:
          <select multiple value={selectedCategories} onChange={handleCategoryChange} required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddBook;
