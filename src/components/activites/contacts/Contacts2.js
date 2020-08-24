import React, { useContext,useState, useEffect } from 'react';
// import { UserContext } from '../../../contexts/UserContext';
// import ContactTab from './ContactTab';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import ref from '../../../image/ref.png';
// import ape from '../../../image/ape.png';
// import './contact.css'

// import ListItem from '@material-ui/core/ListItem';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

// const useStyles = makeStyles((theme) => ({
// 	formControl: {
// 	  margin: theme.spacing(1),
// 	  minWidth: 120,
// 	},
// 	selectEmpty: {
// 	  marginTop: theme.spacing(1),
// 	},
//   }));

// const Contacts = () => {

// 	const classes = useStyles();


// 	const [ sourceFilter, setSourceFilter ] = useState({
// 		dc_structureprincipalesuivi: 'all',
// 		dc_modalitesuiviaccomp_id: 'all',
// 		annee: 'all',
// 	});

// 	const { user } = useContext(UserContext);
// 	const [ dataActi, setDataActi ] = useState([]);
// 	const [ sourceUser, setSourceUser ] = useState('soon');
// 	const [ listeStructure, setListeStructure] = useState([]);
//     const [ listeModAcc, setListeModAcc] = useState([]);
// 	const [ listeYear, setListeYear] = useState([]);

// 	// load dropdown from database listestructure - listeYear - listeModAcc
//     useEffect(() => {
// 		if(sourceUser !== 'soon'){

// 			axios({
// 				method: 'get',
// 				url: `/activites/listestructure?${sourceUser}`,
// 				headers: {
// 					Authorization: 'Bearer ' + Cookies.get('authToken')
// 				}
// 			})
// 			.then((res) =>  setListeStructure(res.data));

// 			axios({
// 				method: 'get',
// 				url: `/activites/listemodeacc?${sourceUser}`,
// 				headers: {
// 					Authorization: 'Bearer ' + Cookies.get('authToken')
// 				}
// 			})
// 			.then((res) =>  setListeModAcc(res.data));

// 			axios({
// 				method: 'get',
// 				url: `/activites/listeyear?${sourceUser}`,
// 				headers: {
// 					Authorization: 'Bearer ' + Cookies.get('authToken')
// 				}
// 			})
// 			.then((res) =>  setListeYear(res.data));
//     	}
// 	}, [sourceUser])


//     //function source according to the user
//     const getSourceUser = (fonction_id, p_user,ape_id) => {
// 		// console.log(fonction_id)
//         switch (fonction_id) {
//             //conseiller
//             case 1:
//                 setSourceUser(`dc_agentreferent=${p_user}`)
//                 break;
//             //ELP    
//             case 2:
// 				setSourceUser(`dc_structureprincipalesuivi=${ape_id}`)
// 				// setSourceFilter({ ...sourceFilter, 'dc_structureprincipalesuivi': ape_id }); 
//                 break;
//             //DTNE    
//             case 3:
//                 setSourceUser( `dt=DTNE`)
//                 break;
//             //DTSO    
//             case 4:
//                 setSourceUser( `dt=DTSO`)
//                 break;
                
//             //DR ADMIN
//             case 5:
//             case 6:
//                 setSourceUser(``)
//                 break;
                
//             default : setSourceUser('soon') ;
// 		}
// 	}

// 	useEffect(() => {
// 		// console.log('source : ' + user.ape_id )
// 		getSourceUser(user.fonction_id, user.p_user,user.ape_id)

// 		if(sourceUser !== 'soon'){
// 				axios({
// 					method: 'get',
// 					url: `/activites/contacts?${sourceUser}`,
// 					headers: {
// 						Authorization: 'Bearer ' + Cookies.get('authToken')
// 					}
// 				})
// 				.then((res) =>  setDataActi(res.data))
			
// 		}
// 	}
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	, [sourceUser,user])

// 	const handleChange = (event) => {
// 		const name= event.target.name
// 		const value = event.target.value; 
// 		setSourceFilter({ ...sourceFilter, [name]: value }); 
// 		// console.log('name : ' + name );
// 	 };
	   
// 	const [ checkUrl, setCheckUrl ] = useState('');

// 	const updateTable = () => {
// 		let sql=''
// 		const newSourceFilter = Object.assign({}, sourceFilter)
// 		if (user.fonction_id === 2) {
// 			delete newSourceFilter.dc_structureprincipalesuivi;
// 		}

// 		for (let i=0;i<Object.keys(newSourceFilter).length;i++){
// 			   if (i===Object.keys(newSourceFilter).length-1){
// 			   		sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]		
// 			   }
// 		   else{
// 		  		sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]+'&'		
// 		   }
// 		}
// 		//    console.log(sourceFilter)
// 		//    console.log(newSourceFilter)

// 		//    console.log(sql)
// 		axios({
// 			method: 'get',
// 			url: `/activites/contacts?${sourceUser}&${sql}`,
// 			headers: {
// 				Authorization: 'Bearer ' + Cookies.get('authToken')
// 			}
// 		})
// 		.then(res => {setDataActi(res.data)}, setCheckUrl(`${sourceUser}&${sql}`))
// 	}

