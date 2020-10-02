import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import imgJalon from "../../../image/card/jalonprojet.jpg";
// import imgActivite from "../../../image/card/activite.jpg";
import imgEFO from "../../../image/card/EFO.jpg";
import './dashboard.css'
import Skeleton from '@material-ui/lab/Skeleton';
import TbCard from "./card/Card"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	// maxWidth: 345,
	},
	paper: {
		minHeight: 150,
		width: 300,
	},
	control: {
		padding: theme.spacing(2),
	},
  	textImg: {
		position: 'absolute',
		top: '30%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#4b9bc9cc',
    	width: '100%',
    	color: 'white',
	},
	link:{
		padding:'0px',
		textDecoration: 'none',
	},
	citation:{
		width:'70%',
		height: 'auto',
		marginRight: 'auto',
		marginLeft:  'auto',
		marginBottom: '2%',
	},
	div_card:{
		marginBottom:'2%',
	}
}));

const DashBoard = () => {
	const classes = useStyles();
	

	const { user } = useContext(UserContext);
	const [ jalon, setJalon ] = useState([]);
	// const [ activite, setActivite ] = useState([]);
	const [ efo, setEfo ] = useState([]);

	
	useEffect(() => {
		var filtre;

		if(user.fonction_id===1){
			filtre='dc_dernieragentreferent='+user.p_user 
		}else if(user.fonction_id>4){
			filtre=''
		}else if(user.fonction_id===4){
			filtre='dt='+user.fonction
		}
		else{
			filtre='dc_structureprincipalede='+user.ape_id
		}

		if(Object.entries(user).length !== 0){

			axios({
				method: 'get',
				url: `/dashboard/jalon?${filtre}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setJalon(res.data));

			axios({
				method: 'get',
				url: `/dashboard/efo?${filtre}`,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setEfo(res.data));

			// axios({
			// 	method: 'get',
			// 	url: `/dashboard/activite?${filtre}`,
			// 	headers: {
			// 		Authorization: 'Bearer ' + Cookies.get('authToken')
			// 	}
			// })
			// .then((res) =>  setActivite(res.data));

			// axios({
			// 	method: 'get',
			// 	url: `/dashboard/ore?${filtre}`,
			// 	headers: {
			// 		Authorization: 'Bearer ' + Cookies.get('authToken')
			// 	}
			// })
			// .then((res) =>  setORE(res.data[0].NbORE));
		}
	}, [user])

  	return (
  		<div xs={12}>

  			<Paper className={classes.citation}>
  				<h5><p className="quote">‟</p> Une petite phrasounette pour dire qu'il faut regarder les autres alertes aussi ! <p className="quote">”</p></h5>
  			</Paper>
			  
  			<div className={classes.div_card}>
				<Grid container justify="center" alignItems="stretch" spacing={2}>
					{(jalon.length > 0) 
					?
						<TbCard 
							data={jalon} 
							link='jalons'
							img={imgJalon}
							title='Jalons'
					  	/>
					:
						<Paper className='paper_content'>
							<Skeleton variant="rect" width={250} height={150} />
							<Skeleton variant="rect" className='skeleton_graph' height={20} />
							<Skeleton variant="rect" className='skeleton_graph' height={20} />
						</Paper>
					}
		  			
					{(efo.length > 0) 
					?
						<TbCard 
							data={efo} 
							link='efo'
							img={imgEFO}
							title='EFO'
						/>
					:
						<Paper className='paper_content'>
							<Skeleton variant="rect" width={250} height={150} />
							<Skeleton variant="rect" className='skeleton_graph' height={20} />
							<Skeleton variant="rect" className='skeleton_graph' height={20} />
						</Paper>
					}
				</Grid>
			</div>
				
			{ /* <div>


				    <Grid container justify="center">
				    	<Paper className="Alert">
							<AlertR title="ORE à valdier"
									data={ORE}
							/>
						</Paper>
					    <Paper className="Alert">
							<AlertR title="ORE à valdier"
									data={473}
							/>
						</Paper>
						<Paper className="Alert">
							<AlertR title="ORE à valdier"
									data={9999}
							/>
						</Paper>
				    </Grid>
			</div>
		*/ }

  		</div>
		
  );
};

export default DashBoard;