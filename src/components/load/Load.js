// import React, { Component } from "react";
// import CSVReader from "react-csv-reader";
// import Cookies from 'js-cookie';
// // import "./App.css";
// import Loader from "./Loader";
// import "./load.css";
// import { Alert , AlertTitle } from '@material-ui/lab';


// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
// import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
// import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
// import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
// import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';

// // import LinearProgress from '@material-ui/core/LinearProgress';
// // import CsvError from "./components/csvError";
// // import Table from "./components/table";

// class Load extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false, 
//       error: false,
//       finish: false,
//       msgErr:"",
//     };
//     this.target = props.target;
//     this.title = props.title;
//     this.icone = props.icone;
//     this.divider = props.divider;
//     this.date = props.date;
//   }
//   // :::::::: CSV parser ::::::::::
//   papaparseOptions = {
//     header: true,
//     dynamicTyping: true,
//     skipEmptyLines: true,
//     transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
//   };
//   //::::::::::::::::::::::::::::::::

//   //::::::::: for putting all data in CSV to MySQL :::::::::::
//   handleForce = (data, fileInfo) => {
//     const regDate= new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
//     this.setState({ error: false });
//     this.setState({ loading: true });
//     for(var i=0; i<data.length;i++){
//       Object.entries(data[i]).map(([k, v]) => {
//         if(regDate.test(v)){
//           var date = v.split('/')
//           data[i][k] = date[2] + '-' + date[1] + '-' + date[0] //Formatage de la date en YYYY-MM-DD
//         }
//       });
//     }

//     let d = JSON.stringify({ ...data });
//     fetch("/load/"+this.target, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: 'Bearer ' + Cookies.get('authToken')

//       },
//       body: d,
//     })
//       .then((response) => {
//         this.setState({ loading: false })
//         return response.json();
//         // if (response.ok) {
//         //   return response.json();
//         // } else {
//         //   throw new Error("Something went wrong");
//         // }
//       })
//       .then((responseJson) => {
//         console.log("Etape 3")
//         this.setState({ finish: true });
//         console.log(responseJson)
//         if(responseJson.err === 'true')
//           {
//             this.setState({ error: true });
//             responseJson.errno===1366?this.setState({ msgErr: "Verifier que le fichier soit bien enregistrer en CSV UTF-8. Sur Excel : Enregistrer sous > Format CSV UTF8" }):this.setState({ msgErr: responseJson.error });
            
//           };
//       })
//   };
//   //:::::::::::::::: End of POST call to save data ::::::::::::::



  

//   render() {
//     // if (this.state.loading) return <Loader />;
//     // if (this.state.error) return <CsvError />;
//     return (

//           <ListItem key={this.icone}>
//             <ListItemAvatar> 
//               <Avatar className="div_elmt_avatar">
//                 {this.icone==1
//                   ?<AccountBalanceWalletOutlinedIcon fontSize="small"/>
//                   :this.icone==2
//                     ? <ContactMailOutlinedIcon fontSize="small"/>
//                     : <PermContactCalendarOutlinedIcon fontSize="small"/>
//                 }
//               </Avatar>
//             </ListItemAvatar>

//             <div>
//               <ListItemText primary={this.title} secondary={this.date} />
//               {(this.state.loading)?<Loader />:(this.state.finish)?
//                 [(!this.state.error) 
//                   ? <Alert key={this.icone} className="List_alert"><AlertTitle>Upload Réussi !</AlertTitle>La mise à jours de la table {this.target} à bien été éffectuée.</Alert> 
//                   : <div><Alert key={this.icone} severity="error" className="List_alert"><AlertTitle>Erreur</AlertTitle>{this.state.msgErr}</Alert>
//                   <CSVReader
//                       cssClass="react-csv-input"
//                       onFileLoaded={this.handleForce}
//                       parserOptions={this.papaparseOptions}
//                       url={this.target}
//                     /></div> ]:
//                   <CSVReader
//                       cssClass="react-csv-input"
//                       onFileLoaded={this.handleForce}
//                       parserOptions={this.papaparseOptions}
//                       url={this.target}
//                     />}
//             </div>
//           </ListItem> 

            



 

      
//     );
//   }
// }

// export default Load;


import React, { Component, useState } from "react";

