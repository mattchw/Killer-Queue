import { combineReducers } from "redux";
import { authentication } from './authentication.reducer';
import { shops } from './shops.reducer';
import { tickets } from './tickets.reducer';
  
export default combineReducers({
  authentication,
  shops,
  tickets,
});