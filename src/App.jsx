import React , { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import { updateStep, setUserId } from "./store/onboardingSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnboardingRoutes from "./pages/OnboardingPage";
import Home from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import ChatPage from "./pages/ChatPage";
import VideoCall from "./components/VidoeCall";
// Load localStorage → Redux
function SyncFromLocalStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const country = localStorage.getItem("country");
    const countryCode = localStorage.getItem("countryCode");
    const language = localStorage.getItem("language");
    const proficiency = localStorage.getItem("proficiency");

    if (userId) dispatch(setUserId(userId));

    dispatch(
      updateStep({
        firstName,
        lastName,
        email,
        country,
        countryCode,
        language,
        proficiency
      })
    );
  }, []);

  return null;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SyncFromLocalStorage />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/onboarding/*" element={<OnboardingRoutes />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting/*" element={<SettingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/video-call/:targetUserId/:userId" element={<VideoCall />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
