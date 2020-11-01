import React, { useContext, useState, useEffect } from 'react';
import Pmp from './onglets/Pmp';
import Re from './onglets/Re';
import Freins from './onglets/Freins';
import Autres from './onglets/Autres';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './diag.css'
import { namefield } from '../../../utils/diagNameColonne';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

// EXCEL
// import ButtonR from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Excel from '../../main/export/Excel';
import useStyles2 from '../../main/Navbar.js/filesForMaterialUi/useStyles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
// import Snackbar from '@material-ui/core/Snackbar';
// import CloseIcon from '@material-ui/icons/Close';

// import { lighten } from '@material-ui/core/styles';
// import ide from '../../../image/ide.png';
// import ref from '../../../image/ref.png';
// import ape from '../../../image/ape.png';
// import Button from 'react-bootstrap/Button'
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import FolderIcon from '@material-ui/icons/Folder';

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  TEST: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  close: {
    padding: 0.5,
  },
  div_filter: {
  	flexGrow: 1,
  },
  paper: {
    padding: '2%',
    textAlign: 'center',
  },
  tab_paper:{
 //  	borderColor: red green white blue;
	// borderStyle: solid dashed dotted solid;
	// borderWidth: 1px 2px 3px 4px;
  	border: '1px solid #c9794b',
  }
});


