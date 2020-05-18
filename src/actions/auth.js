import { USER_PROFILE } from "./actionType"

export const userProfile = (id,name,email,photo) => dispatch => {
  dispatch({
    type: USER_PROFILE,
    payload: { id, name, email, photo }
  })
}