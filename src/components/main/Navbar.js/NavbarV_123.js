import React, { useContext, useState, useEffect, useRef } from 'react';
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
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import Button2 from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Contacts1 from '../../../components/activites/contacts/Contacts2';

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow2 = () => setShow(true);
  const [ listeStructure, setListeStructure] = useState([]);

  const [ sourceFilter, setSourceFilter ] = useState({
  dc_structureprincipalesuivi: 'all',
  dc_modalitesuiviaccomp_id: 'all',
  annee: 'all',
});


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

  // const datemaj = document.getElementById('/home/catherine/T_Port.csv').files[0].lastModifiedDate;

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

  //count nav bar portefeuille
  const getCountPort = (fonction_id, p_user, ape_id) => {
    // console.log(fonction_id)
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
        console.log('function_id missing');
    }
  };

  useEffect(() => {
    getCountPort(user.fonction_id, user.p_user, user.ape_id);
    //  console.log('source=' + source)
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
        console.log('function_id missing');
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
    //  console.log('sourceefo=' + sourceEfo)
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

  const [ checkUrl, setCheckUrl ] = useState('');

  const exportRef = () => {
      axios({
        method: 'get', 
        responseType: 'blob', 
        url: '/activitexlsx/contacts/ref?' + checkUrl,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        }
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'contactREF.xlsx'); 
        document.body.appendChild(link);
        link.click();
       });
    }
    
    const test = () => setShow(true);
  // const test = () => {
  //   // console.log(dataActi) handleShow
  //   console.log(checkUrl)
  // }

  // console.log('Navbar user information: ', user)
  // console.log('Navbar count: ', countPort)
  // console.log('Navbar countefo: ', countEfo)
  // console.log(onlineUsers);

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
            Maj : 01/05/2020
          </Typography>
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
                      {/* /count/showonlineusers */}
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
                        {/* close */}
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
                href="mailto:catblecon@gmail.com?subject=Hello%20Cathouuu!!!"
              >
                <MailIcon />
              </a>
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
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
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
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
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
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              
                <ListItem>
                  <Link
                    className=""
                    to="other"
                    onClick={() => {
                      handleHistoric('Autres');
                    }}
                  >
                    Autres
                  </Link>
                </ListItem>

                <ListItem>
                  <Link
                    className=""
                    to="diag"
                    onClick={() => {
                      handleHistoric('Diagnostic');
                    }}
                  >
                    Diagnostic
                  </Link>
                </ListItem>


                <ListItem>
                  <Link
                    className=""
                    to="jalons"
                    onClick={() => {
                      handleHistoric('Jalons');
                    }}
                  >
                    Jalons
                  </Link>
                </ListItem>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classesP.heading}>EFO</Typography>
                <Typography className={classesP.Heading}>
                  {countEfo.toLocaleString()}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ListItem>
                  <Link
                    className=""
                    to="efo"
                    onClick={() => {
                      handleHistoric('EFO');
                    }}
                  >
                    EFO C/O en attente
                  </Link>
                </ListItem>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classesP.heading}>Activités</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ListItem>
                  <Link
                    className=""
                    to="contacts"
                    onClick={() => {
                      handleHistoric('Contacts');
                    }}
                  >
                    Contacts
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    className=""
                    to="presta"
                    onClick={() => {
                      handleHistoric('Prestations');
                    }}
                  >
                    Prestations
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
        
        <button onClick={test}>TEST</button>

    <Contacts1/>
      </Drawer>
    </div>
  );
}