const useToolbarStyles = makeStyles((theme) => ({
	root: {
	  paddingLeft: theme.spacing(2),
	  paddingRight: theme.spacing(1),
	},
	highlight:
	 //  theme.palette.type === 'light'
		// ? {
		// 	color: theme.palette.secondary.main,
		// 	backgroundColor: lighten(theme.palette.secondary.light, 0.85),
		//   }
		// : {
		// 	color: theme.palette.text.primary,
		// 	backgroundColor: theme.palette.secondary.dark,
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

const Diag = () => {

	// const [state, setState] = React.useState({
	// 	open: false,
	// });

	// const { vertical, horizontal, open } = state;

	// const handleCloseSnackBar = () => {
	// 	setState({ ...state, open: false });
	// };


	const { user } = useContext(UserContext);
	const classes2 = useStyles2(); //UseStyles de useStyles.js
	const [ dataDiag, setDataDiag ] = useState([]);
	const [ dataDiagLength, setDataDiagLength ] = useState(0);
	const [ sourceUser, setSourceUser ] = useState('soon');
	const [ multi, setmulti ] = useState(0);
	// const [field, setField] = useState(['dc_individu_local','dc_civilite'])


	const [ dataDiagMod, setDataDiagMod ] = useState({
		colonne40 : "B",
		colonne41 : "B",
		colonne42 : "B",
		colonne43 : "B",
		colonne44 : "B",
		colonne45 : "B",
		colonne46 : "B",
		colonne47 : "B",
		colonne48 : "B",
		colonne49 : "B",
		colonne50 : "B",
		colonne51 : "B",
		colonne163 : "B",
		colonne64 : "B",
		colonne65 : "B",
		colonne66 : "B",
		colonne80 : "B",
		colonne82 : "B",
		colonne83 : "B",
		colonne84 : "B",
		colonne85 : "B",
		colonne86 : "B",
		colonne95 : "B",
		colonne96 : "B",
		colonne97 : "B",
		colonne98 : "B",
		colonne99 : "B",
		colonne143: "B",
		colonne144: "B",
		colonne145: "B",
		colonne146: "B",
		colonne147: "B",
		colonne160: "B",
		colonne109: "O",
		colonne113: "O",
		colonne117: "O",
		colonne122: "O",
		colonne127: "O",
		colonne136: "O",
		colonne140: "O",
		dc_lblaxetravailprincipal: "RETOUR DIRECT EMPLOI",
		c_top_oreavalider_id: "O",
		dc_parcours: "REN",
		tranche_age: "Moins de 26 ans"
	})


	const [selected, setSelected] = useState([]);

	useEffect(() => {
		getFindUrl(user.fonction_id, user.p_user,user.ape_id)
		if(sourceUser !== 'soon'){
			let tempo = []
			let source = ''
			for (let i=0;i<Object.keys(dataDiagMod).length;i++){
				source = '/count/diag?'+Object.keys(dataDiagMod)[i]+'='+Object.values(dataDiagMod)[i]+sourceUser
				axios({
				   method: 'get',
				   url: source,
				   headers: {
					   Authorization: 'Bearer ' + Cookies.get('authToken')
				   }
			   })
			   .then((res) =>  tempo.push(res.data[0]))
			   .then(() => setDataDiagLength(tempo.length))
			}
			setDataDiag(tempo)
		}
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [sourceUser,user])


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


	const [ choice, setChoice ] = useState(0);

	const choice1 = (event) => {
		event.preventDefault()
		setChoice(1)
	}
	const choice2 = (event) => {
		event.preventDefault()
		setChoice(2)
	}
	const choice3 = (event) => {
		event.preventDefault(event)
		setChoice(3)
	}
	const choice4 = (event) => {
		event.preventDefault(event)
		setChoice(4)
	}

	const  handleChangeMod = (event) => { 
		const name = event.target.name;
		const value = event.target.value;
		setDataDiagMod({...dataDiagMod, [name]: value })
		changeOne(name,value)
	}

	function updateOne(arr, namecol, newvalue) {
		const look = arr.map(el => {
			if(el.name === namecol){
				el.nb = newvalue
			}
			return el
		})
		return look;
	}

	const changeOne = (namecol,val) => {
		const sourceone = `/count/diag?${namecol}=${val}` + sourceUser
		// console.log(sourceone)
		axios({
		   method: 'get',
		   url: sourceone,
		   headers: {
			   Authorization: 'Bearer ' + Cookies.get('authToken')
		   }
	   })
	   .then(res => {
		   const copie = dataDiag
		   const updated = updateOne(copie, namecol, res.data[0].nb)
		   setDataDiag(updated)
		})
		
	}	
	

	//deselect all
	const deselect = () => {
		setSelected([]);
		setFilter([]);
	  };
	

	//select one
	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		
		// console.log(newSelected)
		setSelected(newSelected);
	}; 
	//end
	  
	  const [ checkUrl, setCheckUrl ] = useState('');
	  const [ filter, setFilter ] = useState([]);

	  const getResultMulti = () =>{

		  let url ='/count/diag?'
		  let checkedUrl=''
		  let filterName= []
		  if (selected.length>0){
			for (let i=0;i<selected.length;i++){
				if (i===0) {
				  checkedUrl += `${selected[i]}=${dataDiagMod[selected[i]]}`
				}
				else {
					checkedUrl += `&${selected[i]}=${dataDiagMod[selected[i]]}`
				}
				filterName.push(`${namefield(selected[i])}=${dataDiagMod[selected[i]]}`)
				
			}
			// console.log(checkedUrl)
				  const sourcemulti = url + checkedUrl + sourceUser
				  axios({
				  method: 'get',
				  url: sourcemulti,
				  headers: {
					  Authorization: 'Bearer ' + Cookies.get('authToken')
				  }
			  })
			  .then(res => {setmulti(res.data[0].nb)}, setCheckUrl(checkedUrl+ sourceUser),setFilter(filterName))
			  
			// console.log(sourcemulti)
		  } else {
			setmulti(0)
			setFilter([])
		  }
	}

	useEffect(() => {
		getResultMulti()
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [selected])

	useEffect(() => {
		getResultMulti()
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [dataDiagMod])

	// const test= () => {
	// 	console.log(checkUrl)
	// }
	
	const exportIDE = () => {
		// handleClickSnackBar({ vertical: 'bottom', horizontal: 'center' })
		// setState({ open: true, ...{ vertical: 'bottom', horizontal: 'center' } });

		

		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/diagxlsx/ide?' + checkUrl + '&filter=' + filter,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
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
			url: '/diagxlsx/ref?' + checkUrl + '&filter=' + filter,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'diagRef.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
		
	}


	const exportApe = () => {
		// setState({ open: true, ...{ vertical: 'bottom', horizontal: 'center' } });
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/diagxlsx/ape?' + checkUrl + '&filter=' + filter,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'diagApe.xlsx'); 
			document.body.appendChild(link);
			link.click();
		});

	}

	// const [dense, setDense] = React.useState(false);
	// const [secondary, setSecondary] = React.useState(false);

	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChangePaper = (event, newValue) => {
		setValue(newValue);
	}


   

	return (
	<div>
	{/* <button onClick={test}> test</button> */}
	
	{(dataDiagLength===44) &&
		<>
			<h2>Photo DE en portefeuille</h2>
			{/*  <Button className={classes.TEST}>Hook</Button>;*/} 
		
			<Paper square>
				<Tabs
					className={classes.tab_paper}
				    value={value}
				    onChange={handleChangePaper}
					indicatorColor="primary"
					textColor="primary"
					centered
					>
					<Tab className={choice===1 ? "on" : "off"} onClick={choice1} label="Diag: Projet et mobilité professionnelle" />
					<Tab className={choice===2 ? "on" : "off"} onClick={choice2} label="Diag: Recherche d'emploi" />
					<Tab className={choice===3 ? "on" : "off"} onClick={choice3} label="Diag: Freins périphériques à l'emploi" />
					<Tab className={choice===4 ? "on" : "off"} onClick={choice4} label="Autres caractéristiques" />
				</Tabs>
			</Paper>

			{/* <button className={choice===1 ? "on" : "off"} onClick={choice1}>Projet et mobilité professionnelle</button>
			<button className={choice===2 ? "on" : "off"} onClick={choice2}>Recherche d'emploi</button>
			<button className={choice===3 ? "on" : "off"}onClick={choice3}>Freins périphériques à l'emploi</button> */}
		</>
	}	
	
	
	{(dataDiagLength<44) &&
	<h3>Chargement en cours {dataDiagLength} sur 44 </h3> 
}
	
	{(choice===1) && <Pmp 
		dataDiagMod={dataDiagMod}
		handleChangeMod={handleChangeMod}
		dataDiag1={dataDiag.filter(el => el.groupe2 === 'Profil et situation')}
		dataDiag2={dataDiag.filter(el => el.groupe2 === 'Projet professionnel')}
		dataDiag3={dataDiag.filter(el => el.groupe2 === 'Marché du travail, environnement professionnel')}
		selected={selected}
		handleClick={handleClick} />}

	{(choice===2) && <Re
		dataDiagMod={dataDiagMod}
		handleChangeMod={handleChangeMod}
		dataDiag1={dataDiag.filter(el => el.groupe2 === 'Stratégie')}
		dataDiag2={dataDiag.filter(el => el.groupe2 === 'Techniques')}
		dataDiag3={dataDiag.filter(el => el.groupe2 === 'Capacités numériques')}
		dataDiag4={dataDiag.filter(el => el.groupe2 === "Retour direct à l'emploi")}
		selected={selected}
		handleClick={handleClick}
		choice={choice} />}

	{(choice===3) && <Freins
		dataDiagMod={dataDiagMod}
		handleChangeMod={handleChangeMod}
		dataDiag1={dataDiag.filter(el => el.groupe2 === "Freins périphériques à l'emploi")}
		selected={selected}
		handleClick={handleClick}
		choice={choice} /> }

	{(choice===4) && <Autres
		dataDiagMod={dataDiagMod}
		handleChangeMod={handleChangeMod}

		dataDiag1={dataDiag.filter(el => el.groupe2 === "Autres").sort((a, b) => (a.name > b.name) ? 1 : -1)}
		selected={selected}
		handleClick={handleClick}
		choice={choice} /> }


		{(choice>0) &&
	<>

		{(multi>0) && 

			<div>
			<div className={classes2.excel}>
			<Excel
					handleIDE={exportIDE}
					handleREF={exportRef}
					handleAPE={exportApe}
				/>
				{/*<ButtonGroup color="primary" aria-label="outlined primary button group" >
					<ButtonR variant="contained" color="primary" disableElevation startIcon={<SaveIcon />}>
					  Télécharger
					</ButtonR>
					<ButtonR onClick={exportIDE}>IDE</ButtonR>
					<ButtonR onClick={exportRef}>REF</ButtonR>
					<ButtonR onClick={exportApe}>APE</ButtonR>
				</ButtonGroup>

				 <Fab className={classes.TEST} color="secondary" aria-label="add" onClick={exportIDE}>
				  IDE
				</Fab>
				<Fab color="secondary" aria-label="add" onClick={exportIDE}>
				  IDE
				</Fab>
			 	<img onClick={exportIDE} src={ide} data-value='ide' alt='IDE' title='Resultat multi-critères par IDE'/>
			 	<img onClick={exportRef} src={ref} data-value='ref' alt='REF' title='Resultat multi-critères par REF'/>
			 	<img onClick={exportApe} src={ape} data-value='ape' alt='APE' title='Resultat multi-critères par APE'/>
			 
			 	<ButtonR
			 		onClick={exportIDE}
			        variant="contained"
			        color="primary"
			        size="small"
			        startIcon={<SaveIcon />}
			      >
			        IDE
			     </ButtonR><ButtonR onClick={exportRef} color="primary" size="small" startIcon={<SaveIcon />}>
			        REF
			     </ButtonR>
			     <ButtonR
			     	onClick={exportApe}
			        variant="contained"
			        color="primary"
			        size="small"
			        startIcon={<SaveIcon />}
			      >
			        APE
			     </ButtonR> */}
			</div>
			<Paper className={classes.paper}>
			{/* <h4>Résultat multi critères: {multi.toLocaleString()} DE</h4> */}
			<EnhancedTableToolbar numSelected={selected.length} handle={deselect} nb_DE={multi.toLocaleString()}/>
			
            <ul className="ol">
	            {filter.map(el => (
					<li key={el}>
						{el}
						
		          	</li>)
				)}
			</ul>
         


		</Paper>

			</div>



		}


		
			
		

		
		{/* <h5>Critères:</h5>
			  <IconButton aria-label="delete" onClick={deselect}>
	            <DeleteIcon />
	          </IconButton>
		<ol className='diag-ol'>
			{filter.map(el => (
				<li key={el}>
					{el}
				</li>)
			)}
		</ol> */}
	</>

	}
	
	</div>
)};

export default Diag;

