import React, { useState, useContext, useEffect } from "react";
import img from "../../../image/unnamed.png";
import { UserContext } from '../../../contexts/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Cookies from 'js-cookie';

import './defm.css'
import Excel from '../../main/export/Excel';
import useStyles2 from '../../main/Navbar.js/filesForMaterialUi/useStyles';

import Grid from '@material-ui/core/Grid';
import DefmTab from './DefmTab'

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
   //  theme.palette.type === 'light'
    // ? {
    //  color: theme.palette.secondary.main,
    //  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //   }
    // : {
    //  color: theme.palette.text.primary,
    //  backgroundColor: theme.palette.secondary.dark,
    //   },
    {
      color: '#c9794b',
        backgroundColor: 'rgb(251 244 241)',
    },
  title: {
    flex: '1 1 100%',
  },
  }));
  
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  const { numSelected } = props;
  const { handle } = props;
  const { nb_DE } = props;

  return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0, })} >
      
      {numSelected > 0 && <> 
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          <h4>Résultat {numSelected} critères: {nb_DE} DE</h4>
        </Typography>
        <IconButton aria-label="delete" onClick={handle}>
          <DeleteIcon />
        </IconButton>
      </> 
      }
    </Toolbar>
  );
};
  
  EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  nb_DE: PropTypes.string.isRequired,
  };


