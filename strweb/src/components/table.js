import React from "react";
import { Link } from "react-router-dom";

const Table = ({ users, onDelete, onEdit, onView, showViewButton = false, userRole }) => {
  const handleEditClick = (user) => {
    if (userRole === 'admin') {
      onEdit(user);
    }
  };

  const handleDeleteClick = (id, user) => {
    if (userRole === 'admin') {
      onDelete(id, user);
    }
  };

  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Link to={`/user/${user.id}`} className="user-link">
                  {user.firstName}
                </Link>
              </td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <div className="action-buttons">
                  {userRole === 'admin' && (
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  )}
                  {userRole === 'admin' && (
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(user.id, user)}
                    >
                      Delete
                    </button>
                  )}
                  {showViewButton && (
                    <Link 
                      to={`/user/${user.id}`} 
                      className="view-btn"
                    >
                      View
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;