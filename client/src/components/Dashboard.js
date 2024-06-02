import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
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

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/review/list');
        const reviews = await Promise.all(response.data.map(async (review) => {
          const bookResponse = await axios.get(`http://localhost:3001/book/get`, { params: { id: review.bookId } });
          const userResponse = await axios.get(`http://localhost:3001/user/get`, { params: { id: review.userId } });
          return {
            ...review,
            bookName: bookResponse.data.name,
            userName: userResponse.data.name,
          };
        }));
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBooks();
    fetchReviews();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="dashboard">
      <h2>Library</h2>
      
      <h3>Books</h3>
      <div className="book-list">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-item"
            onClick={() => handleBookClick(book.id)}
            style={{ cursor: 'pointer' }}
          >
            {book.name}
          </div>
        ))}
      </div>

      <h3>Reviews</h3>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item" style={styles.reviewItem}>
            <p><strong>Book:</strong> {review.bookName}</p>
            <p><strong>User:</strong> {review.userName}</p>
            <p><strong>Review:</strong> {review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  reviewItem: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px 0',
    backgroundColor: '#f9f9f9',
  },
};

export default Dashboard;
