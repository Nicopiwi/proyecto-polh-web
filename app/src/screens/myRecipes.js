import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/recipeCard'
import { fetchRecipes } from '../redux/actions/recipeActions'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './css/dashboard.css'
import APIs from '../APIs';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    spaced:{
        marginTop: theme.spacing(3)
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }),
);


const MyRecipes = (props) =>{
    const dispatch = useDispatch();
    const recipesList = useSelector(state => state.recipe.recipes.reverse());
    
    const userType = useSelector(state => state.user.userType);
    const classes = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const [recetaTexto, setRecetaTexto] = useState('');
    const [recetaObj, setRecetaObj] = useState({});
    const [hayReceta, setHayReceta] = useState(false);
    const [loading, setLoading] = useState(false)
    const [modalStyle] = useState(getModalStyle);
    const IsJsonString = (str)=>{
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const handleOpen = async (recipeText)=>{
      setOpenModal(true)
      let headers = new Headers();
      headers.append('token', localStorage.getItem('userToken'));
      setRecetaTexto('Transcribiendo mensaje...')
      setLoading(true)
      let text = await fetch(userType==='medico'?(APIs.rest.transformHashToText + recipeText):(APIs.rest.transformHashToTextFarmacia + recipeText), {method:'GET', headers})
      let textJson = await text.json()
      console.log(textJson)
      setRecetaTexto(textJson.result.message)
      if (IsJsonString(textJson.result.message)){
        console.log('yeah')
        let obj = await JSON.parse(textJson.result.message)
        await setRecetaObj(Object.assign({}, obj))
        setHayReceta(true)
        //console.log(recetaAux)
      }
      else{
          setHayReceta(false)
      }
      setLoading(false)
    }
    const handleClose = () => {
      setOpenModal(false);
    };
    useEffect(()=>{
        dispatch(fetchRecipes(userType))
        //console.log(recipesList)
        console.log(hayReceta)
    }, [hayReceta])
    
    return (
        <React.Fragment>
            {(!recipesList || recipesList.length==0)?(<React.Fragment>
                <img src={require(userType==='medico'?'../assets/medicoRecipes.svg':'../assets/farmaciaRecipes.svg')} alt="Página no encontrada" width="400" height="400"></img>
                <h2 className={classes.spaced} id="emptyListText">{userType==="medico"?'Aquí aparecerán las recetas que has creado':'Aquí aparecerán las recetas que le han presentado a su farmacia'}</h2>
            </React.Fragment>):(
            <ul id="recipesList">
            {recipesList.map((item)=>{
                return (
                <li className={classes.spaced} key={item._id}>
                    <RecipeCard recipeText={item.recipe_hash}
                    address={item.pacienteAddress}
                    used={item.is_used}
                    handleOpen={handleOpen}
                    date={item.date}
                    ></RecipeCard>
                </li>
                )
            })}
            </ul>)}
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="receta-texto"
                
            >
                <div style={modalStyle} className={classes.paper}>
                {/*
                <textarea style={modalStyle} className={classes.paper} 
                value={recetaTexto?`
                    Medicamentos
                    ${" "}
                    ${JSON.parse(recetaTexto) && JSON.parse(recetaTexto).medicamentos.map((item, index)=>{
                        return (item.nombreMedicamento + item.dosis + item.frecuencia)
                    })}

                    Duración del tratamiento
                    ${" "}
                    ${JSON.parse(recetaTexto) && JSON.parse(recetaTexto).duracion}

                    Notas adicionales del médico
                    ${" "}
                    ${JSON.parse(recetaTexto) && JSON.parse(recetaTexto).additionalNotes}
                `:"ERROR EN LA TRANSCRIPCIÓN DEL MENSAJE O RECETA VACÍA"} disabled id="textoModal">
                </textarea>*/}
                
                {hayReceta?(<>
                    <Typography variant="h6" style={{fontWeight:'600'}}>Medicamentos</Typography>
                    {
                        recetaObj.medicamentos.map((item, index)=>{
                            return (
                            <Typography>{index+1}- {item.nombreMedicamento}, {item.dosis}, {item.frecuencia}</Typography>
                            )
                        })
                    }
                    <br/>
                    <br/>
                    <Typography variant="h6" style={{fontWeight:'600'}}>Duración del tratamiento</Typography>
                    <Typography>{recetaObj.duracion}</Typography>
                    <br/>
                    <br/>
                    <Typography variant="h6" style={{fontWeight:'600'}}>Notas adicionales del médico</Typography>
                    <Typography> {recetaObj.additionalNotes}</Typography>
                </>):
                <Typography>{loading?'Transcribiendo...':'ERROR EN LA TRANSCRIPCIÓN DEL MENSAJE O RECETA CON FORMATO ERRÓNEO'}</Typography>
                }
                </div>
            </Modal>
        </React.Fragment>

    )
}

export default MyRecipes;
