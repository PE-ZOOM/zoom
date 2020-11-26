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

export default function PrestaTab({dataActi}) {
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
            <TableCell align="right" title="Nombre total de prestations ACTIV'CREA">Activ'Créa</TableCell>
            <TableCell align="right" title="Nombre total de prestations ACTIV'Emploi">Activ'Emploi</TableCell>
            <TableCell align="right" title="Nombre total de prestations AP2">AP2</TableCell>
            <TableCell align="right" title="Nombre total de prestations REGARDS CROISES">Regards croisés</TableCell>
            <TableCell align="right" title="Nombre total de prestations VALORISER SON IMAGE PRO">Valoriser son image pro</TableCell>
            <TableCell align="right" title="Nombre total de prestations MARCHE DU TRAVAIL LOCAL + MARCHE DU TRAVAIL SECTORIEL + PRESENTATION DES ORGANISMES ET DES FORMATIONS">Vers un métier</TableCell>
            <TableCell align="right" title="Nombre total de prestations ACL">ACL</TableCell>
            <TableCell align="right" title="Nombre total de prestations EMD">EMD</TableCell>
            <TableCell align="right" title="Nombre DE avec presta">Nb DE avec presta</TableCell>
            <TableCell align="right" title="Taux DE avec prestation = Nombre DE avec presta/Nb DE affectés">Tx DE avec presta</TableCell>
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
              <TableCell align="right">{row[Object.keys(dataActi[0])[12]]}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     )}
     </>
          
  )
}