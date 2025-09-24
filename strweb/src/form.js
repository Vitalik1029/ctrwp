import React from "react";

const Form = ({ newUser, onInputChange, onSubmit }) => {
  return (
    <section className="add-user-section">
      <h2>Add New User</h2>
      <form onSubmit={onSubmit} className="user-form">
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
        
        <button type="submit" className="add-btn">Add User</button>
      </form>
    </section>
  );
};

export default Form;