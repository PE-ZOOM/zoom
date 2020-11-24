import React, { useContext, useState, useEffect } from "react";
import useStyles from '../../main/Navbar.js/filesForMaterialUi/useStyles';
import { Redirect } from "react-router-dom"
import Cookies from 'js-cookie';
import Load from '../../load/Load'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import { UserContext } from '../../../contexts/UserContext';
import List from '@material-ui/core/List';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import {Bubble} from 'react-chartjs-2';
// import Divider from '@material-ui/core/Divider';
import "./admin.css";

const Admin = props => {
  const classes = useStyles();

  const [historic, setHistoric] = useState() //A UTILISER POUR LE GRAPHIQUE CLICK
  const [historicNbPersonne, setHistoricNbPersonne] = useState() //A UTILISER POUR LE GRAPHIQUE PERSONNE
  const [historicBubble, setHistoricBubble] = useState() //A UTILISER POUR LE GRAPHIQUE PERSONNE

  const [tablePort, setT_port] = useState()
  const [tableEfo, setT_efo] = useState()
  const [tableAct, setT_activ] = useState()
  
  const { user } = useContext(UserContext);
	const [ sourceUser, 	setSourceUser 	 ] = useState('soon');
  const [listeChamps, setListeChamps] = useState([]);
  const [ sourceFilter, setSourceFilter ] = useState({
    
		annee: '2020',
		champs: 'all',
	});

  const color = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#e59b19', '#895d0f', '#5b3e0a']

  useEffect(() => {
		// console.log('source' + sourceUser )
		getSourceUser(user.fonction_id, user.p_user,user.ape_id)

		if(sourceUser !== 'soon'){
				
      axios({
        method: 'get',
        url: `/load/listechamps?${sourceUser}`,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken')
        }
      })
      .then((res) =>  setListeChamps(res.data));
			
		}}
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
  , [sourceUser,user])
  
  //function source according to the user
  const getSourceUser = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceUser(`dc_agentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
				setSourceUser(`dc_structureprincipalesuivi=${ape_id}`)
				// setSourceFilter({ ...sourceFilter, 'dc_structureprincipalesuivi': ape_id }); 
                break;
            //DTNE    
            case 3:
                setSourceUser( `dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceUser( `dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceUser(``)
                break;
                
            default : setSourceUser('soon') ;
		}
  }
  
  var isAdmin = false;
  if (user.fonction === 'Admin') {
    isAdmin = true;
  }

  useEffect(() => {
    

    
  }, [sourceUser,user]);

  useEffect(() => {

    let sql=''
		let i=0
		const newSourceFilter = Object.assign({}, sourceFilter)

		for (i=0;i<Object.keys(newSourceFilter).length;i++){
      sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]	
			if (i!==Object.keys(newSourceFilter).length-1){
        sql += '&'
			}
			// else{
			// 	sql=sql+Object.keys(newSourceFilter)[i]+'='+Object.values(newSourceFilter)[i]+'&'		
			// }
    }
    

    axios({
      method: 'get',
      url: `/load/historicClick?${sql}`,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    }).then((res) => setHistoric(res.data));


    axios({
      method: 'get',
      url: `/load/historicNbPersonne?${sql}`,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    }).then((res) => setHistoricNbPersonne(res.data));
    
    axios({
      method: 'get',
      url: `/load/historicBubble?${sql}`,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    }).then((res) => setHistoricBubble(res.data));

    
  }, [sourceFilter]);

  // console.log(historicNbPersonne)
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
      if (res.data.length > 0) {
        for (const [key] in res.data) {
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
      } else {
        setT_activ("??")
        setT_efo("??")
        setT_port("??")
      }
    });

  }, []);

  const data = {
    labels: [],
    datasets: []
  };
  const dataNbPersonne = {
    labels: [],
    datasets: []
  };
  const options = {
    maintainAspectRatio: false
  };
  

  if (historic && historicNbPersonne) {
    for(let i=0;i<historic.length;i++){
      for(let j=0;j<Object.entries(historic[i]).length;j++){
        if(j===0){
          // SI PREMIER ELMT = mois
          data['labels'].push(Object.entries(historic[i])[j][1])
          dataNbPersonne['labels'].push(Object.entries(historicNbPersonne[i])[j][1])
        }else if(i===0){
            // SI PREMIERE ITERATION, CREATION DES DATASETS
            data['datasets'].push(
              {
                label: Object.entries(historic[i])[j][0], 
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: color[j],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color[j],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(220,220,220,1)',
                pointHoverBorderColor: color[j],
                pointHoverBorderWidth: 2,
                pointRadius: 0.1,
                pointHitRadius: 10,
                data: [Object.entries(historic[i])[j][1]]

              }
            )

            dataNbPersonne['datasets'].push(
              {
                label: Object.entries(historicNbPersonne[i])[j][0], 
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: color[j],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color[j],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(220,220,220,1)',
                pointHoverBorderColor: color[j],
                pointHoverBorderWidth: 2,
                pointRadius: 0.1,
                pointHitRadius: 10,
                data: [Object.entries(historicNbPersonne[i])[j][1]]

              }
            )

        }else{
          // SI DATASETS DEJA CONSTRUIT 
            for(let z=0;z<data['datasets'].length;z++){
              if(data['datasets'][z].label === Object.entries(historic[i])[j][0]){
                data['datasets'][z].data.push(Object.entries(historic[i])[j][1])
              }
            }
            for(let z=0;z<dataNbPersonne['datasets'].length;z++){
              if(dataNbPersonne['datasets'][z].label === Object.entries(historicNbPersonne[i])[j][0]){
                dataNbPersonne['datasets'][z].data.push(Object.entries(historicNbPersonne[i])[j][1])
              }
            }

        }
      } // END LOOP j (nombre de mois)
      
    } // END LOOP i (nombre de colonne)
 
  } // END IF(historic)


  const handleChange = (event) => {
		const name= event.target.name
		const value = event.target.value; 
		setSourceFilter({ ...sourceFilter, [name]: value }); 
  };

  

  const dataBubble = {
    labels: [],
    datasets: []
  }


  if (historicBubble) {
    for(let i=0;i<historicBubble.length;i++){
      let compteur = 0;
      for(let j=0;j<Object.entries(historicBubble[i]).length;j++){
        
        if(j===0){
          // SI PREMIER ELMT = mois
          dataBubble['labels'].push(Object.entries(historicBubble[i])[j][1])
        }else if(i===0){
            let radius = (Object.entries(historicBubble[i])[j+1][1]/10)>0?Object.entries(historicBubble[i])[j+1][1]/10:5
            // SI PREMIERE ITERATION, CREATION DES DATASETS
            dataBubble['datasets'].push(
              {
                label: Object.entries(historicBubble[i])[j][0], 
                fill: false,
                lineTension: 0,
                backgroundColor: color[compteur],
                borderColor: color[compteur],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: color[compteur],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: color[compteur],
                pointHoverBorderColor: color[compteur],
                pointHoverBorderWidth: 2,
                pointRadius: 0.1,
                pointHitRadius: 10,
                data: [{x:Object.entries(historicBubble[i])[0][1],y:Object.entries(historicBubble[i])[j][1],r:radius}]

              }
            )
            j+=1;
            compteur += 1;

        }
        else{
          // SI DATASETS DEJA CONSTRUIT 
            for(let z=0;z<dataBubble['datasets'].length;z++){
              if(dataBubble['datasets'][z].label === Object.entries(historicBubble[i])[j][0]){
                dataBubble['datasets'][z].data.push({x:Object.entries(historicBubble[i])[0][1],y:Object.entries(historicBubble[i])[j][1],r:(Object.entries(historicBubble[i])[j+1][1]/10)})
              }
            }
            // for(let z=0;z<dataNbPersonne['datasets'].length;z++){
            //   if(dataNbPersonne['datasets'][z].label === Object.entries(historicBubble[i])[j][0]){
            //     dataNbPersonne['datasets'][z].data.push(Object.entries(historicBubble[i])[j][1])
            //   }
            // }

        }
      } // END LOOP j (nombre de mois)
      
    } // END LOOP i (nombre de colonne)
 
  } // END IF(historic)



  console.log(dataBubble)

  // const dataBubble = {
  //   labels: ["Aout","sept","oct","nov", "dec"],
  //   datasets: [
  //     {
  //       label: 'Contacts',
  //       fill: true,
  //       lineTension: 5,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 5,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 10,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 20,
  //       pointRadius: 50,
  //       pointHitRadius: 10,
  //       data: [{x:8,y:81,r:40},{x:9,y:87,r:4},{x:10,y:95,r:4},{x:11,y:108,r:5},{x:12,y:205,r:6}]
  //     },{
  //       label: 'Prestas',
  //       fill: true,
  //       lineTension: 0.1,
  //       backgroundColor: 'red',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 0,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 2,
  //       pointRadius: 5,
  //       pointHitRadius: 10,
  //       data: [{x:8,y:64,r:3},{x:9,y:80,r:9},{x:10,y:37,r:1},{x:11,y:94,r:2},{x:12,y:83,r:7}]
  //     },{
  //       label: 'Taux',
  //       fill: false,
  //       lineTension: 1,
  //       backgroundColor: 'yellow',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 0,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 2,
  //       pointRadius: 5,
  //       pointHitRadius: 50,
  //       data: [{x:8,y:12,r:4},{x:9,y:45,r:4},{x:10,y:37,r:8},{x:11,y:50,r:2},{x:12,y:42,r:3}]
  //     }
  //   ]
  // };

  if (isAdmin) {

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
              </div>

            </div>
            <div className="div_admin_elmt">
              <div className="flexbox">
                


              <div style={{height: "100%", width: "40%"}}>
                <FormControl variant="outlined" className={classes.formControl}>Nombre de cliques / Boutton</FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Année</InputLabel>
                      <Select
                      name="annee"
                      value={2020}
                      onChange={handleChange}
                      label="Année"
                      className={classes.select_orange}
                      >
                      {/* <MenuItem value="all"><em>Tous</em></MenuItem> */}
                      {['2020','2021'].map(value => (
                      <MenuItem 
                      key={value}
                      value={value}
                      >{value}</MenuItem>
                      ))}
                      </Select>
                    </FormControl> 
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Champs</InputLabel>
                      <Select
                      name="champs"
                      value={sourceFilter.champs}
                      onChange={handleChange}
                      label="Champs"
                      className={classes.select_orange}
                      >
                      {/* <MenuItem value="all"><em>Tous</em></MenuItem> */}
                      <MenuItem value="all"><em>Tous</em></MenuItem>
                      {listeChamps.map(option => (
                      <MenuItem 
                      key={option.champs}
                      value={option.champs}
                      >{option.champs}</MenuItem>
                      ))}
                      </Select>
                    </FormControl> 
                    <Paper>
                      <Line
                        data={data}
                        height={300}
                        options={options}
                      />
                    </Paper>
                </div>



                <div style={{height: "100%", width: "40%"}}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Année</InputLabel>
                      <Select
                      name="annee"
                      value={2020}
                      onChange={handleChange}
                      label="Année"
                      className={classes.select_orange}
                      >
                      {/* <MenuItem value="all"><em>Tous</em></MenuItem> */}
                      {['2020','2021'].map(value => (
                      <MenuItem 
                      key={value}
                      value={value}
                      >{value}</MenuItem>
                      ))}
                      </Select>
                    </FormControl> 
                    {/* <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label" className={classes.select_orange}>Champs</InputLabel>
                      <Select
                      name="champs"
                      value={sourceFilter.champs}
                      onChange={handleChange}
                      label="Champs"
                      className={classes.select_orange}
                      >
                        
                      <MenuItem value="all"><em>Tous</em></MenuItem>
                      {listeChamps.map(option => (
                      <MenuItem 
                      key={option.champs}
                      value={option.champs}
                      >{option.champs}</MenuItem>
                      ))}
                      </Select>
                    </FormControl>  */}

                    <Paper>
                      <Line
                        data={dataNbPersonne}
                        height={300}
                        options={options}
                      />
                    </Paper>
                </div>


                



              </div>
                
                <div style={{height: "100%", width: "40%"}}>
                    <Paper>
                    <Bubble data={dataBubble} 
                        height={500} width={500}/>
                    </Paper>
                </div>
                
            </div>

          </div>





        ) : <h5>Chargement...</h5>}

      </div>

    );
  } else {
    return (<Redirect to='/home/admin' />);
  }
}

export default Admin

