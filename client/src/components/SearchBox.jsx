import React, { useState } from 'react';
import { styled } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@material-ui/core';

export const SearchBox = styled(({ className, ...props }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className={className}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={9}>
          <TextField
            id="search-box"
            label="Search registration number"
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.searchOnClick(searchText)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  )
})(() => ({
  margin: '16px 0 8px',
  textAlign: 'center',
  '& button': {
    width: '90%',
    margin: '10px',
  },
}));

Map.propTypes = {
  searchOnClick: PropTypes.func.isRequired,
};
