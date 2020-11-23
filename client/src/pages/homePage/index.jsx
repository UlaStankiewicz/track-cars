import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { styled } from '@material-ui/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { PageContainer } from '../PageContainer';
import { Map } from '../../components/map';

// const HomeContainer = styled('div')(() => ({
//   padding: '32px',
//   width: '100%',
//   textAlign: 'center',
// }));

const MOCK = {
  data: [
    {
      id: 0,
      car: {
        id: 0,
        registrationNumber: "GD 0",
        brand: "Peugeot",
        model: "Boxer"
      },
      timestamp: "2020-11-23T18:16:37.069Z",
      coordinates: {
        longitude: 18.47728063386761,
        latitude: 54.40359304147689
      }
    },
    {
      id: 1,
      car: {
        id: 1,
        registrationNumber: "GD 1",
        brand: "Renault",
        model: "Master"
      },
      timestamp: "2020-11-23T18:16:37.069Z",
      coordinates: {
        longitude: 18.524270735401167,
        latitude: 54.44801831592588
      }
    }
  ]
}

const HomePage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(MOCK.data)
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
