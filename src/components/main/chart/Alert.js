import React, {useState} from "react";

function AlertR({data, color, title}) {

	const [ isHide, setIsHide ] = useState(true);

	const showDetail = (e) => {
		setIsHide(false)
	 }
	 const hideDetail = (e) => {
		setIsHide(true)
	 }

	return (
		<div className='circleAlert' onMouseOver={showDetail} onMouseLeave={hideDetail}>	
			<div className="circleAlert_content"> 
				{(isHide) ? <p className="circleAlert_titre">{data}</p> : 
				<p className="circleAlert_desc">{title}</p> 
				}
			</div>
		</div>
	);
}

export default AlertR;