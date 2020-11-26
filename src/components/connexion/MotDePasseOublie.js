import React, { useState, useEffect, useContext } from 'react';
import { SnackbarContent } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './registerUser.css';
import './login.css';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { UserContext } from '../../contexts/UserContext';

const MotDePasseOublie = () => {
    
    const { logUser } = useContext(UserContext)
    const history = useHistory();
    
    const [ mounted, setMounted ] = useState(false);
    const [ userMDP, setUserMDP ] = useState({
        idgasi: '' , 
        password: '', 
        flash:''
    });

    const  handleChange = (event) => { 
        const name = event.target.name;
        const value = event.target.value;
        setUserMDP({...userMDP, [name]: value })
        
    }
 
    const handleSubmit = (event) => {
        event.preventDefault();
        setUserMDP({...userMDP, flash: '' })
        axios({
            method: 'POST',
            url: "/auth/mdp",
            data: JSON.stringify(userMDP),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Cookies.get('authToken'),
            },
        }).then((res) => {
            logUser(userMDP);
            setMounted(true);
        });
    }
    
    useEffect(() => {
        if(mounted){
            if (Cookies.get('authToken')) 
            {history.push({pathname: '/home/main'})}
            else {history.push({pathname: '/'})}
        }
    }
    , [mounted,history])

      
      return (
        <div className="login login_log">
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Modifier le mot de passe</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><AccountCircle /></span>
                                </div>
                                <input type="text" className="form-control" placeholder="IDGASI" required
                                name="idgasi" value={userMDP.idgasi} onChange={handleChange}>
                                {/* name="idgasi"> */}
                                </input>
                            </div>    
                            
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><VpnKeyIcon /></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" required 
                                name="password" value={userMDP.password} onChange={handleChange}>
                                {/* name="password"> */}
                                </input>
                            </div>
                            <div>
                                <Button type="submit" value="Valider" className="btn login_btn" variant="contained">Valider</Button>
                            </div> 
                        </form>
                        </div>
                        {userMDP.flash &&
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                  <SnackbarContent message="Mot de passe modifié avec succès !" />
                                  <Link className="btn" to="/">Se connecter</Link>
                            </div>
                        </div>
                        }
                        
                </div>
            </div>
        </div>
               
        </div>          
                   
    )
}


export default MotDePasseOublie;

