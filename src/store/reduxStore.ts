import { configureStore } from '@reduxjs/toolkit';
import userFromGoogleReducer from './reducer';

export default configureStore({
  reducer: {
    userFromGoogle: userFromGoogleReducer,
  },
});
