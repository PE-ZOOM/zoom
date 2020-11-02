import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
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
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
}));

export default function OngletAide({dataDiagMod,handleChangeMod,dataDiag,selected,handleClick}) {
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

                        {(index===0 || index===1 || index===2) &&
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


                        {(index===3) &&
                      <select required="required"
                        name={row.name}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[row.name]}
                        >
                        {['Moins de 12 mois','12 mois et plus'].map(option => (
                            <option
                                key={option}
                                >{option}
                            </option>
                            ))}         
                      </select>
                      }      
                        

                      {(index===4) &&
                      <FormControl className={classes.formControl}>
                                      <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip4"
                                        name={row.name}
                                        multiple
                                        value={dataDiagMod[row.name]}
                                        onChange={handleChangeMod}
                                        input={<Input id="select-multiple-chip4" selected={dataDiagMod[row.name]} />}
                                        renderValue={(selected) => (
                                          <div className={classes.chips}>
                                            {selected.map((value) => (
                                              <Chip key={value} label={value} className={classes.chip} />
                                            ))}
                                          </div>
                                        )}
                                      >
                                        {['A APPROFONDIR','ADAPT MARCHE TRAVAIL','ELABORAT. PROJET PRO.','LEVEE FREINS PERIPH.','RETOUR DIRECT EMPLOI','STRATEGIE RECH. EMPL.','TECHNIQ. RECH. EMPL.'].map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                      </FormControl>
                      }
                       
                      {(index===5) &&
                      <FormControl className={classes.formControl}>
                                      <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip5"
                                        name={row.name}
                                        multiple
                                        value={dataDiagMod[row.name]}
                                        onChange={handleChangeMod}
                                        input={<Input id="select-multiple-chip5" selected={dataDiagMod[row.name]} />}
                                        renderValue={(selected) => (
                                          <div className={classes.chips}>
                                            {selected.map((value) => (
                                              <Chip key={value} label={value} className={classes.chip} />
                                            ))}
                                          </div>
                                        )}
                                      >
                                        {['GLO','GUI','REN','SUI'].map((name) => (
                                          <MenuItem
                                            key={name}
                                            value={name}
                                          >
                                            {name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                      </FormControl>
                      }

                        {(index===6) &&
                        <FormControl className={classes.formControl}>
                          <Select
                          labelId="demo-mutiple-chip-label"
                          id="demo-mutiple-chip6"
                          name={row.name}
                          multiple
                          value={dataDiagMod[row.name]}
                          onChange={handleChangeMod}
                          input={<Input id="select-multiple-chip6" selected={dataDiagMod[row.name]} />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                        >
                          {[0,1,2,3,4,5,6,7].map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                            >
                              {name}
                            </MenuItem>
                          ))}
                          </Select>
                         </FormControl>
                      
                      }

                       {(index===7) &&
                        <FormControl className={classes.formControl}>
                          <Select
                          labelId="demo-mutiple-chip-label"
                          id="demo-mutiple-chip7"
                          name={row.name}
                          multiple
                          value={dataDiagMod[row.name]}
                          onChange={handleChangeMod}
                          input={<Input id="select-multiple-chip7" selected={dataDiagMod[row.name]} />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                        >
                          {['Moins de 19 ans','Entre 19 et 25 ans','Entre 26 et 49 ans','50 ans et plus'].map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                            >
                              {name}
                            </MenuItem>
                          ))}
                          </Select>
                         </FormControl>
                      
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
