import React from "react";
// import PieSVG from "./PieSVG";
import {Pie} from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';


function JalonPie({data, color}) {
  let DoughnutData = [];
  let DoughnutLabel = [];
  let DoughnutColor = [];
  let DoughnutHoverColor = [];

  const couleur = ['#EFEBEB','#F76F6F','#F8A449','#E8F171','#BEE198']

  // console.log(data)
    try{
      for(let i=0;i<=data.length;i++){
        DoughnutData.push(Math.round(Object.values(data[i])[1] * 100))
        DoughnutLabel.push(Object.values(data[i])[2])
        DoughnutColor.push(couleur[i])
        DoughnutHoverColor.push(couleur[i] + 'ba')
      }
    }
    catch(error){
      // console.error(error)
    }
    // console.log(DoughnutHoverColor)
    // try{

    //   console.log(Object.values(data[0]))
    // }catch(error){console.error(error)}

  // DoughnutData.push(data[1])
  // Object.entries(dataActi).map(([key1, value1]) => {
  //     // Pretty straightforward - use key for the key and value for the value.
  //     // Just to clarify: unlike object destructuring, the parameter names don't matter here.
    
  //   // console.log(key1)
  //   if(key1==='0'){
  //     // console.log('yes')
  //       Object.entries(value1).map(([key, value]) => {
  //         // console.log("Clé - valeur : " + key + " - " + value);
  //         DoughnutData.push(value);
  //         DoughnutLabel.push(key);
  //       })
  //   }
      // console.log("Clé ActiveData : " + key1)
      
     

  
  var options ={
      legend: {
          position: 'right',
      },
      // cutoutPercentage:20,

  };

  const DoughnutEntrant = {
    labels: DoughnutLabel,
    datasets: [{
      data: DoughnutData,
      backgroundColor: DoughnutColor,
      hoverBackgroundColor: DoughnutHoverColor,
      hoverBorderColor:DoughnutColor,
      hoverBorderWidth:2
    }]
  };

  return (
   <Paper>
      <h4>Tous motifs confondus (%)</h4>
      <Pie data={DoughnutEntrant} 
          options={options}
          width={400}
      />
  </Paper>
  );
}

export default JalonPie;