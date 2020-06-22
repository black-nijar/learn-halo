import { SEARCH_USER } from '../actions/actionType';

const initState = [];

export const filteredUserReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_USER:
      const { searchText, users } = payload;
      const filteredResult = users.filter(user => {
        const name = user.name.toLowerCase();
        const filter = searchText.toLowerCase();
        return name.includes(filter);
      });
      return filteredResult;
    default:
      return state;
  }
};
