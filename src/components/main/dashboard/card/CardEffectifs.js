import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EffectifsTab from './EffectifsTab';

// import Activite from "../../../../image/card/activite.jpg";

//import CountUp from 'react-countup';


const useStyles = makeStyles((theme) => ({
	paper: {
		minHeight: 150,
		width: 700,
	},
  	textImg: {
		position: 'relative',
		// top: '30%',
		// left: '50%',
		// transform: 'translate(-50%, -50%)',
		backgroundColor: '#4b9bc9',
    	width: '100%',
    	color: 'white',
	},
	link:{
		padding:'0px',
		textDecoration: 'none',
	},
}));

const CardEffectifs = ({link,title,dataEff,bulle,flip,titleflip}) => {

	const classes = useStyles();
  	return (	
			<Grid key={0} item component={Link} to={link}>
				<Card className={classes.paper} component={Paper}>
					<CardActionArea>
						{/* <CardMedia 
							component="img"
							alt={title}
							height="140"
							image={img}
							title={title}
							onClick={flip}
						/> */}
						<Typography gutterBottom variant="h5" component="h2">
							<br></br>
						</Typography>
						
						<Typography gutterBottom variant="h5" component="h2" className={classes.textImg}
						title={bulle}>
							{title}
						</Typography>
						<CardContent onClick={flip} title={titleflip}>
							<EffectifsTab 
							dataEff = {dataEff} />
						</CardContent> 
					</CardActionArea>
					
				</Card>
		</Grid>	

	);
}

export default CardEffectifs