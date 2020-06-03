import { USER_PROFILE, USERS, SEARCH_USER } from "./actionType"

export const userProfile = (name, email, photoUrl) => {
  return {
    type: USER_PROFILE,
    payload: { name, email, photoUrl }
  }
};

export const usersData = (users) => {
  return {
    type: USERS,
    payload: users
  }
};

export const searchUser = (searchText, users) => {
  return {
    type: SEARCH_USER,
    payload: { searchText, users }
  }
}