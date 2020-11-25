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

export default function DpaeTab({dataActi}) {
  const classes = useStyles();

  return (
     <>
    {(dataActi.length > 0) && (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Année</TableCell>
            <TableCell align="right">Mois</TableCell>
            <TableCell align="right" title="Nombre de DE inscrits au moins un jour dans le mois chargé, toutes cat (si le DE a plusieurs ref au cours du mois,l'activité est comptée sur le dernier ref)">Nb DE affectés</TableCell>
            <TableCell align="right" title="Nombre DE avec DPAE">Nb DE avec DPAE</TableCell>
            <TableCell align="right" title="Taux DE avec DPAE = Nombre DE avec DPAE/Nb DE affectés">Tx DE avec DPAE</TableCell>
            <TableCell align="right" title="Nombre total de MEC">MEC</TableCell>
            <TableCell align="right" title="Nombre DE avec MEC">Nb DE avec MEC</TableCell>
            <TableCell align="right" title="Taux DE avec MEC = Nombre DE avec MEC/Nb DE affectés">Tx DE avec MEC</TableCell>
            <TableCell align="right" title="Nombre total de MER">MER</TableCell>
            <TableCell align="right" title="Nombre DE avec MER">Nb DE avec MER</TableCell>
            <TableCell align="right" title="Taux DE avec MER = Nombre DE avec MER/Nb DE affectés">Tx DE avec MER</TableCell>
            <TableCell align="right" title="Nombre total de MER+">MER+</TableCell>
            <TableCell align="right" title="Nombre DE avec MER+">Nb DE avec MER+</TableCell>
            <TableCell align="right" title="Taux DE avec MER+ = Nombre DE avec MER+/Nb DE affectés">Tx DE avec MER+</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataActi.map((row) => (
            <TableRow key={row.annee+''+row.mois}>
              <TableCell align="right">{row[Object.keys(dataActi[0])[0]].toLocaleString()}</TableCell> 
              <TableCell align="right">{row[Object.keys(dataActi[0])[1]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[2]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[3]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[4]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[5]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[6]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[7]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[8]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[9]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[10]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[11]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[12]].toLocaleString()}</TableCell>
              <TableCell align="right">{row[Object.keys(dataActi[0])[13]].toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     )}
     </>
          
  )
}