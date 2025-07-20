import React from 'react';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import OnboardingRoutes from './pages/OnboardingPage';
import Home from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/signin' element={<SignInPage />} />
      <Route path="/onboarding/*" element={<OnboardingRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
