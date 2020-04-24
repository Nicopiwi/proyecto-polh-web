const initialState = {
    recipes: []
};

export default function(state = initialState, action) {
    switch (action.type) {

        case 'REPLACE_RECIPES':
            return {
                ...state,
                recipes: action.payload
            };

        //Se le debe pasar un ARRAY en el payload
        case 'SAVE_RECIPE':
            return {
                ...state,
                recipes: [...state.recipes, ...action.payload]
            };
        
        default:
            return state;
    }
  }