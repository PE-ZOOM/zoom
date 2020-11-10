import React from 'react';
import loaderlogo from '../../../image/card/abeille.gif';
import './abeille.css';

const Abeille = () => (
  <div className="loader-container">
    <img src={loaderlogo} alt="loaderlogo" className="loaderlogo" />
  </div>
);

export default Abeille;
