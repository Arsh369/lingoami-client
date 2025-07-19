import React from 'react';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import OnboardingRoutes from './pages/OnboardingPage';
import Home from './pages/HomePage';
function App() {
  return (
    <Router>
      <OnboardingRoutes />
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
