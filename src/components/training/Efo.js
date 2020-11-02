import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import EfoTab from './EfoTab';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Pie} from 'react-chartjs-2';
// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import useStyles from '../main/Navbar.js/filesForMaterialUi/useStyles';
import Paper from '@material-ui/core/Paper';
// import ide from '../../image/ide.png'
// import ref from '../../image/ref.png';
// import ape from '../../image/ape.png';
import './efo.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead'; 	
import TableRow from '@material-ui/core/TableRow';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
// import Autocomplete from '@material-ui/lab/Autocomplete';

// import Chip from '@material-ui/core/Chip';

// EXCEL
import Excel from '../main/export/Excel';

// const useStyles = makeStyles((theme) => ({
// 	formControl: {
// 	  margin: theme.spacing(1),
// 	  minWidth: 120,
// 	},
// 	selectEmpty: {
// 	  marginTop: theme.spacing(1),
// 	},
//   }));

const Efo = () => {

  const classes = useStyles();

  const [ sourceFilter, setSourceFilter ] = useState({
	// dc_situationde: 'all',
	// dc_parcours: 'all',
	// dc_categorie: 'all',
	dc_statutaction_id: 'all',
	dc_lblformacode:'all',
	dd_datepreconisation:'all',
	nom_ref:'all',
	libelle_ape:'all'
});
	const { user } = useContext(UserContext);

	const [listeRef, setListeRef] = useState([]);
	const [listeStructure, setListeStructure] = useState([]);

	const [ dataEfo, setDataEfo ] = useState([]);
	const [ dataTop5, setDataTop5 ] = useState([]);

	const [ sourceUser, setSourceUser ] = useState('soon');
    const [ listeStatutAction, setListeStatutAction] = useState([]);
  	// const [camembertFormation, setCamembertFormation] = useState();
  	const [efo_c_o, setEfo_c_o] = useState();
	// const [Efo_byDate, setEfo_byDate] = useState(); 
	  
	const [selectedDate, setSelectedDate] = React.useState(new Date('2018-01-01T00:00:00'));

	function checkNumberDigits(myNumber)
	{
    return (myNumber < 10 ? "0" : "") + myNumber;
	}
 
	const handleDateChange = (date) => {
		setSelectedDate(date);
		
    const year = date.getFullYear();
    const month = checkNumberDigits(date.getMonth() + 1);
    const day = date.getDate();
    const datebonformat = `${year}-${month}-${day}`;
		setSourceFilter({ ...sourceFilter, dd_datepreconisation: datebonformat });
	};

	// console.log(sourceFilter)


  	//   const handleDelete = () => {
	  //   console.info('You clicked the delete icon.');
	  // };

	  // const handleClick = () => {
	  //   console.info('You clicked the Chip.');
	  // };

	// const [ listeSituationde, setListeSituationde] = useState([]);
 //    const [ listeParcours, setListeParcours] = useState([]);
 //    const [ listeCategorie, setListecategorie] = useState([]);
    // const [ camembertFormation, setCamembertFormation] = useState();
    // const [ listeFormacode, setListeformacode] = useState([]);

	// load dropdown from database listesituationde
	// useEffect(() => {
	// 	if(sourceUser !== 'soon'){
	// 		axios({
	// 			method: 'get',
	// 			url: `/efo/listesituationde?${sourceUser}`,
	// 			headers: {
	// 			Authorization: 'Bearer ' + Cookies.get('authToken')
	// 		}
	// 		})
	// 		.then((res) =>  setListeSituationde(res.data));
	// 	}
	// }, [sourceUser])

	// load dropdown from database listeParcours
	// useEffect(() => {
	// 	if(sourceUser !== 'soon'){
	// 		axios({
	// 			method: 'get',
	// 			url: '/efo/listeparcours',
	// 			headers: {
	// 			Authorization: 'Bearer ' + Cookies.get('authToken')
	// 		}
	// 		})
	// 		.then((res) =>  setListeParcours(res.data));
	// 	}
	// }, [sourceUser])

	// // load dropdown from database listeCategorie
	// useEffect(() => {
	// 	if(sourceUser !== 'soon'){
	// 		axios({
	// 			method: 'get',
	// 			url: `/efo/listecategorie?${sourceUser}`,
	// 			headers: {
	// 			Authorization: 'Bearer ' + Cookies.get('authToken')
	// 		}
	// 		})
	// 		.then((res) =>  setListecategorie(res.data));
	// 	}
	// }, [sourceUser])

	//load dropdown from database listeREF
	   useEffect(() => {
		if(sourceUser !== 'soon'){	
			axios({
				method: 'get',
				url: `/efo/listeref?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeRef(res.data));	
		
	}
	}, [sourceUser])

		//load dropdown from database listeSrtucture
		useEffect(() => {
			if(sourceUser !== 'soon'){	
				axios({
					method: 'get',
					url: `/efo/listestructure?${sourceUser}`,
					headers: {
						Authorization: 'Bearer ' + Cookies.get('authToken')
					}
				})
				.then((res) =>  setListeStructure(res.data));	
			
		}
		}, [sourceUser])

	// load dropdown from database listeStatutAction
	// console.log(sourceUser)
	useEffect(() => {
		if(sourceUser !== 'soon'){
			axios({
				method: 'get',
				url: `/efo/listestatutaction?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeStatutAction(res.data));

			axios({
				method: 'get',
				url: `/efo/EFO_c_o?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setEfo_c_o(res.data))

			// axios({
			// 	method: 'get',
			// 	url: `/efo/EFO_byDate?${sourceUser}`,
			// 	headers: {
			// 		Authorization: 'Bearer ' + Cookies.get('authToken')
			// 	}
			// })
			// .then((res) =>  setEfo_byDate(res.data))
			
			axios({
				method: 'get',
				url: `/efo/listeFormationDemandee?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataTop5(res.data))
		}
	}, [sourceUser])

	// console.log(dataTop5)

    //function source according to the user
    const getSourceUser = (fonction_id, p_user,ape_id) => {
	    switch (fonction_id) {
	        //conseiller
	        case 1:
	            setSourceUser(`dc_dernieragentreferent=${p_user}`)
	            break;
	        //ELP    
	        case 2:
	            setSourceUser(`dc_structureprincipalede=${ape_id}`)
	            break;
	        //DTNE    
	        case 3:
	            setSourceUser( `dt=DTNE`)
	            break;
	        //DTSO    
	        case 4:
	            setSourceUser( `dt=DTSO`)
	            break;
	            
	        //DR ADMIN
	        case 5:
	        case 6:
	            setSourceUser(``)
	            break;
	            
	        default : setSourceUser('soon') ;
		 }
	}

	useEffect(() => {
		getSourceUser(user.fonction_id, user.p_user,user.ape_id)
		if(sourceUser !== 'soon'){

				axios({
					method: 'get',
					url: `/efo?${sourceUser}`,
					headers: {
						Authorization: 'Bearer ' + Cookies.get('authToken')
					}
				})
				.then((res) =>  setDataEfo(res.data[0]))
				
	   	
				
		}}
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [sourceUser,user])

	// useEffect(() => {
	// 	axios({
	// 		method: 'get',
	// 		url: `/efo/listeFormationDemandee?`,
	// 		headers: {
	// 			Authorization: 'Bearer ' + Cookies.get('authToken')
	// 		}
	// 	})
	// 	.then((res) =>  setDataEfoTEST(res.data))
	// }, []);

	const handleChange = (event) => {
		const name= event.target.name
		let value = event.target.value;
		if ((value === '') ||  (value === 'Tous')){
		value='all'
		}
		setSourceFilter({ ...sourceFilter, [name]: value }); 
	 };
	   
	const [ checkUrl, setCheckUrl ] = useState('');
	 
	const updateTable = () => {
	    let sql=''
	    for (let i=0;i<Object.keys(sourceFilter).length;i++){
		   if (i===Object.keys(sourceFilter).length-1){
		   sql=sql+Object.keys(sourceFilter)[i]+'='+Object.values(sourceFilter)[i]		
		   }
		   else{
		   sql=sql+Object.keys(sourceFilter)[i]+'='+Object.values(sourceFilter)[i]+'&'		
		   }
	   	}
	   	axios({
		   method: 'get',
		   url: `/efo?${sourceUser}&${sql}`,
		   headers: {
			   Authorization: 'Bearer ' + Cookies.get('authToken')
		   }
	   	})
		   .then(res => {setDataEfo(res.data[0])}, setCheckUrl(`${sourceUser}&${sql}`))
		   
		   axios({
			method: 'get',
			url: `/efo/listeFormationDemandee?${sourceUser}&${sql}`,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setDataTop5(res.data))  

	}
	
	useEffect(() => {
		if(sourceUser !== 'soon'){
			updateTable()
		}
		// let sql_statutaction = Object.keys(sourceFilter)[3]+'='+Object.values(sourceFilter)[3]
		// axios({
		// 	method: 'get',
		// 	url: `/efo/listeFormationDemandee?${sql_statutaction}`,
		// 	headers: {
		// 		Authorization: 'Bearer ' + Cookies.get('authToken')
		// 	}
		// })
		// .then((res) =>  setDataEfoTEST(res.data))

		// axios({
		// 	method: 'get',
		// 	url: `/efo/EFO_byDate?${sourceUser}&${sql_statutaction}`,
		// 	headers: {
		// 		Authorization: 'Bearer ' + Cookies.get('authToken')
		// 	}
		// })
		// .then((res) =>  setEfo_byDate(res.data))

	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [sourceFilter,sourceUser])
	


	// 
	// axios({
	// 	method: 'get',
	// 	url: `/listeFormationDemandee?${sql_statutaction}`,
	// 	headers: {
	// 	   Authorization: 'Bearer ' + Cookies.get('authToken')
	// 	}
	// })
	// .then(res => setDataEfoTEST(res.data[0]))



	//export excel
	const exportIDE = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/efoxlsx/ide?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'efoIDE.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
		
	}
	const exportRef = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/efoxlsx/ref?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'efoREF.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
	}
	
	
	const exportApe = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/efoxlsx/ape?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'efoAPE.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
		
	}

	var mdata = []
	var mlabel = []
	// var efo_c_o_data = []

	// try{
	// 	for(var i=0;i<=camembertFormation.length;i++){
	// 		mdata.push(camembertFormation[i]['Qte'])
	// 		mlabel.push(camembertFormation[i]['dc_lblformacode'])
	// 	}
	// }catch(error){}
	// if(camembertFormation){
	// 	mlabel = camembertFormation
	// }
	//ici
	try{
		for(var i=0;i<=dataTop5.length;i++){
			mdata.push(dataTop5[i]['Qte'])
			mlabel.push(dataTop5[i]['dc_lblformacode'])
		}
	}catch(error){}
	if(dataTop5){
		mlabel = dataTop5
	}

	const options = {
		// legend: {position: 'right',}
        title: {
        	text: 'this.props.title'
        }
	}

	var data = {
		labels: [' '],
		datasets: [{
			data: [0],
			backgroundColor: ['#e76f51', '#f4a261', '#e9c46a', '#2a9d8f', '#264653', '#6f51e7', '#c4ffff', '#e76fff'],
			// hoverBackgroundColor: DoughnutHoverColor,
			// hoverBorderColor:DoughnutColor,
			hoverBorderWidth:2
		}]
		
	};
	// if(Efo_byDate){
	// 	var label_Efo_byDate = "Nombre de EFO " 
	// 		label_Efo_byDate += (Object.values(Efo_byDate[0])[1])?Object.values(Efo_byDate[0])[1]:''
	// 		label_Efo_byDate += " > 365 jours"
	// }
	if(efo_c_o && efo_c_o[0] !== null && efo_c_o[0] !== undefined){
		data = {
			labels: [	(efo_c_o[0] !== undefined)?Object.values(efo_c_o[0])[1]:'', (efo_c_o[1] !== undefined)?Object.values(efo_c_o[1])[1]:'' ],
			datasets: [{
				data: [(efo_c_o[0] !== undefined)?Object.values(efo_c_o[0])[0]:0, (efo_c_o[1] !== undefined)?Object.values(efo_c_o[1])[0]:0],
				backgroundColor: ['#e76f51', '#264653'],
				// hoverBackgroundColor: DoughnutHoverColor,
				// hoverBorderColor:DoughnutColor,
				hoverBorderWidth:2
			}]
		};
	}
	

	return (
		
	<div>
		{/* <button onClick={test}></button> */}
		<h4>Photo EFO en stock (conseillées ou souhaitées) DE en portefeuille ou rattachés</h4>
			
			<div>
		
       			
				{/* <FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label"className={classes.select_orange}>Situation DE</InputLabel>
						<Select
						name="dc_situationde"
						value={sourceFilter.dc_situationde}
						onChange={handleChange}
						label="Situation DE"
						className={classes.select_orange}
						>
						<MenuItem value="all"><em>Tous</em></MenuItem>
						{listeSituationde.map(option => (
						<MenuItem 
						key={option.dc_situationde}
						value={option.dc_situationde}
						>{option.libelle}</MenuItem>
						))}
						</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label"className={classes.select_orange}>Parcours DE</InputLabel>
					<Select
					name="dc_parcours"
					value={sourceFilter.dc_parcours}
					onChange={handleChange}
					label="Parcours DE"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeParcours.map(option => (
					<MenuItem 
					key={option.dc_parcours}
					value={option.dc_parcours}
					>{option.dc_parcours}</MenuItem>
					))}
					</Select>
				</FormControl> 
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label"className={classes.select_orange}>Catégorie DE</InputLabel>
					<Select
					name="dc_categorie"
					value={sourceFilter.dc_categorie}
					onChange={handleChange}
					label="Catégorie DE"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeCategorie.map(option => (
					<MenuItem 
					key={option.dc_categorie}
					value={option.dc_categorie}
					>{option.dc_categorie}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label">Format Code</InputLabel>
					<Select
					name="dc_formacode_id"
					value={sourceFilter.dc_formacode_id}
					onChange={handleChange}
					label="Statut Action"
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeFormacode.map(option => (
					<MenuItem 
					key={option.dc_formacode_id}
					value={option.dc_formacode_id}
					>{option.dc_lblformacode}</MenuItem>
					))}
					</Select>
				</FormControl> */}
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label"className={classes.select_orange}>Structure</InputLabel>
					<Select
					name="libelle_ape"
					value={sourceFilter.libelle_ape}
					onChange={handleChange}
					label="Structure"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeStructure.map(option => (
					<MenuItem 
					key={option.libelle_ape}
					value={option.libelle_ape}
					>{option.libelle_ape}</MenuItem>
					))}
					</Select>
				</FormControl>

				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label"className={classes.select_orange}>Référent</InputLabel>
					<Select
					name="nom_ref"
					value={sourceFilter.nom_ref}
					onChange={handleChange}
					label="Référent"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeRef.map(option => (
					<MenuItem 
					key={option.nom_ref}
					value={option.nom_ref}
					>{option.nom_ref}</MenuItem>
					))}
					</Select>
				</FormControl> 


				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label"className={classes.select_orange}>Statut Action</InputLabel>
					<Select
					name="dc_statutaction_id"
					value={sourceFilter.dc_statutaction_id}
					onChange={handleChange}
					label="Statut Action"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeStatutAction.map(option => (
					<MenuItem 
					key={option.dc_statutaction_id}
					value={option.dc_statutaction_id}
					>{option.dc_statutaction_id}</MenuItem>
					))}
					</Select>
				</FormControl>

				<FormControl variant="outlined" className={classes.formControl}>
				<TextField
					name='dc_lblformacode'
					label="Libellé Formacode"
					defaultValue=""
					variant="outlined"
					onChange={handleChange}
					helperText="contient le mot..."
					className={classes.select_orange}
					/>	
				</FormControl>

				<FormControl variant="outlined" className={classes.formControl}>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
				<Grid container justify="space-around">
							<KeyboardDatePicker
							margin="normal"
							id="date-picker-dialog"
							label="Date de préconisation >"
							format="dd/MM/yyyy"
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
						'aria-label': 'change date',
							}}
						/>
				</Grid>
				</MuiPickersUtilsProvider>
				</FormControl>	
                              
			</div>
			<div>
           
			<EfoTab dataEfo={dataEfo}/>	 
