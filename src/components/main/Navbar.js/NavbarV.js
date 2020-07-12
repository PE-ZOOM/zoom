import React, { useContext,useState, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { isUserPermitted } from '../../../utils/permissions';
import { LOAD_DATA, DISPLAY_STRUCTURE } from '../../../utils/permissionsTypes';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import MailIcon from '@material-ui/icons/Mail';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import useStyles from './filesForMaterialUi/useStyles';
import StyledBadge from './filesForMaterialUi/StyleBadge';
import useStylesPanel from './filesForMaterialUi/useStylesPanel';
import { NavContext } from '../../../contexts/NavContext';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './navbarV.css';

export default function NavbarV() {
	const classes = useStyles();
	const classesP = useStylesPanel();
	const theme = useTheme();

	const { open, handleDrawerOpen, handleDrawerClose, handleShow } = useContext(NavContext);
	const { user, deleteUser } = useContext(UserContext);

	const [ expanded, setExpanded ] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const history = useHistory();

	const logout = () => {
		Cookies.remove('authToken', user.token);
		history.push({ pathname: '/' })
		deleteUser();
	};

	const [ countPort, setCountPort ] = useState([]);
	const [ countEfo, setCountEfo ] = useState([]);
	const [ source, setSource ] = useState('');
	const [ sourceEfo, setSourceEfo ] = useState('');

    //count nav bar portefeuille
    const getCountPort = (fonction_id, p_user,ape_id) => {
		// console.log(fonction_id)
        switch (fonction_id) {
            //conseiller
            case 1:
                setSource(`/count/portefeuille?dc_dernieragentreferent=${p_user}`)
                break;
            //ELP    
            case 2:
                setSource(`/count/portefeuille?dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSource( `/count/portefeuille?dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSource( `/count/portefeuille?dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSource(`/count/portefeuille`)
                break;
                
            default : console.log('function_id missing') ;
		 }
		}

		useEffect(() => {
			 getCountPort(user.fonction_id, user.p_user,user.ape_id)
			//  console.log('source=' + source)
			 if(source !== ''){
			 axios({
				method: 'get',
				url: source,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setCountPort(res.data[0].nb))
			
		}
	}
		, [user.fonction_id, user.p_user,user.ape_id,source])


    //count nav bar efo
    const getCountEfo = (fonction_id, p_user,ape_id) => {
        switch (fonction_id) {
            //conseiller
            case 1:
                setSourceEfo(`/count/efo?dc_dernieragentreferent=${p_user}`)
                break;
			//ELP   
            case 2:
                setSourceEfo(`/count/efo?dc_structureprincipalede=${ape_id}`)
                break;
            //DTNE    
            case 3:
                setSourceEfo( `/count/efo?dt=DTNE`)
                break;
            //DTSO    
            case 4:
                setSourceEfo( `/count/efo?dt=DTSO`)
                break;
                
            //DR ADMIN
            case 5:
            case 6:
                setSourceEfo(`/count/efo`)
                break;
                
            default : console.log('function_id missing') ;
		 }
		}

		useEffect(() => {
			 getCountEfo(user.fonction_id, user.p_user,user.ape_id)
			//  console.log('sourceefo=' + sourceEfo)
			 if(sourceEfo !== ''){
			 axios({
				method: 'get',
				url: sourceEfo,
				headers: {
					Authorization: 'Bearer ' + Cookies.get('authToken')
				}
			})
			.then((res) =>  setCountEfo(res.data[0].nb))
		}
	}
		, [user.fonction_id, user.p_user,user.ape_id,sourceEfo])

		const UserConnected = () =>{
			console.log("liste user")
		}																									


	// console.log('Navbar user information: ', user)
	// console.log('Navbar count: ', countPort)
	// console.log('Navbar countefo: ', countEfo)

	return (
		<div>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="subtitle1" noWrap>
						Maj : 01/05/2020
					</Typography>
					<List>
					{isUserPermitted(LOAD_DATA, user.fonction) ? 
																											
						<IconButton aria-label="cart" onClick={UserConnected} >
							<StyledBadge badgeContent={5} color="secondary" max={999}>
								<SupervisedUserCircleIcon />
							</StyledBadge>
						</IconButton>
					
						:
							
						<IconButton aria-label="cart" >
							<StyledBadge badgeContent={5} color="secondary" max={999}>
								<SupervisedUserCircleIcon />
							</StyledBadge>
						</IconButton>
					}

						<IconButton>

							<MailIcon />
						</IconButton>
						<button onClick={logout}>Logout</button>
					</List>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={handleShow}>
						<div className="card mb-3">
							<div className="row no-gutters">
								<div className="col-8">
									{/* TODO: Understand why broken image is not functioning */}
									{/* <Avatar src="/broken-image.jpg" /> */}
								</div>
								<div className="col-12">
									<div className="card-body">
										<h5 className="card-title">{user.name}</h5>
										<p className="card-text">{user.fonction}</p>
										{isUserPermitted(DISPLAY_STRUCTURE, user.fonction) && (
											<p className="card-text">{user.libelle_ape}</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</ListItem>

					<div className={classesP.root}>
						<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography className={classesP.heading}>Portefeuille</Typography>
								<Typography className={classesP.secondaryHeading}>{countPort}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<ListItem>
									<Link className="" to="diag">
										Diagnostic
									</Link>
								</ListItem>
								<ListItem>
									<Link className="" to="jalons">
										Jalons
									</Link>
								</ListItem>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel2bh-content"
								id="panel2bh-header"
							>
								<Typography className={classesP.heading}>EFO</Typography>
								<Typography className={classesP.secondaryHeading}>{countEfo}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<ListItem>
									<Link className="" to="efo">
										EFO C/O en attente
									</Link>
								</ListItem>
							</ExpansionPanelDetails>
						</ExpansionPanel>
						<ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel3bh-content"
								id="panel3bh-header"
							>
								<Typography className={classesP.heading}>Activités</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<ListItem>
									<Link className="" to="contacts">
										Contacts
									</Link>
								</ListItem>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
					<ListItem>
						{isUserPermitted(LOAD_DATA, user.fonction) && (
							<Link className="" to="load">
								Load
							</Link>
						)}
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
}
