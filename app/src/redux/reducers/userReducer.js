const initialState = {
    userName:'',
    userSurname:'',
    userMatricula:0,
    userNombreEstablecimiento:'',
    userDireccion:'',
    userAddress:'',
    userPublicKey:'',
    userPrivateKey:'',
    userHash:'',
    userEmail:'',
    userType:'',
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
                userNombreEstablecimiento:action.payload.userNombreEstablecimiento,
                userDireccion:action.payload.userDireccion,
                userAddress:action.payload.userAddress,
                userPublicKey:action.payload.userPublicKey,
                userPrivateKey:action.payload.userPrivateKey,
                userEmail:action.payload.userEmail,
                userHash:action.payload.userHash,
                userType:action.payload.userType,
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginError: action.payload
            };
        case 'MODIFY_USERNAME':
            return {
                ...state,
                userName: action.payload.nombre,
                userSurname: action.payload.apellido
            }
        case 'MODIFY_EMAIL':
            return {
                ...state,
                userEmail: action.payload,
            }
        case 'MODIFY_MATRICULA':
            return {
                ...state,
                userMatricula: action.payload,
            }
        case 'MODIFY_DIRECCION':
            return {
                ...state,
                userDireccion: action.payload,
            }
        case 'MODIFY_NOMBRE_ESTABLECIMIENTO':
            return {
                ...state,
                userNombreEstablecimiento: action.payload,
            }
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