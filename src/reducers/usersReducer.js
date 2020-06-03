import { USERS } from "../actions/actionType";

const initState = {
  email: '',
  familyName: '',
  givenName: '',
  id: '',
  name: '',
  photoUrl: ''
}

export const usersReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USERS:
      //console.log('USERS ;',payload);
      const { users } = payload;
      const usersDetail = [];
      for(let key in users) {
        const email = users[key].email;
        const familyName = users[key].familyName;
        const givenName = users[key].givenName;
        const id = users[key].id;
        const name = users[key].name;
        const photoUrl = users[key].photoUrl;
        usersDetail.push({ email, familyName, givenName, id, name, photoUrl });
      }
      return usersDetail
    default:
      return state; 
    }
}