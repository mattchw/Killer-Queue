import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Shops from '../../DashboardCards/Shops/Shops';
import Tickets from '../../DashboardCards/Tickets/Tickets';
import ShopTickets from '../../DashboardCards/ShopTickets/ShopTickets';

import { ticketsActions } from '../../../actions/tickets.action';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    padding: theme.spacing(2),
    height: 280,
    overflow: 'auto',
  },
}));

export default function ShopOwner(props) {
  const classes = useStyles();
  const tickets = useSelector(store => store.tickets.tickets);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.user) {
      dispatch(ticketsActions.getShopTickets(props.user.shop, 'A'));
      dispatch(ticketsActions.getShopTickets(props.user.shop, 'B'));
      dispatch(ticketsActions.getShopTickets(props.user.shop, 'C'));
      dispatch(ticketsActions.getShopTickets(props.user.shop, 'D'));
    }
  }, [props.user]);

  return (
    <React.Fragment>
      <h2>Hi, {props.user.username}!</h2>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.fixedHeight}>
            <ShopTickets tickets={tickets} title="A"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.fixedHeight}>
            <ShopTickets tickets={tickets} title="B"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.fixedHeight}>
            <ShopTickets tickets={tickets} title="C"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.fixedHeight}>
            <ShopTickets tickets={tickets} title="D"/>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}