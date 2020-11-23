import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@material-ui/core';
import { PageContainer } from '../PageContainer';
import { Map } from '../../components/map';

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetch () {
      const result = await axios(`http://localhost:8080/car`);
      setCars(result.data.data);
    }
    fetch();
  }, []);

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box p={2}>
            <Typography align="center" variant="h4">
              Track Cars
            </Typography>
            <p>filters</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Map carsPosition={cars} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HomePage;
