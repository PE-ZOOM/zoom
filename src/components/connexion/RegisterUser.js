import React, { useState, useEffect } from 'react';
import { SnackbarContent } from '@material-ui/core';
import SelectFonction from './Select/SelectFonction';
import SelectTeam from './Select/SelectTeam';
import SelectStructure from './Select/SelectStructure';
import { isUserPermitted } from '../../utils/permissions';
import { CONSEILLER, ELD } from '../../utils/permissionsTypes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './registerUser.css';

const RegisterUser = () => {

    const history = useHistory();

    const [ register, setRegister ] = useState({idgasi: '' , name: '',
    fonction_id: '', team_id: null , password: '', p_user: '' , ape_id: null , flash:''});

    const [message, setMessage] = useState('');

    const [ listFunction, SetListFunction] = useState([]);
    const [ listTeam, SetListTeam] = useState([]);
    const [ listAPE, SetListAPE] = useState([]);
    const [ listPuser, SetListPuser] = useState([]);

   // load datas from database - Mimic ComponentDidMount
    useEffect(() => {
    axios.get('/fonctions')
    .then(res => { 
        SetListFunction(res.data);
    })
    }, [])
    useEffect(() => {
        axios.get('/teams')
        .then(res => { 
            SetListTeam(res.data);
        })
        }, [])
    useEffect(() => {
        axios.get('/apes')
        .then(res => { 
            SetListAPE(res.data);
        })
        }, [])
    useEffect(() => {
        axios.get('/pusers')
        .then(res => { 
            SetListPuser(res.data.map(el => el.dc_dernieragentreferent));
        })
        }, []) 
        
   
        useEffect(() => {
            if (register.flash === 'User has been signed up !') history.push({pathname: '/'})
        }, [register,history])    



    const  handleChange = (event) => { 
        const name = event.target.name;
        const value = event.target.value;
        if  (name === 'fonction_id') {
        setRegister({...register, [name]: value, team_id: null , p_user: '' , ape_id: null})   
        } 
        else {
        setRegister({...register, [name]: value })
        }
    }


//     const handleSubmit = (event) => {
//     event.preventDefault();
//     if (
//       (register.fonction_id === '1' && register.p_user) ||
//       register.fonction_id !== '1'
//     ) {
//       setMessage('');
//       axios({
//         method: 'put',
//         url: source,
//         data: register,
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + Cookies.get('authToken'),
//         },
//       }).then((res) => setRegister(res.data));
//     } else {
//       setMessage('le champ p_user est requis');
//     }
//   };
 
      const handleSubmit = (event) => {
         event.preventDefault();
         if (
                  (register.fonction_id === '1' && register.p_user) ||
                  register.fonction_id !== '1'
                ) {
                  setMessage('');
                  fetch("/auth/signup",
              {
                  method:  'POST',
                  headers:  new  Headers({
                      'Content-Type':  'application/json'
                  }),
                  body:  JSON.stringify(register),
              })
              .then(res  =>  res.json())
              .then(
                  res  => setRegister({...register, flash: res.flash}),
                  err  => setRegister({...register, flash: err.flash })
              )
        } else {
               setMessage('le champ p_user est requis');
                }
    }
    

      
      return (
        <div className="login">
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Créer un compte</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="idgasi" required
                                name="idgasi" value={register.idgasi} onChange={handleChange}>
                                </input>
                            </div>    
                           
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="name" required
                                name="name" value={register.name} onChange={handleChange}>
                                </input>
                            </div>
                            
                                <SelectFonction
                               name = 'fonction_id'
                               options = {listFunction} //database
                               handleChange = {handleChange}
                               placeholder = {'Select fonction'}
                                />  
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" required
                                name="password" value={register.password} onChange={handleChange}>
                                </input>
                            </div>
                            {isUserPermitted(CONSEILLER, register.fonction_id) &&
                             <div>
                               <SelectTeam
                               name = 'team_id'
                               options = {listTeam} //database
                               handleChange = {handleChange}
                               placeholder = {'Select team'}
                                /> 
                                  <Autocomplete
                                    onChange={(event, newValue) => {
                                        setRegister({ ...register, p_user: newValue });
                                    }}
                                    name="p_user"
                                    id="p_user"
                                    options={listPuser}
                                    style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        label="P user"
                                        variant="outlined"
                                        value={register.p_user}
                                        />
                                    )}
                                 />
                                 <br></br>
                                  <div>{message}</div>
            
                                <SelectStructure
                               name = 'ape_id'
                               options = {listAPE} //database
                               handleChange = {handleChange}
                               placeholder = {'Select APE'}
                                /> 
                            </div>
                             }
                            {isUserPermitted(ELD,  register.fonction_id) &&
                             <div>
                                <SelectTeam
                               name = 'team_id'
                               options = {listTeam} //database
                               handleChange = {handleChange}
                               placeholder = {'Select team'}
                                /> 
                                <SelectStructure
                               name = 'ape_id'
                               options = {listAPE} //database
                               handleChange = {handleChange}
                               placeholder = {'Select APE'}
                                />  
                              
                            </div>
                            }
                             <div className="card-footer">
                                <div className="d-flex justify-content-center links">
                                <input type="submit" value="Valider" className="btn float-right login_btn"></input>
                                </div>
                            </div>   
                        </form>
                        </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                        <Link className="btn float-right login_btn" to="/">Login</Link>
				    </div>
                       </div>
                        <div className="d-flex justify-content-center links">
                            {register.flash &&  <SnackbarContent message="Vous êtes déjà enregistré" />}
                        </div>
                </div>
            </div>
        </div>
               
        </div>          
                   
    )
}


export default RegisterUser;

