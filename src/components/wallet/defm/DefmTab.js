import React from "react";

import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';

import {Pie} from 'react-chartjs-2';

const DefmTab = ({data,selected,handleClick,isSelected, sourceUser, title, uniqueKey, prefixe, aide, format, onSelectAllClick}) => {

	const [open, setOpen] = React.useState(false);

	var DoughnutLabel = [];
	var DoughnutColor = ['#264653', '#2a9d8f', '#e76f51', '#f4a261', '#e9c46a', '#EBE5D5', '#FE7040', '#D93434'];
	var DoughnutHoverColor = [];
	var DoughnutData = [];

    data.map((key, index) => {
    	if(isSelected(prefixe + key.lbl)){
    		(format==='(%)')?DoughnutData.push(key.tx):DoughnutData.push(key.nb)
    		DoughnutLabel.push(key.lbl)
    	}
    })

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

	var options ={
		legend: {
			display: false,
		},
		title: {
         display: true,
         text: title + ' ' + format
        }
	};

	// const handleSelectAllClick = (event, data) => {
 //    if (event.target.checked) {
 //      console.log(data)
 //      data.map((item) => isSelected(prefixe + item.lbl))
 //    //   const newSelecteds = name;
 //    //   setSelected(newSelecteds);
 //    //   return;
 //    }
    // setSelected([]);
  // };
	

    return (
			<Paper className='paper_content'>
				<Table size="small" aria-label="a dense table" key={uniqueKey}>
					<TableHead>
						<TableRow className="Headcell">
							<TableCell component="th">
								<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
									{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
								</IconButton>
								{/* <Checkbox
						            // indeterminate={numSelected > 0 && numSelected < rowCount}
						            // checked={rowCount > 0 && numSelected === rowCount}
						            onClick={(event) => onSelectAllClick(event, prefixe, data)}
									// checked={chkbox}
						            // onChange={(event) => data.map((index)=>handleClick(event, prefixe + index.lbl))}
						            inputProps={{ 'aria-label': 'select all' }}
						          /> */}
					        </TableCell>
							<TableCell align="center" component="th">
								{title}
								{(aide) && <p className='paper_legend'>{aide}</p>}
							</TableCell>
							<TableCell component="th" scope="row">Qte {format}</TableCell>
						</TableRow>
					</TableHead>
				</Table>
				
				<div className='defm_graph'>
					{(DoughnutData.length>0) && 
						<Pie data={DoughnutEntrant} 
							options={options}
						/>
					}
				
				</div>
				<Collapse in={open} timeout="auto" unmountOnExit>
				<Table size="small" aria-label="a dense table" key={uniqueKey+1231}>
				
					<TableBody>
						
						{
						data.map((key, index) => {
							const isItemSelected = isSelected(prefixe + Object.values(key)[0].toString());
							return(
								<TableRow
									hover
									// role="checkbox"
									onClick={(event) => handleClick(event, prefixe + Object.values(key)[0].toString())}
									aria-checked={isItemSelected}
									tabIndex={-1}
									key={"axe/" + Object.values(key)[0].toString()} 
									selected={isItemSelected}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={isItemSelected}
											// inputProps={{ 'aria-labelledby': labelId }}
										/>
									</TableCell>
									<TableCell component="th" scope="row">{Object.values(key)[0].toString()}</TableCell>
									<TableCell component="th" scope="row">
									{(isItemSelected) && [
														(format==='(%)')
															?Object.values(key)[2].toString()
															:Object.values(key)[1].toString()
														]
									}
									</TableCell>
								</TableRow>
								)
							})
						}
						
					</TableBody>
				</Table>
				</Collapse>
			</Paper>
    );
  }


export default DefmTab;

