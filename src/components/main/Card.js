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

import Activite from "../../image/card/activite.jpg";

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
	console.log(props.objet[0])
  	return (	

  		<div>
		<h1>TEST</h1>
			
			<Grid key={props.cle} item component={Link} to={props.link}>
				<Card className={classes.paper} component={Paper}>
					<CardActionArea>
						<CardMedia
							component="img"
							alt={props.label}
							height="140"
							image={Activite}
							title={props.label}
						/>
						<Typography className={classes.textImg} gutterBottom variant="h5" component="h2">
							{props.label}
						</Typography>
						<CardContent>
							<Table size="small" aria-label="a dense table">
								<TableBody>
									<TableRow>
										<TableCell align="left">Nb DE sans contact :</TableCell>
										<TableCell align="right">
											<Chip
										        label={props.objet.SJ}
										        color="secondary"
										      />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		</div>

	);
}

export default TB_Card