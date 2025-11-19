import { AUTH_ACTIONS } from '../constants/authTypes';

const initialState = {
  currentUser: null,
  userRole: null,
  registeredUsers: [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user', password: 'user', role: 'user' }
  ],
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      const { username, role } = action.payload;
      return {
        ...state,
        currentUser: username,
        userRole: role,
        isAuthenticated: true
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        currentUser: null,
        userRole: null,
        isAuthenticated: false
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      const { username: newUsername, password } = action.payload;
      const newRegisteredUser = {
        username: newUsername,
        password,
        role: 'user'
      };
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, newRegisteredUser]
      };

    case AUTH_ACTIONS.INITIALIZE_AUTH:
      const savedUser = localStorage.getItem('currentUser');
      const savedRole = localStorage.getItem('userRole');
      const savedRegisteredUsers = localStorage.getItem('registeredUsers');
      
      return {
        ...state,
        currentUser: savedUser || null,
        userRole: savedRole || null,
        isAuthenticated: !!(savedUser && savedRole),
        registeredUsers: savedRegisteredUsers ? JSON.parse(savedRegisteredUsers) : state.registeredUsers
      };

    default:
      return state;
  }
};

export default authReducer;