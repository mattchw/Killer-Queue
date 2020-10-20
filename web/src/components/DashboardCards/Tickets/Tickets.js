import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import QRCode from "react-qr-code";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    width: 400,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonWrapper: {
    padding: 5,
    border: "solid 1px"
  },
}));

export default function Tickets(props) {
  const classes = useStyles();
  const [getMyTickets, setGetMyTickets] = useState(false);
  const [open, setOpen] = useState(false);
  const [ticketDetail, setTicketDetail] = useState({
    _id: "",
    name: "",
    ticketNum: "",
    peopleNum: ""
  })

  const handleOpen = (item) => {
    //const item = e.getAttribute('data-item');
    setOpen(true);
    setTicketDetail({
      _id: item._id,
      name: item.shop.name,
      ticketNum: item.ticketNum,
      peopleNum: item.peopleNum
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.tickets) {
      setGetMyTickets(true);
    }
  }, [props]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.title ? props.title : "My Recent 5 Tickets"}
      </Typography>

      {!getMyTickets ? <CircularProgress size={50} style={{ margin: 50 }} /> : <Table size="small" style={{ userSelect: 'none' }}>
        <TableHead>
          <TableRow>
            <TableCell>Shop</TableCell>
            <TableCell>TicketNum</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tickets.length != 0 && props.tickets.map((item) => {
            return <TableRow key={item._id} data-item={item} onClick={() => handleOpen(item)}>
              <TableCell>{item.shop.name}</TableCell>
              <TableCell>{item.ticketNum}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid container direction="column" justify="center" alignContent="center" className={classes.paper}>
            <Grid item>
              <Typography variant="h5">
                {ticketDetail.name}
              </Typography>
            </Grid>
            <Grid item>
            <QRCode value={ticketDetail._id} />
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {ticketDetail.ticketNum}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {ticketDetail.peopleNum}
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" variant="contained" onClick={handleClose}>
                Close
                </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>

    </React.Fragment>
  );
}