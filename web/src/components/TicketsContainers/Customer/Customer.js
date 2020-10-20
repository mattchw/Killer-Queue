import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Tickets from '../../DashboardCards/Tickets/Tickets';

import { ticketsActions } from '../../../actions/tickets.action';

export default function Customer(props) {
  const tickets = useSelector(store => store.tickets.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.user) {
      dispatch(ticketsActions.getMyTickets(props.user.username, 20));
    }
  }, [props.user]);

  return (
    <React.Fragment>
      <Tickets tickets={tickets} title={"My Tickets"}/>
    </React.Fragment>
  );
}