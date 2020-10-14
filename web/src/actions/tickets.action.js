import axios from 'axios';

export const GET_MY_TICKETS = 'GET_MY_TICKETS';

export const getMyTicketsReq = (tickets) => ({
  type: GET_MY_TICKETS,
  payload: { tickets }
});

const getMyTickets = (username) => async (dispatch) => {
  try {

    axios.get('/tickets/username', {
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

export const ticketsActions = {
  getMyTickets,
};
