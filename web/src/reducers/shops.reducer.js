import {
  GET_NEAREST_SHOPS,
  GET_ALL_SHOPS,
  CHANGE_SEARCH_KEYWORD,
  CHANGE_SEARCH_PAGE,
} from '../actions/shops.action';

const initialState = {
  nearestShops: null,
  searchShops: null,
  searchKeyword: "",
  searchPage: 1,
};

export function shops(state = initialState, action) {
  switch (action.type) {
    case GET_NEAREST_SHOPS:
      return {
        nearestShops: action.payload.shops
      };
    case GET_ALL_SHOPS:
      return {
        ...state,
        searchShops: action.payload.shops
      };
    case CHANGE_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload.keyword
      };
    case CHANGE_SEARCH_PAGE:
      return {
        ...state,
        searchPage: action.payload.page
      };
    default:
      return state
  }
}
