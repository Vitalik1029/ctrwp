import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user', password: 'user', role: 'user' }
  ]);

  useEffect(() => {
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

  return {
    currentUser,
    userRole,
    handleRegister,
    handleLogin,
    handleLogout
  };
};