import React from "react";
import OngletAutres from './onglet/OngletAutres';
import "./pmp.css";


export default function Autres({dataDiagMod,handleChangeMod,dataDiag1,selected,handleClick,choice}) {
  return (
    <div className="App">
        <div className="tab-content">
            <OngletAutres 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag1}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
    </div>
      
  );
}