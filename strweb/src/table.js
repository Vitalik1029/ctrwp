import React from "react";

const Table = ({ users, onDelete, onEdit }) => {
  const handleEditClick = (user) => {
    onEdit(user);
  };

  const handleDeleteClick = (id, user) => {
    onDelete(id, user);
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
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteClick(user.id, user)}
                  >
                    Delete
                  </button>
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