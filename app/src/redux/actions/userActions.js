import LOGIN from './types';
import APIs from '../../APIs'

export const login = () => dispatch => {
    fetch(APIs.test)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: LOGIN,
          payload: res.results[0].name.first
        })
      );
  };