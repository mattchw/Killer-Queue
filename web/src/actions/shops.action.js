import axios from 'axios';
import api from '../constants/api';
import cookie from 'js-cookie';

export const GET_NEAREST_SHOPS = 'GET_NEAREST_SHOPS';
export const GET_ALL_SHOPS = 'GET_ALL_SHOPS';
export const CHANGE_SEARCH_KEYWORD = 'CHANGE_SEARCH_KEYWORD';
export const CHANGE_SEARCH_PAGE = 'CHANGE_SEARCH_PAGE';

export const getNearestShopsReq = (shops) => ({
  type: GET_NEAREST_SHOPS,
  payload: { shops }
});

export const getAllShopsReq = (shops) => ({
  type: GET_ALL_SHOPS,
  payload: { shops }
});

export const changeSearchKeywordReq = (keyword) => ({
  type: CHANGE_SEARCH_KEYWORD,
  payload: { keyword }
});

export const changeSearchPageReq = (page) => ({
  type: CHANGE_SEARCH_PAGE,
  payload: { page }
});

const getNearestShops = (lat, lng) => async (dispatch) => {
  try {

    axios.get(`${api.API_SERVER_URL}/shops/nearest`, {
      params: {
        lat: lat,
        lng: lng,
      }
    }).then(res => {
      dispatch(getNearestShopsReq(res.data.data));
    });

  } catch (error) {
    console.log(error);
  }
};

const getAllShops = (keyword, page = 1) => async (dispatch) => {
  try {
    let filters = {
      page: page
    };
    if(keyword !== ""){
      filters.name = keyword;
    }

    axios.get(`${api.API_SERVER_URL}/shops`, {
      params: filters
    }).then(res => {
      dispatch(getAllShopsReq(res.data.data));
    });

  } catch (error) {
    console.log(error);
  }
};

const changeSearchKeyword = (keyword) => async (dispatch) => {
  dispatch(changeSearchKeywordReq(keyword));
  dispatch(changeSearchPageReq(1));
};

const changeSearchPage = (page) => async (dispatch) => {
  dispatch(changeSearchPageReq(page));
};

const getShopCallingTicket = async (shopId, type) => {
  try {
    const res = await axios.get(`${api.API_SERVER_URL}/tickets/shop/${shopId}/${type}/2`);
    return res.data.data.tickets
  } catch (error) {
    console.log(error);
  }
}

const getShopNextTicketNum = async (shopId, type) => {
  try {
    const res = await axios.get(`${api.API_SERVER_URL}/tickets/ticketNum/shop/${shopId}/${type}`);
    return res.data.data
  } catch (error) {
    console.log(error);
  }
}

const createShopTicket = async (shopId, type, peopleNum) => {
  try {
    if(cookie.get('token')){
      const bearer = 'Bearer ' + cookie.get('token');
      const params = new URLSearchParams();
      params.append('shop', shopId);
      params.append('type', type);
      params.append('peopleNum', peopleNum);
      const res = await axios.post(`${api.API_SERVER_URL}/tickets`, params, {
        headers: {
          'Authorization': bearer
        }
      });
      return res
    } else {
      return null
    }
    
  } catch (error) {
    console.log(error);
  }
}

export const shopsActions = {
  getNearestShops,
  getAllShops,
  changeSearchKeyword,
  changeSearchPage,
  getShopCallingTicket,
  getShopNextTicketNum,
  createShopTicket
};