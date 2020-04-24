import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt'
//Sacar si es necesario
//import immutableTransform from 'redux-persist-transform-immutable'
require('dotenv').config();
const initialState = {};

const middleware = [thunk];

const encryptor = createEncryptor({
  secretKey: process.env.REACT_APP_ENCRYPT_PHRASE,
  onError: function(error) {
    // Handle the error.
    //console.log('error encrypt')
    //console.log(error)
  }
})

const persistConfig = {
  transforms: [encryptor],
  key: 'root',
  storage: storage,
  blackList:['recipe'],
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

 const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);