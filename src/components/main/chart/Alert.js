import React, {useState} from "react";
import CountUp from 'react-countup';

import Paper from '@material-ui/core/Paper';

function AlertR({data, color, title}) {

	return (
		// <div className='circleAlert' onMouseOver={showDetail} onMouseLeave={hideDetail}>	

			<div className="Alert_content"> 
				<p className="Alert_titre"><CountUp end={data} duration={4}/></p> 
				<p className="Alert_titre">{title}</p> 
			</div>
	
		// </div>
	);
}

export default AlertR;