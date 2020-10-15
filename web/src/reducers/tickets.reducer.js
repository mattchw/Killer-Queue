import {
  GET_MY_TICKETS,
  GET_SHOP_TICKETS,
} from '../actions/tickets.action';

const initialState = {
  tickets: null,
};

export function tickets(state = initialState, action) {
  switch (action.type) {
    case GET_MY_TICKETS:
      return {
        tickets: action.payload.tickets
      };
    case GET_SHOP_TICKETS:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          [action.payload.type]: action.payload.tickets
        }
      };
    default:
      return state
  }
}
