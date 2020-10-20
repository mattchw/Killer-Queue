import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { getDistance } from 'geolib';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import RoomIcon from '@material-ui/icons/Room';
import DirectionsIcon from '@material-ui/icons/Directions';

import styles from './Content.component.style'
import { shopsActions } from '../../actions/shops.action';

const useStyles = styles;

function ContentItem(props) {
  const classes = useStyles();
  const [ticketsinfo, setTicketsInfo] = useState({
    A: [null, null],
    B: [null, null],
    C: [null, null],
    D: [null, null],
  })
  const [img, setImg] = useState('https://homepages.cae.wisc.edu/~ece533/images/arctichare.png');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQueue = async e => {
    console.log(e.currentTarget.value)
    let type = "A";

    switch (parseInt(e.currentTarget.value,10)) {
      case 1:
      case 2:
        type = "A"
        break;
      case 3:
      case 4:
        type = "B"
        break;
      case 5:
      case 6:
        type = "C"
        break;
      case 7:
      case 8:
        type = "D"
        break;
    }
    // send request
    const res = await shopsActions.createShopTicket(props.item._id, type, e.currentTarget.value);
    if (res!=null)
      console.log(res.data)

    setOpen(false);
  };

  const getTicketsInfo = async () => {
    const [A1, B1, C1, D1, A2, B2, C2, D2] = await Promise.all([
      shopsActions.getShopCallingTicket(props.item._id, "A"),
      shopsActions.getShopCallingTicket(props.item._id, "B"),
      shopsActions.getShopCallingTicket(props.item._id, "C"),
      shopsActions.getShopCallingTicket(props.item._id, "D"),
      shopsActions.getShopNextTicketNum(props.item._id, "A"),
      shopsActions.getShopNextTicketNum(props.item._id, "B"),
      shopsActions.getShopNextTicketNum(props.item._id, "C"),
      shopsActions.getShopNextTicketNum(props.item._id, "D"),
    ]);
    setTicketsInfo({
      A: [A1[0], A2],
      B: [B1[0], B2],
      C: [C1[0], C2],
      D: [D1[0], D2],
    })
  }

  useEffect(() => {
    if (props.item) {
      getTicketsInfo();
      if (props.item.thumbnail) {
        setImg(props.item.thumbnail);
      }
    }
  }, [props]);

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.card}>
      <Hidden only='xs'>
        <Grid item sm={3}>
          <img alt={props.item.name} src={img} className={classes.image} />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={9} container direction="column" className={classes.content}>
        <Grid item container direction="row" alignItems="center">
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <Grid item xs={3} className={classes.name}>
              <Avatar alt={props.item.name} src={img} className={classes.avatarSizeLarge} />
            </Grid>
          </Hidden>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h6" component="h2">
              {props.item.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" component="p">
            <RestaurantIcon style={{ fontSize: 15 }} /> {props.item.type}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" component="p">
            <RoomIcon style={{ fontSize: 15 }} /> {props.item.address}
          </Typography>
        </Grid>
        {
          props.coords && <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              <DirectionsIcon style={{ fontSize: 15 }} /> {(getDistance({
                latitude: props.coords.latitude,
                longitude: props.coords.longitude,
              }, {
                latitude: props.item.loc.coordinates[1],
                longitude: props.item.loc.coordinates[0],
              }, 10) / 1000 + " km")}
            </Typography>
          </Grid>
        }

        {
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              A: {ticketsinfo.A[0] ? ticketsinfo.A[0].ticketNum : "----"} > {ticketsinfo.A[1]}
            </Typography>
          </Grid>
        }
        {
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              B: {ticketsinfo.B[0] ? ticketsinfo.B[0].ticketNum : "----"} > {ticketsinfo.B[1]}
            </Typography>
          </Grid>
        }
        {
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              C: {ticketsinfo.C[0] ? ticketsinfo.C[0].ticketNum : "----"} > {ticketsinfo.C[1]}
            </Typography>
          </Grid>
        }
        {
          <Grid item>
            <Typography variant="body2" color="textSecondary" component="p">
              D: {ticketsinfo.D[0] ? ticketsinfo.D[0].ticketNum : "----"} > {ticketsinfo.D[1]}
            </Typography>
          </Grid>
        }
        <Grid container item direction="row" justify="center" alignContent="center">
          <Button variant="outlined" color="secondary" onClick={handleOpen}>
            Queue
          </Button>
        </Grid>
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
            <Grid container className={classes.paper}>
              <Grid container direction="row" justify="center" alignContent="center" item style={{ padding: 5 }}>
                <Typography variant="h5">
                  Party Size
                </Typography>
              </Grid>
              <Grid container direction="row" justify="center" alignContent="center" item xs={6} className={classes.modalButtonWrapper}>
                <Grid container direction="row" justify="center" alignContent="center" item xs={12} >
                  <Typography variant="h6">
                    A
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button value={1} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    1
                </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button value={2} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    2
                </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" alignContent="center" item xs={6} className={classes.modalButtonWrapper}>
                <Grid container direction="row" justify="center" alignContent="center" item xs={12}>
                <Typography variant="h6">
                    B
            </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button value={3} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    3
                </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button value={4} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    4
                </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" alignContent="center" item xs={6} className={classes.modalButtonWrapper}>
                <Grid container direction="row" justify="center" alignContent="center" item xs={12}>
                <Typography variant="h6">
                    C
            </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button value={5} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    5
                </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button value={6} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    6
                </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" alignContent="center" item xs={6} className={classes.modalButtonWrapper}>
                <Grid container direction="row" justify="center" alignContent="center" item xs={12}>
                <Typography variant="h6">
                    D
            </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button value={7} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    7
                </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button value={8} size="small" variant="contained" color="primary" onClick={handleQueue}>
                    8
                </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" alignContent="center" item xs={12} style={{ padding: 5 }}>
                <Button value={8} size="small" variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );
}

export default ContentItem;