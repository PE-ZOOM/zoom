import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./truncate.css";

function Truncate() {
  const [test, setTest] = useState();

  const handleClickTrunCate = (event) => {
    axios({
        method: 'get',
        url: '/load/truncate?t_activites',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setTest(res.data));
    axios({
        method: 'get',
        url: '/load/truncate?t_efo',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setTest(res.data));
    axios({
        method: 'get',
        url: '/load/truncate?t_portefeuille',
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setTest(res.data));
   };

  return (
      <Button className='btn_trun' variant="contained" color="primary" onClick={handleClickTrunCate}>
        Vider les bases
      </Button>
  );
}

export default Truncate;