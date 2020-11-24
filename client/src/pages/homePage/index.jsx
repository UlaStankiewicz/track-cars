import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography } from '@material-ui/core';
import { PageContainer } from '../PageContainer';
import { Map } from '../../components/map';
import { CarsList } from '../../components/carsList';
import { Filters } from '../../components/filters';

const availableFilters = [
  {
    label: 'Peugeot Boxer',
    value: 'peugeot-boxer',
    isChecked: true,
  },
  {
    label: 'Peugeot Partner',
    value: 'peugeot-partner',
    isChecked: true,
  },
  {
    label: 'Ford Transit',
    value: 'ford-transit',
    isChecked: true,
  },
  {
    label: 'Citroen Jumper',
    value: 'citroen-jumper',
    isChecked: true,
  },
  {
    label: 'Opel Vivaro',
    value: 'opel-vivaro',
    isChecked: true,
  },
  {
    label: 'Renault Master',
    value: 'renault-master',
    isChecked: true,
  }
];

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState(availableFilters);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
    }, 5000);
    async function fetch () {
      const result = await axios(`http://localhost:8080/car`);
      setCars(result.data.data);
    }

    fetch();
    return () => clearInterval(interval);
  }, []);

  const onFilterChange = (event) => {
    const updatedFilters = filters.slice();
    updatedFilters.find(f => f.label === event.target.id).isChecked = event.target.checked;
    setFilters(updatedFilters);
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box p={2}>
            <Typography align="center" variant="h4">
              Track Cars
            </Typography>
            <Filters filters={filters} onFilterChange={onFilterChange} />
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
