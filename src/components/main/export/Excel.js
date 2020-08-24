import React from 'react';
import Slide from '@material-ui/core/Slide';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import "./excel.css";

export default function SimpleSlide(props) {

	const [checked, setChecked] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	console.log()

	const handleClickREF = () => {
		props.handleREF();
		setOpen(true);
	};
	const handleClickIDE = () => {
		props.handleIDE();
		setOpen(true);
	};
	const handleClickAPE = () => {
		props.handleAPE();
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		return;
		}

		setOpen(false);
	};
	const handleChange = () => {
		setChecked((prev) => !prev);
	};
  return (
    <div className='AppExcel'>
    	<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			open={open}
			autoHideDuration={1500}
			onClose={handleClose}
			message="Téléchargement en cours ..."
			action={
			<React.Fragment>
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			</React.Fragment>
			}
		/>
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        	<div className='div-fab'>
			
			    {props.handleIDE!=='0' && <Fab className='btn' onClick={handleClickIDE}>IDE</Fab>}
			    {props.handleREF!=='0' && <Fab className='btn' onClick={handleClickREF}>REF</Fab>}
			    {props.handleAPE!=='0' && <Fab className='btn' onClick={handleClickAPE}>APE</Fab>}
		     </div>
        </Slide>
         <Tooltip title="Télécharger" aria-label="DL" placement="left" className="mytooltip">
	      	<Fab color="primary" aria-label="add" onClick={handleChange}>
		        <SaveIcon />
		    </Fab>
	     </Tooltip>
    
    </div>
  );
}
