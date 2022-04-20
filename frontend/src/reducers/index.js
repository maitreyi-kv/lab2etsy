import currencyReducer from './currencyReducer';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {
    currency: currencyReducer,
  }
})

export default store;
