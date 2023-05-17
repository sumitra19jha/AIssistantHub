import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Dashboard from './components/Dashboard/Dashboard';
import ContentReview from './components/ContentReview/ContentReview';
import UserSubscription from './pages/UserSubscription/UserSubscription';
import { ProjectProvider } from './context/ProjectContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import HelpCenter from './pages/HelpCenter/HelpCenter';
import useSession from './components/useToken';
import SeoAnalysis from './components/SeoAnalysis/SeoAnalysis';

function App() {
  const { session, setSession } = useSession();

  if (session) {
    return (
      <ProjectProvider>
        <SubscriptionProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/content-review" element={<ContentReview />} />
              <Route path="/seo" element={<SeoAnalysis />} />
              <Route path="/user-subscription" element={<UserSubscription />} />
              <Route path="/help" element={<HelpCenter />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </SubscriptionProvider>
      </ProjectProvider>
    );
  }

  // Render the login components if the user is not logged in
  return (
    <Router>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<Home setSession={setSession} />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
