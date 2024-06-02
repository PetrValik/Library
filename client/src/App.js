import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import AddReview from './components/AddReview';
import AddCategory from './components/AddCategory';
import Login from './components/Login';
import Register from './components/Register';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="main">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/add-review" element={<AddReview />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