const Defm = () => {

  const classes2 = useStyles2(); //UseStyles de useStyles.js
  const { user } = useContext(UserContext);

  const [ ancienneteInscr,  setAncienneteInscr  ] = useState([]);
  const [ loading,          setLoading          ] = useState(false)
  const [ axe,              setAxe              ] = useState([]);
  const [ modeAccomp,       setModeAccomp       ] = useState([]);
  // const [ infoDivers,       setInfoDivers       ] = useState([{tel:'Telephone', nb:0}, {mail:'Mail', nb:0}, {cv:'CV en ligne', nb:0}, {demat:'Demat', nb:0}]);
  const [ multi,            setMulti            ] = useState(0);
  const [ sourceUser,       setSourceUser       ] = useState('soon');
  const [ selected,         setSelected         ] = useState([]);
  const [ chkURL,           setChkURL           ] = useState('')

  useEffect(() => {
    getFindUrl(user.fonction_id, user.p_user,user.ape_id)
    if(sourceUser !== 'soon'){

      let newSelected = [];
      axios({
        method:'get',
        url: '/defm/axe?'+sourceUser,
        headers: {
             Authorization: 'Bearer ' + Cookies.get('authToken')
           }
       })
       .then((res) =>  {
          setAxe(res.data); 

          const newSelecteds = res.data.map((n) => "axe/" + n.lbl);
          newSelected = newSelected.concat(selected, newSelecteds);
          setSelected(newSelected);

       })

       axios({
        method:'get',
        url: '/defm/acc?'+sourceUser,
        headers: {
             Authorization: 'Bearer ' + Cookies.get('authToken')
           }
       })
       .then((res) =>  {
          setModeAccomp(res.data)

          const newSelecteds = res.data.map((n) => "acc/" + n.lbl);
          newSelected = newSelected.concat(selected, newSelecteds);
          setSelected(newSelected);
        })

       axios({
        method:'get',
        url: '/defm/inscript?'+sourceUser,
        headers: {
             Authorization: 'Bearer ' + Cookies.get('authToken')
           }
       })
       .then((res) =>  {
          setAncienneteInscr(res.data)

          const newSelecteds = res.data.map((n) => "i/" + n.lbl);
          newSelected = newSelected.concat(selected, newSelecteds);
          setSelected(newSelected);
        })

       // axios({
       //  method:'get',
       //  url: '/defm/divers?'+sourceUser,
       //  headers: {
       //       Authorization: 'Bearer ' + Cookies.get('authToken')
       //     }
       // })
       // .then((res) =>  {
       //    setInfoDivers(0)

       //   // CARD INFO DIVERS ?
       //  })

    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [sourceUser,user])

  const getResultMulti = () =>{

    let sourcemulti;
    let url ='/defm/multifilter?'
    let axe_arr = []
    let inscript_arr = []
    let inscript_arr_cache = []
    let acc_arr = []

    // Range les données selon leurs types acc/inscript/axe de travail dans des tableaux
    if (selected.length>0){
      for (let i=0;i<selected.length;i++){
        if(selected[i].includes('axe/')){
          axe_arr.push(selected[i].split('/')[1])
        }else if(selected[i].includes('i/')){
          inscript_arr_cache.push(selected[i].split('/')[1].split(':')[0])
            // for(var z=0;z<inscript_arr_cache.length;z++){
            //   if(inscript_arr_cache[z].slice(15,17)!==''){
            //     tabSupp.push(inscript_arr_cache[z].slice(15,17))
            //     tabInf.push(inscript_arr_cache[z].slice(2,4))
            //   }else{
            //     tabSupp.push(99)
            //     tabInf.push(36)
            //     // tabInf.push(0)
            //   }
            // }
        }else if(selected[i].includes('acc/')){
          acc_arr.push(selected[i].split('/')[1])
        }
      }

      if(inscript_arr_cache.length>0){
        inscript_arr.push(Math.min(...inscript_arr_cache));
        inscript_arr.push(Math.max(...inscript_arr_cache));
      }else{inscript_arr=[]}
      
      sourcemulti = "dc_lblaxetravailprincipal="+axe_arr + "&nbjourinscrip=" + inscript_arr + "&dc_parcours=" + acc_arr + sourceUser
      // Requete pour GET
      setChkURL(sourcemulti)

      axios({
        method: 'get',
        url: url + sourcemulti,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken')
        }
      })
      .then(res => {setLoading(false);setMulti(res.data[0].nb)})

    inscript_arr = [];

    } else { // SI SELECT = 0
    setMulti(0)
    // setFilter([])
    }
  }

  useEffect(() => {
    getResultMulti()
    setLoading(true)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [selected])


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) { // Si on vide le tableau
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event, prefixe, data) => {

      let tabIndex = [];
      let selected_temp=[];
      let newSelected = [];

      data.map((n) => tabIndex.push(selected.indexOf(prefixe + n.lbl)));
      tabIndex.sort(function(a, b){return b - a});
      selected_temp = selected
      selected_temp.sort(function(a, b){return b - a});

      tabIndex.forEach(elmt => {
        selected_temp.splice(elmt,1)
      })
      newSelected = newSelected.concat(selected_temp);

      setSelected(newSelected);

    if (event.target.checked) {
      let newSelected = [];
      const newSelecteds = data.map((n) => prefixe + n.lbl);
      newSelected = newSelected.concat(selected, newSelecteds);
      setSelected(newSelected);
      
    }

    
    // setSelected([]);
  };

  //function source according to the user
  const getFindUrl = (fonction_id, p_user,ape_id) => {
    // console.log(fonction_id)
    switch (fonction_id) {
      //conseiller
      case 1:
        setSourceUser(`&dc_dernieragentreferent=${p_user}`)
        break;
      //ELP    
      case 2:
        setSourceUser(`&dc_structureprincipalede=${ape_id}`)
        break;
      //DTNE    
      case 3:
        setSourceUser( `&dt=DTNE`)
        break;
      //DTSO    
      case 4:
        setSourceUser( `&dt=DTSO`)
        break;

      //DR ADMIN
      case 5:
      case 6:
        setSourceUser('')
        break;

    default : setSourceUser('soon') ;
    }
  }

  const isSelected = (index) => selected.indexOf(index) !== -1; 

  const deselect = () => {
    setSelected([]);
    // setFilter([]);
  };

  const exportIDE = () => {

    
    // handleClickSnackBar({ vertical: 'bottom', horizontal: 'center' })
    // setState({ open: true, ...{ vertical: 'bottom', horizontal: 'center' } });
    axios({
      method: 'get', 
      responseType: 'blob', 
      url: '/defmxls/ide?' + chkURL,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      }
    })
    .then((response) => {
      // console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'diagIDE.xlsx'); 
      document.body.appendChild(link);
      link.click();
     });
    
  }

  const exportRef = () => {

    // setState({ open: true, ...{ vertical: 'bottom', horizontal: 'center' } });
    axios({
      method: 'get', 
      responseType: 'blob', 
      url: '/defmxls/ref?' + chkURL,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      }
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'defmRef.xlsx'); 
      document.body.appendChild(link);
      link.click();
     });
    
  }

    return (
      <div>
        <div className="toolbar">
        <EnhancedTableToolbar numSelected={selected.length} handle={deselect} nb_DE={multi.toLocaleString()}/>
        {(loading) &&  <CircularProgress />}
          </div>
      <div className='div-img_construction'><img src={img} alt='En construction'/></div>
        <div className={classes2.excel}>
          <Excel
              handleIDE={exportIDE}
              handleREF={exportRef}
              handleAPE='0'
            />
      </div>
        <Grid container direction="row" justify="space-evenly" spacing={2} className='content'>
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="flex-start">
                
                {(axe.length > 1) ? <DefmTab 
                  
                  uniqueKey={1}
                  data={axe} 
                  selected={selected}
                  handleClick={handleClick} 
                  isSelected={isSelected}
                  prefixe="axe/"
                  title="Axe de travail"
                  aide=""
                  format="(%)"
                  onSelectAllClick={handleSelectAllClick}
                />
                    
                    
                : 
                <Paper className='paper_content'>
                  <Skeleton variant="rect" width={210} height={50} />
                  
                  <Skeleton variant="circle" className='skeleton_graph' width={100} height={100} />
                </Paper>


                }
                
                {(ancienneteInscr.length > 1) ? <DefmTab 
                  uniqueKey={2}
                  data={ancienneteInscr} 
                  selected={selected}
                  handleClick={handleClick} 
                  isSelected={isSelected}
                  prefixe="i/"
                  title="Ancienneté d'inscription"
                  aide=""
                  format="(%)"
                  onSelectAllClick={handleSelectAllClick}
                />
                : 
                  <Paper className='paper_content'>
                    <Skeleton variant="rect" width={210} height={50} />
                    
                    <Skeleton variant="circle" className='skeleton_graph' width={100} height={100} />
                  </Paper>
                }
                  {(modeAccomp.length > 1) &&<DefmTab 
                    uniqueKey={3}
                    data={modeAccomp} 
                    selected={selected}
                    handleClick={handleClick} 
                    isSelected={isSelected}
                    prefixe="acc/"
                    title="Modalité d'accompagnement"
                    aide=""
                    format=""
                    onSelectAllClick={handleSelectAllClick}
                  /> }

                  { /*(infoDivers.length > 1) &&<DefmTab 
                    uniqueKey={4}
                    data={infoDivers} 
                    selected={selected}
                    handleClick={handleClick} 
                    isSelected={isSelected}
                    selected={selected}
                    prefixe="d/"
                    title="Divers"
                    aide=""
                    format=""
                    // onSelectAllClick={handleSelectAllClick}
                  /> */}
              </Grid>
          </Grid>
        </Grid>
      </div> 
    );
  }


export default Defm;

