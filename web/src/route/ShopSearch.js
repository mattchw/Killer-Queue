import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import Pagination from '@material-ui/lab/Pagination';

import SearchBar from '../components/SearchBar/SearchBar';
import Content from '../components/Content/Content.container'

// layout
import Layout from '../layouts/Default';

// actions
import { shopsActions } from '../actions/shops.action';

export default function ShopSearch() {
  const history = useHistory();
  const shops = useSelector(state => state.shops.searchShops);
  const searchKeyword = useSelector(state => state.shops.searchKeyword);
  const searchPage = useSelector(state => state.shops.searchPage);

  const user = JSON.parse(localStorage.getItem('user'));
  const [userType, setUserType] = useState('');
  const [coords, setCoords] = useState(null);
  const dispatch = useDispatch();

  const getShops = () => {
    dispatch(shopsActions.getAllShops(searchKeyword, searchPage));
  };

  const handleChange = (event, value) => {
    dispatch(shopsActions.changeSearchPage(value));
  };

  async function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoords(position.coords)
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
    if (user) {
      setUserType(user.type);
      getLocation();
      getShops();
    } else {
      history.push('/login');
    }
  }, [searchKeyword, searchPage]);

  return (
    <Layout userType={userType}>
      <SearchBar />

      {shops && (<Grid container direction="row" justify="center" alignItems="center">
        <Grid item container direction="row" xs={12}>
          <Typography variant="overline">
            Total： {shops.count} ({shops.totalPages} {shops.totalPages > 1 ? "pages" : "page"})
      </Typography>
        </Grid>
        <Content data={shops} coords={coords}/>
        <Grid container direction="row" justify="center" alignItems="center" style={{ padding: '30px 0' }}>
          <Pagination
            size="small"
            shape="rounded"
            page={shops.currentPage}
            onChange={handleChange}
            count={shops.totalPages}
          />
        </Grid>
      </Grid>
      )}
    </Layout>
  );
}