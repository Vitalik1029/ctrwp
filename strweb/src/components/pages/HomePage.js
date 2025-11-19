import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../table';
import Form from '../form';

const HomePage = ({ users, newUser, onInputChange, onSubmit, isEditing, onCancelEdit, onDelete, onEdit, onViewUser, userRole }) => {
  return (
    <div>
      {userRole === 'admin' && (
        <>
          <Form 
            newUser={newUser} 
            onInputChange={onInputChange} 
            onSubmit={onSubmit}
            isEditing={isEditing}
            onCancelEdit={onCancelEdit}
            userRole={userRole}
          />
          <hr className="divider" />
        </>
      )}

      <section className="users-section">
        <h2>Users</h2>
        <Table 
          users={users.slice(0, 5)} 
          onDelete={onDelete} 
          onEdit={onEdit}
          onView={onViewUser}
          showViewButton={true}
          userRole={userRole}
        />
        {users.length > 5 && (
          <div className="view-more">
            <p>... and {users.length - 5} more users</p>
            <Link to="/users" className="view-all-btn">
              View All Users
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;