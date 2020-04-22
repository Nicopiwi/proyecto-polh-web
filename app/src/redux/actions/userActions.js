import APIs from '../../APIs'
import fetchTimeout from '../../fetchWithTimeout'

export const login = (email, password, type) => dispatch => {
    let api_url = ''
    switch(type){
      case 'medico':
        api_url = APIs.rest.loginMedico
        break;
      case 'farmacia':
        api_url = APIs.rest.loginFarmacia
        break;
      default:
        api_url = APIs.rest.loginMedico
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    //console.log(JSON.stringify({emaill:email, passwordd:password}))
    return fetch(api_url, {method: 'POST',
      body: JSON.stringify({emaill:email, passwordd:password}),
      headers:headers
    })
      .then(res => res.json())
      .then(res => {
          console.log('cargando')
          localStorage.setItem('userToken', res.token)
          console.log(res.user.publicKey)
          dispatch({
            type: 'LOGIN',
            payload: {
              userName:res.user.name,
              userSurname:res.user.surname,
              userMatricula:res.user.matricula,
              userDireccion:type==='farmacia'?res.user.direccion:null,
              userNombreEstablecimiento:type==='farmacia'?res.user.nombreEstablecimiento:null,
              userAddress:res.user.address,
              userPublicKey:res.user.publicKey,
              userPrivateKey:res.user.privateKey,
              userHash:res.user.hash,
              userEmail:res.user.email,
              userType:type
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
  
export const modifyUserName = (userName, userSurname, userType) => dispatch => {
  const uri = userType==='medico'?APIs.rest.updateMedico:APIs.rest.updateFarmacia
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('token', localStorage.getItem('userToken'));
  console.log(localStorage.getItem('userToken'))
  console.log('modificando...')
  console.log(`${userName} ${userSurname} ${userType}`)
  
  return fetchTimeout(uri, 
    {method:'PUT', 
    headers, 
    body: JSON.stringify({name: userName, surname: userSurname})}, 30000)
    .then(res=>res.json())
    .then(res=>{
      if (res.status && res.status === 400){
        return false
      }
      dispatch({
        type: 'MODIFY_USERNAME',
        payload: {nombre: userName, apellido: userSurname}
      })
      alert('Dato cambiado')
      return true
    })
    .catch(e=>{
      console.log(e)
      return false
    })
};


export const modifyMatricula = (userMatricula) => dispatch => {
  const uri = APIs.rest.updateFarmacia
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('token', localStorage.getItem('userToken'));
  console.log('modificando...')
  
  return fetchTimeout(uri, 
    {method:'PUT', 
    headers, 
    body: JSON.stringify({matricula:userMatricula})}, 30000)
    .then(res=>res.json())
    .then(res=>{
      if (res.status && res.status === 400){
        return false
      }
      dispatch({
        type: 'MODIFY_MATRICULA',
        payload: userMatricula
      })
      alert('Dato cambiado')
      return true
    })
    .catch(e=>{
      console.log(e)
      return false
    })
};

export const modifyEmail = (userEmail, userType) => dispatch => {
  const uri = userType==='medico'?APIs.rest.updateMedico:APIs.rest.updateFarmacia
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('token', localStorage.getItem('userToken'));
  console.log('modificando...')
  
  return fetchTimeout(uri, 
    {method:'PUT', 
    headers, 
    body: JSON.stringify({email:userEmail})}, 30000)
    .then(res=>res.json())
    .then(res=>{
      if (res.status && res.status === 400){
        return false
      }
      dispatch({
        type: 'MODIFY_EMAIL',
        payload: userEmail
      })
      return true
    })
    .catch(e=>{
      console.log(e)
      return false
    })
};

export const modifyDireccion = (userDireccion) => dispatch => {
  const uri = APIs.rest.updateFarmacia
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('token', localStorage.getItem('userToken'));
  console.log('modificando...')
  
  return fetchTimeout(uri, 
    {method:'PUT', 
    headers, 
    body: JSON.stringify({direccion:userDireccion})}, 30000)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if (res.status && res.status === 400){
        return false
      }
      else{
        dispatch({
          type: 'MODIFY_DIRECCION',
          payload: userDireccion
        })
        alert('Dato cambiado')
        return true
      }
    })
    .catch(e=>{
      console.log(e)
      return false
    })
};

export const modifyNombreEstablecimiento = (userNombreEstablecimiento) => dispatch => {
  const uri = APIs.rest.updateFarmacia
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('token', localStorage.getItem('userToken'));
  console.log('modificando...')
  
  return fetchTimeout(uri, 
    {method:'PUT', 
    headers, 
    body: JSON.stringify({nombreEstablecimiento:userNombreEstablecimiento})}, 7000)
    .then(res=>res.json())
    .then(res=>{
      if (res.status && res.status === 400){
        console.log('falló')
        return false
      }
      dispatch({
        type: 'MODIFY_NOMBRE_ESTABLECIMIENTO',
        payload: userNombreEstablecimiento
      })
      alert('Dato cambiado')
      return true
    })
    .catch(e=>{
      console.log(e)
      return false
    })
};