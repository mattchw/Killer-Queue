import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions/authentication.action';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user: null };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.payload.token
      };
    case LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.payload.error,
      };
    case LOGOUT:
      return {
        loggedIn: false,
        token: null
      };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case VALIDATE_TOKEN_FAILURE:
      return {
        loggedIn: false,
        user: null,
        error: action.payload.error,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: "Success",
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        register: action.payload.error,
      };
    default:
      return state
  }
}

export const getLoggedIn = state => state.authentication.loggedIn;
export const getError = state => state.authentication.error;