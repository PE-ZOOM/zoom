import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import AlertR from './../chart/Alert'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead'; 	
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

import imgJalon from "../../../image/card/jalonprojet.jpg";
import imgActivite from "../../../image/card/activite.jpg";
import imgEFO from "../../../image/card/EFO.jpg";
import './dashboard.css'

import TB_Card from "./card/Card"

import Skeleton from '@material-ui/lab/Skeleton'
import CountUp from 'react-countup';

// import "./excel.css";
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

	const [ loadJalon, setLoadJalon ] = useState(false);
	const [ loadEFO, setLoadEFO ] = useState(false);
	// const [ loadActivite, setLoadActivite ] = useState(false);

	const [ jalon_Sans, setJalon_Sans ] = useState(0);
	const [ Jalon_Mois, setJalon_Mois ] = useState(0);
	const [ Jalon_Depasse, setJalon_Depasse ] = useState(0);
	// const [ ORE, setORE ] = useState(0);

	const [ EFO_C, setEFO_C ] = useState(0);
	const [ EFO_O, setEFO_O ] = useState(0);
	const [ nb_DE, setNb_DE ] = useState(0);
	
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


	useEffect(() => {
		// if(!loadJalon && jalon.length > 0){
		// 	setLoadJalon(true)
		// 	// setJalon_Sans	(jalon.reduce((total, currentValue) => total + currentValue[Object.keys(jalon[0])[1]], 0))
		// 	// setJalon_Depasse(jalon.reduce((total, currentValue) => total + currentValue[Object.keys(jalon[0])[2]], 0))
		// 	// setJalon_Mois	(jalon.reduce((total, currentValue) => total + currentValue[Object.keys(jalon[0])[3]], 0))
		// }
		if(!loadEFO && efo.length > 0){
			// console.log(efo)
			setLoadEFO(true)
			setEFO_C(Object.values(efo[0])[0]);
			if(efo.length > 1){
				setEFO_O(Object.values(efo[1])[0]);
			}
		}
		// if(!loadActivite && activite.length > 0){
		// 	setLoadActivite(true); 
		// 	setNb_DE(Object.values(activite[0])[0]);
		// }
	// }, [jalon, efo, activite])
	}, [jalon, efo])

	if(efo.length > 0 && efo[1]){
	}
	// console.log(ja)
	// (jalon)
	const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

  	return (
  		<div xs={12}>

  			<Paper className={classes.citation}>
  				<h5><p className="quote">‟</p> Une petite phrasounette pour dire qu'il faut regarder les autres alertes aussi ! <p className="quote">”</p></h5>
  			</Paper>
  			<div className={classes.div_card}>
				<Grid container justify="center" alignItems="stretch" spacing={2}>

					
					{(jalon.length > 0) 
					&& <TB_Card 
		  				data={jalon} 
		  				link='jalons'
		  				img={imgJalon}
		  				title='Jalons'
		  			/>}
		  			
		  			{(efo.length > 0) && <TB_Card 
		  				data={efo} 
		  				link='efo'
		  				img={imgEFO}
		  				title='EFO'
		  			/>}
		  		{/* 
		  			{(activite.length > 0) && <TB_Card 
		  				data={activite} 
		  				link='contacts'
		  				img={imgActivite}
		  				title='Activités'
		  			/>}
					
					<TB_Card 
						cle={5}
						label="Jalon"
						objet={jalon}
						link="jalons"

						/>
				

					<Grid key={0} item component={Link} to="jalons">
							<Card className={classes.paper} component={Paper}>
								<CardActionArea>
									<CardMedia
										component="img"
										alt="Jalon"
										height="140"
										image={imgJalon}
										title="Jalon"
									/>
									<Typography gutterBottom variant="h5" component="h2" className={classes.textImg}>
										Jalon {jalon.J}
									</Typography>
									<CardContent className={classes.body2}>
										
										<Table size="small" aria-label="a dense table">
											<TableBody>
												<TableRow>
													<TableCell align="left">Sans Jalon : </TableCell>
													<TableCell align="right">
														{loadJalon ? 
													    	jalon_Sans===0
																?<Chip
															        label={jalon_Sans}
															        color="primary"
															      />
																:<Chip
															        label={jalon_Sans}
															        color="secondary"
															      />
														:<CircularProgress />}

													</TableCell>
												</TableRow> 
												<TableRow>
													<TableCell align="left">Jalon dépassé :</TableCell>
													<TableCell align="right">
														{loadJalon ? 
															Jalon_Depasse===0
															?<Chip
														        label={Jalon_Depasse}
														        color="primary"
														      />
															:<Chip
														        label={Jalon_Depasse}
														        color="secondary"
														      />
														:<CircularProgress />}
													</TableCell>
												</TableRow> 
												<TableRow>
													<TableCell align="left">Jalon entre 0 et 30 Jrs :</TableCell>
													<TableCell align="right">
														{loadJalon ? 
															Jalon_Mois===0
															?<Chip
														        label={Jalon_Mois}
														        color="primary"
														      />
															:<Chip
														        label={Jalon_Mois}
														        color="secondary"
														      />
														:<CircularProgress />}
													</TableCell>
												</TableRow> 
												 
											</TableBody>
										</Table>
									</CardContent>
								</CardActionArea>
							</Card>
					</Grid>	
			
					<Grid key={1} item component={Link} to="efo">
						<Card className={classes.paper} component={Paper}>
							<CardActionArea>
								<CardMedia
									component="img"
									alt="EFO"
									height="140"
									image={imgEFO}
									title="EFO"
								/>
								<Typography gutterBottom variant="h5" component="h2" className={classes.textImg}>
									EFO
								</Typography>
								<CardContent>
									<Table size="small" aria-label="a dense table">
											<TableBody>
												<TableRow>
													<TableCell align="left">EFO C :</TableCell>
													<TableCell align="right">
													     {loadEFO ?
													     	EFO_C===0
															?<Chip
														        label={EFO_C}
														        color="primary"
														      />
															:<Chip
														        label={EFO_C}
														        color="secondary"
														      />
														:<CircularProgress />} 
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell align="left">EFO O :</TableCell>
													<TableCell align="right">
													     {loadEFO ?
													     	EFO_O===0
															?<Chip
														        label={EFO_O}
														        color="primary"
														      />
															:<Chip
														        label={EFO_O}
														        color="secondary"
														      />
														:<CircularProgress />} 
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>		
					<Grid key={2} item component={Link} to="contacts">
						<Card className={classes.paper} component={Paper}>
							<CardActionArea>
								<CardMedia
									component="img"
									alt="Activite"
									height="140"
									image={imgActivite}
									title="Activite"
								/>
								<Typography gutterBottom variant="h5" component="h2" className={classes.textImg}>
									Activite
								</Typography>
								<CardContent>
									<Table size="small" aria-label="a dense table">
											<TableBody>
												<TableRow>
													<TableCell align="left">Nb DE sans contact :</TableCell>
													<TableCell align="right">
													    {loadActivite ?
													    	nb_DE===0
															?<Chip
														        label={nb_DE}
														        color="primary"
														      />
															:<Chip
														        label={nb_DE}
														        color="secondary"
														      />
														:<CircularProgress />} 
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>	
*/ }
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