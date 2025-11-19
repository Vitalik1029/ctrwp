import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Form from '../form';

const AddUserPage = ({ newUser, onInputChange, onSubmit, isEditing, onCancelEdit, userRole }) => {
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Add New User</h1>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>
      <Form 
        newUser={newUser} 
        onInputChange={onInputChange} 
        onSubmit={onSubmit}
        isEditing={isEditing}
        onCancelEdit={onCancelEdit}
        userRole={userRole}
      />
    </div>
  );
};

export default AddUserPage;