import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export const CarsList = props => {
  return (
    <>
      {props.carsPositions && (
        <TableContainer component={Paper}>
          <Table aria-label="cars info table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Registration number</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Model</TableCell>
                <TableCell align="center">Current position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.carsPositions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.car.registrationNumber}</TableCell>
                  <TableCell align="center">{row.car.brand}</TableCell>
                  <TableCell align="center">{row.car.model}</TableCell>
                  <TableCell align="center">lng:{row.coordinates.longitude} lat:{row.coordinates.latitude}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
