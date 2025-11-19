import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = ({ currentUser, userRole, onLogout }) => {
  return (
    <header className="app-header">
      <h1>User Management System</h1>
      <div className="header-controls">
        <ThemeToggle />
        {currentUser ? (
          <div className="user-info">
            <span className="username">Welcome, {currentUser} ({userRole})</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;