import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import style from './SearchBar.style'
import { shopsActions } from '../../actions/shops.action';

const useStyles = style;

export default function SearchBar(props) {
  const classes = useStyles();
  const page = props.page;
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const handleChangeKeyword = event => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    dispatch(shopsActions.changeSearchKeyword(keyword));
  };

  useEffect(()=>{
    if(keyword === ""){
      handleSearch();
    }
  }, [keyword]);

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.searchBarContainer}>
      <Grid item xs={10}>
        <Paper className={classes.root}>
            <InputBase
            className={classes.input}
            placeholder={"search..."}
            value={keyword}
            onChange={handleChangeKeyword}
            />
            <Divider orientation="vertical" flexItem />
            <IconButton
              type="submit" 
              className={classes.iconButton} 
              aria-label="search" 
              onClick={handleSearch}
              disabled={(!keyword)}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
      </Grid>

    </Grid>
  );
}