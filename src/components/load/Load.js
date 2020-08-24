import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import Cookies from 'js-cookie';
// import "./App.css";
import Loader from "./Loader";
import { Alert , AlertTitle } from '@material-ui/lab';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import CsvError from "./components/csvError";
// import Table from "./components/table";

class Load extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      error: false,
      finish: false,
      msgErr:"",
    };
    this.target = props.target;
  }

  // :::::::: CSV parser ::::::::::
  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };
  //::::::::::::::::::::::::::::::::

  //::::::::: for putting all data in CSV to MySQL :::::::::::
  handleForce = (data, fileInfo) => {
    const regDate= new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
    this.setState({ error: false });
    this.setState({ loading: true });
    for(var i=0; i<data.length;i++){
      Object.entries(data[i]).map(([k, v]) => {
        if(regDate.test(v)){
          var date = v.split('/')
          data[i][k] = date[2] + '-' + date[1] + '-' + date[0] //Formatage de la date en YYYY-MM-DD
        }
      });
    }

    let d = JSON.stringify({ ...data });
    fetch("/load/"+this.target, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + Cookies.get('authToken')

      },
      body: d,
    })
      .then((response) => {
        this.setState({ loading: false })
        return response.json();
        // if (response.ok) {
        //   return response.json();
        // } else {
        //   throw new Error("Something went wrong");
        // }
      })
      .then((responseJson) => {
        console.log("Etape 3")
        this.setState({ finish: true });
        console.log(responseJson)
        if(responseJson.err === 'true')
          {
            this.setState({ error: true });
            this.setState({ msgErr: responseJson.error });
            
          };
      })
  };
  //:::::::::::::::: End of POST call to save data ::::::::::::::



  

  render() {
    if (this.state.loading) return <Loader />;
    // if (this.state.error) return <CsvError />;
    return (
      <div className="wrapper">
        <div className="section1">
          <div className="container">
                <CSVReader
                  cssClass="react-csv-input"
                  label="Choisir un fichier :"
                  onFileLoaded={this.handleForce}
                  parserOptions={this.papaparseOptions}
                  url={this.url}
                />     
          </div>
        </div>

        {/* <div className="section2">
          
          <button className="button" onClick={this.loadClickHandler}>
            <span>Load Table </span>
          </button>

        </div> */}
        
        {(this.state.finish) &&
          [(this.state.error) 
            ? <Alert key='1' severity="error"><AlertTitle>Erreur</AlertTitle>{this.state.msgErr}</Alert> 
            : <Alert key='1'><AlertTitle>Upload Réussi !</AlertTitle>La mise à jours de la table {this.target} à bien été éffectuée.</Alert> 
          ]
          
        }


      </div>
    );
  }
}

export default Load;