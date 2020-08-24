import React, { useState } from "react";
import Onglet from './onglet/Onglet';
import "./pmp.css";
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';

const Tabs = props => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const activeTab = props.children[activeTabIndex];

    return (
        <div>
            {/* <ButtonGroup className="tabs" variant="contained" color="primary" aria-label="contained primary button group">
                {props.children.map((tab, i) => ( 
                    <Button onClick={() => { setActiveTabIndex(i); }} key={i}>
                        {tab.props.title}
                    </Button>
                    ))}
            </ButtonGroup> */}

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

export default function Pmp({dataDiagMod,handleChangeMod,dataDiag1,dataDiag2,dataDiag3,selected,handleClick,choice}) {
  return (
    <div className="App">
      <Tabs>
        <div title="Profil et situation">
            <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag1}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
        <div title="Projet professionnel">
        <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag2}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
        <div title="Marché du travail, environnement professionnel">
        <Onglet 
            dataDiagMod ={dataDiagMod}
            handleChangeMod={handleChangeMod}
            dataDiag={dataDiag3}
            selected={selected}
            handleClick={handleClick}
            choice={choice}
        />
        </div>
      </Tabs>
    </div>
  );
}