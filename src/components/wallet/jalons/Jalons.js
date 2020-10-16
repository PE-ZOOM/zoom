import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import JalonPie from './JalonPie';
import JalonTab from './JalonTab';
import axios from 'axios';
import Cookies from 'js-cookie';
import './jalon.css'
import useStyles from '../../main/Navbar.js/filesForMaterialUi/useStyles';

import Skeleton from '@material-ui/lab/Skeleton'
// import {Pie} from 'react-chartjs-2';
// import ide from '../../../image/ide.png';
// import ref from '../../../image/ref.png';
// import ape from '../../../image/ape.png';

// EXCEL
import Excel from '../../main/export/Excel';

const Jalons = () => {
	const classes = useStyles();
	const { user } = useContext(UserContext);

	const [ dataJalon, setDataJalon ] = useState([]);
	const [ sourceJalon, setSourceJalon ] = useState('soon');

	//chart pie
	const [dataPie, setDataPie] = useState([])
	// const color = ['#6D6875', '#B5838D', '#E5989B', '#FFB4A2', '#FFCDB2'] //Défini les couleurs du tableau + donut
	const color = ['#EFEBEB','#F76F6F','#F8A449','#E8F171','#BEE198', '#6f51e7', '#c4ffff', '#e76fff']

    //function source according to the user
    const getCountJalon = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceJalon(`dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSourceJalon(`dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceJalon( `dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceJalon( `dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceJalon(``)
                break;
                
            default : setSourceJalon('soon') ;
		 }
		}

		

		useEffect(() => {
			 getCountJalon(user.fonction_id, user.p_user,user.ape_id)
			 // console.log('sourcejalon=' + sourceJalon)
			
			 if(sourceJalon !== 'soon'){
			 axios({
				method: 'get',
				url: '/jalons?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setDataJalon(res.data))
			
		}
	}
		// eslint-disable-next-line react-hooks/exhaustive-deps
		, [sourceJalon,user])

		const exportIDE = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/jalonxlsx/ide?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'jalonIDE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}

		const exportRef = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/jalonxlsx/ref?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'jalonREF.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}
		const exportApe = () => {
			axios({
				method: 'get', 
				responseType: 'blob', 
				url: '/jalonxlsx/ape?' + sourceJalon,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken'),
				}
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'jalonAPE.xlsx'); 
				document.body.appendChild(link);
				link.click();
			 });
			
		}

	
	const builtdatachart = () => {
		let tab = []
		const denom = dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[6]], 0)

		for (let i=1;i < 6;i++){
			try{
				tab.push({ id:i-1, value:dataJalon.reduce((total, currentValue) => total + currentValue[Object.keys(dataJalon[0])[i]], 0) / denom, str:Object.keys(dataJalon[0])[i]})
			}catch(error){}
		}
		return tab
	}	
		
		useEffect(() => {
			setDataPie(builtdatachart())	
   }
	   // eslint-disable-next-line react-hooks/exhaustive-deps
	   , [dataJalon])
	return (
		
	<div>
		<h4>Photo Jalons DE en portefeuille</h4>
		<div className={classes.excel}>
			<Excel
				handleIDE={exportIDE}
				handleREF={exportRef}
				handleAPE={exportApe}
			/>
			{/*<ButtonGroup color="primary" aria-label="outlined primary button group" >
				<ButtonR variant="contained" color="primary" disableElevation startIcon={<SaveIcon />}>
				  Télécharger
				</ButtonR>
				<ButtonR onClick={exportIDE}>IDE</ButtonR>
				<ButtonR onClick={exportRef}>REF</ButtonR>
				<ButtonR onClick={exportApe}>APE</ButtonR>
			</ButtonGroup>

			 <div className='excel'>
				<img onClick={exportIDE} src={ide} alt='IDE' title='Liste par IDE'/>
				<img onClick={exportRef} src={ref} alt='REF' title='Liste par REF'/>
				<img onClick={exportApe} src={ape} alt='APE' title='Liste par APE'/>
				</div>*/}
		</div>
		<div className="container-jalon">
		
			<div className="box">{!(dataJalon.length>0) && <Skeleton variant="rect"height={500} />}
				<JalonTab dataJalon={dataJalon} color={color}/>	 	 
			</div>
			<Skeleton variant="rect"height={118} />
			<div className="Doughnut">
				<JalonPie data={dataPie} color={color}/>
			</div>
			
		</div>

	
	</div>	
	)
	;
};

export default Jalons;
