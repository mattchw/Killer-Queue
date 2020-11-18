import React from 'react';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import NavBar from '../components/NavBar/NavBar';

function Copyright() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mattwong.info/">
        Matthew Wong
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Default(props) {
  return (
    <NavBar userType={props.userType}>
      <Container maxWidth="lg" style={{padding: 0}}>
        {props.children}
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </NavBar>
  );
}