import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@material-ui/core';
import { PageContainer } from '../PageContainer';
import { Map } from '../../components/map';
import { CarsList } from '../../components/carsList';

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!');
      fetch();
    }, 5000);
    async function fetch () {
      const result = await axios(`http://localhost:8080/car`);
      setCars(result.data.data);
    }

    fetch();
    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box p={2}>
            <Typography align="center" variant="h4">
              Track Cars
            </Typography>
            <p>filters</p>
            <CarsList carsPositions={cars} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map carsPositions={cars} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default HomePage;
