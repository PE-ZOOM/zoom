import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './jalon.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function JalonTab({dataJalon, color}) {
  const classes = useStyles();
  return (
     <>
    {(dataJalon.length > 0) && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Motif Jalon</TableCell>
            <TableCell style={{backgroundColor:color[0]}} align="right">{Object.keys(dataJalon[0])[1]}</TableCell>
            <TableCell style={{backgroundColor:color[1]}} align="right">{Object.keys(dataJalon[0])[2]}</TableCell>
            <TableCell style={{backgroundColor:color[2]}} align="right">{Object.keys(dataJalon[0])[3]}</TableCell>
            <TableCell style={{backgroundColor:color[3]}} align="right">{Object.keys(dataJalon[0])[4]}</TableCell>
            <TableCell style={{backgroundColor:color[4]}} align="right">{Object.keys(dataJalon[0])[5]}</TableCell>
            <TableCell align="right">{Object.keys(dataJalon[0])[6]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataJalon.map((row) => (
            <TableRow key={row.dc_lblmotifjalonpersonnalise}>
              <TableCell align="left">{row[Object.keys(dataJalon[0])[0]].toLocaleString()}</TableCell> 
              <TableCell align="right">{row[Object.keys(dataJalon[0])[1]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataJalon[0])[2]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataJalon[0])[3]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataJalon[0])[4]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataJalon[0])[5]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataJalon[0])[6]].toLocaleString()}</TableCell>
            </TableRow>
          ))}
            <TableRow>
              <TableCell align="left">Total</TableCell>
              <TableCell align="right">{dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[1]], 0).toLocaleString()}</TableCell>
              <TableCell align="right">{dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[2]], 0).toLocaleString()}</TableCell>
              <TableCell align="right">{dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[3]], 0).toLocaleString()}</TableCell>
              <TableCell align="right">{dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[4]], 0).toLocaleString()}</TableCell>
              <TableCell align="right">{dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[5]], 0).toLocaleString()}</TableCell>
              <TableCell align="right">{dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[6]], 0).toLocaleString()}</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
     )}
     </>
          
  )
}