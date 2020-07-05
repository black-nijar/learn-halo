import { PARTY_USERS } from '../actions/actionType';

const initState = {
  party_users: []
};

export const partyUserReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PARTY_USERS:
     // console.log('PAYLOAD PARTY :', payload);
    //  let party_users = []
    //  party_users.push(payload )
      return { party_users: payload };
    default:
      return state;
  }
};