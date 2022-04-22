import currencyReducer from './currencyReducer';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './authReducer';


const store = configureStore({
  reducer: {
    currency: currencyReducer,
    login: loginReducer
  }
})

export default store;
