import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './redux/store';
import { useAuth } from './hooks/useAuth';
import { useUsers } from './hooks/useUsers';
import { setTheme } from './redux/actions/themeActions';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/pages/HomePage';
import UsersListPage from './components/pages/UsersListPage';
import AddUserPage from './components/pages/AddUserPage';
import UserDetailsPage from './components/pages/UserDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import './App.css';

function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme));
  }, [dispatch]);

  return null;
}

function AppContent() {
  const { currentUser, userRole, handleRegister, handleLogin, handleLogout } = useAuth();
  const { users, newUser, isEditing, handleDelete, handleEdit, handleCancelEdit, handleInputChange, handleAddUser } = useUsers();

  return (
    <>
      <ThemeInitializer />
      <Router>
        <div className="App">
          <div className="container">
            <Header 
              currentUser={currentUser} 
              userRole={userRole} 
              onLogout={handleLogout} 
            />

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
                    onSubmit={(e) => handleAddUser(e, userRole)}
                    isEditing={isEditing}
                    onCancelEdit={() => handleCancelEdit(userRole)}
                    onDelete={(id) => handleDelete(id, userRole)}
                    onEdit={(user) => handleEdit(user, userRole)}
                    userRole={userRole}
                  />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute user={currentUser}>
                  <UsersListPage 
                    users={users}
                    onDelete={(id) => handleDelete(id, userRole)}
                    onEdit={(user) => handleEdit(user, userRole)}
                    userRole={userRole}
                  />
                </ProtectedRoute>
              } />
              <Route path="/add-user" element={
                <ProtectedRoute user={currentUser}>
                  <AddUserPage 
                    newUser={newUser}
                    onInputChange={handleInputChange}
                    onSubmit={(e) => handleAddUser(e, userRole)}
                    isEditing={isEditing}
                    onCancelEdit={() => handleCancelEdit(userRole)}
                    userRole={userRole}
                  />
                </ProtectedRoute>
              } />
              <Route path="/user/:id" element={
                <ProtectedRoute user={currentUser}>
                  <UserDetailsPage 
                    users={users}
                    onEdit={(user) => handleEdit(user, userRole)}
                    onDelete={(id) => handleDelete(id, userRole)}
                    userRole={userRole}
                  />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;