import React, { Component, Fragment } from 'react';
import Login from '../components/login'
import Register from '../components/register'
import ForgotPassword from '../components/forgotPassword'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './css/login.css'

class LoginScreen extends Component {
    constructor(){
        super()
        this.state = {loginState:0}
    }
    goToLogin = ()=>{
        this.setState({loginState:0})
    }

    renderState(){
        if (this.state.loginState==0){
            return(
                <Fragment>
                   <Login {...this.props}/>
                    <div className="spaced">
                        <span><Link color="textSecondary" onClick={()=>this.setState({loginState:2})}>¿Olvidaste tu contraseña?</Link> </span>
                    </div>
                    <div>
                        <span><Typography>¿No tenés cuenta? Registrate </Typography> <Link color="secondary" onClick={()=>this.setState({loginState:1})}>aquí</Link></span>
                    </div>
                </Fragment>
            )
        }
        else if (this.state.loginState==1){
            return (
                <Fragment>
                       <Register {...this.props}/>
                       <div className="spaced">
                            <span><Typography>¿Ya tenés cuenta? Inicia sesión </Typography> <Link color="secondary" onClick={()=>this.setState({loginState:0})}>aquí</Link></span>
                       </div>
                   </Fragment>
            )
        }
        else if (this.state.loginState==2){
            return(
                <Fragment>
                    <ForgotPassword {...this.props} goToLogin={()=>this.goToLogin()}/>
                    <div className="spaced">
                                <span><Link color="textSecondary" onClick={()=>this.setState({loginState:0})}>Cancelar</Link></span>
                    </div>
                </Fragment>
            )
        }
    }

    render = ()=>{
        return (
            <Fragment>
                {this.renderState()}
            </Fragment>
        );
    }
}

export default LoginScreen;
