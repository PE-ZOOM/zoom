import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import clsx from 'clsx';
import useStyles from './Navbar.js/filesForMaterialUi/useStyles';
import NavbarV from './Navbar.js/NavbarV';
import { NavContext } from '../../contexts/NavContext';
import UpdateUser from '../connexion/UpdateUser';
import axios from 'axios';
import Cookies from 'js-cookie';

const Main = (props) => {

  const { user } = useContext(UserContext);
  const { idgasi } = user;
  // isOnline =1 or 0
  useEffect(() => {
    if (idgasi !== undefined) {
      axios({
        method: 'put',
        url: `/users/connection/${idgasi}`,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => res.data);
    }
    return () => {
      
      if (idgasi !== undefined) {
      axios({
        method: 'post',
        url: `/users/disconnection/${idgasi}`,
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => res.data);
    }
    };
  }, [idgasi]);

 
  const classes = useStyles();
  const { open, show, handleClose } = useContext(NavContext);

  return (
    <div className={classes.root}>
      <NavbarV />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}

        <UpdateUser show={show} handleClose={handleClose} />
       
      </main>
    </div>
  );
};

export default Main;
