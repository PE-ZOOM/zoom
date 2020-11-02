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

export default function OngletServices({dataDiagMod,handleChangeMod,dataDiag,selected,handleClick}) {
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

                      
                {(index===0) &&
                      <select required="required"
                        name={row.name}
                        onChange={handleChangeMod}
                        defaultValue={dataDiagMod[row.name]}
                        >
                        {['Sans Diag','Avec Diag'].map(option => (
                            <option
                                key={option}
                                >{option}
                            </option>
                            ))}         
                      </select>
                      } 

                {(index===1) &&
                        <FormControl className={classes.formControl}>
                          <Select
                          labelId="demo-mutiple-chip-label"
                          id="demo-mutiple-chip1"
                          name={row.name}
                          multiple
                          value={dataDiagMod[row.name]}
                          onChange={handleChangeMod}
                          input={<Input id="select-multiple-chip1" selected={dataDiagMod[row.name]} />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                        >
                          {['Sans entretien','Entre 0 et 30 jours','Entre 31 jours et 90 jours','Entre 91 jours et 180 jours','181 jours et plus'].map((name) => (
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
                       {(index===2) &&
                        <FormControl className={classes.formControl}>
                          <Select
                          labelId="demo-mutiple-chip-label"
                          id="demo-mutiple-chip2"
                          name={row.name}
                          multiple
                          value={dataDiagMod[row.name]}
                          onChange={handleChangeMod}
                          input={<Input id="select-multiple-chip2" selected={dataDiagMod[row.name]} />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                        >
                          {['Sans contact sortant tel ou email','Entre 0 et 30 jours','Entre 31 jours et 90 jours','Entre 91 jours et 180 jours','181 jours et plus'].map((name) => (
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
                      {(index===3) &&
                        <FormControl className={classes.formControl}>
                          <Select
                          labelId="demo-mutiple-chip-label"
                          id="demo-mutiple-chip3"
                          name={row.name}
                          multiple
                          value={dataDiagMod[row.name]}
                          onChange={handleChangeMod}
                          input={<Input id="select-multiple-chip3" selected={dataDiagMod[row.name]} />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                        >
                          {['Sans formation réalisée','Actuellement en formation','Entre 0 et 30 jours','Entre 31 jours et 90 jours','Entre 91 jours et 180 jours','181 jours et plus'].map((name) => (
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
                          {['Sans prestation réalisée','Actuellement en prestation','Entre 0 et 30 jours','Entre 31 jours et 90 jours','Entre 91 jours et 180 jours','181 jours et plus'].map((name) => (
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
                          {['Sans DPAE','Entre 0 et 30 jours','Entre 31 jours et 90 jours','Entre 91 jours et 180 jours','181 jours et plus'].map((name) => (
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
