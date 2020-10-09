import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { namefield } from '../../../../../utils/diagNameColonne';
import "../pmp.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tab_chck: {
    '&:hover': {
      cursor: 'pointer',
   },
   chck: {
        color: '#c9794b',
   },
  },
}));

export default function OngletAutres({dataDiagMod,handleChangeMod,dataDiag,selected,handleClick,choice}) {
  const classes = useStyles();


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const test = () => {
  //     console.log(selected)
  // }

  return (
    <>
    {(dataDiag.length > 0) && (
    <div className={classes.root}>
        {/* <button onClick={test}>test</button> */}
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
          
            <TableBody>
              {dataDiag
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.name)}
                        />
                      </TableCell>
                      <TableCell className={classes.tab_chck} component="th" id={labelId} scope="row" onClick={(event) => handleClick(event, row.name)}>
                        {namefield(row.name)}
                      </TableCell >
                      <TableCell>
                        {/* Attention ordre alpha noms variables base */}
                      {(index===1) &&
                      <select required="required"
                        name={row.name}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[row.name]}
                        >
                        {['A APPROFONDIR','ADAPT MARCHE TRAVAIL','ELABORAT. PROJET PRO.','LEVEE FREINS PERIPH.','RETOUR DIRECT EMPLOI','STRATEGIE RECH. EMPL.','TECHNIQ. RECH. EMPL.'].map(option => (
                            <option
                                key={option}
                                >{option}
                            </option>
                            ))}         
                      </select>
                      }
                       {(index===0) &&
                      <select required="required"
                        name={row.name}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[row.name]}
                        >
                        {['O','N'].map(option => (
                            <option
                                key={option}
                                >{option}
                            </option>
                            ))}         
                      </select>
                      }
                      {(index===2) &&
                      <select required="required"
                        name={row.name}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[row.name]}
                        >
                        {['GLO','GUI','REN','SUI'].map(option => (
                            <option
                                key={option}
                                >{option}
                            </option>
                            ))}         
                      </select>
                      }
                       {(index===3) &&
                      <select required="required"
                        name={row.name}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[row.name]}
                        >
                        {['Moins de 26 ans','Entre 26 et 49 ans','50 ans et plus'].map(option => (
                            <option
                                key={option}
                                >{option}
                            </option>
                            ))}         
                      </select>
                      }
                      </TableCell>
                    <TableCell align="right">{row[Object.keys(dataDiag[0])[1]].toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
   
    </div>
    )}
    </>
  );
}
