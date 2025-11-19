import { USERS_ACTIONS } from '../constants/usersTypes';
import UserAPI from '../../api/service';

const initialState = {
  users: [],
  newUser: {
    firstName: '',
    lastName: '',
    email: ''
  },
  editingUser: null,
  isEditing: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_ACTIONS.SET_USERS:
      return {
        ...state,
        users: action.payload
      };

    case USERS_ACTIONS.SET_NEW_USER:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          ...action.payload
        }
      };

    case USERS_ACTIONS.SET_EDITING_USER:
      return {
        ...state,
        editingUser: action.payload
      };

    case USERS_ACTIONS.SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.payload
      };

    case USERS_ACTIONS.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case USERS_ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        )
      };

    case USERS_ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };

    case USERS_ACTIONS.RESET_FORM:
      return {
        ...state,
        newUser: {
          firstName: '',
          lastName: '',
          email: ''
        },
        editingUser: null,
        isEditing: false
      };

    default:
      return state;
  }
};

export default usersReducer;