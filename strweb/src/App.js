import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import UserAPI from './api/service';
import Table from './components/table';
import Form from './components/form';
import UserDetails from './components/UserDetails';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function HomePage({ users, newUser, onInputChange, onSubmit, isEditing, onCancelEdit, onDelete, onEdit, onViewUser, userRole }) {
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
}

function UsersListPage({ users, onDelete, onEdit, onViewUser, userRole }) {
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
}

function AddUserPage({ newUser, onInputChange, onSubmit, isEditing, onCancelEdit, userRole }) {
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
}

function UserDetailsWrapper({ users, onEdit, onDelete, userRole }) {
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
}

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
  ]);

  useEffect(() => {
    setUsers(UserAPI.all());
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('userRole');
    if (savedUser && savedRole) {
      setCurrentUser(savedUser);
      setUserRole(savedRole);
    }

    const savedRegisteredUsers = localStorage.getItem('registeredUsers');
    if (savedRegisteredUsers) {
      setRegisteredUsers(JSON.parse(savedRegisteredUsers));
    }
  }, []);

  const handleRegister = (username, password) => {
    if (registeredUsers.find(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }

    const newRegisteredUser = {
      username,
      password,
      role: 'user'
    };

    const updatedRegisteredUsers = [...registeredUsers, newRegisteredUser];
    setRegisteredUsers(updatedRegisteredUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedRegisteredUsers));

    return { success: true, message: 'Registration successful' };
  };

  const handleLogin = (username, password) => {
    const user = registeredUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
      setCurrentUser(username);
      setUserRole(user.role);
      localStorage.setItem('currentUser', username);
      localStorage.setItem('userRole', user.role);
      return { success: true };
    }
    
    return { success: false, message: 'Invalid username or password' };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  };

  const handleDelete = (id) => {
    if (userRole !== 'admin') return;
    
    const user = users.find(u => u.id === id);
    if (window.confirm(`Вы уверены, что хотите удалить пользователя? "${user.firstName} ${user.lastName}"?`)) {
      UserAPI.delete(id);
      setUsers([...UserAPI.all()]);
    }
  };

  const handleEdit = (user) => {
    if (userRole !== 'admin') return;
    
    setEditingUser(user);
    setIsEditing(true);
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  };

  const handleCancelEdit = () => {
    if (userRole !== 'admin') return;
    
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
    
    if (userRole !== 'admin') return;
    
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

  const handleViewUser = (user) => {
  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <header className="app-header">
            <h1>User Management System</h1>
            {currentUser ? (
              <div className="user-info">
                <span className="username">Welcome, {currentUser} ({userRole})</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link">Login</Link>
                <Link to="/register" className="auth-link">Register</Link>
              </div>
            )}
          </header>

          <Routes>
            <Route path="/login" element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } />
            <Route path="/register" element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            } />
            <Route path="/" element={
              <ProtectedRoute user={currentUser}>
                <HomePage 
                  users={users}
                  newUser={newUser}
                  onInputChange={handleInputChange}
                  onSubmit={handleAddUser}
                  isEditing={isEditing}
                  onCancelEdit={handleCancelEdit}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onViewUser={handleViewUser}
                  userRole={userRole}
                />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute user={currentUser}>
                <UsersListPage 
                  users={users}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onViewUser={handleViewUser}
                  userRole={userRole}
                />
              </ProtectedRoute>
            } />
            <Route path="/add-user" element={
              <ProtectedRoute user={currentUser}>
                <AddUserPage 
                  newUser={newUser}
                  onInputChange={handleInputChange}
                  onSubmit={handleAddUser}
                  isEditing={isEditing}
                  onCancelEdit={handleCancelEdit}
                  userRole={userRole}
                />
              </ProtectedRoute>
            } />
            <Route path="/user/:id" element={
              <ProtectedRoute user={currentUser}>
                <UserDetailsWrapper 
                  users={users}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  userRole={userRole}
                />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AppContent;