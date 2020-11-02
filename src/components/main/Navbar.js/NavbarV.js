import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { isUserPermitted } from '../../../utils/permissions';
import { LOAD_DATA, DISPLAY_STRUCTURE } from '../../../utils/permissionsTypes';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
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

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionActions'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './navbarV.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import AirplayOutlinedIcon from '@material-ui/icons/AirplayOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import avatar from '../../../image/avatar.png';
import logo from '../../../image/zoom_logo.png';


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function NavbarV() {

  const classes = useStyles();
  const classesP = useStylesPanel();
  const theme = useTheme();

  const { open, handleDrawerOpen, handleDrawerClose, handleShow } = useContext(
    NavContext,
  );
  const { user, deleteUser } = useContext(UserContext);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const history = useHistory();

   const logout = () => {
    Cookies.remove('authToken', user.token);
    history.push({ pathname: '/' });
    deleteUser();
  };

  const [countPort, setCountPort] = useState([]);
  const [countEfo, setCountEfo] = useState([]);
  const [source, setSource] = useState('');
  const [sourceEfo, setSourceEfo] = useState('');
  const [countUsers, setCountUsers] = useState('');
  const [onlineUsers, setOnlineUsers] = useState('');
  const [maj, setMAJ] = useState('');

  //count nav bar portefeuille
  const getCountPort = (fonction_id, p_user, ape_id) => {

    switch (fonction_id) {
      //conseiller
      case 1:
        setSource(`/count/portefeuille?dc_dernieragentreferent=${p_user}`);
        break;
      //ELP
      case 2:
        setSource(`/count/portefeuille?dc_structureprincipalede=${ape_id}`);
        break;
      //DTNE
      case 3:
        setSource(`/count/portefeuille?dt=DTNE`);
        break;
      //DTSO
      case 4:
        setSource(`/count/portefeuille?dt=DTSO`);
        break;

      //DR ADMIN
      case 5:
      case 6:
        setSource(`/count/portefeuille`);
        break;

      default:
        // console.log('function_id missing');
    }
  };
  useEffect(() => {
      axios({
        method: 'get',
        url: `/load/historicMAJ?tableMAJ=T_Portefeuille`,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      })
      .then((res) =>  setMAJ(res.data[0].dateMAJ))
    
  }, []);

  useEffect(() => {
    getCountPort(user.fonction_id, user.p_user, user.ape_id);

    if (source !== '') {
      axios({
        method: 'get',
        url: source,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setCountPort(res.data[0].nb));
    }
  }, [user.fonction_id, user.p_user, user.ape_id, source]);

  //count nav bar efo
  const getCountEfo = (fonction_id, p_user, ape_id) => {
    switch (fonction_id) {
      //conseiller

      case 1:
        setSourceEfo(`/count/efo?dc_dernieragentreferent=${p_user}`);
        break;
      //ELP
      case 2:
        setSourceEfo(`/count/efo?dc_structureprincipalede=${ape_id}`);
        break;
      //DTNE
      case 3:
        setSourceEfo(`/count/efo?dt=DTNE`);
        break;
      //DTSO
      case 4:
        setSourceEfo(`/count/efo?dt=DTSO`);
        break;

      //DR ADMIN
      case 5:
      case 6:
        setSourceEfo(`/count/efo`);
        break;

      default:
        // console.log('function_id missing');
    }
  };

  useInterval(() => {
    axios({
      method: 'get',
      url: '/users/onlineusers',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    }).then((res) => setCountUsers(res.data[0].count));

  }, 1000);


  useEffect(() => {
    getCountEfo(user.fonction_id, user.p_user, user.ape_id);

    if (sourceEfo !== '') {
      axios({
        method: 'get',
        url: sourceEfo,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setCountEfo(res.data[0].nb));
    }
  }, [user.fonction_id, user.p_user, user.ape_id, sourceEfo]);

  const UserConnected = () => {
    axios({
      method: 'get',
      url: '/users/showonlineusers',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    }).then((res) => setOnlineUsers(res.data));
  };

  const handleHistoric = (link) => {
    const jsDate = new Date();
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1;
    const day = jsDate.getDate();
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();
    const date = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    const idgasi = user.idgasi;
    const button = link;
    const historic = { idgasi: idgasi, date: date, button: button };

    axios({
      method: 'post',
      data: historic,
      url: `/historic`,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    }).then((res) => res.data);
  };

  // const [ checkUrl, setCheckUrl ] = useState('');

    // const classes2 = useStyles2();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
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
            Maj : {maj}
          </Typography>
          <div>

          {isUserPermitted(LOAD_DATA, user.fonction) && (
          <Link to="admin">
            <Button
              className="MuiButton_toolbar"
              startIcon={<SupervisorAccountIcon />}
            >
              Administration
            </Button>
          </Link>
          )}
          </div>

          <List>

            {isUserPermitted(LOAD_DATA, user.fonction) ? (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      {...bindTrigger(popupState)}
                    >
                      <div aria-label="cart" onClick={UserConnected}>
                        <StyledBadge
                          badgeContent={countUsers}
                          color="secondary"
                          max={999}
                        >
                          <SupervisedUserCircleIcon />
                        </StyledBadge>
                      </div>
                    </Button>
                    <Menu {...bindMenu(popupState)} className="menu">
                    
                      {onlineUsers.length > 0 &&
                        onlineUsers.map((user) => (
                          <MenuItem key={user.idgasi} className="menu-item">
                            <span id="id-user">{user.idgasi}</span> {user.name}{' '}
                            - {user.fonction}
                          </MenuItem>
                        ))}
                      <MenuItem
                        onClick={popupState.close}
                        className="menu-close"
                      >
                        
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            ) : (
              <IconButton aria-label="cart">
                <StyledBadge
                  badgeContent={countUsers}
                  color="secondary"
                  max={999}
                >
                  <SupervisedUserCircleIcon />
                </StyledBadge>
              </IconButton>
            )}

            <IconButton>
              <a
                className="mailto"
                href="mailto:reunionperformance.97410@pole-emploi.fr?subject=Zoom"
              >
                <MailIcon />
              </a>
            </IconButton>
            <Button className="MuiButton_toolbar" onClick={logout} startIcon={<ExitToAppIcon />}>Logout</Button>
          </List>
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} id="navbar-back">
          <div className="navbar-back-img"> 
            <Link to='/'><img src={logo} alt={logo} /></Link>
          </div>
          <div className="navbar-back-btn">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          </div>
        </div>
        <Divider />
        <List>
        
        <ListItem button onClick={handleShow}>
        <div className="card card-navbar">
            <div className="card-header">
                <Avatar  alt={user.name} src={avatar} className={classes.orange} />
            </div>
            <div className="card-body card-center">
                <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.fonction}</p>
                    
                    {isUserPermitted(DISPLAY_STRUCTURE, user.fonction) && (
                      <p className="card-text">{user.libelle_ape}</p>
                    )}
            </div>
        </div>
        </ListItem>

          <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
              <Typography className={classesP.heading}>
                Portefeuille
              </Typography>
              <Typography className={classesP.Heading}>
                {countPort.toLocaleString()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails 
              className="Accordion_menu">
              <ListItem button component={Link} to="diag" selected={selectedIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}>
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                  <ListItemText primary="Diagnostic/Caractéristiques" onClick={() => {
                  handleHistoric('Diagnostic');
                  }} />
              </ListItem>
              <ListItem button component={Link} to="jalons" selected={selectedIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}>
                <ListItemIcon>
                  <FlagOutlinedIcon />
                </ListItemIcon>
                  <ListItemText primary="Jalons" onClick={() => {
                  handleHistoric('Jalons');
                  }} />
              </ListItem>
              {/* <ListItem button component={Link} to="defm" selected={selectedIndex === 13}
              onClick={(event) => handleListItemClick(event, 13)}>
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                  <ListItemText primary="DEFM" onClick={() => {
                  handleHistoric('DEFM');
                  }} />
              </ListItem> */}
              </AccordionDetails>
          </Accordion>

          <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
              <Typography className={classesP.heading}>
                EFO
              </Typography>
              <Typography className={classesP.Heading}>
                {countEfo.toLocaleString()}
              </Typography>
            </AccordionSummary>
            <AccordionDetails 
              className="Accordion_menu">
            
              <ListItem button component={Link} to="efo" selected={selectedIndex === 21}
                  onClick={(event) => handleListItemClick(event, 21)}>
                  <ListItemIcon>
                      <HourglassEmptyRoundedIcon />
                  </ListItemIcon>
                      <ListItemText primary="EFO C/O en attente" onClick={() => {
                        handleHistoric('EFO');
                      }} />
              </ListItem>
              </AccordionDetails>
          </Accordion>

          <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
              <Typography className={classesP.heading}>
                Activités
              </Typography>
            </AccordionSummary>
            <AccordionDetails 
              className="Accordion_menu">
            
              <ListItem button component={Link} to="contacts" selected={selectedIndex === 31}
                  onClick={(event) => handleListItemClick(event, 31)}>
                  <ListItemIcon>
                      <PermContactCalendarOutlinedIcon />
                  </ListItemIcon>
                      <ListItemText primary="Contacts" onClick={() => {
                        handleHistoric('Contacts');
                      }} />
              </ListItem>
               <ListItem button component={Link} to="presta" selected={selectedIndex === 32}
                  onClick={(event) => handleListItemClick(event, 32)}>
                  <ListItemIcon>
                      <AirplayOutlinedIcon />
                  </ListItemIcon>
                      <ListItemText primary="Prestations" onClick={() => {
                        handleHistoric('Prestations');
                      }} />
              </ListItem>
              </AccordionDetails>
          </Accordion>
          
        </List>
      </Drawer>
    </div>
  );
}
