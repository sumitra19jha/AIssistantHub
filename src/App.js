import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import { SubscriptionPage } from './pages/Subscription/SubscriptionPage';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Dashboard from './components/Dashboard/Dashboard';
import ContentReview from './components/ContentReview/ContentReview';
import SEOEditor from './components/SEOEditor/SEOEditor';
import ExplorePage from './components/Explore/Explore';
import Footer from './components/Footer/Footer';
import UserSubscription from './pages/UserSubscription/UserSubscription';
import { ProjectProvider } from './context/ProjectContext';
import { SubscriptionProvider } from './context/SubscriptionContext';

function App() {
  const storedSessionId = localStorage.getItem('session_id');

  if (storedSessionId) {
    return (
      <ProjectProvider>
        <SubscriptionProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/content-review" element={<ContentReview />} />
              <Route path="/seo-editor" element={<SEOEditor />} />
              <Route path="/user-subscription" element={<UserSubscription />} />

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
      <div style={{ height: "100vh" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
