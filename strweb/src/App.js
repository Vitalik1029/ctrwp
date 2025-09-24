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

  useEffect(() => {
    setUsers(UserAPI.all());
  }, []);

  const handleDelete = (id) => {
    UserAPI.delete(id);
    setUsers([...UserAPI.all()]);
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
      alert('Please fill in all fields');
      return;
    }

    const newUserWithId = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      ...newUser
    };

    UserAPI.add(newUserWithId);
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
        />

        <hr className="divider" />

        <section className="users-section">
          <h2>Users</h2>
          <Table users={users} onDelete={handleDelete} />
        </section>
      </div>
    </div>
  );
}

export default App;