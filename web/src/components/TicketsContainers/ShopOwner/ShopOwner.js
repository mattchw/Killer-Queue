import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import ShopTickets from '../../DashboardCards/ShopTickets/ShopTickets';

import { ticketsActions } from '../../../actions/tickets.action';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function Customer(props) {
  const tickets = useSelector(store => store.tickets.tickets);
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          textColor="primary"
          centered
        >
          <Tab label="A"/>
          <Tab label="B" />
          <Tab label="C" />
          <Tab label="D" />
        </Tabs>
      </Paper>
        <TabPanel value={value} index={0} >
          <ShopTickets tickets={tickets} title={"A"}/>
        </TabPanel>
        <TabPanel value={value} index={1} >
          <ShopTickets tickets={tickets} title={"B"}/>
        </TabPanel>
        <TabPanel value={value} index={2} >
          <ShopTickets tickets={tickets} title={"C"}/>
        </TabPanel>
        <TabPanel value={value} index={3} >
          <ShopTickets tickets={tickets} title={"D"}/>
        </TabPanel>
      
    </React.Fragment>
  );
}