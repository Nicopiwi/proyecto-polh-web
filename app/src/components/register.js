import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
import { withRouter } from 'react-router-dom';

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
    }


  }),
);

const Register = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [obraSocial, setObraSocial] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim() && firstName.trim() && lastName.trim()) {
      setIsButtonDisabled(false);
      if (password.length!==42){
        setError(true);
        setHelperText("El address debe ser de 42 caracteres, incluyendo el prefijo '0x'")
      }
    } else {
        setError(false);
        setHelperText("")
        setIsButtonDisabled(true);
    }
  }, [username, password, firstName, lastName]);

  const handleRegister = () => {


    if (username === 'abc@email.com' && password === 'password') {
        setError(false);
        localStorage.setItem('userId', 0)
        localStorage.setItem('userToken', 'token')
        props.history.push('/dashboard')
    } else {
        setError(true);
        setHelperText('Nombre de usuario o contraseña incorrectos')
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
          <CardHeader className={classes.header} title="Regístrate en Recetas" />
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
              {userType && (
                  <FormControl  fullWidth color="secondary">
                <InputLabel id="obra-social-label">Obra Social</InputLabel>
              <Select
                error={error}
                margin="normal"
                id="obra-social"
                placeholder="Address"
                value={obraSocial}
                onChange={(e)=>setObraSocial(e.target.value)}
                >
                <MenuItem value="Osde">OSDE</MenuItem>
                <MenuItem value="Swiss medical">Swiss medical</MenuItem>
            </Select></FormControl>)}
              <TextField
                error={error}
                fullWidth
                id="password"
                type={showPassword?'text':'password'}
                label="Address"
                placeholder="Address"
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
              Registrarse
            </Button>
          </CardActions>
        </Card>
      </form>
      <ButtonGroup className={classes.botones} size="large" color="secondary" aria-label="large outlined primary button group">
        <Button onClick={()=>{setUserType(false)}} variant={!userType?'contained':'outlined'}>Médico</Button>
        <Button onClick={()=>{setUserType(true)}} variant={userType?'contained':'outlined'}>Paciente</Button>
      </ButtonGroup>
    </React.Fragment>
  );
}

export default withRouter(Register);