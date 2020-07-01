import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';



export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [ user, setUser ] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        if (Cookies.get('authToken')) 
         {history.push({pathname: '/home/main'})}
        else {history.push({pathname: '/'})}
    }
    , [user,history])

    
	useEffect(() => {
		if(Cookies.get('authToken') && !user.idgasi) {
            getUser()
		}
	}, [user.idgasi]);

   
	const getUser = () => {
		console.log('attempting to get user')
        axios({
            method: 'get',
            url: "/auth/profile",
            headers: {
                Authorization: 'Bearer ' + Cookies.get('authToken')
            }
        })
		  .then((res) =>  setUser(res.data))
		
        
	};
	
	const deleteUser = () => {
		setUser({
	            flash: '',
		});
	};

	const logUser = (user) => {
		fetch('/auth/signin', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(user)
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.hasOwnProperty('user')) {
					const token = res.token;
					//    console.log(res)
					setUser({
						idgasi: res.user.idgasi,
						name: res.user.name,
						fonction: res.user.fonction,
						fonction_id: res.user.fonction_id,
						team: res.user.team,
						team_id: res.user.team_id,
						p_user: res.user.p_user,
						libelle_ape: res.user.libelle_ape,
						ape_id: res.user.ape_id,
						token: true,
						flash: res.flash
					});
					// setUser(res.user)
					Cookies.set('authToken', token, { expires: 7 });
				} else {
                    setUser({ flash: res.flash, token: false });
                    
				}
			});
		//  .catch(err => console.log( err.flash))
		//   .catch(err  => setUser({flash:  err.flash, token:false }))
	};

	return <UserContext.Provider value={{ user, logUser, getUser, deleteUser }}>{props.children}</UserContext.Provider>;
};

export default UserContextProvider;
