import React, { useState } from "react";
import OngletAide from './onglet/OngletAide';
import OngletAutres from './onglet/OngletAutres';
import OngletServices from './onglet/OngletServices';
import "./pmp.css";

const Tabs = props => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeTab = props.children[activeTabIndex];
  return (
    <div>
      <div className="tabs">
        {props.children.map((tab, i) => (
          <div
            className="tab-btn"
            onClick={() => {
              setActiveTabIndex(i);
            }}
            key={i}
          >
            {tab.props.title}
          </div>
        ))}
      </div>
      <div className="tab-indicator-container">
        <div
          className="tab-indicator"
          style={{
            width: 100 / props.children.length + "%",
            transform: `translateX(${activeTabIndex * 100}%)`
          }}
        />
      </div>
      <div className="tab-content">{activeTab.props.children}</div>
    </div>
  );
};

export default function Autres({dataDiagMod,handleChangeMod,dataDiag1,dataDiag2,dataDiag3,selected,handleClick,listeApe}) {
  return (

    <div className="App">
    <Tabs>
      <div title="Questionnement MSA">
      <OngletAide 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag1}
            selected={selected}
            handleClick={handleClick}
            
        />
      </div>
    
      <div title="Services">
            <OngletServices
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag2}
            selected={selected}
            handleClick={handleClick}
           
        />
        </div>
        <div title="Autres">
            <OngletAutres
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag3}
            selected={selected}
            handleClick={handleClick}
            listeApe={listeApe}
        />
        </div>
    </Tabs>
   </div>   
  );
}