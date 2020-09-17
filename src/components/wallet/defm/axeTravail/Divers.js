import React, { Component, useState, useContext, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const DiversTab = ({data,selected,handleClick,isSelected, sourceUser}) => {
    const nbJoursInscript = ["> 12 mois et < 24 mois","> 24 mois et < 36 mois","> 36 mois"];
        const [value, setValue] = useState('female');

    const [modeAccomp, setModeAccomp] = useState([]);
    useEffect(() => {
      axios({
        method:'get',
        url: '/defm/acc?'+sourceUser,
        headers: {
             Authorization: 'Bearer ' + Cookies.get('authToken')
           }
       })
       .then((res) =>  setModeAccomp(res.data))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    // nbJoursInscript.map((key, index)=>console.log())
    return (
      <Grid container direction="row" justify="space-evenly" spacing={2} className='content'>
        <Grid item xs={12}>
          <Grid container justify="center">
            {/* NOMBRE DE JOURS INSCRIPTION */}
                    <Paper className='paper_content'>
          <Table size="small" aria-label="a dense table">
            <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={2}>
                        Axe de travail
                      </TableCell>
                    </TableRow>
                  </TableHead>
              <TableBody>
              {
                data.map((key, index) => {
                  const isItemSelected = isSelected("axe/" + Object.values(key).toString());
                  return(
                  <TableRow
                    hover
                    // role="checkbox"
                    onClick={(event) => handleClick(event, "axe/" + Object.values(key).toString())}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={"axe/" + Object.values(key).toString()} 
                    selected={isItemSelected}
                    >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        // inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">{Object.values(key).toString()}</TableCell>
                  </TableRow>
                )})
              }
            </TableBody>
          </Table>
        </Paper>

            <Paper className='paper_content'>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Ancienneté d'inscription
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>            
                {
                    nbJoursInscript.map((key, index) => {
                      const isItemSelected = isSelected("i/" + index.toString());
                      return(
                      <TableRow
                        hover
                        // role="checkbox"
                        onClick={(event) => handleClick(event, "i/" + index.toString())}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={"i/" + index.toString()} 
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            // inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">{key.toString()}</TableCell>
                      </TableRow>
                    )})
                  }
                </TableBody>
              </Table>
            </Paper>
                        <Paper className='paper_content'>
              {/* <div className='separateTable'></div>*/ }
            {/* MODALITE D'ACCOMPAGNEMENT */}
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Modalité d'accompagnement
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>            
                {
                  modeAccomp.length>1?
                    modeAccomp.map((key, index) => {
                      const isItemSelected = isSelected("acc/" + Object.values(key).toString());
                      return(
                      <TableRow
                        hover
                        // role="checkbox"
                        onClick={(event) => handleClick(event, "acc/" + Object.values(key).toString())}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={"i/" + Object.values(key).toString()} 
                        selected={isItemSelected}
                        >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            // inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">{Object.values(key).toString()}</TableCell>
                      </TableRow>
                    )})
                  :
                    <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox disabled/>
                        </TableCell>
                        <TableCell component="th" scope="row">{(modeAccomp.length == 1 ) && modeAccomp[0].dc_parcours}</TableCell>
                    </TableRow>
                         
                }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Grid> 
    );
  }


export default DiversTab;

