import React, { useState, useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CardHeader from '@material-ui/core/CardHeader';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { login, nullErrors } from '../redux/actions/userActions';

//https://medium.com/@kkomaz/react-to-async-await-553c43f243e2


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


const ForgotPassword = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCopy, setPasswordCopy] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('medico');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  

  const handleResetPassword = async () => {
        props.nullErrors("LOGIN")
        setError(false);
        //let loginRet = await props.login(username, password, userType)
        if (password === passwordCopy){
            setLoading(true)
            let reqDone = true
            if(!reqDone) {
                setError(true);
                setHelperText('Cuenta no encontrada')
            }
            else{
                console.log(sent)
                setSent(true)
            }
        }
        
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleResetPassword();
    }
  };

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader classes={{title:classes.cardHeaderTitle}} avatar={<img alt="logo" height="30" width="30" src={require('../assets/logo.png')}></img>} className={classes.header} title="Recupere su contraseña" />
          <CardContent>
              {
                  sent?(
                    <div>
                        <h4>Se ha cambiado la contraseña</h4>
                    </div>
                  ):(
                    <div>
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
                      fullWidth
                      id="password"
                      type={showPassword?'text':'password'}
                      label="Nueva contraseña"
                      placeholder="Ingrese su nueva contraseña"
                      margin="normal"
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
                    <TextField
                      error={error}
                      fullWidth
                      id="password"
                      type={showPassword?'text':'password'}
                      label="Repita su nueva contraseña"
                      placeholder="Repita su nueva contraseña"
                      margin="normal"
                      helperText={helperText}
                      onChange={(e)=>setPasswordCopy(e.target.value)}
                      value={passwordCopy}
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
                  )
              }
            
            
          </CardContent>
          <CardActions>
           {
               sent?(<Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.loginBtn}
                onClick={()=>props.goToLogin()}
                disabled={isButtonDisabled}
                >
                Ok
              </Button>):(<Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.loginBtn}
                onClick={()=>handleResetPassword()}
                disabled={isButtonDisabled}
                >
                {loading && <CircularProgress color="secondary" size={14} />}
                {!loading && 'Listo'}
              </Button>)
           }
            
          </CardActions>
        </Card>
        
      </form>
      <ButtonGroup className={classes.botones} size="large" color="secondary" aria-label="large outlined primary button group">
            <Button onClick={()=>{setUserType('medico')}} variant={userType==='medico'?'contained':'outlined'}>Médico</Button>
            <Button onClick={()=>{setUserType('farmacia')}} variant={userType==='farmacia'?'contained':'outlined'}>Farmacia</Button>
          </ButtonGroup>
    </React.Fragment>
  );
}


export default connect(null, { login, nullErrors })(withRouter(ForgotPassword));