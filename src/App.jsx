import React from 'react';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import OnboardingRoutes from './pages/OnboardingPage';
import Home from './pages/HomePage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding/*" element={<OnboardingRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
