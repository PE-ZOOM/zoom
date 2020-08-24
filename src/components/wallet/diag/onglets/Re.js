import React, { useState } from "react";
import Onglet from './onglet/Onglet';
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

export default function Re({dataDiagMod,handleChangeMod,dataDiag1,dataDiag2,dataDiag3,dataDiag4,selected,handleClick,choice}) {
  return (
    <div className="App">
      <Tabs>
        <div title="Stratégie">
            <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag1}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
        <div title="Techniques">
        <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag2}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
        <div title="Capacités numériques">
        <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag3}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
        <div title="Retour direct à l'emploi">
        <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag4}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
      </Tabs>
    </div>
  );
}