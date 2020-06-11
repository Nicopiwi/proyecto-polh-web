import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from "localforage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createEncryptor from 'redux-persist-transform-encrypt'
const initialState = {}
const middleware = [thunk];

const persistConfig = {
  
  key: 'root',
  storage: localForage,
  blacklist: ['recipe'],
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
 };

 const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);

export const persistor = persistStore(store);
