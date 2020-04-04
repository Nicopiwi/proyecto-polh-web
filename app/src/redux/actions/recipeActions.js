import APIs from '../../APIs'

export const fetchRecipes = (userData) => dispatch => {
    fetch(APIs.test)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: 'FETCH_RECIPES',
          payload: res.results[0].name.first
        })
      );
};