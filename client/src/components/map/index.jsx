import React from 'react';
import { styled } from '@material-ui/styles';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Marker } from '../marker';

const MapContainer = styled('div')(() => ({
  height: '100vh',
}));

export const Map = props => {
  const defaulCenter = {
    lat: 54.44,
    lng: 18.52,
  };
  const defaultZoom = 11;

  return (
    <MapContainer>
      <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY || '' }}
          defaultCenter={defaulCenter}
          defaultZoom={defaultZoom}
        >
          {props.carsPositions && props.carsPositions.map((p, id) =>
            <Marker
              key={id}
              lat={p.coordinates.latitude}
              lng={p.coordinates.longitude}
            />
          )}
        </GoogleMapReact>
    </MapContainer>
  );
};

Map.propTypes = {
  carsPositions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    car: PropTypes.shape({
      id: PropTypes.number.isRequired,
      registrationNumber: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
    }).isRequired,
    timestamp: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};
