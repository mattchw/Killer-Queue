import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Main from '../components/Main/Main';

// layout
import Layout from '../layouts/Default';

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


export default function Home() {

  useEffect(() => {

  }, []);

  return (
    <React.Fragment>
      <Main/>
    </React.Fragment>
  );
}