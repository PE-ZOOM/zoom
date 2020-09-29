import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import PrestaTab from './PrestaTab';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Excel from '../../main/export/Excel';
import useStyles from '../../main/Navbar.js/filesForMaterialUi/useStyles';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton'
import './prestas.css'

// import ref from '../../../image/ref.png';
// import ape from '../../../image/ape.png';
// import './contact.css'

// EXCEL
// import ButtonR from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

// const useStyles = makeStyles((theme) => ({
// 	formControl: {
// 	  margin: theme.spacing(1),
// 	  minWidth: 120,
// 	},
// 	selectEmpty: {
// 	  marginTop: theme.spacing(1),
// 	},
// 	presta_orange:{
// 		color: ' #c9794b',

// 	},
//   }));

const Presta = () => {
	const color = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#e59b19', '#895d0f', '#5b3e0a']

  const classes = useStyles();

 
  const [ sourceFilter, setSourceFilter ] = useState({
	dc_structureprincipalesuivi: 'all',
	dc_modalitesuiviaccomp_id: 'all',
	annee: 'all',
});
	const { user } = useContext(UserContext);

	const [ dataActi, setDataActi ] = useState([]);

	// const [ filterLine, setFilterLine] = useState([]);
	// const [ sourceFilterLine, setSourceFilterLine] = useState('');

	const [ sourceUser, setSourceUser ] = useState('soon');
	const [ listeStructure, setListeStructure] = useState([]);
    const [ listeModAcc, setListeModAcc] = useState([]);
	const [ listeYear, setListeYear] = useState([]);

   // load dropdown from database listestructure
    useEffect(() => {
		if(sourceUser !== 'soon'){

			axios({
				method: 'get',
				url: `/activites/listestructure?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeStructure(res.data));
		
    }
	}, [sourceUser])


		// load dropdown from database listeModAcc
		useEffect(() => {
			if(sourceUser !== 'soon'){
	
				axios({
					method: 'get',
					url: `/activites/listemodeacc?${sourceUser}`,
					headers: {
						Authorization: 'Bearer ' + Cookies.get('authToken')
					}
				})
				.then((res) =>  setListeModAcc(res.data));
			
		}
		}, [sourceUser])

			// load dropdown from database listeYear
			useEffect(() => {
				if(sourceUser !== 'soon'){
		
					axios({
						method: 'get',
						url: `/activites/listeyear?${sourceUser}`,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setListeYear(res.data));
				
			}
			}, [sourceUser])


    //function source according to the user
    const getSourceUser = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceUser(`dc_agentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
				setSourceUser(`dc_structureprincipalesuivi=${ape_id}`)
				// setSourceFilter({ ...sourceFilter, 'dc_structureprincipalesuivi': ape_id }); 
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
			// console.log('source' + sourceUser )
			getSourceUser(user.fonction_id, user.p_user,user.ape_id)

			if(sourceUser !== 'soon'){
					axios({
						method: 'get',
						url: `/activites/presta?${sourceUser}`,
						headers: {
							Authorization: 'Bearer ' + Cookies.get('authToken')
						}
					})
					.then((res) =>  setDataActi(res.data))
				
			}}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceUser,user])

		const handleChange = (event) => {
			const name= event.target.name
			const value = event.target.value; 
			setSourceFilter({ ...sourceFilter, [name]: value }); 
		 };
	   
		 const [ checkUrl, setCheckUrl ] = useState('');
		 
		 const updateTable = () => {
		   let sql=''
		   const newSourceFilter = Object.assign({}, sourceFilter)
		   if (user.fonction_id === 2) {
			delete newSourceFilter.dc_structureprincipalesuivi;
		   }
		  
		   for (let i=0;i<Object.keys(newSourceFilter).length;i++){
			   if (i===Object.keys(newSourceFilter).length-1){
			   sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]		
			   }
			   else{
			   sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]+'&'		
			   }
		   }
		//    console.log(sourceFilter)
		//    console.log(newSourceFilter)

		//    console.log(sql)
		   axios({
			   method: 'get',
			   url: `/activites/presta?${sourceUser}&${sql}`,
			   headers: {
				   Authorization: 'Bearer ' + Cookies.get('authToken')
			   }
		   })
		   .then(res => {
		   		setDataActi(res.data);
		  //  		var temp_arr = [];
		  //  		Object.keys(res.data[0]).map((lbl) => {
				// 	if(lbl.includes('ACTIV') || lbl.includes('Prestas')|| lbl.includes('Regards')|| lbl.includes('Vers1')|| lbl.includes('Valoriser')){
				// 		temp_arr.push(lbl.replaceAll('_',' '))
				// 	}
				// }); 
				// setFilterLine(temp_arr);
				// setSourceFilterLine(temp_arr[0]);
		   	}, setCheckUrl(`${sourceUser}&${sql}`))
		 }

		 useEffect(() => {
			if(sourceUser !== 'soon'){
		 updateTable()
			} 
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceFilter,sourceUser])

		//export excel
		
		const exportRef = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/activitexlsx/presta/ref?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'prestaREF.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
		}
	
	
	const exportApe = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/activitexlsx/presta/ape?' + checkUrl,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'prestaAPE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
		
	}
	
	// console.log(dataActi)

	var value1 = []
	var label1 = []
	var title1 = []

	var value2 = []
	var label2 = []
	var title2 = []
	var variable 
	const options = {
		legend: {position: 'right',}
	}

	const data = {
		labels: [],
		datasets: []
	};
	var first_iteration = true;
	 if(dataActi.length > 0){
	 	
	 	// POUR EXEMPLE DE VARIATION DES DONNEES
	 	// if(first_iteration)
	 	// {
	 	// 	dataActi.unshift(
 		//  		{
 		// 			annee: 2020,
 		// 			mois: 8,
 		// 			nb_de_affectes: 43,
 		//  			ACTIV_Créa: 120,
 		// 			ACTIV_Emploi: 15,
 		// 			ACTIV_Projet: 5,
 		// 			Regards_croisés: 30,
 		// 			Valoriser_son_image_pro: 95,
 		// 			Vers1métier: 0,
 		// 			Presta: 600,
 		// 			tx_prestation: "0.2%"
 		//  		}
	 	// 	)
	 	// 	dataActi.unshift(
 		//  		{
 		// 			annee: 2020,
 		// 			mois: 9,
 		// 			nb_de_affectes: 12456,
 		//  			ACTIV_Créa: 50,
 		// 			ACTIV_Emploi: 55,
 		// 			ACTIV_Projet: 35,
 		// 			Regards_croisés: 10,
 		// 			Valoriser_son_image_pro: 125,
 		// 			Vers1métier: 46,
 		// 			Presta: 921,
 		// 			tx_prestation: "0.99%"
 		//  		}
	 	// 	 )
	 	// }
	 	// first_iteration = false;
	 	
	 	
		var annee = dataActi[0].annee
		var i =0;

		for(var z=0; z<dataActi.length; z++){ // LOOP SUR TOUTES LES LIGNES DU TABLEAU DATAACTIV

			if(annee === dataActi[z].annee){ // TRI SUR LA DERNIERE ANNEE
				data['labels'].unshift(dataActi[z].mois) // RENSEIGNE LES MOIS CONNUS - UNSHIFT POUR INSERER AU DEBUT DU TABLEAU

				Object.entries(dataActi[z]).map((v) => { // BOUCLE SUR CHAQUE COLONNE DU TABLEAU

					
					if(	v[0].includes('ACTIV') 	|| 
						v[0].includes('Presta')	|| 
						v[0].includes('Regards')|| 
						v[0].includes('Vers1')	|| 
						v[0].includes('Valoriser')
						)
					{

						if(z===0){  // SI PREMIERE ITERATION, CREATION DES OBJETS LINE

							data['datasets'].push(
								{
									label: v[0].replaceAll('_',' '), 
									fill: false,
									lineTension: 0,
									backgroundColor: 'rgba(75,192,192,0.4)',
									borderColor: color[i],
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: color[i],
									pointBackgroundColor: '#fff',
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: 'rgba(220,220,220,1)',
									pointHoverBorderColor: color[i],
									pointHoverBorderWidth: 2,
									pointRadius: 0.1,
									pointHitRadius: 10,
									data:[]
								
								}
							)
							i += 1;
						} // END IF PREMIRE ITERATION

						// BOUCLE SUR LES OBJETS LINE
						// TEST SI LABEL DE L'OBJET CORRESPOND A LA LIGNE DE l'ITERATION v
						// AJOUTER LA VALEUR AU DEBUT DU TABLEAU AVEC UNSHIFT
						for(var z_data=0; z_data<data['datasets'].length; z_data++){ 
							if(v[0].replaceAll('_',' ')===data['datasets'][z_data].label){
								data['datasets'][z_data].data.unshift(v[1]) 
							}
						}

					} // END IF INCLUDES
				})
			}
		}
	}

	return (
		
	<div>
		{/* <button onClick={test}></button> */}
		<h4>Prestations DE inscrits au moins un jour dans le mois, affectés à un conseiller référent</h4>
		<h5>(sans situation,rattaché,en portefeuille)</h5>
		
			<div>

				<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel className={classes.select_orange}>Structure</InputLabel>
						<Select
						name="dc_structureprincipalesuivi"
						value={sourceFilter.dc_structureprincipalesuivi}
						onChange={handleChange}
						label="Structure"
						className={classes.select_orange}
						>
						<MenuItem value="all"><em>Tous</em></MenuItem>
						{listeStructure.map(option => (
						<MenuItem 
						key={option.dc_structureprincipalesuivi}
						value={option.dc_structureprincipalesuivi}
						>{option.libelle_ape}</MenuItem>
						))}
						</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Modalité d'acc</InputLabel>
					<Select
					name="dc_modalitesuiviaccomp_id"
					value={sourceFilter.dc_modalitesuiviaccomp_id}
					onChange={handleChange}
					label="Modalité d'acc"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeModAcc.map(option => (
					<MenuItem 
					key={option.dc_modalitesuiviaccomp_id}
					value={option.dc_modalitesuiviaccomp_id}
					>{option.dc_modalitesuiviaccomp_id}</MenuItem>
					))}
					</Select>
				</FormControl>
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Année</InputLabel>
					<Select
					name="annee"
					value={sourceFilter.annee}
					onChange={handleChange}
					label="Année"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeYear.map(option => (
					<MenuItem 
					key={option.annee}
					value={option.annee}
					>{option.annee}</MenuItem>
					))}
					</Select>
				</FormControl>
			               

			</div>
			
			<div className="div_graph">
				<div className="Doughnut">
					<Paper>
						<Line 
							data={data} 
							width={1000}  
							height={300}  
							options={{ maintainAspectRatio: true}} 
						/>
						

					</Paper> 
					{/*<Paper>
				        <Pie data={dataPie} 
				        	width={500}
			        		height={200}
			        		options={options}
				        />
					</Paper>*/}
				</div>
			</div>
			
			<div>
				{!(dataActi.length>0) && <Skeleton variant="rect"height={118} />}
				<PrestaTab dataActi={dataActi}/>	 	 
			</div>
			{(dataActi!==undefined && dataActi.length>0) &&

			<div className={classes.excel}>
				<Excel
					handleIDE='0'
					handleREF={exportRef}
					handleAPE={exportApe}
				/>
				{/* <div className='excel'>
					<p class="div_excel_p">Exportation </p>
					<div class="div_excel_img">
						<img onClick={exportRef} data_dl={checkUrl} src={ref} alt='REF' title='Liste selon filtre par REF'/>
						<img onClick={exportApe} src={ape} alt='APE' title='Liste selon filtre par APE'/>
					</div>
				</div>*/}
			</div>
				
			}
					
	</div>	
	)
	;
};

export default Presta;
