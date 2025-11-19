import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../table';

const UsersListPage = ({ users, onDelete, onEdit, onViewUser, userRole }) => {
  return (
    <div>
      <div className="page-header">
        <h1>All Users</h1>
        <Link to="/" className="back-btn">← Back to Home</Link>
      </div>
      <Table 
        users={users} 
        onDelete={onDelete} 
        onEdit={onEdit}
        onView={onViewUser}
        showViewButton={true}
        userRole={userRole}
      />
    </div>
  );
};

export default UsersListPage;