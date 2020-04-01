import React from 'react';
import './css/hello.css'

const Hello = (props) =>{
    return (
        <React.Fragment>
            <h1 className="main">{props.name}</h1>
        </React.Fragment>

    )
}

export default Hello;