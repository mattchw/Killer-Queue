import {
  GET_MY_TICKETS
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
    default:
      return state
  }
}
