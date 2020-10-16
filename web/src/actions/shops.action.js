import axios from 'axios';
import api from '../constants/api';

export const GET_NEAREST_SHOPS = 'GET_NEAREST_SHOPS';

export const getNearestShopsReq = (shops) => ({
  type: GET_NEAREST_SHOPS,
  payload: { shops }
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

export const shopsActions = {
  getNearestShops,
};