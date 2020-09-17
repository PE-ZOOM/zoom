import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import Cookies from 'js-cookie';
import Load from '../../load/Load'
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import { UserContext } from '../../../contexts/UserContext';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import "./admin.css";

const Admin = props => {
  const [histoS, setHistoS] = useState()
  const [histoM, setHistoM] = useState()
  const [maj, setMAJ] = useState()
  var DoughnutDataE = [];
  var DoughnutLabelE = [];
  var DoughnutDataE_M = [];
  const { user } = useContext(UserContext);

  var isAdmin = false;
  if(user.fonction==='Admin'){
    isAdmin = true;
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

   // }, 5000);


  useEffect(() => {
      axios({
        method: 'get',
        url: '/load/historicMAJ',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setMAJ(res.data));
    
  }, []);

  // console.log(maj)
  let t_act
  let t_efo 
  let t_port


  try{
    t_port = "Dernière MaJ : " + Object.values(maj[2])[0]
    t_efo = "Dernière MaJ : " + Object.values(maj[1])[0]
    t_act = "Dernière MaJ : " + Object.values(maj[0])[0]

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
// console.log(t_port)
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
      {t_port ? ( 
        <div>
          <div className="div_admin_elmt">
            <h1>Administration</h1>
              <div className="flexbox">
                <div className="div_elmt">
                  <p className="div_elmt_p">Importation</p>
                  <List>
                    <Load title="Portefeuille"
                          date={t_port}
                          target='/t_portefeuille'
                          icone="1"
                          clear={true}
                    />
                    <Divider variant="inset" component="li" key={10}/>
                    <Load title="EFO"
                          date={t_efo}
                          target='/t_efo'
                          icone="2"
                          clear={true}
                    />
                    <Divider variant="inset" component="li" key={20}/>
                    <Load title="Activité"
                          date={t_act}
                          target='/t_activites'
                          icone="3"
                          clear={false}
                    />
                  </List>
                </div>
              	<div className="div_elmt_item2">
                  <div className="div_elmt_chart">
                		<h3>Nombres de visites</h3>
                    <Line data={Donut}
                    />
                  </div>

                  <div className="div_admin_alert">
                    <ul>
                    <li> Graphique en temps réel
                    </li>
                    <li> Ajouter alerte admin
                    </li>
                    <li> Ajouter ORE a valider portefeuille ?
                    </li>
                    <li> DEFM
                    </li>
                    </ul>
                  </div>

              	</div>
              </div>
            
          </div>
         
        </div>





        ):  <h5>Chargement...</h5>}
        
      </div>
  
  );
    }else{
      return (<Redirect to='/home/admin'/>);
    }
}

export default Admin

