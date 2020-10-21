import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ticketsActions } from '../../../actions/tickets.action';

export default function ShopTickets(props) {

  const [getMyTickets, setGetMyTickets] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    switch (props.title) {
      case 'A':
        if (props.tickets && props.tickets.A) {
          setTickets(props.tickets.A);
          setGetMyTickets(true);
        }
        break;
      case 'B':
        if (props.tickets && props.tickets.B) {
          setTickets(props.tickets.B);
          setGetMyTickets(true);
        }
        break;
      case 'C':
        if (props.tickets && props.tickets.C) {
          setTickets(props.tickets.C);
          setGetMyTickets(true);
        }
        break;
      case 'D':
        if (props.tickets && props.tickets.D) {
          setTickets(props.tickets.D);
          setGetMyTickets(true);
        }
        break;
    }
  }, [props]);

  const callTicket = async (item) => {
    //const item = e.getAttribute('data-item');
    if (item.status == "Queueing"){
      const res = await ticketsActions.callTicket(item._id);
      if (res){
        window.location.reload(false);
      }
    }
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Overview - Type {props.title}
      </Typography>

      {!getMyTickets ? <CircularProgress size={50} style={{ margin: 50 }} /> : <Table size="small" style={{ userSelect: 'none' }}>
        <TableHead>
          <TableRow>
            <TableCell>Ticket No.</TableCell>
            <TableCell>People No.</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.length !== 0 && tickets.map((item) => {
            return <TableRow key={item._id} data-item={item} onClick={() => callTicket(item)}>
              <TableCell>{item.ticketNum}</TableCell>
              <TableCell>{item.peopleNum}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{new Date(item.lastUpdate).toLocaleString()}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>}

    </React.Fragment>
  );
}