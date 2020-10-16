import axios from 'axios';
import api from '../constants/api';

export const GET_MY_TICKETS = 'GET_MY_TICKETS';
export const GET_SHOP_TICKETS = 'GET_SHOP_TICKETS';

export const getMyTicketsReq = (tickets) => ({
  type: GET_MY_TICKETS,
  payload: { tickets }
});

export const getShopTicketsReq = (type, tickets) => ({
  type: GET_SHOP_TICKETS,
  payload: { type, tickets }
});

const getMyTickets = (username) => async (dispatch) => {
  try {

    axios.get(`${api.API_SERVER_URL}/tickets/username`, {
      params: {
        username: username
      }
    }).then(res => {
      dispatch(getMyTicketsReq(res.data.data.tickets));
    });

  } catch (error) {
    console.log(error);
  }
};

const getShopTickets = (shop, type) => async (dispatch) => {
  try {

    axios.get(`${api.API_SERVER_URL}/tickets/shop/${shop}/${type}`).then(res => {
      dispatch(getShopTicketsReq(type, res.data.data.tickets));
    });

  } catch (error) {
    console.log(error);
  }
};

export const ticketsActions = {
  getMyTickets,
  getShopTickets
};
