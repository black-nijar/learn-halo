import { USER_PROFILE, USERS } from "./actionType"

export const userProfile = (name, email, photoUrl) => {
  return {
    type: USER_PROFILE,
    payload: { name, email, photoUrl }
  }
}

export const usersData = (users) => {
  return {
    type: USERS,
    payload: users
  }
} 