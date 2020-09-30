import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// import Activite from "../../../../image/card/activite.jpg";

import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
	paper: {
		minHeight: 150,
		width: 300,
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
}));

const TB_Card = (props) => {

	const classes = useStyles();
  	return (	
			<Grid key={0} item component={Link} to={props.link}>
				<Card className={classes.paper} component={Paper}>
					<CardActionArea>
						<CardMedia
							component="img"
							alt={props.title}
							height="140"
							image={props.img}
							title={props.title}
						/>
						<Typography gutterBottom variant="h5" component="h2" className={classes.textImg}>
							{props.title}
						</Typography>
						<CardContent>
							
							<Table size="small" aria-label="a dense table">
								<TableBody>
								{
									props.data.map((k)=>{
										if(k.lbl !== null){
										
										return(
												<TableRow key={k.nb}>
													<TableCell align="left">{k.lbl}</TableCell>
													<TableCell align="right">
													    {
													    
													    	k.nb===0
															?<Chip
														        label={k.nb}
														        color="primary"
														      />
															:
															<Chip
														        label={<CountUp end={k.nb} duration={5}/>}
														        color="secondary"
														      />
													} 
													</TableCell>
												</TableRow> 
											)
										}										
									})

								}
								</TableBody>
							</Table>
						</CardContent> 
					</CardActionArea>
				</Card>
		</Grid>	

	);
}

export default TB_Card