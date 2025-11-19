import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  theme: themeReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;