import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="dashboard">
      <h2>Library</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            {book.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
