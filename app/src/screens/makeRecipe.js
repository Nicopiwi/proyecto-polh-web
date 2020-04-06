import React from 'react';
import './css/dashboard.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) =>
  createStyles({
    container:{
        display:'flex',
        flexWrap:'wrap'
    },
    spaced:{
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
  }),
);

const MakeRecipes = (props) =>{
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.container}>
                
                <TextField
                id="filled-multiline-static"
                label="Escriba su receta aquí"
                multiline
                placeholder="Maximo 500 caracteres"
                fullWidth
                rows={10}
                maxLength={500}
                variant="filled"
                className={classes.spaced}
                />

                <TextField className={classes.spaced} id="filled-basic" fullWidth label="Destinatario (Address)" variant="filled" />
                <Button className={classes.spaced} variant="contained" color="secondary">Enviar</Button>
            </div>
            
            
        </React.Fragment>

    )
}

export default MakeRecipes;