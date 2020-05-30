import { USER_PROFILE } from "../actions/actionType";

const initState = {
  userName: '',
  userImage: '',
  userEmail: '',
  isAuthenticated: false
}

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_PROFILE:
      return {
        ...state,
        userEmail: payload.email,
        userName: payload.name,
        userImage: payload.photoUrl,
        isAuthenticated: true
      }
    default:
      return state; 
    }
}