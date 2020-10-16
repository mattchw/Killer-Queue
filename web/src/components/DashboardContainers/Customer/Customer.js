import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Shops from '../../DashboardCards/Shops/Shops';
import Tickets from '../../DashboardCards/Tickets/Tickets';

import { shopsActions } from '../../../actions/shops.action';
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

export default function Customer(props) {
  const classes = useStyles();
  const shops = useSelector(store => store.shops.shops);
  const tickets = useSelector(store => store.tickets.tickets);

  const [coords, setCoords] = useState(null);

  const dispatch = useDispatch();

  async function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords(position.coords)
        dispatch(shopsActions.getNearestShops(position.coords.latitude, position.coords.longitude));
      }, error => {
        console.error(error)
      }, {
        timeout: 30000,
        maximumAge: 100000,
        enableHighAccuracy: true
      })
    } else {
      console.log("Geolocation Not Available");
    }
  }

  useEffect(() => {
    if (props.user) {
      getLocation();
      console.log(props.user.username);
      dispatch(ticketsActions.getMyTickets(props.user.username));
    }
  }, [props.user]);

  return (
    <div>
      <h2>Hi, {props.user && props.user.username}!</h2>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={7} lg={8}>
          <Paper className={classes.fixedHeight}>
            <Tickets tickets={tickets} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.fixedHeight}>
            <Shops shops={shops} coords={coords} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}