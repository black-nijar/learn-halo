import { USER_MESSAGES } from '../actions/actionType';

const initState = {
  messages: [],
  loading: true
};

export const messagesReducer = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case USER_MESSAGES:
      const { data } = payload;
      console.log('DATA :', data);
      const messages = [];
      messages.push({
        // from: data.from,
        // createdAt: data.createdAt,
        // message: data.message
      });
      return {
        ...state,
        messages: payload,
        loading: false
      };
    default:
      return state;
  }
};
