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
      dateMaJ: props.date
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
  componentDidUpdate() {
    // this.updateLigne()
  }


  updateLigne() {
    var self = this;
    axios.get(`/load/nbligne?${this.props.target}`)
    .then((response) => {
      self.setState({nbLigne: response.data[0].efo})
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
                console.log(todayFR)
                this.setState({ dateMaJ: todayFR });
              }
            })
  }

  // handleOpenDialog = (e) => {
  //   // Note that the ref is set async, so it might be null at some point 
  //   if (this.buttonRef.current) {
  //     this.buttonRef.current.open(e)
  //   }
  // }

  // handleOnFileLoad = (data, fileInfo) => {
    
  //   let d_arr =[]
  //   let count_resp_max = 0;
    
  //       //:::::::::::::::: Mise en forme de la Date :::::::::::::: 
  //       // const regDate= new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);
  //       // for(i; i<data_lenght;i++){
  //       //   for(const [key, value] of Object.entries(data[i].data)){
  //       //     if(regDate.test(value)){
  //       //       var date = value.split('/')
  //       //       data[i].data[key] = date[2] + '-' + date[1] + '-' + date[0] //Formatage de la date en YYYY-MM-DD
  //       //     }
  //       //   }

  //       //   d_arr.push({ ...data[i].data })
  //       // }
  //       //:::::::::::::::: Découpage du tableau (trop de données d'un coup pour le serveur & navigateur) :::::::::::::: 
  //   d_arr = data;

  //   count_resp_max = Math.ceil(d_arr.length/20000);
  //   this.setState({ finish: false, loading: true, error:false, nb_iteration:count_resp_max });
  //   let d = 0;
    
  //   for (let z=1; z<=Math.ceil(d_arr.length/20000);z++){
  //     if(z===Math.ceil(d_arr.length/20000)){
  //       d = JSON.stringify({ ...d_arr.slice(20000*(z-1),d_arr.length) });
  //     }else{
  //       d = JSON.stringify({ ...d_arr.slice(20000*(z-1),20000*z) });
  //     }
  //     // console.log(d_arr.slice(20000*(z-1),d_arr.length))
  //     // if(d_arr_length<z){
  //     //   z=d_arr.length
  //     // }  
    
  //   // for (let z=0; z!==d_arr_length;z++){
      
  //   //   z<1?j=0:j+=20000;
  //   //   z+=20000
  //   //   if(d_arr_length<z){
  //   //     z=d_arr.length
  //   //   }
  //   //   //:::::::::::::::: Envoi autant de requetes de 20k lignes de données que necessaire :::::::::::::: 
  //   //   // Compter le nombre d'itération pour la reception des données
  //   //   //  max:Math.ceil(d_arr.length/20000) 
      
  //   //   console.log(d_arr_length)
  //     // let d = {data: JSON.stringify({ ...d_arr.slice(j,z) }), count: count, total: Math.ceil(d_arr.length/20000)}
  //     fetch("/load/"+this.props.target.slice(1), {
  //       // fetch("/load/"+this.props.target+'/'+count+':'+Math.ceil(d_arr.length/20000), {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: 'Bearer ' + Cookies.get('authToken')

  //       },
  //       body: d,
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((responseJson) => {
  //         this.setState({
  //           count_resp:this.state.count_resp + 1
  //         });
  //         if(this.state.count_resp===count_resp_max){
  //           this.setState({ loading: false, finish: true, count_resp: 0});
  //           this.updateLigne() //A mettre a chaque itération, serveur pas assez puissant ?

  //           // METTRE A JOUR LA TABLE MAJ
            

  //         }

  //         if(responseJson.err === 'true')
  //           {
  //             this.setState({ error: true });
  //             z = Math.ceil(d_arr.length/20000); //Mettre fin à la boucle while
  //             responseJson.errno===1366?this.setState({ msgErr: "Verifier que le fichier soit bien enregistrer en CSV UTF-8. Sur Excel : Enregistrer sous > Format CSV UTF8" }):this.setState({ msgErr: responseJson.error });
  //             console.log(responseJson.error)
  //           };
  //       })
   
  //   }
  // }
 
    handleOnError = (err, file, inputElem, reason) => {
      console.log(err)
    } 


    

    handleChangeUploadFile = (event) => {
      // Lorsqu'un fichier est selectionné
      // console.log(event.target.files[0].name)
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
              res.data.errno===1366?this.setState({ msgErr: "Verifier que le fichier soit bien enregistrer en CSV UTF-8. Sur Excel : Enregistrer sous > Format CSV UTF8" }):this.setState({ msgErr: res.data.error });
            }else{
              this.setState({ loading: false, finish: true, nbLigne: res.data.arr.affectedRows});
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
            this.setState({ loading: false, finish: false, nbLigne: 0});
          
          }else{
            console.log(responseJson.err)
          }
        })
  }


  render() {
    // if (this.state.loading) return <Loader />;
    // if (this.state.error) return <CsvError />;
    return (

      <ListItem key={this.props.icone.toString()}>



        <ListItemAvatar > 
          <Avatar className="div_elmt_avatar">
            {
            this.props.icone===1
              ?<AccountBalanceWalletOutlinedIcon fontSize="small"/>
              :this.props.icone===2
                ? <ContactMailOutlinedIcon fontSize="small"/>
                : <PermContactCalendarOutlinedIcon fontSize="small"/>
            }
          </Avatar>
        </ListItemAvatar>

        <div className="ListItem_item" key={this.props.icone.toString()}>
          <ListItemText primary={this.props.title} secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {"Dernière MaJ : "+ this.state.dateMaJ}
              </Typography>
              {" " + this.state.nbLigne + " lignes."}
            </React.Fragment>
          }
           />
           {/* <ListItemSecondaryAction> */}
           {
              (this.state.finish) &&
              [(!this.state.error) ? <Alert className="List_alert"><AlertTitle>Upload Réussi !</AlertTitle>La mise à jours de la table {this.props.target} à bien été éffectuée.</Alert> 
                :<Alert  severity="error" className="List_alert"><AlertTitle>Erreur</AlertTitle>{this.state.msgErr}</Alert>]
            }
            {

              // Si base vidable (porps) + nbligne > 0
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
                                  {(this.state.selectedFile != null) &&
                                    
                                      [(this.state.loading === true)
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
                                        </Button> ]
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