// 	useEffect(() => {
// 		if(sourceUser !== 'soon'){
// 			updateTable()
// 		} 
// 	}
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	, [sourceFilter,sourceUser])

// 	//export excel
		
// 	const exportRef = () => {
// 		axios({
// 			method: 'get', 
// 			responseType: 'blob', 
// 			url: '/activitexlsx/contacts/ref?' + checkUrl,
// 			headers: {
// 				Authorization: 'Bearer ' + Cookies.get('authToken'),
// 			}
// 		})
// 		.then((response) => {
// 			const url = window.URL.createObjectURL(new Blob([response.data]));
// 			const link = document.createElement('a');
// 			link.href = url;
// 			link.setAttribute('download', 'contactREF.xlsx'); 
// 			document.body.appendChild(link);
// 			link.click();
// 		});
// 	}
	
	
// 	const exportApe = () => {
// 		axios({
// 			method: 'get', 
// 			responseType: 'blob', 
// 			url: '/activitexlsx/contacts/ape?' + checkUrl,
// 			headers: {
// 				Authorization: 'Bearer ' + Cookies.get('authToken'),
// 			}
// 		})
// 		.then((response) => {
// 			const url = window.URL.createObjectURL(new Blob([response.data]));
// 			const link = document.createElement('a');
// 			link.href = url;
// 			link.setAttribute('download', 'contactAPE.xlsx'); 
// 			document.body.appendChild(link);
// 			link.click();
// 		 });	
// 	}
	
// 	const [show, setShow] = useState(false);

// 	const handleClose = () => setShow(false);
// 	const handleShow = () => setShow(true);

// 	const test = () => {
// 		// console.log(dataActi)
// 		console.log(checkUrl)
// 	}
	
// 	return (
		
// 	<div>
// 		<button onClick={test}>TEST</button>
// 		<h4>Contacts 2 DE inscrits au moins un jour dans le mois, affectés à un conseiller référent</h4>
// 		<h5>(sans situation,rattaché,en portefeuille)</h5>
		
// 			<div>
// 			<Button variant="primary" onClick={handleShow}>
// 				Launch demo modal
// 			</Button>
// 			<Modal centered show={show} onHide={handleClose}>
// 				<Modal.Header closeButton>
// 					<Modal.Title>Choisir les filtres</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<FormControl variant="outlined" className={classes.formControl}>
// 						<InputLabel id="demo-simple-select-outlined-label">Structure</InputLabel>
// 						<Select
// 						name="dc_structureprincipalesuivi"
// 						value={sourceFilter.dc_structureprincipalesuivi}
// 						onChange={handleChange}
// 						label="Structure"
// 						>
// 						<MenuItem value="all"><em>Tous</em></MenuItem>
// 						{listeStructure.map(option => (
// 						<MenuItem 
// 						key={option.dc_structureprincipalesuivi}
// 						value={option.dc_structureprincipalesuivi}
// 						>{option.dc_structureprincipalesuivi}</MenuItem>
// 						))}
// 						</Select>
// 				</FormControl>
// 				<FormControl variant="outlined" className={classes.formControl}>
// 					<InputLabel id="demo-simple-select-outlined-label">Modalité d'acc</InputLabel>
// 					<Select
// 					name="dc_modalitesuiviaccomp_id"
// 					value={sourceFilter.dc_modalitesuiviaccomp_id}
// 					onChange={handleChange}
// 					label="Modalité d'acc"
// 					>
// 					<MenuItem value="all"><em>Tous</em></MenuItem>
// 					{listeModAcc.map(option => (
// 					<MenuItem 
// 					key={option.dc_modalitesuiviaccomp_id}
// 					value={option.dc_modalitesuiviaccomp_id}
// 					>{option.dc_modalitesuiviaccomp_id}</MenuItem>
// 					))}
// 					</Select>
// 				</FormControl>
// 				<FormControl variant="outlined" className={classes.formControl}>
// 					<InputLabel id="demo-simple-select-outlined-label">Année</InputLabel>
// 					<Select
// 					name="annee"
// 					value={sourceFilter.annee}
// 					onChange={handleChange}
// 					label="Année"
// 					>
// 					<MenuItem value="all"><em>Tous</em></MenuItem>
// 					{listeYear.map(option => (
// 					<MenuItem 
// 					key={option.annee}
// 					value={option.annee}
// 					>{option.annee}</MenuItem>
// 					))}
// 					</Select>
// 				</FormControl>
// 				</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="primary" onClick={handleClose}>
// 					Ok
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>

				
			               

// 			</div>
			
			
// 			<div>
// 			<ContactTab dataActi={dataActi}/>	 	 
// 			</div>
			
					
// 	</div>	
// 	)
// 	;
// };

// export default Contacts;

class Contacts extends React.Component {
  render() {
    return <p>Hello, world!</p>;
  }
}

export default Contacts; 


