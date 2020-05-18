import { USER_PROFILE } from "../actions/actionType";

const initState = {
  userId: '',
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
        userId: payload.id,
        userEmail: payload.email,
        userName: payload.name,
        userImage: payload.photo
      }
    default:
      return state; 
    }
}