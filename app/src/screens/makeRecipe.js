import React, {useState} from 'react';
import './css/dashboard.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../redux/actions/recipeActions";

import './css/dashboard.css'
//import APIs from '../APIs'

const useStyles = makeStyles((theme) =>
  createStyles({
    container:{
        //display:'flex',
        flexWrap:'wrap',
    },
    formControl: {
        minWidth: 120,
        marginTop:theme.spacing(2),
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
    const [medicamentosList, setMedicamentosList] = useState([{
        nombreMedicamento:'', dosis:'', frecuencia:'', id:0
    }])
    const [duracionTratamiento, setDuracionTratamiento] = useState(null)
    const [unitTratamiento, setUnitTratamiento] = useState(null)
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [onDelete, setOnDelete] = useState(false)
    const dispatch = useDispatch();
    const medicParams = useSelector(state => {
        return {
            address: state.user.userAddress,
            publicKey: state.user.userPublicKey,
            privateKey: state.user.userPrivateKey
        }
    });

    const values = (id, key)=>{
        return undefined
    }

    const handleSubmit = async ()=>{
        let headers = new Headers();
        headers.append('token', localStorage.getItem('userToken'));
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let created = await dispatch(createRecipe(medicParams, {address: address}, 
            JSON.stringify({
                additionalNotes:recipeText,
                medicamentos:medicamentosList,
                duracion: `${duracionTratamiento} ${unitTratamiento}`
            })))
        if (created){
            setError('')
            setRecipeText('')
            setAddress('')
            resetMedicamentos()
            alert('Receta creada con éxito')
        }
        else{
            setError('Address inválida')
        }
    }

    const resetMedicamentos=()=>{
        setMedicamentosList([{
            nombreMedicamento:'', dosis:'', frecuencia:'', id:0
        }])
    }

    const handleAddMedicamento=()=>{
        setMedicamentosList([...medicamentosList, {
            nombreMedicamento:'', dosis:'', frecuencia:'', id:medicamentosList[medicamentosList.length-1].id+1
        }])
    }

    const handleDeleteMedicamento=(i)=>{
        setMedicamentosList(medicamentosList.filter((item, index)=>index!==medicamentosList.length-1))
        setOnDelete(true)
    }

    const handleModifyMedicamento = (index, key, value)=>{
        let aux = medicamentosList
        switch(key){
            case 'nombreMedicamento':
                aux[index].nombreMedicamento =  value
                setMedicamentosList(aux)
                
                break;
            case 'dosis':
                aux[index].dosis =  value
                setMedicamentosList(aux)
                break;
            case 'frecuencia':
                aux[index].frecuencia =  value
                setMedicamentosList(aux)
                break;
            default:
                return;
        }
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                
                {medicamentosList.map((item, index)=>{
                    return(
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <TextField
                            
                            onChange={(e)=>handleModifyMedicamento(index, 'nombreMedicamento', e.target.value)} 
                            
                            className={classes.spaced}
                            label={`Nombre del medicamento ${index + 1}`} 
                            variant="filled" 
                            />
                            <TextField
                            
                            onChange={(e)=>handleModifyMedicamento(index, 'dosis', e.target.value)} 
                            className={classes.spaced}
                            label={`Dosis ${index + 1}`} 
                            variant="filled" 
                            />
                            <TextField
                            
                            onChange={(e)=>handleModifyMedicamento(index, 'frecuencia', e.target.value)} 
                            className={classes.spaced}
                            label={`Frecuencia ${index + 1}`} 
                            variant="filled" 
                            />
                            
                        </div>
                    )
                })}
                <div className={classes.spaced} style={{display:'flex', flexDirection:'row'}}>
                    <IconButton onClick={handleAddMedicamento} color="primary" aria-label="Add medicamento">
                        <Add />
                    </IconButton>
                    {medicamentosList.length>1 && (
                            <IconButton onClick={()=>handleDeleteMedicamento()} aria-label="Add medicamento">
                                <Delete />
                            </IconButton>)
                    }
                </div>
                
                
                
                <div  style={{display:'flex', flexDirection:'row'}}>
                <TextField value={duracionTratamiento} 
                    onChange={(e)=>setDuracionTratamiento(e.target.value)} 
                    className={classes.spaced} id="duracionInputRecipe" 
                    label="Duración del tratamiento" 
                    variant="filled" 
                    type="number"
                    inputProps={{
                        min:"0"
                    }}
                    />
                    
                    <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">Unidad</InputLabel>
                    <Select
                    native
                    value={unitTratamiento}
                    onChange={e=>setUnitTratamiento(e.target.value)}
                    inputProps={{
                        name: 'unidadTime',
                        id: 'filled-age-native-simple',
                    }}
                    >
                    <option value={'Días'}>Días</option>
                    <option value={'Semanas'}>Semanas</option>
                    <option value={'Meses'}>Meses</option>
                    </Select>
                </FormControl>
                
                </div>
                <TextField
                id="filled-multiline-static"
                label="Notas adicionales"
                multiline
                fullWidth
                rows={3}
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