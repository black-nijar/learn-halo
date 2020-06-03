import { combineReducers } from "redux";
import { authReducer } from './authReducer'
import { usersReducer } from './usersReducer'
import { filteredUserReducer } from "./filteredUserReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  filteredUser: filteredUserReducer
});