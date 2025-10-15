import React from 'react';
import { Link } from 'react-router-dom';

const UserDetails = ({ user, onEdit, onDelete, userRole }) => {
  if (!user) {
    return (
      <div className="user-details">
        <div className="page-header">
          <h1>User Not Found</h1>
          <Link to="/" className="back-btn">← Back to Home</Link>
        </div>
        <p>The user you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="user-details">
      <div className="page-header">
        <h1>User Details</h1>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>
      
      <div className="user-card">
        <div className="user-info">
          <div className="info-row">
            <label>ID:</label>
            <span>{user.id}</span>
          </div>
          <div className="info-row">
            <label>First Name:</label>
            <span>{user.firstName}</span>
          </div>
          <div className="info-row">
            <label>Last Name:</label>
            <span>{user.lastName}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
        </div>
        
        <div className="user-actions">
          {userRole === 'admin' && (
            <button className="edit-btn" onClick={() => onEdit(user)}>
              Edit User
            </button>
          )}
          {userRole === 'admin' && (
            <button className="delete-btn" onClick={() => onDelete(user.id)}>
              Delete User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;