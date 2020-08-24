import React from "react";
import {Pie} from 'react-chartjs-2';

function Donut({data, color, title}) {
  var DoughnutData = [];
  var DoughnutLabel = [];
  var DoughnutColor = [];
  var DoughnutHoverColor = [];

  console.log(data)
    try{
      for(var i=0;i<=data.length;i++){
        DoughnutData.push(Math.round(Object.values(data[i])[1] * 100))
        DoughnutLabel.push(Object.values(data[i])[2])
        DoughnutColor.push(color[i])
        DoughnutHoverColor.push(color[i] + 'ba')
      }
    }
    catch(error){
      // console.error(error)
    }
  
  var options ={
      legend: {
          position: 'right',
      },
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
   <div>
              <h2>{title}</h2>
              <Pie data={DoughnutEntrant} 
                  options={options}
                  width={300}
                  height={300}
              />
        </div>
  );
}

export default Donut;