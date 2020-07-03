import { USER_PROFILE, USERS, SEARCH_USER, USER_MESSAGES } from "./actionType"

export const userProfile = (name, email, photoUrl, id) => {
  return {
    type: USER_PROFILE,
    payload: { name, email, photoUrl, id }
  }
};

export const usersData = (users, authId) => {
  return {
    type: USERS,
    payload: {users, authId}
  }
};

export const searchUser = (searchText, users) => {
  return {
    type: SEARCH_USER,
    payload: { searchText, users }
  }
}

export const userMessaages = data => {
  return {
    type: USER_MESSAGES,
    payload: data
  }
}