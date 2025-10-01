import React from "react";

const Form = ({ newUser, onInputChange, onSubmit, isEditing, onCancelEdit }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (newUser.firstName.trim() === '' || newUser.lastName.trim() === '' || newUser.email.trim() === '') {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (isEditing) {
      
      onSubmit(e);
    } else {
      
      if (window.confirm('Вы уверены, что хотите добавить нового пользователя?')) {
        onSubmit(e);
      }
    }
  };

  return (
    <section className="add-user-section">
      <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleFormSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newUser.firstName}
            onChange={onInputChange}
            placeholder="Enter first name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newUser.lastName}
            onChange={onInputChange}
            placeholder="Enter last name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={onInputChange}
            placeholder="Enter email"
            required
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="add-btn">
            {isEditing ? 'Update User' : 'Add User'}
          </button>
          {isEditing && (
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Form;