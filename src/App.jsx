import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import CategoryNews from './pages/CategoryNews';
import SearchNews from './pages/SearchNews';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Legal from './pages/Legal';
import Profile from './pages/Profile';
import SavedNews from './pages/SavedNews';
import ChangePassword from './pages/ChangePassword';
import Login from './pages/Login';
import './App.css';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/category/:categoryId" element={<CategoryNews />} />
              <Route path="/search" element={<SearchNews />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<Legal />} />
              <Route path="/privacy" element={<Legal />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/saved" element={<SavedNews />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/login" element={<Login />} />
              {/* Videos route placeholder points to Home for now, could be separate */}
              <Route path="/videos" element={<Home />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
