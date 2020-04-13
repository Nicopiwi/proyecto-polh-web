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
    const recipesList = useSelector(state => state.recipe.recipes);
    const classes = useStyles();
    useEffect(()=>{
        dispatch(fetchRecipes())
        console.log(recipesList)
    }, [])
    
    return (
        <React.Fragment>
            <ul id="recipesList">
            {recipesList.map((item, index)=>{
                return (
                <li className={classes.spaced} key={index}>
                    <RecipeCard recipeText={item.recipe_hash}
                    address={item.pacienteAddress}
                    used={item.is_used}
                    ></RecipeCard>
                </li>
                )
            })}
            </ul>
            
        </React.Fragment>

    )
}

export default MyRecipes;