const initialState = {
  userName:''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userName: action.payload
            };
        default:
            return state;
    }
  }