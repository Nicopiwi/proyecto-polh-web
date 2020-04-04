import React from 'react';
import './css/dashboard.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const MakeRecipes = (props) =>{
    return (
        <React.Fragment>
            <textarea
                rows="50"
                aria-label="maximum height"
                placeholder="Escriba su receta aquí. Maximo 50 lineas"
                className={"textarea"}
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <Button variant="contained" color="secondary">Enviar</Button>
            
        </React.Fragment>

    )
}

export default MakeRecipes;