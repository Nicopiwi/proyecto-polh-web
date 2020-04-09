import APIs from '../../APIs'

export const login = (email, password) => dispatch => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return fetch(APIs.rest.loginMedico, {method: 'POST',
      body: JSON.stringify({emaill:email, passwordd:password}),
      headers:headers
    })
      .then(res => res.json())
      .then(res => {
          localStorage.setItem('userToken', res.token)
          dispatch({
            type: 'LOGIN',
            payload: {
              userName:res.user.name,
              userSurname:res.user.surname,
              userMatricula:res.user.matricula,
              userAddress:res.user.address,
              userPublicKey:res.user.publicKey,
              userPrivateKey:res.user.privateKey,
              userHash:res.user.hash,
              userEmail:res.user.email,
            }
          })
          return true
        }
      )
      .catch((e)=>{
        console.log(e)
        dispatch({
          type: 'LOGIN_ERROR',
          payload: e
        })
        return false
    })
  };

export const nullErrors = (errorName) => dispatch => {
  dispatch({
    type: 'NULL_ERRORS',
    payload: errorName
  })
};
  
export const modifyUserName = (userName) => dispatch => {
    dispatch({
      type: 'MODIFY_USERNAME',
      payload: userName
    })
};

export const modifyPassword = (userPassword) => dispatch => {
  dispatch({
    type: 'MODIFY_PASSWORD',
    payload: userPassword
  })
};

export const modifyMatricula = (userMatricula) => dispatch => {
  dispatch({
    type: 'MODIFY_MATRICULA',
    payload: userMatricula
  })
};

export const modifyEmail = (userEmail) => dispatch => {
  dispatch({
    type: 'MODIFY_EMAIL',
    payload: userEmail
  })
};

export const modifyKeys = (userKeys) => dispatch => {
  dispatch({
    type: 'MODIFY_KEYS',
    payload: userKeys
  })
};