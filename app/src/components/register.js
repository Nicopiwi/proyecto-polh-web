import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import APIs from '../APIs'
import axios from 'axios'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    botones:{
        marginTop: theme.spacing(1),
        flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(7)
    },
    cardHeaderTitle: {
      fontSize: '1.2rem'
    }
  }),
);

const Register = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [matricula, setMatricula] = useState('');
  const [nombreEstablecimiento, setNombreEstablecimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [obrasSociales, setObraSociales] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    let conditionA=(username !== '' && password !== '' && firstName !== '' && lastName !== '' && 
    matricula !== '')

    let conditionB = ((userType&&nombreEstablecimiento!== ''&&direccion!== '')|(!userType))

    if (conditionA && conditionB) {
      setIsButtonDisabled(false);

    } else {
        setError(false);
        setHelperText("")
        setIsButtonDisabled(true);
    }
  }, [username, password, firstName, lastName, matricula, nombreEstablecimiento, direccion, userType]);

  const handleRegister = async () => {
      localStorage.clear()
      if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)){
        if (/^[0-9]*$/.test(matricula)){
          setError(false);
          setIsButtonDisabled(true)
          setLoading(true)
          let api_url = userType?APIs.rest.registerFarmacia:APIs.rest.registerMedico
          let reqBody = {
            email:username,
            password:password, 
            name:firstName, 
            surname: lastName, 
            matricula:parseInt(matricula),
            nombreEstablecimiento:userType?nombreEstablecimiento:null,
            direccion:userType?direccion:null,
            obrasSociales:userType?obrasSociales.split(','):null
          }
          try{
            await fetch(api_url,{
              method:'POST',
              headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              body:JSON.stringify(reqBody)
            })
              props.history.push('/dashboard')
          }
          catch(e){
            //console.log('error')
            setLoading(false)
            setIsButtonDisabled(false)
            setError(true)
            setHelperText('Error en el registro. Pruebe más tarde')
            //console.log(e)
          }
         
        }
        else{
          setError(true);
          setHelperText('Matrícula incorrecta. Asegúrese de que sólo contenga numeros')
        }
      }
      else{
        setError(true);
        setHelperText('Dirección de email incorrecta')
      }
        
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleRegister();
    }
  };

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader classes={{title:classes.cardHeaderTitle}} avatar={<img alt="logo" height="30" width="30" src={require('../assets/logo.png')}></img>} className={classes.header} title="Regístrate en Pölh Recetas" />
          <CardContent>
            <div>
            <TextField
                error={error}
                fullWidth
                id="firstName"
                type="text"
                label="Nombre"
                placeholder="Nombre"
                margin="normal"
                onChange={(e)=>setFirstName(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="lastName"
                type="text"
                label="Apellido"
                placeholder="Apellido"
                margin="normal"
                onChange={(e)=>setLastName(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              {userType && <TextField
                error={error}
                fullWidth
                id="nombreEstablecimiento"
                type="text"
                label="Nombre del establecimiento"
                placeholder="Nombre del establecimiento"
                margin="normal"
                onChange={(e)=>setNombreEstablecimiento(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />}
              
              <TextField
                error={error}
                fullWidth
                id="username"
                type="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                onChange={(e)=>setUsername(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              <TextField
                error={error}
                fullWidth
                id="matricula"
                type="text"
                label="Matricula Nacional"
                placeholder="00000"
                margin="normal"
                onChange={(e)=>setMatricula(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
              />
              {
                userType && (<TextField
                  error={error}
                  fullWidth
                  id="direccion"
                  type="text"
                  label="Dirección"
                  placeholder="Dirección"
                  margin="normal"
                  value={direccion}
                  onChange={(e)=>setDireccion(e.target.value)}
                  onKeyPress={(e)=>handleKeyPress(e)}
                />)}
              {
                userType && (<TextField
                  error={error}
                  fullWidth
                  id="obrasSociales"
                  type="text"
                  label="Obras sociales"
                  placeholder="OBRA1,OBRA2"
                  helperText="Separadas por coma (,). Pueden ser OSDE, SWISS, MEDICUS, GALENO, OMINT, SANCOR, PAMI o Ninguna"
                  margin="normal"
                  value={obrasSociales}
                  onChange={(e)=>setObraSociales(e.target.value)}
                  onKeyPress={(e)=>handleKeyPress(e)}
                />)
              }
              {/*userType && (
                  <FormControl margin="normal" fullWidth color="secondary">
                <InputLabel id="obra-social-label">Obra Social</InputLabel>
              <Select
                error={error}
                margin="normal"
                id="obra-social"
                placeholder="Obra social"
                value={obraSocial}
                onChange={(e)=>setObraSocial(e.target.value)}
                >
                <MenuItem value="Osde">OSDE</MenuItem>
                <MenuItem value="Swiss medical">Swiss medical</MenuItem>
              </Select></FormControl>)*/}
              <TextField
                error={error}
                fullWidth
                id="password"
                type={showPassword?'text':'password'}
                label="Contraseña"
                placeholder="Contraseña"
                margin="normal"
                helperText={helperText}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyPress={(e)=>handleKeyPress(e)}
                InputProps={{
                    endAdornment: (<InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>),
                  }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={classes.loginBtn}
              onClick={()=>handleRegister()}
              disabled={isButtonDisabled}>
             {loading && <CircularProgress color="primary" size={14} />}
            {!loading && 'Registrarse'}
            </Button>
          </CardActions>
        </Card>
      </form>
      <ButtonGroup className={classes.botones} size="large" color="secondary" aria-label="large outlined primary button group">
        <Button onClick={()=>{setUserType(false)}} variant={!userType?'contained':'outlined'}>Médico</Button>
        <Button onClick={()=>{setUserType(true)}} variant={userType?'contained':'outlined'}>Farmacia</Button>
      </ButtonGroup>
    </React.Fragment>
  );
}

export default withRouter(Register);