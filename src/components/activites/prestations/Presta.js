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
import {Bar} from 'react-chartjs-2';
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
		   .then(res => {setDataActi(res.data)}, setCheckUrl(`${sourceUser}&${sql}`))
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

	const options = {
		legend: {position: 'right',}
	}

	const data = {
		labels: '',
		datasets: [{
			type:'bar',
			label: '1',
			data: 0,
		},{
			type: 'bar',
			label:  '2',
			data: 0,
		}]
	};
	if(dataActi.length > 0){

		Object.keys(dataActi[0]).map((lbl) => {
			if(lbl.includes('ACTIV') || lbl.includes('Prestas')|| lbl.includes('Regards')|| lbl.includes('Vers1')|| lbl.includes('Valoriser')){
				label1.push(lbl.replaceAll('_',' '))
			}
		})
		data['labels'] = label1
		for(var z=0; z<dataActi.length; z++){
			value1 = []
			Object.entries(dataActi[z]).map((k)=>{
				if(k[0].includes('ACTIV') || k[0].includes('Prestas')|| k[0].includes('Regards')|| k[0].includes('Vers1')|| k[0].includes('Valoriser')){
					value1.push(k[1])
				}
			})
			data['datasets'][z].data = value1
			data['datasets'][z].label = dataActi[z]['mois'] + '/' + dataActi[z]['annee']
			data['datasets'][z].backgroundColor = color[z]
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
						<Bar data={data} 
							width={800}  
				        	// height={200}
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
