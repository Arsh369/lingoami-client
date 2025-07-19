import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AccountNameEmailStep from '../components/onboarding/AccountNameEmailStep';
import AccountGenderSelectionStep from '../components/onboarding/AccountGenderSelectionStep';
import AccountDateOfBirthStep from '../components/onboarding/AccountDateOfBirthStep';
import AccountPasswordStep from '../components/onboarding/AccountPasswordStep';
import CountrySelectionStep from '../components/onboarding/CountrySelectionStep';
import LanguageSelectionStep from '../components/onboarding/LanguageSelectionStep';
import LanguageProficiencyStep from '../components/onboarding/LanguageProficiencyStep';

const OnboardingRoutes = () => {
  return (
    <Routes>
      <Route path="/onboarding/account-info" element={<AccountNameEmailStep />} />
      <Route path="/onboarding/gender" element={<AccountGenderSelectionStep />} />
      <Route path="/onboarding/date-of-birth" element={<AccountDateOfBirthStep />} />
      <Route path="/onboarding/password" element={<AccountPasswordStep />} />
      <Route path="/onboarding/location" element={<CountrySelectionStep />} />
      <Route path="/onboarding/language" element={<LanguageSelectionStep />} />
      <Route path="/onboarding/language-level" element={<LanguageProficiencyStep />} />
    </Routes>
  );
};

export default OnboardingRoutes;
