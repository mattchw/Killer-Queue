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

import { getDistance } from 'geolib';

export default function Shops(props) {

  const [getShopDist, setGetShopDist] = useState(false);

  useEffect(() => {
    if (props.shops && props.coords) {
      props.shops.map((shop) => {
        shop.distance = getDistance({
          latitude: props.coords.latitude,
          longitude: props.coords.longitude,
        }, {
          latitude: shop.loc.coordinates[1],
          longitude: shop.loc.coordinates[0],
        }, 10)
      })
      setGetShopDist(true);
    }
  }, [props]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Nearest Shops
      </Typography>

      {!getShopDist ? <CircularProgress size={50} style={{ margin: 50 }} /> : <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Distance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.shops && props.shops.map((item) => {
            return <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.distance/1000 + " km"}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>}

    </React.Fragment>
  );
}