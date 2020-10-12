import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import NavBar from '../components/NavBar/NavBar';

import { authActions } from '../actions/authentication.action';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Your Website
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 200;

export default function Home() {
  const history = useHistory();

  const [userType, setUserType] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // validate token
    const token = JSON.parse(localStorage.getItem('token'));
    if (token != null) {
      dispatch(authActions.validateToken(token.accessToken), (result) => {
        console.log(result)
      });
      // check user type
      setUserType(token.user.type);
    } else {
      history.push('/login');
    }
  }, []);

  return (
    <NavBar>
      <Container maxWidth="lg">
        {userType === "Admin" && <div>
          <h2>I am Admin!</h2>
        </div>}
        {userType === "ShopOwner" && <div>
          <h2>I am ShopOwner!</h2>
        </div>}
        {userType === "Customer" && <div>
          <h2>I am Customer!</h2>
        </div>}
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </NavBar>
  );
}