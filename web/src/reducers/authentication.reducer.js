import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/authentication.action';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: null };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload.user
      };
    case LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.payload.error,
      };
    case LOGOUT:
      return {
        loggedIn: false,
        user: null
      };
    default:
      return state
  }
}

export const getLoggedIn = state => state.authentication.loggedIn;