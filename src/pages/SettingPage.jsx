import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotificationsPage from '../components/setting/Notifications';
import SettingOptions from '../components/setting/SettingOptions';
import PreferencesPage from '../components/setting/Preferences';
import ReportAnIssuePage from '../components/setting/ReportAnIssue';
import FAQPage from '../components/setting/FAQ';
import TermsAndConditionsPage from '../components/setting/TermsAndConditions';
import AboutUsPage from '../components/setting/AboutUs';
const SettingPage = () => {
  return (
    <Routes>
    <Route path="/settingoptions" element={<SettingOptions />} /> 
    <Route path="/notifications" element={<NotificationsPage />} />
    <Route path='/preferences' element={<PreferencesPage />} />
    <Route path='/repostanissue' element={<ReportAnIssuePage />} />
    <Route path='/faq' element={<FAQPage />} />
    <Route path='/termsandconditions' element={<TermsAndConditionsPage />} />
    <Route path='/aboutus' element={<AboutUsPage />} />
    </Routes>
  )
}

export default SettingPage