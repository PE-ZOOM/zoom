import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import Select from '../shared/Select';
import SelectFonction from './Select/SelectFonction';
import SelectTeam from './Select/SelectTeam';
import SelectStructure from './Select/SelectStructure';
import { isUserPermitted } from '../../utils/permissions';
import { CONSEILLER, ELD } from '../../utils/permissionsTypes';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Cookies from 'js-cookie';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './registerUser.css';

const UpdateUser = ({ show, handleClose }) => {
  const { user, deleteUser } = useContext(UserContext);
  const history = useHistory();

  const [register, setRegister] = useState({
    fonction_id: '',
    team_id: null,
    p_user: '',
    ape_id: null,
  });

  const [message, setMessage] = useState('');

  const [listFunction, SetListFunction] = useState([]);
  const [listTeam, SetListTeam] = useState([]);
  const [listAPE, SetListAPE] = useState([]);
  const [listPuser, SetListPuser] = useState([]);


  // load datas from database - Mimic ComponentDidMount
  useEffect(() => {
    axios.get('/fonctions').then((res) => {
      SetListFunction(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/teams').then((res) => {
      SetListTeam(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/apes').then((res) => {
      SetListAPE(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get('/pusers').then((res) => {
      SetListPuser(res.data.map((el) => el.dc_dernieragentreferent));
    });
  }, []);

  useEffect(() => {
    if (register.flash === 'User updated!') {
      Cookies.remove('authToken', user.token);
      handleClose();
      history.push({ pathname: '/' });
      deleteUser();
    }
  }, [register.flash, history, user.token, deleteUser, handleClose]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'fonction_id') {
      setRegister({
        ...register,
        [name]: value,
        team_id: null,
        p_user: '',
        ape_id: null,
      });
    } else {
      setRegister({ ...register, [name]: value });
    }
  };

  const source = `/auth/update/${user.idgasi}`;
  // console.log(source)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      (register.fonction_id === '1' && register.p_user) ||
      register.fonction_id !== '1'
    ) {
      setMessage('');
      axios({
        method: 'put',
        url: source,
        data: register,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Cookies.get('authToken'),
        },
      }).then((res) => setRegister(res.data));
    } else {
      setMessage('le champ p_user est requis');
    }
  };


  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Changement du profil {user.name} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login">
          <div className="container">
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <SelectFonction
                      name="fonction_id"
                      options={listFunction} //database
                      handleChange={handleChange}
                      placeholder={'Fonction'}
                      required={true}
                    />
                    {isUserPermitted(CONSEILLER, register.fonction_id) && (
                      <div>
                        <SelectTeam
                          name="team_id"
                          options={listTeam} //database
                          handleChange={handleChange}
                          placeholder={'Equipe'}
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
                              label="Utilisateur"
                              variant="outlined"
                              value={register.p_user}
                            />
                          )}
                         
                        />
                        <div>{message}</div>
                        <br></br>
                        <SelectStructure
                          name="ape_id"
                          options={listAPE} //database
                          handleChange={handleChange}
                          placeholder={'Agence'}
                          required={true}
                        />
                      </div>
                    )}
                    {isUserPermitted(ELD, register.fonction_id) && (
                      <div>
                        <SelectTeam
                          name="team_id"
                          options={listTeam} //database
                          handleChange={handleChange}
                          placeholder={'Equipe'}
                        />
                        <SelectStructure
                          name="ape_id"
                          options={listAPE} //database
                          handleChange={handleChange}
                          placeholder={'Agence'}
                          required={true}
                        />
                      </div>
                    )}
                    <div>
                      <Button type="submit" value="Valider" className="btn float-right login_btn" variant="contained">Valider</Button>
                    </div>
                  </form>
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer sans enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );

};

export default UpdateUser;
