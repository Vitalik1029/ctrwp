import { USERS_ACTIONS } from '../constants/usersTypes';
import UserAPI from '../../api/service';

export const setUsers = (users) => ({
  type: USERS_ACTIONS.SET_USERS,
  payload: users
});

export const setNewUser = (user) => ({
  type: USERS_ACTIONS.SET_NEW_USER,
  payload: user
});

export const setEditingUser = (user) => ({
  type: USERS_ACTIONS.SET_EDITING_USER,
  payload: user
});

export const setIsEditing = (isEditing) => ({
  type: USERS_ACTIONS.SET_IS_EDITING,
  payload: isEditing
});

export const addUser = (user) => ({
  type: USERS_ACTIONS.ADD_USER,
  payload: user
});

export const updateUser = (user) => ({
  type: USERS_ACTIONS.UPDATE_USER,
  payload: user
});

export const deleteUser = (id) => ({
  type: USERS_ACTIONS.DELETE_USER,
  payload: id
});

export const resetForm = () => ({
  type: USERS_ACTIONS.RESET_FORM
});

export const loadUsers = () => (dispatch) => {
  const users = UserAPI.all();
  dispatch(setUsers(users));
};

export const createUser = (userData) => (dispatch) => {
  const newUserWithId = {
    id: Math.max(...UserAPI.all().map(user => user.id)) + 1,
    ...userData
  };
  UserAPI.add(newUserWithId);
  dispatch(addUser(newUserWithId));
};

export const editUser = (userData) => (dispatch) => {
  UserAPI.update(userData);
  dispatch(updateUser(userData));
};

export const removeUser = (id) => (dispatch) => {
  UserAPI.delete(id);
  dispatch(deleteUser(id));
};