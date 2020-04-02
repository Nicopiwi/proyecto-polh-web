import React, { Component, Fragment } from 'react';
import Login from '../components/login'
import Register from '../components/register'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './css/login.css'

class LoginScreen extends Component {
    constructor(){
        super()
        this.state = {loginOn:true}
    }
    render = ()=>{
        return (
            <Fragment>
               {this.state.loginOn?(
                <Fragment>
                   <Login {...this.props}/>
                    <div className="spaced">
                        <span><Typography>¿No tenés cuenta? Registrate </Typography> <Link color="secondary" onClick={()=>this.setState({loginOn:false})}>aquí</Link></span>
                    </div>
                </Fragment>
               ):(
                   <Fragment>
                       <Register {...this.props}/>
                       <div className="spaced">
                            <span><Typography>¿Ya tenés cuenta? Inicia sesión </Typography> <Link color="secondary" onClick={()=>this.setState({loginOn:true})}>aquí</Link></span>
                       </div>
                   </Fragment>
               )}
            </Fragment>
        );
    }
}

export default LoginScreen;
