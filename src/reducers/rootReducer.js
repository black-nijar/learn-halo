import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { usersReducer } from './usersReducer';
import { filteredUserReducer } from './filteredUserReducer';
import { messagesReducer } from './messagesReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  filteredUser: filteredUserReducer,
  messages: messagesReducer
});
