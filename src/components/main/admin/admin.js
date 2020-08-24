import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
// import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Cookies from 'js-cookie';
// import Snackbar from '@material-ui/core/Snackbar';
// import CloseIcon from '@material-ui/icons/Close';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
import Load from '../../load/Load'
import axios from 'axios';
import "./admin.css";
import {Line} from 'react-chartjs-2';

import { isUserPermitted } from '../../../utils/permissions';
import { LOAD_DATA, DISPLAY_STRUCTURE } from '../../../utils/permissionsTypes';
import { UserContext } from '../../../contexts/UserContext';

const Admin = props => {
  const [histoS, setHistoS] = useState()
  const [histoM, setHistoM] = useState()
  var DoughnutDataE = [];
  var DoughnutLabelE = [];
  var DoughnutDataE_M = [];
  var DoughnutLabelE_M = [];
  const { user } = useContext(UserContext);

  var isAdmin = false;
  if(user.fonction==='Admin'){
    var isAdmin = true;
  }
  

  useEffect(() => {
      axios({
        method: 'get',
        url: '/load/historicS',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setHistoS(res.data));
    
  }, []);
  useEffect(() => {
      axios({
        method: 'get',
        url: '/load/historicH',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setHistoM(res.data));
    
  }, []);

  try{
    for(var j=0;j<histoM.length;j++){
      DoughnutLabelE.push(Object.values(histoM[j])[1]);
      for(var z=0;z<histoS.length;z++){
        if(Object.values(histoM[j])[1] === Object.values(histoS[z])[1]){
          DoughnutDataE[j] = Object.values(histoS[z])[0]
          z = histoS.length;
        }else{
          DoughnutDataE[j] = 0
        }
        DoughnutDataE_M[j] = Object.values(histoM[j])[0]
      }
    }
  }
  catch(error){}

const Donut = {
  labels: DoughnutLabelE,
  datasets: [
    {
      label: 'Hebdomadaire',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: DoughnutDataE
    },{
      label: 'Mensuel',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#c9794b',
      borderColor: '#c9794b',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#c9794b',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#c9794b',
      pointHoverBorderColor: '#c9794b',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: DoughnutDataE_M
    }
  ]
};
    if(isAdmin){
    
    return (
      <div className='AppAdmin'>
      {isAdmin ? ( 
        <div>
          <h1>Administration</h1>
            <div className='flexbox'>
          	<div>
          		<h3>Importation des données</h3>
          		<div className="div_elmt">
          			<p className="div_elmt_p">T_Portefeuille</p>
          			<div className="div_elmt_wrapper">
           			<Load target='t_portefeuille' />
          			</div>
          		</div>
          		<div className="div_elmt">
          			<p className="div_elmt_p">T_EFO</p>
          			<div className="div_elmt_wrapper">
           			<Load target='t_efo' />
          			</div>
          		</div>
          		<div className="div_elmt">
          			<p className="div_elmt_p">T_activite</p>
          			<div className="div_elmt_wrapper">
           			<Load target='t_activites'/>
          			</div>
          		</div>
          	</div>
          	<div className="div_elmt_chart">
          		<h3>Nombres de visites</h3>
             <Line data={Donut}
                  width={500}
              />
          	</div>
          </div>
        </div> ):  <h1>Vous n'êtes pas autorisé à être ici {user.name} </h1>}
        
      </div>
  
  );
    }else{
      return (<Redirect to='/'/>);
    }
}

export default Admin

