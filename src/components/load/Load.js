import React, { Component } from "react";

// import { CSVReader } from 'react-papaparse'
import Cookies from 'js-cookie';
import axios from 'axios';
import "./load.css";
import { Alert , AlertTitle } from '@material-ui/lab';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';


class Load extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, 
      error: false,
      finish: false,
      msgErr:"",
      nbLigne:this.props.stateprops,
      clear:this.props.clear,
      selectedFile: null,
      filename: 'Choisir un fichier',
      dateMaJ: props.date,
      warningCount:''
    };
    // this.buttonRef = React.createRef()
    this.hiddenFileInput = React.createRef()
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
  // componentDidUpdate() {
  //   // this.updateLigne()
  // }


  updateLigne() {
    let self = this;
    axios({
      method: 'get',
      url: `/load/nbligne?${this.props.target}`,
      headers: {
        Authorization: 'Bearer ' + Cookies.get('authToken'),
      },
    })
    .then((response) => {
      self.setState({nbLigne: response.data[0].nblig})
    })
  }

  uploadMAJ(table) {
   
    // A METTRE APRES UN ENREGISTREMENT DE DONNEES POUR METTRE A JOUR LA TABLE MAJ

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    var todayFR = dd + '/' + mm + '/' + yyyy

    let d = JSON.stringify({data:today,
                            table:this.props.target.slice(1)});

    fetch("/load/maj?", {
            // fetch("/load/"+this.props.target+'/'+count+':'+Math.ceil(d_arr.length/20000), {
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
              if(responseJson.err === 'true')
              {
                this.setState({ error: true });
              }else{
                // const dateMaJ = responseJson.arr[0].match(/\d+/g)
                // console.log(todayFR)
                this.setState({ dateMaJ: todayFR });
              }
            })
  }

  
 
    handleOnError = (err, file, inputElem, reason) => {
      console.log(err)
    } 



    handleChangeUploadFile = (event) => {
      // Lorsqu'un fichier est selectionné
      // console.log(event.target.files[0].name)
      // console.log(event.target.files[0])
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
        filename: event.target.files[0].name,
      })
    }

    handleClickUploadFile = () => {
      // Lors du clicque sur Valider
      this.setState({ finish: false, loading: true, error:false });
      const data = new FormData() 
      data.append('file', this.state.selectedFile)
      this.uploadMAJ(this.props.target.slice(1))
      axios({
        method: 'post',
        data: data,
        url: "/load/"+this.props.target.slice(1),
        headers: {
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
        validateStatus: (status) => {
          return true; // Truc bizarre pour que le CallBack s'execute
        },
        }).catch(error => {
    
        }).then((res) => {
            if(res.data.err === 'true')
            {
              this.setState({ error: true });
              res.data.errno===1366?this.setState({ msgErr: "Verifier que le fichier soit bien enregistrer en CSV UTF-8." }):this.setState({ msgErr: res.data.error });
            }else{
              this.setState({ loading: false, finish: true, nbLigne: res.data.arr.affectedRows, warningCount: res.data.arr.warningCount });
            }


          });
  }
  
  handleClickHidden = event => {
    // Bouton input caché pour changer le style du bouton, renvoi le click vers le input
    this.hiddenFileInput.current.click();
  };

  handleClickTrunCate = (event) => {
    // Requete pour effacer les tables
    fetch("/load/truncate?"+this.props.target.slice(1), {
        // fetch("/load/"+this.props.target+'/'+count+':'+Math.ceil(d_arr.length/20000), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + Cookies.get('authToken')

        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          if(responseJson.err !== 'true')
          {
            this.setState({ loading: false, finish: false, nbLigne: 0, filename: 'Choisir un fichier'});
          
          }else{
            console.log(responseJson.err)
          }
        })
  }


  render() {
    
    // if (this.state.loading) return <Loader />;
    // if (this.state.error) return <CsvError />;
    return (
      
      // <ListItem key={this.props.icone.toString()}>
      <ListItem>

        <ListItemAvatar > 
          <Avatar className="div_elmt_avatar">
            {
            this.props.icone==='1'
              ?<AccountBalanceWalletOutlinedIcon fontSize="small"/>
              :this.props.icone==='2'
                ? <ContactMailOutlinedIcon fontSize="small"/>
                : <PermContactCalendarOutlinedIcon fontSize="small"/>
            }
          </Avatar>
        </ListItemAvatar>

        <div className="ListItem_item">
          <ListItemText primary={this.props.title} secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {"Dernière MaJ : "+ this.state.dateMaJ}
              </Typography>
              {" " + this.state.nbLigne + " lignes."}
            </>
          }
           />
           
           {
              (this.state.finish) &&
              ((!this.state.error) ? <Alert className="List_alert"><AlertTitle>Upload Réussi !</AlertTitle>La mise à jours de la table {this.props.target} a bien été éffectuée. Warnings: {this.state.warningCount}</Alert> 
                :<Alert  severity="error" className="List_alert"><AlertTitle>Erreur</AlertTitle>{this.state.msgErr}</Alert>)
            }
            {

              // Si base vidable (props) + nbligne > 0
              // Affiche bouton vider la table
              // sinon affiche CSVReader

              (this.state.clear && this.state.nbLigne > 0) 

              ? 
              
                <Button className='btn_trun' variant="contained" color="primary" onClick={this.handleClickTrunCate}>
                  Vider
                </Button> 

              : 
                <div>  
                              <div className="form-group files">
                                <input type="file" ref={this.hiddenFileInput} style={{display: 'none'}} className="form-control" multiple="" onChange={this.handleChangeUploadFile}/>
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
                                        width: '80%'
                                      }}
                                    >
                                      {this.state.filename}
                                      
                                      
                                    </div>
                                    
                                    
                                    <Button
                                      type='button'
                                      onClick={this.handleClickHidden}
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
                                  {(this.state.selectedFile !== null) &&
                                    
                                      ((this.state.loading === true)
                                        ? <LinearProgress /> 
                                        :
                                          <Button
                                              type='button'
                                              onClick={this.handleClickUploadFile}
                                              style={{
                                                fonSsize: '10px',
                                                borderRadius: 0,
                                                marginLeft: 0,
                                                marginRight: 0,
                                                width: '40%',
                                                paddingLeft: 0,
                                                paddingRight: 0,
                                                color: 'white',
                                                background: '#4bc9b2'
                                              }}
                                            >
                                              Valider
                                        </Button> )
                                  }
                                {/* <button type="button" className="btn btn-success btn-block" onClick={this.handleClickUploadFile}>CHOISIR</button>  */}
                              </div>
                              
                        
                
                {/* <CSVReader
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
              </CSVReader> */}
              </div>
            }
          {/* {(this.state.loading) && <p>Parsing ok.<br/>Enregistrement des données, veillez patienter... {this.state.count_resp}/{this.state.nb_iteration}</p>} */}
    
        </div>
      </ListItem> 
    );
  }
}

export default Load;