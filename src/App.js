import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Dashboard from './components/Dashboard/Dashboard';
import ContentReview from './components/ContentReview/ContentReview';
import SEOEditor from './components/SEOEditor/SEOEditor';
import ExplorePage from './components/Explore/Explore';
import Footer from './components/Footer/Footer';

function App() {
  const isLoggedIn = false; // replace with your login status check

  return (
    <Router>
      <div>
        {/* conditionally render the header on the before-login pages */}
        {isLoggedIn === false && <Header />}
        <Routes>
          /*Before Login */
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />

          /*After Login */
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content-review" element={<ContentReview />} />
          <Route path="/seo-editor" element={<SEOEditor />} />
        </Routes>
        {/* <Footer /> */}
        {isLoggedIn === false && <Footer />}
      </div>
    </Router>
  );
}

export default App;

