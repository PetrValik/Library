import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/book/get`, {
          params: { id }
        });
        setBook(response.data);

        // Fetch category names
        const categoryPromises = response.data.categories.map(categoryId => 
          axios.get(`http://localhost:3001/category/get`, { params: { id: categoryId } })
        );
        const categoryResponses = await Promise.all(categoryPromises);
        const categoryNames = categoryResponses.map(res => res.data.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/review/list');
        const filteredReviews = response.data.filter(review => review.bookId === id);
        
        const reviewsWithUserDetails = await Promise.all(filteredReviews.map(async (review) => {
          try {
            const userResponse = await axios.get(`http://localhost:3001/user/get`, { params: { id: review.userId } });
            return {
              ...review,
              userName: userResponse.data.name,
            };
          } catch (error) {
            console.error('Error fetching user details:', error);
            return {
              ...review,
              userName: 'Unknown User',
            };
          }
        }));

        setReviews(reviewsWithUserDetails);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchBook();
    fetchReviews();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail">
      <h2>{book.name}</h2>
      <p><strong>Author(s):</strong> {book.author.join(', ')}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Release Date:</strong> {book.releaseDate}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Categories:</strong> {categories.join(', ')}</p>

      <h3>Reviews</h3>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item" style={styles.reviewItem}>
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

export default BookDetail;
