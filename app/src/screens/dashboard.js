import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class DashboardScreen extends Component {

    logOut(){
        localStorage.removeItem('userId')
        localStorage.removeItem('userToken')
        this.props.history.push('/')
    }

    render = ()=>{
        return (
            <div>
               <button onClick={()=>this.logOut()}>
                Cerrar sesion
               </button>
            </div>
        );
    }
}

export default withRouter(DashboardScreen);