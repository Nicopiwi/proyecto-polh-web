import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import RecipeCard from '../components/recipeCard'
import { fetchRecipes } from '../redux/actions/recipeActions'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import './css/dashboard.css'

const useStyles = makeStyles((theme) =>
  createStyles({
    spaced:{
        marginTop: theme.spacing(3)
    },
  }),
);


const MyRecipes = (props) =>{
    const dispatch = useDispatch();
    const recipesList = useSelector(state => state.recipe.recipes.reverse());
    const userType = useSelector(state => state.user.userType);
    const classes = useStyles();
    useEffect(()=>{
        dispatch(fetchRecipes())
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
                    ></RecipeCard>
                </li>
                )
            })}
            </ul>)}
            
        </React.Fragment>

    )
}

export default MyRecipes;