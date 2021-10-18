import { configureStore ,combineReducers } from '@reduxjs/toolkit';
import listReducer from "../features/listSlice"
import LogInReducer from "../features/loginSlice"
import {  persistStore,  persistReducer,  FLUSH,  REHYDRATE,  PAUSE,  PERSIST,  PURGE,  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


/* 
export const store = configureStore({
  reducer: {
    list:listReducer,
    login:LogInReducer
  },
});
 */

let rootReducer = combineReducers({list: listReducer, login: LogInReducer})

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
// eslint-disable-next-line import/no-anonymous-default-export

//export const  store = createStore(persistedReducer)

export const store = configureStore({  
reducer: persistedReducer,
middleware: (getDefaultMiddleware) =>    
  getDefaultMiddleware({      
    serializableCheck: {        
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],      
    },   
  }),})

export const  persistor = persistStore(store)
