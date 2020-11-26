import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { SnackbarContent } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import './login.css';


const Login = () => {
    const { user, logUser } = useContext(UserContext)
   
    const [ login, setLogin ] = useState({idgasi: '' , password: ''});

    const history = useHistory();
    

 const  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value })
    
  }
  const  handleChangeIdgasi = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLogin({...login, [name]: value.toLowerCase() })
    
  }

    useEffect(() => {
        if (Cookies.get('authToken')) 
        {history.push({pathname: '/home/main'})}
        else {history.push({pathname: '/'})}

        // CONNECTION AUTOMATIQUE AVEC COOKIE XTIDC ?
        // if(Cookies.get('xtidc')){
        //     logUserXtidc(Cookies.get('xtidc'))
        // }
    }
    , [user,history])


    const log= (event) => {
        event.preventDefault();
        logUser(login)
    }


      return (
        <div className="login login_log">
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Connexion</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={log}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><AccountCircle /></span>
                                </div>
                                <input type="text" className="form-control" placeholder="IDGASI" required
                                name="idgasi" value={login.idgasi} onChange={handleChangeIdgasi}>
                                </input>
                                
                            </div>    
                           
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><VpnKeyIcon /></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password" required
                                name="password" value={login.password} onChange={handleChange}>
                                </input>
                            </div>
                            <div>
                                <Button type="submit" value="Valider" className="btn login_btn" variant="contained">Valider</Button>
                            </div> 
                        </form>
                    </div>
                    <div className="card-footer">
                                <Link className="btn" to="/register">Créer un compte</Link>
                    
                                <Link className="btn" to="/mdp">Mot de passe oublié</Link>
                    
                    </div>
                    <div>
				        <div className="d-flex justify-content-center links">
                            {user.flash &&  <SnackbarContent message={user.flash} />}
				        </div>
			        </div>
                </div>
            </div>
        </div>
        <div> 
                  
               </div>
        </div>          
                   
    )
}

export default Login;

