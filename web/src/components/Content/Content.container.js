import React from 'react';

import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ContentItem from './Content.component'

import Pagination from '@material-ui/lab/Pagination';


function Content(props) {
  const page = props.page;
  const keyword = props.keyword;
  const filters = props.filters;
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    //dispatch(dataActions.updatePage(value));
    //dispatch(dataActions.getWithOptions(props.category, keyword, filters, value));
  };

  return (
    <React.Fragment>
      {
        props.data && props.data.shops.map((item, index) => {
          return <ContentItem key={index} item={item} coords={props.coords}/>
        })
      }
    </React.Fragment>
  );
}

export default Content;