<br></br>
<br></br>
<br></br>
<br></br>


				<div className="div_graph_efo">
					<TableContainer className="div_table" component={Paper}>
						<h5>Top 5 besoins en formation</h5>
						<Table size="small" aria-label="a dense table">
							<TableBody>
								{mlabel.map((row) => (
									<TableRow key={row.dc_lblformacode}>
									<TableCell align="left">{row.dc_lblformacode}</TableCell>
									<TableCell align="left">{row.Qte}</TableCell>
								</TableRow>
								))}
								{/* {Efo_byDate!==undefined &&
								<TableRow>
								
									<TableCell align="left">{label_Efo_byDate}</TableCell>
									<TableCell align="left">
										<Chip
									        label={Efo_byDate[0].Qte}
									        color="secondary"
									      />
									</TableCell>
								</TableRow>
								} */}
							</TableBody>
						</Table>
					</TableContainer>
		
					<div className="Doughnut">
						<div>
							<Paper>
								<p>Part EFO C/O</p>
						        <Pie data={data}
					        		height={200}
						        	options={options} 
						        />
						    </Paper>
						</div>
					</div>
					
				</div>


			</div>
			{dataEfo!==undefined &&
				<div className={classes.excel}>
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

				 
				<div className='excel'>
					<p class="div_excel_p">Exportation </p>
					<div class="div_excel_img">
						<img onClick={exportIDE} src={ide} alt='IDE' title='Liste selon filtre par IDE'/>
						<img onClick={exportRef} src={ref} alt='REF' title='Liste selon filtre par REF'/>
						<img onClick={exportApe} src={ape} alt='APE' title='Liste selon filtre par APE'/>
					</div>
				</div>
				*/}
			
				</div>
				
			}
					
			</div>	
	)
	;
};

export default Efo;

