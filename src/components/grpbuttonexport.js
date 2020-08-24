import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

export default function BasicButtonGroup(valueIDE,valueREF,valueAPE) {

const classes = useStyles();

return (
	<div className={classes.root}>
		<ButtonGroup color="primary" aria-label="outlined primary button group" >
			<Button variant="contained" color="primary" disableElevation startIcon={<SaveIcon />}>
			  Télécharger
			</Button>
			<Button onClick={valueIDE}>IDE</Button>
			<Button onClick={valueREF}>REF</Button>
			<Button onClick={valueAPE}>APE</Button>
		</ButtonGroup>
	</div>
	);
}