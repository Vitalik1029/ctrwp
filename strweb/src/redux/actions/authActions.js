import { AUTH_ACTIONS } from '../constants/authTypes';

export const loginSuccess = (username, role) => ({
  type: AUTH_ACTIONS.LOGIN_SUCCESS,
  payload: { username, role }
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT
});

export const registerSuccess = (username, password) => ({
  type: AUTH_ACTIONS.REGISTER_SUCCESS,
  payload: { username, password }
});

export const initializeAuth = () => ({
  type: AUTH_ACTIONS.INITIALIZE_AUTH
});