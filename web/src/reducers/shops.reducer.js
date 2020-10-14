import {
  GET_NEAREST_SHOPS
} from '../actions/shops.action';

const initialState = { 
  shops: null, 
};

export function shops(state = initialState, action) {
  switch (action.type) {
    case GET_NEAREST_SHOPS:
      return {
        shops: action.payload.shops
      };
    default:
      return state
  }
}
