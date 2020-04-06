import React, {Fragment, useState} from 'react';
import './css/dashboard.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createStyles, makeStyles } from '@material-ui/core/styles';


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
    }
  }),
);

const Profile = (props) =>{
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPrivate, setShowPrivate] = useState(false);
    return (
        <Fragment>
            <Card fullWidth>
            <CardHeader 
            title="Editar datos de la cuenta"
            action={
                <IconButton aria-label="edit">
                    <CreateIcon onClick={()=>setEditMode(!editMode)}/>
                </IconButton>
            }
            />
            <CardContent>
                <div className={classes.container}>
                    <TextField 
                     disabled={!editMode} id="standard-disabled" 
                    label="Nombre" 
                    variant="filled"
                    defaultValue="Nico" 
                    className={classes.spaced}
                    />
                    <TextField 
                     disabled={!editMode} id="standard-disabled" 
                    label="Apellido" 
                    variant="filled"
                    className={classes.spaced}
                    defaultValue="Rozen" />
                    {editMode && <Button variant="contained" color="secondary">Guardar</Button>}

                </div>
                <div className={classes.container}>
                <TextField
                    id="email"
                    type={'email'}
                    label="Email"
                    disabled={!editMode}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue="abc@email.com"
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
                defaultValue="password"
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
                <div className={classes.container}>
                <TextField
                    id="matricula"
                    type={'number'}
                    label="Matrícula"
                    disabled={!editMode}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue="00000"
                />
                {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>
                <div className={classes.container}>
                <TextField
                    id="address"
                    type={'text'}
                    label="Address"
                    disabled={!editMode}
                    className={classes.textInput + ' ' + classes.spaced}
                    variant="filled"
                    defaultValue="0x"
                />
                {editMode && <Button variant="contained" color="secondary">Guardar</Button>}
                </div>
                <div className={classes.container}>
                    <TextField 
                    disabled={!editMode} id="standard-disabled" 
                    label="Clave pública" 
                    variant="filled"
                    defaultValue="0x" 
                    className={classes.spaced}
                    />
                    <TextField 
                    disabled={!editMode} id="standard-disabled" 
                    label="Clave privada" 
                    variant="filled"
                    type={showPrivate?'text':'password'}
                    className={classes.spaced}
                    defaultValue="0x" 
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
                    {editMode && <Button variant="contained" color="secondary">Guardar</Button>}

                </div>
                
                
                
            </CardContent>
                
            </Card>
            
        </Fragment>

    )
}

export default Profile;