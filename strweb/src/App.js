import React, { useState, useEffect } from 'react';
import UserAPI from './api/service';
import Table from './table';
import Form from './form';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUsers(UserAPI.all());
  }, []);

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id);
    if (window.confirm(`Вы уверены, что хотите удалить пользователя? "${user.firstName} ${user.lastName}"?`)) {
      UserAPI.delete(id);
      setUsers([...UserAPI.all()]);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  };

  const handleCancelEdit = () => {
    if (window.confirm('Вы уверены, что хотите отменить редактирование? Все изменения будут потеряны.')) {
      setIsEditing(false);
      setEditingUser(null);
      setNewUser({
        firstName: '',
        lastName: '',
        email: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    
    if (newUser.firstName.trim() === '' || newUser.lastName.trim() === '' || newUser.email.trim() === '') {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    if (isEditing) {
      const updatedUser = {
        ...editingUser,
        ...newUser
      };
      
      const hasChanges = 
        updatedUser.firstName !== editingUser.firstName ||
        updatedUser.lastName !== editingUser.lastName ||
        updatedUser.email !== editingUser.email;
      
      if (!hasChanges) {
        if (window.confirm('Никаких изменений не было. Хотите отменить редактирование?')) {
          handleCancelEdit();
          return;
        }
      }
      
      UserAPI.update(updatedUser);
      setIsEditing(false);
      setEditingUser(null);
    } else {
      const newUserWithId = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        ...newUser
      };
      UserAPI.add(newUserWithId);
    }

    setUsers([...UserAPI.all()]);
    
    setNewUser({
      firstName: '',
      lastName: '',
      email: ''
    });
  };

  return (
    <div className="App">
      <div className="container">
        <Form 
          newUser={newUser} 
          onInputChange={handleInputChange} 
          onSubmit={handleAddUser}
          isEditing={isEditing}
          onCancelEdit={handleCancelEdit}
        />

        <hr className="divider" />

        <section className="users-section">
          <h2>Users</h2>
          <Table 
            users={users} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
          />
        </section>
      </div>
    </div>
  );
}

export default App;