import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NameInputScreen from './components/NameInputScreen';
import GenderSelectionScreen from './components/GenderSelectionScreen';
import DateOfBirthScreen from './components/DateOfBirthScreen';
import PasswordScreen from './components/PasswordScreen';
import LocationSelectionScreen from './components/LocationSelectionScreen';
import LanguageSelectionScreen from './components/LanguageSelectionScreen';
import LanguageLevelScreen from './components/LanguageLevelScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameInputScreen />} />
        <Route path="/gender" element={<GenderSelectionScreen/>} />
        <Route path="/date" element= {<DateOfBirthScreen />} />
        <Route path="/password" element={<PasswordScreen />} />
        <Route path="/location" element={<LocationSelectionScreen />} />
        <Route path="/language" element={<LanguageSelectionScreen />} />
        <Route path="/level" element={<LanguageLevelScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
