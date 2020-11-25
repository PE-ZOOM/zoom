import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Excel from '../../main/export/Excel';
import useStyles from '../../main/Navbar.js/filesForMaterialUi/useStyles';
import {Line} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './taux.css'

const Taux = () => {
	const color = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#e59b19', '#895d0f', '#5b3e0a']

	const classes = useStyles();


	const [ sourceFilter, setSourceFilter ] = useState({
		dc_structureprincipalesuivi: 'all',
		dc_modalitesuiviaccomp_id: 'all',
		annee: 'all',
		nom_complet: 'all',
	});

	const { user } = useContext(UserContext);
	const [ dataActi, 		setDataActi 	 ] = useState([]);
	const [ sourceUser, 	setSourceUser 	 ] = useState('soon');
	const [ listeStructure, setListeStructure] = useState([]);
	const [ listeModAcc,	setListeModAcc	 ] = useState([]);
	const [ listeYear, 		setListeYear	 ] = useState([]);
	const [listeRef, setListeRef] = useState([]);

   // load dropdown from database 
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

		axios({
			method: 'get',
			url: `/activites/listeref?${sourceUser}`,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setListeRef(res.data));
	
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
					url: `/activites/taux?${sourceUser}`,
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
		let i=0
		const newSourceFilter = Object.assign({}, sourceFilter)
		if (user.fonction_id === 2) {
			delete newSourceFilter.dc_structureprincipalesuivi;
		}

		for (i=0;i<Object.keys(newSourceFilter).length;i++){
			if (i===Object.keys(newSourceFilter).length-1){
				sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]		
			
			}
			else{
				sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]+'&'		
			}
		}
		axios({
			method: 'get',
			url: `/activites/taux?${sourceUser}&${sql}`,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then(res => {
			setDataActi(res.data);
		}, setCheckUrl(`${sourceUser}&${sql}`))
	}

	useEffect(() => {
		if(sourceUser !== 'soon'){
			updateTable()
		} 
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, [sourceFilter,sourceUser])

        // export excel
        
	const exportRef = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/activitexlsx/taux/ref?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'tauxREF.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
	}
	
	
	const exportApe = () => {
		axios({
			method: 'get', 
			responseType: 'blob', 
			url: '/activitexlsx/taux/ape?' + checkUrl,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken'),
			}
		})
		.then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'tauxAPE.xlsx'); 
			document.body.appendChild(link);
			link.click();
		 });
		
	}
	
	const data = {
		labels: [],
		datasets: []
	};
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return value + '%';
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.value + '%';
                    return label;
                }
                
            }
        }
    }
    
    


	//année en cours
	const dataActiAnneeEnCours = dataActi.filter(el => el.annee === dataActi[0].annee)
	
	// colonnes pour schéma
	const dataActiAnneeEnCoursColonnes = dataActiAnneeEnCours.map(obj => {
		let result = {}
		for (let key in obj){
			if(!key.includes('annee') && !key.includes('mois')){
				result[key] = obj[key]
			}}
		return result
	})

	if(dataActiAnneeEnCours.length > 0){ 	
	 	
		for(let z=0; z<dataActiAnneeEnCours.length; z++){ // LOOP SUR TOUTES LES LIGNES DU TABLEAU DATAACTIV

				data['labels'].unshift(dataActiAnneeEnCours[z].mois) // RENSEIGNE LES MOIS CONNUS - UNSHIFT POUR INSERER AU DEBUT DU TABLEAU
				Object.entries(dataActiAnneeEnCoursColonnes[z]).map((v, index) => { // BOUCLE SUR CHAQUE COLONNE DU TABLEAU
					 
						if(z===0){  // SI PREMIERE ITERATION, CREATION DES OBJETS LINE

							data['datasets'].push(
								{
									label: v[0].replace(/_/g,' '), 
									fill: false,
									lineTension: 0,
									backgroundColor: 'rgba(75,192,192,0.4)',
									borderColor: color[index],
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: color[index],
									pointBackgroundColor: '#fff',
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: 'rgba(220,220,220,1)',
									pointHoverBorderColor: color[index],
									pointHoverBorderWidth: 2,
									pointRadius: 0.1,
									pointHitRadius: 10,
									data:[]
								
								}
							)
						} // END IF PREMIRE ITERATION

						// BOUCLE SUR LES OBJETS LINE
						// TEST SI LABEL DE L'OBJET CORRESPOND A LA LIGNE DE l'ITERATION v
						// AJOUTER LA VALEUR AU DEBUT DU TABLEAU AVEC UNSHIFT
						for(let z_data=0; z_data<data['datasets'].length; z_data++){ 
							if(v[0].replace(/_/g,' ')===data['datasets'][z_data].label){
								data['datasets'][z_data].data.unshift(parseFloat(v[1])) 
							}
						}

					// } // END IF INCLUDES
					return 'ok'; 
				})
			// }
		}
    }
    
	return (
		
	<div>
		{/* <button onClick={test}></button> */}
		<h4>Prestations DE inscrits au moins un jour dans le mois, affectés à un conseiller référent</h4>
		<h5>(sans situation,rattaché,en portefeuille)</h5>
		
			<div>
			<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Référent</InputLabel>
					<Select
					name="nom_complet"
					value={sourceFilter.nom_complet}
					onChange={handleChange}
					label="Référent"
					className={classes.select_orange}
					>
					<MenuItem value="all"><em>Tous</em></MenuItem>
					{listeRef.map(option => (
					<MenuItem 
					key={option.nom_complet}
					value={option.nom_complet}
					>{option.nom_complet}</MenuItem>
					))}
					</Select>
			</FormControl> 

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
                            options={options}
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
                {/* <PrestaTab dataActi={dataActi}/> */}
			</div>
            {
            // (dataActi!==undefined && dataActi.length>0) &&				
			}
		
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="right">Année</TableCell>
                    <TableCell align="right">Mois</TableCell>
                    <TableCell align="right" title='Pourcentage de DE avec prestation'>Pourcentage de DE avec prestation</TableCell>
                    <TableCell align="right" title='Pourcentage de DE avec une DPAE'>Pourcentage de DE avec une DPAE</TableCell>
                    <TableCell align="right" title='Pourcentage de DE avec une formation'>Pourcentage de DE avec une formation</TableCell>
                    <TableCell align="right" title="Pourcentage de contact à l'initiative du DE">Pourcentage de contact à l'initiative du DE</TableCell>
                    <TableCell align="right" title="Pourcentage de contact à l'initiative du PE">Pourcentage de contact à l'initiative du PE</TableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                    {dataActi.map((row) => (
                    
                    <TableRow key={row.annee+''+row.mois}>
                        <TableCell align="right">{row[Object.keys(dataActi[0])[0]].toLocaleString()}</TableCell> 
                        <TableCell align="right">{row[Object.keys(dataActi[0])[1]].toLocaleString()}</TableCell>
                        <TableCell align="right">{row[Object.keys(dataActi[0])[2]].toLocaleString()}</TableCell>
                        <TableCell align="right">{row[Object.keys(dataActi[0])[3]].toLocaleString()}</TableCell>
                        <TableCell align="right">{row[Object.keys(dataActi[0])[4]].toLocaleString()}</TableCell>
                        <TableCell align="right">{row[Object.keys(dataActi[0])[5]].toLocaleString()}</TableCell>
                        <TableCell align="right">{row[Object.keys(dataActi[0])[6]].toLocaleString()}</TableCell>

                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        
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


	</div>	
	)
	;
};

export default Taux;
