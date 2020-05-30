import { USER_PROFILE } from "./actionType"

export const userProfile = (name, email, photoUrl) => {
  return {
    type: USER_PROFILE,
    payload: { name, email, photoUrl }
  }
}