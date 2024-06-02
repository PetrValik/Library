import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/add-book">Add Book</Link>
        </li>
        <li>
          <Link to="/add-review">Add Review</Link>
        </li>
        <li>
          <Link to="/add-category">Add Category</Link>
        </li>
        <li>
          <Link to="/categories-users">Categories and Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
