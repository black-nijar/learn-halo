import {
  USER_PROFILE,
  USERS,
  SEARCH_USER,
  USER_MESSAGES,
  PARTY_USERS
} from './actionType';

// CURRENT USER PROFILE
export const userProfile = (name, email, photoUrl, id) => {
  return {
    type: USER_PROFILE,
    payload: { name, email, photoUrl, id }
  };
};

// USERS DATA
export const usersData = (users, authId) => {
  return {
    type: USERS,
    payload: { users, authId }
  };
};

// SEARCH USER
export const searchUser = (searchText, users) => {
  return {
    type: SEARCH_USER,
    payload: { searchText, users }
  };
};

// USER MESSAGES
export const userMessaages = data => {
  return {
    type: USER_MESSAGES,
    payload: data
  };
};

// PARTY USERS
export const partyUsers = users => {
  //console.log('users', users)
  return {
    type: PARTY_USERS,
    payload: users
  };
};
