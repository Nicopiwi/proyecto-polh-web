import React, {useState} from 'react';
import './css/dashboard.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../redux/actions/recipeActions";

import './css/dashboard.css'
//import APIs from '../APIs'

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
    const [recipeText, setRecipeText] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const medicParams = useSelector(state => {
        return {
            address: state.user.userAddress,
            publicKey: state.user.userPublicKey,
            privateKey: state.user.userPrivateKey
        }
    });

    const handleSubmit = async ()=>{
        let headers = new Headers();
        headers.append('token', localStorage.getItem('userToken'));
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let created = await dispatch(createRecipe(medicParams, {address: address}, recipeText))
        if (created){
            setError('')
            setRecipeText('')
            setAddress('')
            alert('Receta creada con éxito')
        }
        else{
            setError('Address inválida')
        }
    }
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
                value={recipeText}
                onChange={(e)=>setRecipeText(e.target.value)}
                />

                <TextField value={address} 
                onChange={(e)=>setAddress(e.target.value)} 
                className={classes.spaced} id="addressInputRecipe" 
                fullWidth label="Destinatario (Address)" 
                variant="filled" 
                error={error}
                helperText={error}
                />
                <Button onClick={()=>handleSubmit()} className={classes.spaced} variant="contained" color="secondary">Enviar</Button>
            </div>
            
            
        </React.Fragment>

    )
}

export default MakeRecipes;