import React from 'react';
import './Main.css'

import styles from './Main.style'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import logo from '../../assets/images/killer-queue.png';
import image from '../../assets/images/landing.png';

const useStyles = styles;

function Main(props) {
  const classes = useStyles();

  return (
    <Container maxWidth='xl' className="header">
      <div className={`sticky`}>
        <div
          className={`logo`}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={4}>
              <img src={logo} alt="logo" className={classes.appBarIcon} />
            </Grid>
            <Grid item xs={8}>
              <Typography component="h1" variant="h6" color="inherit" className={classes.title}>
                Killer Queue
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Hidden smDown>
          <div
            className={`btn`}
          >
            <Typography component="h6" variant="h6" color="textPrimary" className={classes.navItem}>
              Getting Started
            </Typography>
          </div>
        </Hidden>
      </div>
      <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.containerItem}>
        <Hidden smUp>
          <Grid item xs={12} sm={6}>
            <img src={image} alt="image" style={{ width: '100%' }} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={6} container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography component="h1" variant="h3" color="textPrimary" gutterBottom className={classes.title}>
              Killer Queue - <br />Queueing System
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
              Virtual queuing for the busiest shops & restaurants with Killer Queue!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" style={{ backgroundColor: 'black' }}>
              Get Started
            </Button>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} sm={6}>
            <img src={image} alt="image" style={{ width: '100%' }} />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}

export default Main;