import { configureStore,combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import listReducer from "../features/counter/listSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    list:listReducer,
  },
});
