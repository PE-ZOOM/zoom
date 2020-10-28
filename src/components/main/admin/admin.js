import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import Cookies from 'js-cookie';
import Load from '../../load/Load'
import axios from 'axios';
// import {Line} from 'react-chartjs-2';
import { UserContext } from '../../../contexts/UserContext';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import "./admin.css";

const Admin = props => {
  // const [histoS, setHistoS] = useState() //A UTILISER POUR LE GRAPHIQUE
  // const [histoM, setHistoM] = useState() //A UTILISER POUR LE GRAPHIQUE
  const [tablePort, setT_port] = useState()
  const [tableEfo, setT_efo] = useState()
  const [tableAct, setT_activ] = useState()
  // var DoughnutDataE = [];
  // var DoughnutLabelE = [];
  // var DoughnutDataE_M = [];
  const { user } = useContext(UserContext);

  var isAdmin = false;
  if(user.fonction==='Admin'){
    isAdmin = true;
  }

  // useEffect(() => {
  //     axios({
  //       method: 'get',
  //       url: '/load/historicS',
  //       headers: {
  //         Authorization: 'Bearer ' + Cookies.get('authToken'),
  //       },
  //     }).then((res) => setHistoS(res.data));
    
  // }, []);
  // useEffect(() => {
  //     axios({
  //       method: 'get',
  //       url: '/load/historicH',
  //       headers: {
  //         Authorization: 'Bearer ' + Cookies.get('authToken'),
  //       },
  //     }).then((res) => setHistoM(res.data));
    
  // }, []);

   


  useEffect(() => {
      axios({
        method: 'get',
        url: '/load/historicMAJ',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => {
        if(res.data.length>0){
          for (const [key] in res.data){
            switch (res.data[key].tableMAJ) {
              case 'T_Activites':
                setT_activ(res.data[key].dateMAJ)
                break;
              case 'T_Portefeuille':
                setT_port(res.data[key].dateMAJ)
                break;
              case 'T_EFO':
                setT_efo(res.data[key].dateMAJ)
                break;
              default:
                console.log("Date introuvable");
            }
          }
        }else{
          setT_activ("??")
          setT_efo("??")
          setT_port("??")
        }
      });
    
  }, []);

// const Donut = {
//   labels: DoughnutLabelE,
//   datasets: [
//     {
//       label: 'Hebdomadaire',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: DoughnutDataE
//     },{
//       label: 'Mensuel',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: '#c9794b',
//       borderColor: '#c9794b',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: '#c9794b',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: '#c9794b',
//       pointHoverBorderColor: '#c9794b',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: DoughnutDataE_M
//     }
//   ]
// };



    if(isAdmin){
    
    return (
      <div className='AppAdmin'>
      {tablePort ? ( 
        <div>
          <div className="div_admin_elmt">
            {/* <h1>Administration</h1> */}
              <div className="flexbox">
                <div className="div_elmt">
                  <p className="div_elmt_p">Importation</p>
                  <List>
                    <Load title="Portefeuille"
                          date={tablePort}
                          target='/T_Portefeuille'
                          icone="1"
                          clear={true}
                    />
                    {/* <Divider variant="inset" component="li" key={10}/> */}

                    <Load title="EFO"
                          date={tableEfo}
                          target='/T_EFO'
                          icone="2"
                          clear={true}
                    />
                    {/* <Divider variant="inset" component="li" key={20}/> */}

                    <Load title="Activité"
                          date={tableAct}
                          target='/T_Activites'
                          icone="3"
                          clear={false}
                    />
                  </List>
                </div>
              	{/* <div className="div_elmt_item2">
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

              	</div> */}
                
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

