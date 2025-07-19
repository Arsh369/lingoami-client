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
      <Route path="/account-info" element={<AccountNameEmailStep />} />
      <Route path="/gender" element={<AccountGenderSelectionStep />} />
      <Route path="/date-of-birth" element={<AccountDateOfBirthStep />} />
      <Route path="/password" element={<AccountPasswordStep />} />
      <Route path="/location" element={<CountrySelectionStep />} />
      <Route path="/language" element={<LanguageSelectionStep />} />
      <Route path="/proficiency" element={<LanguageProficiencyStep />} />
    </Routes>
  );
};

export default OnboardingRoutes;
