import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead'; 	
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

import Jalon from "../../image/card/jalonprojet.jpg";
import Activite from "../../image/card/activite.jpg";
import EFO from "../../image/card/EFO.jpg";
import './dashboard.css'

import TB_Card from './Card'

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
		width:'100%',
		height: 'auto',
		marginBottom: '2%',
	}
}));

const DashBoard = () => {
	const classes = useStyles();
	const { user } = useContext(UserContext);
	const [ jalon, setJalon ] = useState([]);
	const [ activite, setActivite ] = useState([]);
	const [ efo, setEfo ] = useState([]);
	// var nbDE = 0;
	
	useEffect(() => {
		var filtre;
		if(user.fonction_id===1){
			filtre='dc_dernieragentreferent='+user.p_user 
		}else if(user.fonction_id===6){
			filtre=''
		}
		else{
			filtre='dc_structureprincipalede='+user.ape_id
		}

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

		axios({
			method: 'get',
			url: `/dashboard/activite?${filtre}`,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setActivite(res.data));

	}, [user])
	var Jalon_Depasse 	= 0;
	var Jalon_Mois 		= 0;
	var jalon_Sans 		= 0;
	var EFO_C 			= 0;
	var EFO_O 			= 0;
	var nb_DE 			= 0;

	if(jalon.length > 0){
		jalon_Sans 		= jalon.reduce((total, currentValue) => total + currentValue[Object.keys(jalon[0])[1]], 0)
		Jalon_Depasse 	= jalon.reduce((total, currentValue) => total + currentValue[Object.keys(jalon[0])[2]], 0)
		Jalon_Mois 		= jalon.reduce((total, currentValue) => total + currentValue[Object.keys(jalon[0])[3]], 0)

	}
	if(efo.length > 0 && efo[1]){
		EFO_C = Object.values(efo[0])[0];
		EFO_O = Object.values(efo[1])[0];
	}
	if(activite.length > 0){
		nb_DE = Object.values(activite[0])[0];
	}
	// console.log(ja)
	// (jalon)

  	return (
  		<div xs={12} className={classes.test}>
  			<Paper className={classes.citation}>
  				<h5><p className="quote">‟</p> Une petite phrasounette pour dire qu'il faut regarder les autres alertes aussi ! <p className="quote">”</p></h5>
  			</Paper>
  			<div className={classes.test}>
				<Grid container justify="center" spacing={2}>
					
					{/* 
					<TB_Card 
						cle={5}
						label="Jalon"
						objet={jalon}
						link="jalons"

						/>
					*/}

					<Grid key={0} item component={Link} to="jalons">
							<Card className={classes.paper} component={Paper}>
								<CardActionArea>
									<CardMedia
										component="img"
										alt="Jalon"
										height="140"
										image={Jalon}
										title="Jalon"
									/>
									<Typography gutterBottom variant="h5" component="h2" className={classes.textImg}>
										Jalon {jalon.J}
									</Typography>
									<CardContent className={classes.body2}>
										
										<Table size="small" aria-label="a dense table">
											<TableBody>
												<TableRow>
													<TableCell align="left">Sans Jalon :</TableCell>
													<TableCell align="right">
													    {jalon_Sans===0
															?<Chip
														        label={jalon_Sans}
														        color="primary"
														      />
															:<Chip
														        label={jalon_Sans}
														        color="secondary"
														      />
														} 
													</TableCell>
												</TableRow> 
												<TableRow>
													<TableCell align="left">Jalon dépassé :</TableCell>
													<TableCell align="right">
														{Jalon_Depasse===0
															?<Chip
														        label={Jalon_Depasse}
														        color="primary"
														      />
															:<Chip
														        label={Jalon_Depasse}
														        color="secondary"
														      />
														}
													</TableCell>
												</TableRow> 
												<TableRow>
													<TableCell align="left">Jalon entre 0 et 30 Jrs :</TableCell>
													<TableCell align="right">
														{Jalon_Mois===0
															?<Chip
														        label={Jalon_Mois}
														        color="primary"
														      />
															:<Chip
														        label={Jalon_Mois}
														        color="secondary"
														      />
														}
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
									image={EFO}
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
													     {EFO_C===0
															?<Chip
														        label={EFO_C}
														        color="primary"
														      />
															:<Chip
														        label={EFO_C}
														        color="secondary"
														      />
														} 
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell align="left">EFO O :</TableCell>
													<TableCell align="right">
													     {EFO_O===0
															?<Chip
														        label={EFO_O}
														        color="primary"
														      />
															:<Chip
														        label={EFO_O}
														        color="secondary"
														      />
														} 
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
									image={Activite}
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
													    {nb_DE===0
															?<Chip
														        label={nb_DE}
														        color="primary"
														      />
															:<Chip
														        label={nb_DE}
														        color="secondary"
														      />
														} 
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>	

				</Grid>
			</div>

  		</div>
		
  );
};

export default DashBoard;