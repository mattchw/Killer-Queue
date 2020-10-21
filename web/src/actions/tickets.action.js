import axios from 'axios';
import cookie from 'js-cookie';
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

const getMyTickets = (username, limit = 5) => async (dispatch) => {
  try {

    axios.get(`${api.API_SERVER_URL}/tickets/username`, {
      params: {
        username,
        limit
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

const callTicket = async (id) => {
  try {
    if(cookie.get('token')){
      const bearer = 'Bearer ' + cookie.get('token');

      const res = await axios.put(`${api.API_SERVER_URL}/tickets/calling/${id}`, {}, {
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
};

export const ticketsActions = {
  getMyTickets,
  getShopTickets,
  callTicket
};
