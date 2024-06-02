import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">Dashboard</Link>
      <Link to="/add-book">Add Book</Link>
      <Link to="/add-review">Add Review</Link>
      <Link to="/add-category">Add Category</Link>
    </div>
  );
};

export default Sidebar;
