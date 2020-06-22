import { USER_PROFILE } from '../actions/actionType';

const initState = {
  userName: '',
  userImage: '',
  userEmail: '',
  isAuthenticated: false,
  loading: true
};
export const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_PROFILE:
      return {
        ...state,
        userEmail: payload.email,
        userName: payload.name,
        userImage: payload.photoUrl,
        userId: payload.id,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
};
