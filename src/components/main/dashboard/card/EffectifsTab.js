import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EffectifsTab({dataEff}) {
  const classes = useStyles();
  return (
     <>
    {(dataEff.length > 0) && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size='small'>
        <TableHead>
          <TableRow>
            <TableCell>APE</TableCell>
            <TableCell align="right">{Object.keys(dataEff[0])[2]}</TableCell>
            <TableCell align="right">{Object.keys(dataEff[0])[3]}</TableCell>
            <TableCell align="right">{Object.keys(dataEff[0])[4]}</TableCell>
            <TableCell align="right">{Object.keys(dataEff[0])[5]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataEff.map((row) => (
            <TableRow key={row.dc_structureprincipalede}>
              <TableCell align="left">{row[Object.keys(dataEff[0])[1]].toLocaleString()}</TableCell> 
              <TableCell align="right">{row[Object.keys(dataEff[0])[2]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataEff[0])[3]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataEff[0])[4]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataEff[0])[5]].toLocaleString()}</TableCell>
            </TableRow>
          ))}     
        </TableBody>
      </Table>
    </TableContainer>
     )}
     </>
          
  )
}