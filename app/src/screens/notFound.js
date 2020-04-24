import React, { Fragment } from 'react'

const NotFound = (props)=>{
    return (
    <Fragment>
        <img src={require('../assets/notFound.svg')} alt="Página no encontrada" width="400" height="400"></img>
        <h1>Página no encontrada</h1>
    </Fragment>
    )
}

export default NotFound