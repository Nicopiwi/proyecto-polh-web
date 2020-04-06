import APIs from '../../APIs'

export const login = () => dispatch => {
    fetch(APIs.test)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: 'LOGIN',
          payload: res.results[0].name.first
        })
      );
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