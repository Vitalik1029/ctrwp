import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserDetails from '../UserDetails';

const UserDetailsPage = ({ users, onEdit, onDelete, userRole }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.id === parseInt(id));

  const handleEdit = (user) => {
    onEdit(user);
    navigate('/');
  };

  const handleDelete = (id) => {
    onDelete(id);
    navigate('/');
  };

  return <UserDetails user={user} onEdit={handleEdit} onDelete={handleDelete} userRole={userRole} />;
};

export default UserDetailsPage;