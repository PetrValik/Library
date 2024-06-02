import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AddReview = () => {
  const [bookId, setBookId] = useState('');
  const [text, setText] = useState('');
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/book/list');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/review/create', { bookId, userId: user.id, text });
      navigate('/');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book:
          <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Text:
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddReview;
