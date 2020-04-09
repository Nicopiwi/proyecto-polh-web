const initialState = {
    userName:'',
    userSurname:'',
    userMatricula:0,
    userAddress:'',
    userPublicKey:'',
    userPrivateKey:'',
    userHash:'',
    userEmail:'',
    loginError:null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userName:action.payload.userName,
                userSurname:action.payload.userSurname,
                userMatricula:action.payload.userMatricula,
                userAddress:action.payload.userAddress,
                userPublicKey:action.payload.userPublicKey,
                userPrivateKey:action.payload.userPrivateKey,
                userEmail:action.payload.userEmail,
                userHash:action.payload.userHash
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.payload
            };
        case 'NULL_ERRORS':
            switch(action.payload){
                case "LOGIN":
                    return {
                        ...state,
                        loginError: null
                    };
                default:
                    return {
                        ...state,
                        loginError: null
                    };
            }
        default:
            return state;
    }
  }