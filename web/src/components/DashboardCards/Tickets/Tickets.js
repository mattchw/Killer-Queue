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

export default function Tickets(props) {

  const [getMyTickets, setGetMyTickets] = useState(false);

  useEffect(() => {
    if (props.tickets) {
      setGetMyTickets(true);
    }
  }, [props]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        My Tickets
      </Typography>

      {!getMyTickets ? <CircularProgress size={50} style={{ margin: 50 }} /> : <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>TicketNum</TableCell>
            <TableCell>peopleNum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tickets && props.tickets.map((item) => {
            return <TableRow key={item.ticketNum}>
              <TableCell>{item.ticketNum}</TableCell>
              <TableCell>{item.peopleNum}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>}

    </React.Fragment>
  );
}