import { CSVReader } from 'react-papaparse'
// import CSVReader from "react-csv-reader";
import Cookies from 'js-cookie';
import axios from 'axios';
import Loader from "./Loader";
import "./load.css";
import { Alert , AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// const buttonRef = React.createRef()
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
      nbLigne:this.props.stateprops,
      stateprops:'',
    };
    this.buttonRef = React.createRef()
  }
  
    // :::::::: CSV parser ::::::::::
  // papaparseOptions = {
  //   header: true,
  //   dynamicTyping: true,
  //   skipEmptyLines: true,
  //   transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  // };
  //::::::::::::::::::::::::::::::::


  //:::::::::::::::: End of POST call to save data ::::::::::::::
  componentDidMount() {
    this.updateLigne()

  }
  componentDidUpdate() {
    // this.updateLigne()
  }


  updateLigne() {
    console.log("test")
    var self = this;
    axios.get(`/load/nbligne?${this.props.target}`)
    .then((response) => {
      self.setState({nbLigne: response.data[0].efo})
    })
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point 
    if (this.buttonRef.current) {
      this.buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data, fileInfo) => {
    this.setState({ finish: false, loading: true, error:false });
    let d_arr =[]
    //:::::::::::::::: Mise en forme de la Date :::::::::::::: 
    const regDate= new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
    for(var i=0; i<data.length;i++){
      Object.entries(data[i].data).map(([k, v]) => {
        if(regDate.test(v)){
          var date = v.split('/')
          data[i].data[k] = date[2] + '-' + date[1] + '-' + date[0] //Formatage de la date en YYYY-MM-DD
        }
      });
      d_arr.push({ ...data[i].data })
    }

    //:::::::::::::::: Découpage du tableau (trop de données d'un coup pour le serveur & navigateur) :::::::::::::: 
    var j = 0;
    var z = 0;

    while(z!==d_arr.length){
      z<1?j=0:j+=40000;
      z+=40000
      if(d_arr.length<z){
        z=d_arr.length
      }
      //:::::::::::::::: Envoi autant de requetes de 40k lignes de données que necessaire :::::::::::::: 
      let d = JSON.stringify({ ...d_arr.slice(j,z) });
      console.log(d_arr.slice(j,z))
      fetch("/load/"+this.props.target, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + Cookies.get('authToken')

        },
        body: d,
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          this.setState({ loading: false, finish: true });
          console.log(responseJson)
          if(responseJson.err === 'true')
            {
              this.setState({ error: true });
              responseJson.errno===1366?this.setState({ msgErr: "Verifier que le fichier soit bien enregistrer en CSV UTF-8. Sur Excel : Enregistrer sous > Format CSV UTF8" }):this.setState({ msgErr: responseJson.error });
              console.log(responseJson.error)
            };
        })
      
            
      
    this.updateLigne()
    }
  }
 
  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  } 

  render() {
    // if (this.state.loading) return <Loader />;
    // if (this.state.error) return <CsvError />;
    return (
      <ListItem key={this.props.icone.toString()}>
        <ListItemAvatar > 
          <Avatar className="div_elmt_avatar">
            {this.props.icone===1
              ?<AccountBalanceWalletOutlinedIcon fontSize="small"/>
              :this.props.icone===2
                ? <ContactMailOutlinedIcon fontSize="small"/>
                : <PermContactCalendarOutlinedIcon fontSize="small"/>
            }
          </Avatar>
        </ListItemAvatar>

        <div className="ListItem_item" >
          <ListItemText primary={this.props.title} secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {this.props.date}
              </Typography>
              {" - " + this.state.nbLigne + " lignes."}
            </React.Fragment>
          }
           />
           {(this.state.finish) &&
              [(!this.state.error) ? <Alert className="List_alert"><AlertTitle>Upload Réussi !</AlertTitle>La mise à jours de la table {this.props.target} à bien été éffectuée.</Alert> 
                :<Alert  severity="error" className="List_alert"><AlertTitle>Erreur</AlertTitle>{this.state.msgErr}</Alert>]}



            <CSVReader
              ref={this.buttonRef}
              onFileLoad={this.handleOnFileLoad}
              onError={this.handleOnError}
              onChange={this.handleOnChange}
              noDrag
              config={{
                header: true,
                // preview:4,
                dynamicTyping: true,
                skipEmptyLines: true,
                transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
              }}
              onRemoveFile={this.handleOnRemoveFile}
            >
              {({ file }) => (
                <aside
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10
                  }}
                >
                  
                  <div
                    style={{
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#ccc',
                      // height: 45,
                      // lineHeight: 2.5,
                      // marginTop: 5,
                      // marginBottom: 5,
                      paddingLeft: 13,
                      paddingTop: 3,
                      width: '60%'
                    }}
                  >
                    {file && file.name}
                  </div>
                  <Button
                    type='button'
                    onClick={this.handleOpenDialog}
                    style={{
                      fonSsize: '10px',
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '40%',
                      paddingLeft: 0,
                      paddingRight: 0,
                      color: 'white',
                      background: '#c9794b'
                    }}
                  >
                    Choisir
                  </Button>
                </aside>
              )}
          </CSVReader>

          {(this.state.loading) && <p>Parsing ok.<br/>Enregistrement des données, veillez patienter... :</p>}
        </div>
        {/*<Card variant="outlined">
          <Alert variant="outlined" severity="info">
            Nombre de ligne
          </Alert>
        </Card>
         <div className='ListItem_alert'>
                  
          </div> */}
      </ListItem> 
    );
  }
}

export default Load;