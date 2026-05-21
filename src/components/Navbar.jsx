import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser, FiBookmark, FiSun, FiMoon, FiGlobe } from 'react-icons/fi';
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
    <header className="sticky top-0 z-50 shadow-xl flex flex-col font-sans transition-colors">
      {/* Top utility bar / Market Indices & Weather */}
      <div className="bg-zinc-950 text-gray-300 text-[10px] sm:text-xs py-2 px-4 flex justify-between items-center border-b border-zinc-900">
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
        
        <div className="flex items-center gap-3.5 text-gray-400 shrink-0">
          {/* Universal Language Switcher Widget (Visible on ALL devices) */}
          <span className="flex gap-1.5 font-bold bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full shadow-inner select-none items-center shrink-0">
            <FiGlobe className="text-[10px] text-gray-500 hidden sm:inline" />
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

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <span>📍 {language === 'hi' ? 'नई दिल्ली, भारत' : 'New Delhi, India'}</span>
            <span>☀️ 32°C</span>
          </div>
          
          {/* Dark Mode Toggle Button */}
          <button 
            onClick={toggleDarkMode} 
            className="p-1.5 rounded-full hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800 shrink-0"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FiSun size={14} className="text-amber-400" /> : <FiMoon size={14} />}
          </button>
        </div>
      </div>

      {/* Top Breaking News Bar */}
      <div className="bg-black text-white text-[11px] py-1.5 px-4 flex items-center border-b border-zinc-900 font-semibold">
        <div className="flex items-center gap-2 font-black text-red-600 shrink-0 mr-4 tracking-wider uppercase animate-pulse">
          <FaBolt /> {t("Breaking")}
        </div>
        <div className="flex-1 overflow-hidden relative h-5">
          <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
            {breakingNews.map((news) => {
              const displayTitle = language === 'hi' && newsTranslations.hi[news.id] ? newsTranslations.hi[news.id].title : news.title;
              return (
                <Link key={news.id} to={`/news/${news.id}`} className="hover:text-red-500 mr-8 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full inline-block"></span>
                  {displayTitle}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="shrink-0 text-gray-400 ml-4 hidden md:block uppercase font-bold tracking-widest border-l border-zinc-800 pl-4">
          {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Main Branding Bar (White / Dark Zinc) */}
      <div className="bg-white dark:bg-zinc-950 px-4 lg:px-8 py-3 flex items-center justify-between border-b border-gray-100 dark:border-zinc-900 transition-colors">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="bg-red-600 text-white font-black text-4xl lg:text-5xl px-3 py-1 rounded shadow-md border-b-4 border-red-800 flex items-center justify-center transform group-hover:scale-105 transition-transform animate-pulse-once">
            {language === 'hi' ? 'न्यूज़' : 'NEWS'}
          </div>
          <div className="font-black text-2xl lg:text-3xl text-black dark:text-white tracking-tighter leading-none uppercase">
            {language === 'hi' ? 'पोर्टल' : 'PORTAL'}
            <span className="block text-[9px] tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-extrabold uppercase mt-1">
              {language === 'hi' ? 'तेज़ • निष्पक्ष • सत्य' : 'FAST • UNBIASED • TRUE'}
            </span>
          </div>
        </Link>

        {/* Ad Space Placeholder */}
        <div className="hidden md:flex flex-1 justify-center max-w-3xl mx-8">
           <img src="/header_ad.png" alt="Advertisement" className="w-full max-w-[728px] h-[90px] object-cover bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800" />
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-black dark:text-white p-2 bg-gray-100 dark:bg-zinc-800 rounded" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Live Cricket Score Ticker Ribbon */}
      <CricketScore />

      {/* Primary Navigation Bar (Bold Red) */}
      <nav className="bg-red-600 text-white hidden md:flex items-center justify-between px-4 lg:px-8 border-b-4 border-red-800 relative z-50">
        <div className="flex items-center flex-wrap flex-1">
          <NavLink to="/" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300' : ''}`}>
            {t("Home")}
          </NavLink>
          
          {/* Live TV Nav Item with Pulse Dot */}
          <NavLink to="/live-tv" className={({ isActive }) => `${mainNavLink} text-yellow-300 hover:text-white ${isActive ? 'text-white border-white font-extrabold' : ''}`}>
            <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping mr-1"></span> 
            {t("Live TV")}
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300' : ''}`}>
            {t("About Us")}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300' : ''}`}>
            {t("Contact Us")}
          </NavLink>
          
          <div className="relative group">
            <span className={`${mainNavLink} cursor-pointer`}>
              {t("Categories")}
            </span>
            <div className="absolute top-full left-0 bg-white dark:bg-zinc-900 shadow-2xl min-w-[220px] border-t-4 border-red-600 hidden group-hover:block transition-all z-50 rounded-b-sm">
              {categories.map(cat => (
                <Link 
                  key={cat} 
                  to={`/category/${cat.toLowerCase()}`} 
                  className="block px-4 py-3 text-sm text-gray-800 dark:text-zinc-200 font-extrabold hover:bg-red-50 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 border-b border-gray-100 dark:border-zinc-800 last:border-0"
                >
                  {t(cat)}
                </Link>
              ))}
            </div>
          </div>
          
          <NavLink to="/search" className={({ isActive }) => `${mainNavLink} ${isActive ? 'text-yellow-300 border-yellow-300' : ''}`}>
            {t("Search News")}
          </NavLink>
        </div>

        <div className="flex items-center shrink-0 border-l border-red-500 pl-4 py-2">
          <form onSubmit={handleSearch} className="flex bg-white/10 rounded-full overflow-hidden mr-4 focus-within:bg-white focus-within:text-black transition-all group border border-white/20">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder={t("Search...")} 
              className="w-28 lg:w-44 px-3 py-1.5 text-xs bg-transparent outline-none group-focus-within:text-black text-white placeholder-gray-300 group-focus-within:placeholder-gray-500 font-semibold"
            />
            <button type="submit" className="px-3 hover:text-red-600 group-focus-within:text-red-600 text-white"><FiSearch size={14} /></button>
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

      {/* Secondary Navigation Bar (Gray / Zinc) */}
      <nav className="bg-gray-50 dark:bg-zinc-900 flex items-center px-4 lg:px-8 border-b border-gray-250 dark:border-zinc-800 overflow-x-auto hide-scrollbar transition-colors">
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

      {/* Trending Tags Bar */}
      <div className="bg-gray-100 dark:bg-zinc-950 py-1.5 px-4 lg:px-8 border-b border-gray-200 dark:border-zinc-900 flex items-center gap-3 overflow-x-auto hide-scrollbar transition-colors">
        <span className="text-[10px] font-black uppercase text-red-600 tracking-wider whitespace-nowrap animate-pulse">{t("Trending Now:")}</span>
        <div className="flex gap-4">
          {['#Budget2025', '#T20WorldCup', '#CybertruckIndia', '#Chandrayaan4', '#TaylorSwiftFinalTour', '#CancerVaccineAIIMS'].map((tag) => (
            <button 
              key={tag}
              onClick={() => navigate(`/search?q=${encodeURIComponent(tag.replace('#', ''))}`)}
              className="text-xs text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 font-extrabold whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-red-600 text-white flex flex-col h-[calc(100vh-140px)] overflow-y-auto absolute top-full left-0 w-full z-50 shadow-2xl animate-fadeIn">
          <div className="p-4 bg-red-700 shadow-inner flex flex-col gap-3">
            <form onSubmit={handleSearch} className="flex bg-white rounded overflow-hidden">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t("Search news...")} className="flex-1 px-4 py-3 text-black outline-none font-medium"/>
              <button type="submit" className="bg-gray-200 text-gray-700 px-5 hover:bg-gray-300 transition-colors"><FiSearch size={20} /></button>
            </form>
            
            {/* Switched language badge inside mobile menu drawer for maximum convenience */}
            <div className="flex justify-between items-center bg-red-800/40 p-2.5 rounded border border-red-500/30">
              <span className="text-xs font-bold flex items-center gap-1.5"><FiGlobe /> {language === 'hi' ? 'भाषा चुनें (Select Language)' : 'Select Language'}</span>
              <span className="flex gap-1.5 font-bold bg-red-950/60 p-1 rounded">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={`text-xs px-2.5 py-1 rounded transition-colors ${language === 'en' ? 'bg-yellow-400 text-red-900 font-black shadow-md' : 'text-gray-200 hover:text-white'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('hi')} 
                  className={`text-xs font-hind px-2.5 py-1 rounded transition-colors ${language === 'hi' ? 'bg-yellow-400 text-red-900 font-black shadow-md' : 'text-gray-200 hover:text-white'}`}
                >
                  हिन्दी
                </button>
              </span>
            </div>
          </div>

          <div className="flex flex-col [&>a]:border-b [&>a]:border-red-500 [&>a]:px-6 [&>a]:py-4 [&>a]:font-bold [&>a]:uppercase [&>a]:tracking-wide text-sm">
             <NavLink to="/" onClick={() => setMenuOpen(false)}>
               {t("Home")}
             </NavLink>
             <NavLink to="/live-tv" onClick={() => setMenuOpen(false)} className="text-yellow-300 flex items-center">
               <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 inline-block animate-ping mr-1.5"></span>
               {t("Live TV")}
             </NavLink>
             <NavLink to="/about" onClick={() => setMenuOpen(false)}>
               {t("About Us")}
             </NavLink>
             <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
               {t("Contact Us")}
             </NavLink>
             <div className="border-b border-red-500">
               <div className="px-6 py-4 font-bold uppercase tracking-wide">
                 {t("Categories")}
               </div>
               <div className="flex flex-col bg-red-700/50">
                 {categories.map(cat => (
                   <NavLink 
                     key={cat} 
                     to={`/category/${cat.toLowerCase()}`} 
                     onClick={() => setMenuOpen(false)}
                     className="px-8 py-3 text-sm font-semibold border-b border-red-500/30 last:border-0 text-white/90"
                   >
                     - {t(cat)}
                   </NavLink>
                 ))}
               </div>
             </div>
             <NavLink to="/search" onClick={() => setMenuOpen(false)}>
               {t("Search News")}
             </NavLink>
             <NavLink to="/saved" onClick={() => setMenuOpen(false)}>{t("Bookmarks")}</NavLink>
             <NavLink to="/terms" onClick={() => setMenuOpen(false)}>{t("Terms & Conditions")}</NavLink>
             <NavLink to="/privacy" onClick={() => setMenuOpen(false)}>{t("Privacy Policy")}</NavLink>
          </div>

          <div className="p-6 mt-auto bg-red-700">
             {user ? (
                <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="w-full font-bold bg-white text-red-600 py-3 px-4 text-center rounded shadow-lg uppercase tracking-wider">{t("Logout")}</button>
             ) : (
                <Link to="/login" className="w-full font-bold bg-white text-red-600 py-3 px-4 text-center rounded shadow-lg uppercase tracking-wider block" onClick={() => setMenuOpen(false)}>{t("Login")}</Link>
             )}
          </div>
        </div>
      )}
    </header>
  );
}
