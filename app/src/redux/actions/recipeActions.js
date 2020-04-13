import APIs from '../../APIs'

export const fetchRecipes = (userData) => dispatch => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('token', localStorage.getItem('userToken'));
  fetch(APIs.rest.getRecetasMedico, {method:'GET', headers})
    .then(res => res.json())
    .then(res => {
        console.log(res)
        dispatch({
          type: 'REPLACE_RECIPES',
          payload: res.recipes
        })
    })
      
};

export const createRecipe = (recipeMedic, recipePatient, recipeText) => dispatch => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('token', localStorage.getItem('userToken'));
  return fetch(APIs.rest.createReceta, {method: 'POST',
      body: JSON.stringify({medico:recipeMedic, paciente: recipePatient, recipe:recipeText}),
      headers:headers
    })
      .then(res => res.json())
      .then(res => {
          dispatch({
            type: 'SAVE_RECIPE',
            payload: [{
              pacienteAddress: recipePatient.address,
              recipe_hash:res.result,
              is_used:false
            }]
          })
          return true
        }
      )
      .catch((e)=>{
        
        console.log(e)
        return false
      })
};