// store/onboardingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  dateOfBirth: '',
  password: '',
  country: '',
  countryCode: '',
  language: '',
  proficiency: ''
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    updateStep(state, action) {
      return { ...state, ...action.payload };
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    resetOnboarding(state) {
      return initialState;
    }
  }
});

export const { updateStep, setUserId, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
