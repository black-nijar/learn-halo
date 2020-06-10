import { USER_PROFILE, USERS, SEARCH_USER } from "./actionType"

export const userProfile = (name, email, photoUrl, id) => {
  return {
    type: USER_PROFILE,
    payload: { name, email, photoUrl, id }
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