import React from 'react';
import { styled } from '@material-ui/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';

export const Filters = styled(({ className, ...props }) => (
  <div className={className}>
      {props.filters && props.filters.map(filter => (
        <FormControlLabel
          key={filter.label}
          control={
            <Checkbox id={filter.label} checked={filter.isChecked} onChange={props.onFilterChange} color="primary" />
          }
          label={filter.label}
        />
      ))}
    </div>
))(() => ({
  margin: '8px 0',
}));

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
  })).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
