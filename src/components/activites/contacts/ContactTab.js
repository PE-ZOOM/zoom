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

export default function ContactTab({dataActi}) {
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
            <TableCell align="right" title='Nombre total de contacts canal: Accueil physique et nature: Demande de traitement'>GOA</TableCell>
            <TableCell align="right" title='Nombre total de contacts canal: Téléphone Entrant et nature: Demande de traitement'>3949</TableCell>
            <TableCell align="right" title="Nombre total d'entretiens physiques">Nb ent phys</TableCell>
            <TableCell align="right" title="Nombre total d'entretiens téléphoniques">Nb ent tel</TableCell>
            <TableCell align="right" title="Nombre total d'entretiens par mail">Nb ent mail</TableCell>
            <TableCell align="right" title="Nombre total d'entretiens visio (Modalité média contact = WCO)">Nb ent DMC</TableCell>
            <TableCell align="right" title="Nombre total de contacts canal: Mail Entrant et nature: Demande d'information (si le DE ne s'identifie pas, on perd l'information)">Nb mailnet entrant</TableCell>
            <TableCell align="right" title="Nombre total de contacts canal: Mail Sortant et nature: Demande d'information">Nb mailnet sortant</TableCell>
            <TableCell align="right" title="Taux DE avec contact entrant, hors automate à l'initiative du DE">Tx DE avec contact entrant</TableCell>
            <TableCell align="right" title="Taux DE avec contact sortant, hors automate à l'initiative du PE">Tx DE avec contact sortant</TableCell>
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
              <TableCell align="right">{row[Object.keys(dataActi[0])[11]]}</TableCell>
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