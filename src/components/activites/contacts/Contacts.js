import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import ContactTab from './ContactTab';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from '../../main/Navbar.js/filesForMaterialUi/useStyles';
import Excel from '../../main/export/Excel';
import Paper from '@material-ui/core/Paper';
// import TableContainer from '@material-ui/core/TableContainer'
import Skeleton from '@material-ui/lab/Skeleton'
// import ref from '../../../image/ref.png';
// import ape from '../../../image/ape.png';
import './contact.css'

import {Bar} from 'react-chartjs-2';
// import {Doughnut} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
// import {Polar} from 'react-chartjs-2';




// const useStyles = makeStyles((theme) => ({
// 	formControl: {
// 	  margin: theme.spacing(1),
// 	  minWidth: 120,
// 	},
// 	selectEmpty: {
// 	  marginTop: theme.spacing(1),
// 	},
//   }));

const Contacts = () => {
	const color = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#6f51e7', '#c4ffff', '#e76fff']
  	const classes = useStyles();

 
	const [ sourceFilter, setSourceFilter ] = useState({
		dc_structureprincipalesuivi: 'all',
		dc_modalitesuiviaccomp_id: 'all',
		annee: 'all',
	});

	const { user } = useContext(UserContext);
	const [ dataActi, setDataActi ] = useState([]);
	const [ listeStructure, setListeStructure] = useState([]);
    const [ listeModAcc, setListeModAcc] = useState([]);
	const [ listeYear, setListeYear] = useState([]);
	const [ sourceUser, setSourceUser ] = useState('soon');
	// console.log(listeStructure)
	const [ DataDonughtE, setDataDonughtE ] = useState([]);
	const [ DataDonughtS, setDataDonughtS ] = useState([]);

	// load dropdown from database listestructure - listeYear - listeModAcc
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

			axios({
				method: 'get',
				url: `/activites/listemodeacc?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setListeModAcc(res.data));

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
		// console.log('source : ' + user.ape_id )
		getSourceUser(user.fonction_id, user.p_user,user.ape_id)

		if(sourceUser !== 'soon'){
			axios({
				method: 'get',
				url: `/activites/contacts?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataActi(res.data))

			axios({
				method: 'get',
				url: `/activites/contactsEntrant?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataDonughtE(res.data))

			axios({
				method: 'get',
				url: `/activites/contactsSortant?${sourceUser}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataDonughtS(res.data))
		}
	}	
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	, [sourceUser,user])
	// console.log(DataDonughtS)

	const handleChange = (event) => {
		const name= event.target.name
		const value = event.target.value; 
		setSourceFilter({ ...sourceFilter, [name]: value }); 
		// console.log('name : ' + name );
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
			url: `/activites/contacts?${sourceUser}&${sql}`,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then(res => {setDataActi(res.data)}, setCheckUrl(`${sourceUser}&${sql}`))

		axios({
				method: 'get',
				url: `/activites/contactsEntrant?${sourceUser}&${sql}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataDonughtE(res.data))
			// console.log(DataDonughtE)
			axios({
				method: 'get',
				url: `/activites/contactsSortant?${sourceUser}&${sql}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataDonughtS(res.data))
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
			url: '/activitexlsx/contacts/ref?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'contactREF.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
	}
	
	
	const exportApe = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/activitexlsx/contacts/ape?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'contactAPE.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
	}

				// Utiliser le composant JalonPie pour créer les donut ?
				// Props = Array de Object avec id / value / label
				// Object.entries(dataActi).map(([key1, value1]) => {
				// 	if(key1==='0'){
				// 			Object.entries(value1).map(([key, value]) => {
				// 	    	if(key!=='mois' && key!=='annee' && typeof(value) === 'number' && value == '*nb*'){
				// 	    		DoughnutData.push({id:key1,value:value,label:key});
				// 	    	}
				// 	    })
				// 	}
				// })



	const options = {
		// legend: {position: 'right',}
	}

	var DoughnutDataE = [];
	var DoughnutLabelE = [];

	var DoughnutDataS = [];
	var DoughnutLabelS = [];
	try {
		Object.entries(DataDonughtS[0]).map(([key, value]) => {
	    	DoughnutDataS.push(value);
	    	DoughnutLabelS.push(key);
    	})
    	Object.entries(DataDonughtE[0]).map(([key, value]) => {
	    	DoughnutDataE.push(value);
	    	DoughnutLabelE.push(key);
	    })

    	for (const [key, value] of Object.entries(dataActi[0])) {
			if(key.includes('tx')){
				if(key.includes('entrant')){
					var value1 = parseInt(value.slice(0,value.length -1))
					var label1 = key.slice(0,key.length).charAt(0).toUpperCase() + key.slice(0,key.length).slice(1).replace('_',' ').replace('_',' ');
				}else{
					var value2 = parseInt(value.slice(0,value.length -1))
					var label2 = key.slice(0,key.length).charAt(0).toUpperCase() + key.slice(0,key.length).slice(1).replace('_',' ').replace('_',' ');
				}
			}
		}
		// console.log(value2)
		
    } catch(error){}
	const date = DoughnutDataE[1] + '/' + DoughnutDataE[0]
	// label1?label1.replace('_',' '):label1=''
	const DoughnutTx = {
		labels: [label1 + ' (%)',label2 + ' (%)'],
		datasets: [{
			data: [value1,value2],
			backgroundColor: color
		}]
	};
	const data = {
		labels: DoughnutLabelE.slice(2),
		datasets: [{
			label: 'Contacts entrant',
			type:'bar',
			data: DoughnutDataE.slice(2),
			fill: false,
			backgroundColor: color[0],
		},{
			type: 'bar',
			label: 'Contacts sortant',
			data: DoughnutDataS.slice(2),
			fill: false,
			backgroundColor: color[1],
		}]
	};

	return (
		
	<div>
		<h4>Contacts DE inscrits au moins un jour dans le mois, affectés à un conseiller référent</h4>
		<h5>(sans situation, rattaché, en portefeuille)</h5>
		
		<div>
			
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Structure</InputLabel>
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
		<div className="div_graph" >
				{
					(date==='undefined/undefined') 
						? <Skeleton className="div_graph_date" variant="rect" width={100} height={20} />
						: <h2>{date}</h2>
				}
			
			<div className="Doughnut">
				<Paper>
					<Bar 
						data={data}
						width={500}  
			        	height={200}
						options={{ maintainAspectRatio: false}}
					/>
				</Paper>
				<Paper>
			        <Pie data={DoughnutTx}
		        		height={200}
			        	options={options} 
			        />
			    </Paper>
			</div>
			
		</div>
		<div>
			{!(dataActi.length>0) && <Skeleton variant="rect"height={118} />}
			<ContactTab dataActi={dataActi}/>	 	 
		</div>
		{(dataActi!==undefined && dataActi.length>0) &&
				
// import Excel from '../../main/export/Excel';
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
			/* <div className='excel'>
<ButtonGroup color="primary" aria-label="outlined primary button group" >
					<ButtonR variant="contained" color="primary" disableElevation startIcon={<SaveIcon />}>
					  Télécharger
					</ButtonR>
					<ButtonR onClick={exportRef}>REF</ButtonR>
					<ButtonR onClick={exportApe}>APE</ButtonR>
				</ButtonGroup>

					<p class="div_excel_p">Exportation </p>
					<div class="div_excel_img">

                		<GetAppOutlinedIcon fontSize="large" color="action" onClick={exportRef} />
						<img onClick={exportRef} data_dl={checkUrl} src={ref} alt='REF' title='Liste selon filtre par REF'/>
						<img onClick={exportApe} src={ape} alt='APE' title='Liste selon filtre par APE'/>
					</div>
				</div> */
			}
	</div>	

	);
};

export default Contacts;
