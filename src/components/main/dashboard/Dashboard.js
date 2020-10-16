import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import imgJalon from "../../../image/card/jalon.jpeg";
import imgEFO from "../../../image/card/EFO.jpg";
import imgORE from "../../../image/card/ore.jpeg";
import imgEff from "../../../image/card/eff.jpg";

import './dashboard.css'
import TbCard from "./card/TbCard"

import ReactCardFlip from 'react-card-flip';
import CardEffectifs from './card/CardEffectifs';

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

	const [ dataDBJalon, setDataDBJalon ] = useState([]);
	const [ dataDBEfo, setDataDBEfo ] = useState([]);
	const [ dataDBOre, setDataDBOre ] = useState([]);
	const [ dataDBEff, setDataDBEff ] = useState([]);
	const [ dataDBCharge, setDataDBCharge ] = useState([]);
	const [ sourceDB, setSourceDB ] = useState('soon');
	const [ isFlipped, setIsFlipped ] = useState(false);
	

	const handleFlip = () => {
		// e.preventDefault();
		setIsFlipped (!isFlipped);
		}

	//function source according to the user
    const getSourceDB = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceDB(`dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceDB(`dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceDB( `dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceDB( `dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceDB(``)
                break;
                
            default : setSourceDB('soon') ;
		 }
		}

		useEffect(() => {
			getSourceDB(user.fonction_id, user.p_user,user.ape_id)
		   
			if(sourceDB !== 'soon'){
			axios({
			   method: 'get',
			   url: '/dashboard/jalon?' + sourceDB,
			   headers: {
				   Authorization: 'Bearer ' + Cookies.get('authToken')
			   }
		   })
		   .then((res) =>  setDataDBJalon(res.data))

		   axios({
			method: 'get',
			url: '/dashboard/efo?' + sourceDB,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setDataDBEfo(res.data))

		axios({
			method: 'get',
			url: '/dashboard/ore?' + sourceDB,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setDataDBOre(res.data))

		axios({
			method: 'get',
			url: '/dashboard/eff?' + sourceDB,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setDataDBEff(res.data))

		axios({
			method: 'get',
			url: '/dashboard/charge?' + sourceDB,
			headers: {
				Authorization: 'Bearer ' + Cookies.get('authToken')
			}
		})
		.then((res) =>  setDataDBCharge(res.data))
		   
	   }
   }
	   // eslint-disable-next-line react-hooks/exhaustive-deps
	   , [sourceDB,user])	



  	return (
  		
		  <div xs={12}>

  			<Paper className={classes.citation}>
  				<h5><p className="quote">‟</p> Quelques chiffres <p className="quote">”</p></h5>
  			</Paper>
			  
  			<div className={classes.div_card}>
				<Grid container justify="center" alignItems="stretch" spacing={2}>
					{(dataDBJalon.length > 0) 
					&&
						<TbCard 
							data={dataDBJalon.filter(el => el.lbl !== null)}
							link='main'
							img={imgJalon}
							title='Jalons'
							bulle='DE en portefeuille'
					  	/>
					}
		  			
					{(dataDBEfo.length > 0) 
					&&
						<TbCard 
							data={dataDBEfo} 
							link='main'
							img={imgEFO}
							title='EFO'
							bulle='DE en portefeuille ou rattachés'
						/>
					}

					{(dataDBOre.length > 0) 
					&&
						<TbCard 
							data={dataDBOre} 
							link='main'
							img={imgORE}
							title='ORE'
							bulle='DE en portefeuille'
						/>
					}
							
						<ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
								<CardEffectifs 
									dataEff={dataDBEff} 
									link='main'
									img={imgEff}
									title='Effectifs'
									bulle='Un portefeuille est comptabilisé quand il y a plus de 10 DE'
									flip={handleFlip}
								/>
								<CardEffectifs
									dataEff={dataDBCharge}
									link='main'
									img={imgEff}
									title='Charge moyenne'
									bulle='Charge moyenne DE en portefeuille'
									flip={handleFlip}
								/>
						</ReactCardFlip>
				</Grid>
			</div>
		</div>
				
		
  );
};

export default DashBoard;