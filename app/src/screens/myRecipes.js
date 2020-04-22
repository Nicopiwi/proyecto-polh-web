import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/recipeCard'
import { fetchRecipes } from '../redux/actions/recipeActions'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './css/dashboard.css'
import APIs from '../APIs';
import Modal from '@material-ui/core/Modal';

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
    const [modalStyle] = useState(getModalStyle);
    const handleOpen = async (recipeText)=>{
      setOpenModal(true)
      let headers = new Headers();
      headers.append('token', localStorage.getItem('userToken'));
      let text = await fetch(APIs.rest.transformHashToText + recipeText, {method:'GET', headers})
      let textJson = await text.json()
      console.log(textJson)
      setRecetaTexto(textJson.result.message)
      
    }
    const handleClose = () => {
      setOpenModal(false);
    };
    useEffect(()=>{
        dispatch(fetchRecipes(userType))
        console.log(recipesList)
    }, [])
    
    return (
        <React.Fragment>
            {(!recipesList || recipesList.length==0)?(
                <h2 id="emptyListText">{userType==="medico"?'Aquí aparecerán las recetas que has creado':'Aquí aparecerán las recetas que le han presentado a su farmacia'}</h2>
            ):(
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
                <textarea style={modalStyle} className={classes.paper} value={recetaTexto?recetaTexto:"Transcribiendo mensaje..."} disabled id="textoModal">
                </textarea>
            </Modal>
        </React.Fragment>

    )
}

export default MyRecipes;