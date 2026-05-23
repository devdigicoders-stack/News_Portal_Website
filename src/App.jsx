import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingLiveTV from './components/FloatingLiveTV';
import AnimatedPage from './components/AnimatedPage';

// Pages
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import CategoryNews from './pages/CategoryNews';
import SearchNews from './pages/SearchNews';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import SavedNews from './pages/SavedNews';
import ChangePassword from './pages/ChangePassword';
import Login from './pages/Login';
import LiveTV from './pages/LiveTV';
import './App.css';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/news/:id" element={<AnimatedPage><NewsDetail /></AnimatedPage>} />
        <Route path="/category/:categoryId" element={<AnimatedPage><CategoryNews /></AnimatedPage>} />
        <Route path="/search" element={<AnimatedPage><SearchNews /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><AboutUs /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><ContactUs /></AnimatedPage>} />
        <Route path="/terms" element={<AnimatedPage><TermsConditions /></AnimatedPage>} />
        <Route path="/privacy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="/saved" element={<AnimatedPage><SavedNews /></AnimatedPage>} />
        <Route path="/change-password" element={<AnimatedPage><ChangePassword /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/live-tv" element={<AnimatedPage><LiveTV /></AnimatedPage>} />
        {/* Videos route pointing to LiveTV broadcast hub */}
        <Route path="/videos" element={<AnimatedPage><LiveTV /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-gray-200 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-50 text-zinc-900 transition-colors duration-500 font-sans">
          <Navbar />
          
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          
          <Footer />
          
          {/* Global Watch Live TV Floating Widget */}
          <FloatingLiveTV />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

