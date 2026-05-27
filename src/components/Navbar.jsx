import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser, FiBookmark, FiSun, FiMoon, FiGlobe, FiMapPin } from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { newsData, categories } from '../data/news';
import { uiTranslations, newsTranslations } from '../data/translations';
import CricketScore from './CricketScore';

export default function Navbar() {
  const { user, logout, darkMode, toggleDarkMode, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const breakingNews = newsData.filter(n => n.breaking);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  const mainNavLink = 'text-xs lg:text-[13px] font-black text-white hover:text-yellow-300 transition-colors uppercase px-3 py-3.5 whitespace-nowrap border-b-4 border-transparent hover:border-yellow-300 flex items-center gap-1.5';
  const subNavLink = 'text-[10px] lg:text-xs font-bold text-gray-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors uppercase px-4 py-2 whitespace-nowrap border-r border-gray-200 dark:border-zinc-800 last:border-0';
  const authLink = 'text-xs font-black text-red-600 bg-white hover:bg-gray-100 transition-all uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-md flex items-center gap-1 ml-2';

  // Helper translation lookup
  const t = (key) => uiTranslations[language]?.[key] || key;

  return (
    <>
      {/* Top utility bar / Market Indices & Weather - NON STICKY */}
      <div className="bg-zinc-950 text-gray-300 text-[10px] sm:text-xs py-1.5 px-4 flex justify-between items-center border-b border-black">
        <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar scroll-smooth">
          <span className="flex items-center gap-1 font-bold whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span> 
            SENSEX: <span className="text-emerald-400">90,045 (+0.45%)</span>
          </span>
          <span className="flex items-center gap-1 font-bold whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span> 
            NIFTY 50: <span className="text-emerald-400">27,210 (+0.38%)</span>
          </span>
          <span className="flex items-center gap-1 font-bold whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span> 
            GOLD: <span className="text-emerald-400">₹72,400 (+0.12%)</span>
          </span>
          <span className="flex items-center gap-1 font-bold whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block animate-pulse"></span> 
            USD/INR: <span className="text-rose-400">₹83.42 (-0.05%)</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3.5 text-gray-400 shrink-0 ml-4">
          {/* Universal Language Switcher Widget */}
          <span className="flex gap-1 font-bold bg-black border border-zinc-800 px-1 py-0.5 rounded-full shadow-inner select-none items-center shrink-0">
            <FiGlobe className="text-[10px] text-gray-500 hidden sm:inline ml-1" />
            <button 
              onClick={() => setLanguage('en')} 
              className={`transition-colors text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full ${language === 'en' ? 'text-yellow-400 bg-zinc-800 font-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('hi')} 
              className={`transition-colors text-[9px] sm:text-[10px] font-hind px-2 py-0.5 rounded-full ${language === 'hi' ? 'text-yellow-400 bg-zinc-800 font-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              हिन्दी
            </button>
          </span>

          <div className="hidden sm:flex items-center gap-4 shrink-0 font-semibold text-gray-300">
            <span className="flex items-center gap-1"><FiMapPin className="text-red-500" /> {language === 'hi' ? 'नई दिल्ली' : 'New Delhi'}</span>
            <span className="flex items-center gap-1"><FiSun className="text-amber-400" /> 32°C</span>
          </div>
          
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleDarkMode} 
            className="p-1 rounded-full hover:bg-zinc-800 hover:text-white transition-colors border border-transparent hover:border-zinc-700 shrink-0"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FiSun size={14} className="text-amber-400" /> : <FiMoon size={14} />}
          </button>
        </div>
      </div>

      <header className="sticky top-0 z-50 flex flex-col font-sans transition-colors shadow-2xl">
        {/* Main Branding Bar (Glassmorphic) */}
        <div className="glass-card dark:glass-card-dark px-4 lg:px-8 py-3 flex items-center justify-between transition-colors z-40 border-b border-gray-200/30 dark:border-zinc-800/50">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-3xl lg:text-5xl px-3 py-1 rounded-md shadow-lg border-b-4 border-red-900 flex items-center justify-center transform group-hover:scale-105 transition-transform animate-pulse-once logo-shine">
              {language === 'hi' ? 'न्यूज़' : 'NEWS'}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-2xl lg:text-3xl text-zinc-900 dark:text-white tracking-tighter leading-none uppercase drop-shadow-sm">
                {language === 'hi' ? 'पोर्टल' : 'PORTAL'}
              </span>
              <span className="text-[8px] lg:text-[10px] tracking-[0.25em] text-red-600 dark:text-red-500 font-extrabold uppercase mt-0.5">
                {language === 'hi' ? 'तेज़ • निष्पक्ष • सत्य' : 'FAST • UNBIASED • TRUE'}
              </span>
            </div>
          </Link>

          {/* Ad Space Placeholder */}
          <div className="hidden md:flex flex-1 justify-center max-w-3xl mx-8">
             <img src="/header_ad.png" alt="Advertisement" className="w-full max-w-[728px] h-[90px] object-cover rounded-xl shadow-sm bg-gray-100 dark:bg-zinc-900 border border-white/40 dark:border-zinc-800/60" />
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        {/* Primary Navigation Bar */}
        <nav className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white hidden md:flex items-center justify-between px-4 lg:px-8 border-b-2 border-red-900 relative z-50 shadow-md">
          <div className="flex items-center flex-wrap flex-1">
            <NavLink to="/" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300 bg-black/10' : ''}`}>
              {t("Home")}
            </NavLink>
            
            <NavLink to="/live-tv" className={({ isActive }) => `${mainNavLink} text-yellow-300 hover:text-white ${isActive ? 'text-white border-white font-extrabold bg-black/10' : ''}`}>
              <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping mr-1 shadow-glow"></span> 
              {t("Live TV")}
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300 bg-black/10' : ''}`}>
              {t("About Us")}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300 bg-black/10' : ''}`}>
              {t("Contact Us")}
            </NavLink>
            
            <div className="relative group">
              <span className={`${mainNavLink} cursor-pointer`}>
                {t("Categories")}
              </span>
              <div className="absolute top-full left-0 bg-white dark:bg-zinc-900 shadow-2xl min-w-[220px] border-t-4 border-red-600 hidden group-hover:block transition-all z-50 rounded-b-md overflow-hidden">
                {categories.map(cat => (
                  <Link 
                    key={cat} 
                    to={`/category/${cat.toLowerCase()}`} 
                    className="block px-4 py-3 text-sm text-gray-800 dark:text-zinc-200 font-extrabold hover:bg-red-50 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 border-b border-gray-100 dark:border-zinc-800/80 last:border-0 transition-colors"
                  >
                    {t(cat)}
                  </Link>
                ))}
              </div>
            </div>
            
            <NavLink to="/search" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300 bg-black/10' : ''}`}>
              {t("Search News")}
            </NavLink>
          </div>

          <div className="flex items-center shrink-0 border-l border-red-800/50 pl-4 py-1.5">
            <form onSubmit={handleSearch} className="flex bg-black/20 rounded-full overflow-hidden mr-4 focus-within:bg-white focus-within:text-black transition-all group border border-white/10 shadow-inner">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder={t("Search...")} 
                className="w-28 lg:w-44 px-3 py-1.5 text-xs bg-transparent outline-none group-focus-within:text-black text-white placeholder-gray-300 group-focus-within:placeholder-gray-500 font-semibold"
              />
              <button type="submit" className="px-3 hover:text-red-600 group-focus-within:text-red-600 text-white transition-colors"><FiSearch size={14} /></button>
            </form>

            {user ? (
              <div className="flex items-center gap-1.5">
                <Link to="/profile" className={authLink}><FiUser /> {t("My Profile")}</Link>
                <Link to="/saved" className={authLink}><FiBookmark /> {t("Saved")}</Link>
                <button onClick={() => { logout(); navigate('/'); }} className="text-[10px] font-black text-white hover:text-yellow-300 uppercase ml-3 tracking-widest transition-colors">{t("Logout")}</button>
              </div>
            ) : (
              <Link to="/login" className={authLink}><FiUser /> {t("Login")}</Link>
            )}
          </div>
        </nav>

        {/* Top Breaking News Bar */}
        <div className="bg-zinc-900 text-white text-[11px] py-1.5 px-4 flex items-center border-b border-zinc-950 font-semibold shadow-inner">
          <div className="flex items-center gap-2 font-black text-red-500 shrink-0 mr-4 tracking-wider uppercase animate-pulse drop-shadow-md">
            <FaBolt /> {t("Breaking")}
          </div>
          <div className="flex-1 overflow-hidden relative h-5">
            <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
              {breakingNews.map((news) => {
                const displayTitle = language === 'hi' && newsTranslations.hi[news.id] ? newsTranslations.hi[news.id].title : news.title;
                return (
                  <Link key={news.id} to={`/news/${news.id}`} className="hover:text-red-400 mr-8 flex items-center gap-2 transition-colors">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full inline-block shadow-glow"></span>
                    {displayTitle}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="shrink-0 text-gray-400 ml-4 hidden md:block uppercase font-bold tracking-widest border-l border-zinc-700 pl-4 text-[9px]">
            {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Live Cricket Score Ticker Ribbon - Also sticky so it stays visible */}
        <CricketScore />
        
      </header>

      {/* Secondary Navigation Bar - NON STICKY */}
      <nav className="bg-white dark:bg-zinc-900 flex items-center px-4 lg:px-8 border-b border-gray-200 dark:border-zinc-800 overflow-x-auto hide-scrollbar transition-colors">
          <Link to="/" className={subNavLink}>
            {t("Latest & Trending")}
          </Link>
          <Link to="/live-tv" className={subNavLink}>
            {t("Live 24x7 Broadcast")}
          </Link>
          <Link to="/news/1" className={subNavLink}>
            {t("Detailed News Feed")}
          </Link>
          <Link to="/saved" className={subNavLink}>
            {t("Bookmarks")}
          </Link>
          <Link to="/terms" className={subNavLink}>
            {t("Terms & Conditions")}
          </Link>
          <Link to="/privacy" className={subNavLink}>
            {t("Privacy Policy")}
          </Link>
      </nav>

      {/* Trending Tags Bar - NON STICKY */}
      <div className="bg-gray-50 dark:bg-zinc-950 py-2 px-4 lg:px-8 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-3 overflow-x-auto hide-scrollbar transition-colors">
        <span className="text-[10px] font-black uppercase text-red-600 tracking-wider whitespace-nowrap">{t("Trending Now:")}</span>
        <div className="flex gap-4">
          {['#Budget2025', '#T20WorldCup', '#CybertruckIndia', '#Chandrayaan4', '#TaylorSwiftFinalTour', '#CancerVaccineAIIMS'].map((tag) => (
            <button 
              key={tag}
              onClick={() => navigate(`/search?q=${encodeURIComponent(tag.replace('#', ''))}`)}
              className="text-xs text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 font-extrabold whitespace-nowrap transition-colors bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950 text-white flex flex-col h-[calc(100vh-60px)] overflow-y-auto fixed top-[60px] left-0 w-full z-50 shadow-2xl animate-fadeIn">
          <div className="p-4 bg-zinc-900 shadow-inner flex flex-col gap-4 border-b border-zinc-800">
            <form onSubmit={handleSearch} className="flex bg-zinc-800 rounded-xl overflow-hidden shadow-inner border border-zinc-700 focus-within:border-red-500 transition-colors">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search news...")} className="flex-1 px-4 py-3 text-white bg-transparent outline-none font-medium"/>
              <button type="submit" className="bg-red-600 text-white px-5 hover:bg-red-700 transition-colors"><FiSearch size={20} /></button>
            </form>
            
            {/* Switched language badge inside mobile menu drawer for maximum convenience */}
            <div className="flex justify-between items-center bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
              <span className="text-xs font-bold flex items-center gap-1.5 text-zinc-300"><FiGlobe /> {language === 'hi' ? 'भाषा चुनें' : 'Select Language'}</span>
              <span className="flex gap-1.5 font-bold p-1 rounded">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`text-xs px-3 py-1.5 rounded-md transition-colors ${language === 'en' ? 'bg-red-600 text-white font-black shadow-md' : 'text-gray-400 bg-zinc-900 hover:text-white border border-zinc-700'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('hi')} 
                  className={`text-xs font-hind px-3 py-1.5 rounded-md transition-colors ${language === 'hi' ? 'bg-red-600 text-white font-black shadow-md' : 'text-gray-400 bg-zinc-900 hover:text-white border border-zinc-700'}`}
                >
                  हिन्दी
                </button>
              </span>
            </div>
          </div>

          <div className="flex flex-col [&>a]:border-b [&>a]:border-zinc-800 [&>a]:px-6 [&>a]:py-4 [&>a]:font-bold [&>a]:uppercase [&>a]:tracking-wide text-sm bg-zinc-950">
             <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">
               {t("Home")}
             </NavLink>
             <NavLink to="/live-tv" onClick={() => setMenuOpen(false)} className="text-yellow-400 flex items-center hover:bg-zinc-900 transition-colors">
               <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse mr-2"></span>
               {t("Live TV")}
             </NavLink>
             <NavLink to="/about" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">
               {t("About Us")}
             </NavLink>
             <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">
               {t("Contact Us")}
             </NavLink>
             <div className="border-b border-zinc-800 bg-zinc-900/50">
               <div className="px-6 py-4 font-black uppercase tracking-wide text-red-500">
                 {t("Categories")}
               </div>
               <div className="flex flex-col">
                 {categories.map(cat => (
                   <NavLink 
                     key={cat} 
                     to={`/category/${cat.toLowerCase()}`} 
                     onClick={() => setMenuOpen(false)}
                     className="px-8 py-3 text-sm font-semibold border-b border-zinc-800/50 last:border-0 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
                   >
                     <span className="w-1 h-1 bg-red-600 rounded-full"></span> {t(cat)}
                   </NavLink>
                 ))}
               </div>
             </div>
             <NavLink to="/search" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">
               {t("Search News")}
             </NavLink>
             <NavLink to="/saved" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">{t("Bookmarks")}</NavLink>
             <NavLink to="/terms" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">{t("Terms & Conditions")}</NavLink>
             <NavLink to="/privacy" onClick={() => setMenuOpen(false)} className="hover:text-red-500 hover:bg-zinc-900 transition-colors">{t("Privacy Policy")}</NavLink>
          </div>

          <div className="p-6 mt-auto bg-zinc-900 border-t border-zinc-800">
             {user ? (
                <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="w-full font-black bg-red-600 hover:bg-red-700 text-white py-3.5 px-4 text-center rounded-lg shadow-lg uppercase tracking-wider transition-colors">{t("Logout")}</button>
             ) : (
                <Link to="/login" className="w-full font-black bg-red-600 hover:bg-red-700 text-white py-3.5 px-4 text-center rounded-lg shadow-lg uppercase tracking-wider block transition-colors" onClick={() => setMenuOpen(false)}>{t("Login")}</Link>
             )}
          </div>
        </div>
      )}
    </>
  );
}
