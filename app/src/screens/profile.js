import React, {Fragment, useState} from 'react';
import './css/dashboard.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { useSelector, useDispatch } from "react-redux";
import { modifyUserName, 
    modifyDireccion,
    modifyNombreEstablecimiento,
    modifyMatricula, 
    modifyEmail, 
    modifyPassword } from '../redux/actions/userActions'

const useStyles = makeStyles((theme) =>
  createStyles({
    container:{
        display:'flex',
        flexWrap:'wrap',
        margin: theme.spacing(2)
    },
    spaced:{
        marginRight: theme.spacing(3)
    },
    textInput:{
        width: '275px'
    },
  }),
);


const Profile = (props) =>{

    const classes = useStyles();
    const userName = useSelector(state => state.user.userName);
    const userSurname = useSelector(state => state.user.userSurname);
    const userNombreEstablecimiento = useSelector(state => state.user.userNombreEstablecimiento);
    const userMatricula = useSelector(state => state.user.userMatricula);
    const userEmail = useSelector(state => state.user.userEmail);
    const userAddress = useSelector(state => state.user.userAddress);
    //const userHash = useSelector(state => state.user.userHash);
    const userPublicKey = useSelector(state => state.user.userPublicKey);
    const userPrivateKey = useSelector(state => state.user.userPrivateKey);
    const userDireccion = useSelector(state => state.user.userDireccion);
    const userType = useSelector(state => state.user.userType);

    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [newUserSurname, setNewUserSurname] = useState(userSurname);
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserDireccion, setNewUserDireccion] = useState(userDireccion);
    const [newUserMatricula, setNewUserMatricula] = useState(userMatricula);
    const [newUserEmail, setNewUserEmail] = useState(userEmail);
    const [newUserNombreEstablecimiento, setNewUserNombreEstablecimiento] = useState(userNombreEstablecimiento);
    
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Card fullWidth>
            <CardHeader 
            title="Editar datos de la cuenta"
            action={
                <IconButton aria-label="edit" onClick={()=>setEditMode(!editMode)}>
                    <CreateIcon />
                </IconButton>
            }
            />
            <CardContent>
                <div className={classes.container}>
                    <TextField 
                     disabled={!editMode} id="nombre-textbox" 
                    label="Nombre" 
                    variant="filled"
                    defaultValue={userName}
                    value={newUserName}
                    onChange={(e)=>setNewUserName(e.target.value)}
                    className={classes.spaced}
                    />
                    <TextField 
                     disabled={!editMode} id="apellido-textbox" 
                    label="Apellido" 
                    variant="filled"
                    className={classes.spaced}
                    defaultValue={userSurname}
                    value={newUserSurname}
                    onChange={(e)=>setNewUserSurname(e.target.value)} />
                    {editMode && <Button onClick={()=>dispatch(modifyUserName(newUserName, newUserSurname, userType))} variant="contained" color="secondary">Guardar</Button>}

                </div>
                <div className={classes.container}>
                <TextField
                    id="email"
                    type={'email'}
                    label="Email"
                    disabled={!editMode}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue={userEmail}
                    value={newUserEmail}
                    onChange={(e)=>setNewUserEmail(e.target.value)}
                />
                {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>
                <div className={classes.container}>
                <TextField
                id="password"
                type={showPassword?'text':'password'}
                label="Contraseña"
                disabled={!editMode}
                className={classes.spaced}
                variant="filled"
                defaultValue=""
                value={newUserPassword}
                onChange={(e)=>setNewUserPassword(e.target.value)}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>),
                  }}
              />
              {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>
                {userType==="farmacia"&&(
                <div className={classes.container}>
                <TextField
                    id="establecimiento"
                    type={'text'}
                    label="Establecimiento"
                    disabled={!editMode}
                    value={newUserNombreEstablecimiento}
                    onChange={(e)=>setNewUserNombreEstablecimiento(e.target.value)}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue={userNombreEstablecimiento}
                />
                {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>)}
                {userType==="farmacia"&&(
                <div className={classes.container}>
                <TextField
                    id="direccion"
                    type={'text'}
                    label="Direccion"
                    disabled={!editMode}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue={userDireccion}
                    value={newUserDireccion}
                    onChange={(e)=>setNewUserDireccion(e.target.value)}
                />
                {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>)}
                <div className={classes.container}>
                <TextField
                    id="matricula"
                    type={'number'}
                    label="Matrícula"
                    disabled={!editMode}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue={userMatricula}
                    value={newUserMatricula}
                    onChange={(e)=>setNewUserMatricula(e.target.value)}
                />
                {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>
                <div className={classes.container}>
                <TextField
                    id="address"
                    type={'text'}
                    label="Address"
                    disabled
                    fullWidth
                    className={classes.spaced}
                    variant="filled"
                    defaultValue={userAddress}
                />
                
                </div>
                <div className={classes.container}>
                <TextField 
                    disabled id="clave-publica" 
                    label="Clave pública" 
                    variant="filled"
                    fullWidth
                    defaultValue={userPublicKey} 
                    className={classes.spaced}
                    />
                  </div>
                  
                  <div className={classes.container}>
                <TextField 
                    disabled id="clave-private" 
                    label="Clave privada" 
                    variant="filled"
                    fullWidth
                    type={showPrivate?'text':'password'}
                    className={classes.spaced}
                    defaultValue={userPrivateKey} 
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=>setShowPrivate(!showPrivate)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>),
                      }}
                  />
                  </div>
                
                
                
            </CardContent>
                
            </Card>
            
        </Fragment>

    )
}

export default Profile;