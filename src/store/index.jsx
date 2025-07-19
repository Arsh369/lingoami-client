// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './onboardingSlice';

const store = configureStore({
  reducer: {
    onboarding: onboardingReducer
  }
});

export default store;