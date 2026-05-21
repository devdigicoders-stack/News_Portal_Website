import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX, FiUser, FiBookmark } from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { newsData, categories } from '../data/news';

export default function Navbar() {
  const { user, logout } = useApp();
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

  const mainNavLink = 'text-xs lg:text-[13px] font-bold text-white hover:text-yellow-300 transition-colors uppercase px-3 py-3 whitespace-nowrap border-b-4 border-transparent hover:border-yellow-300';
  const authLink = 'text-xs font-bold text-red-600 bg-white hover:bg-gray-100 transition-colors uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm flex items-center gap-1 ml-2';

  return (
    <header className="sticky top-0 z-50 shadow-xl flex flex-col font-sans">
      {/* Top Breaking News Bar */}
      <div className="bg-black text-white text-[11px] py-1 px-4 flex items-center border-b border-gray-800">
        <div className="flex items-center gap-2 font-black text-red-500 shrink-0 mr-4 tracking-wider uppercase">
          <FaBolt /> Breaking
        </div>
        <div className="flex-1 overflow-hidden relative h-5">
          <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
            {breakingNews.map((news) => (
              <Link key={news.id} to={`/news/${news.id}`} className="hover:text-red-400 mr-8 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block"></span>
                {news.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="shrink-0 text-gray-400 ml-4 hidden md:block uppercase font-bold tracking-widest border-l border-gray-700 pl-4">
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Main Branding Bar (White) */}
      <div className="bg-white px-4 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <div className="bg-red-600 text-white font-black text-3xl lg:text-5xl px-2 py-0.5 rounded-sm tracking-tighter shadow-sm">N</div>
          <div className="font-black text-2xl lg:text-4xl text-black tracking-tighter leading-none">
            EWS<br/><span className="text-red-600">PORTAL</span>
          </div>
        </Link>

        {/* Ad Space Placeholder */}
        <div className="hidden md:flex flex-1 justify-center max-w-3xl mx-8">
           <img src="/header_ad.png" alt="Advertisement" className="w-full max-w-[728px] h-[90px] object-cover bg-gray-100 border border-gray-200" />
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-black p-2 bg-gray-100 rounded" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Primary Navigation Bar (Bold Red) */}
      <nav className="bg-red-600 text-white hidden md:flex items-center justify-between px-4 lg:px-8 border-b-4 border-red-800">
        <div className="flex items-center overflow-x-auto hide-scrollbar flex-1">
          <Link to="/" className={mainNavLink}>Home</Link>
          {categories.map(cat => (
             <Link key={cat} to={`/category/${cat.toLowerCase()}`} className={mainNavLink}>{cat}</Link>
          ))}
        </div>

        <div className="flex items-center shrink-0 border-l border-red-500 pl-4 py-2">
           <form onSubmit={handleSearch} className="flex bg-white/10 rounded-full overflow-hidden mr-4 focus-within:bg-white focus-within:text-black transition-colors group">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-32 lg:w-48 px-3 py-1 text-xs bg-transparent outline-none group-focus-within:text-black text-white placeholder-gray-300 group-focus-within:placeholder-gray-500"/>
              <button type="submit" className="px-3 hover:text-red-600"><FiSearch size={14} /></button>
            </form>
          {user ? (
            <>
              <Link to="/profile" className={authLink}><FiUser /> Profile</Link>
              <Link to="/saved" className={authLink}><FiBookmark /> Saved</Link>
              <button onClick={() => { logout(); navigate('/'); }} className="text-[10px] font-bold text-white hover:text-yellow-300 uppercase ml-4 tracking-wider">Logout</button>
            </>
          ) : (
            <Link to="/login" className={authLink}><FiUser /> Login</Link>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-red-600 text-white flex flex-col h-[calc(100vh-100px)] overflow-y-auto absolute top-full left-0 w-full z-50 shadow-2xl">
          <div className="p-4 bg-red-700 shadow-inner">
            <form onSubmit={handleSearch} className="flex bg-white rounded overflow-hidden">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search news..." className="flex-1 px-4 py-3 text-black outline-none font-medium"/>
              <button type="submit" className="bg-gray-200 text-gray-700 px-5 hover:bg-gray-300 transition-colors"><FiSearch size={20} /></button>
            </form>
          </div>

          <div className="flex flex-col [&>a]:border-b [&>a]:border-red-500 [&>a]:px-6 [&>a]:py-4 [&>a]:font-bold [&>a]:uppercase [&>a]:tracking-wide">
             <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
             {categories.map(cat => (
                <NavLink key={cat} to={`/category/${cat.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{cat}</NavLink>
             ))}
             {user && (
               <>
                 <div className="bg-red-800 text-red-300 font-black px-6 py-2 text-xs uppercase tracking-widest mt-2 shadow-inner border-0">My Account</div>
                 <NavLink to="/profile" onClick={() => setMenuOpen(false)}>My Profile</NavLink>
                 <NavLink to="/saved" onClick={() => setMenuOpen(false)}>Saved News</NavLink>
               </>
             )}
          </div>

          <div className="p-6 mt-auto bg-red-700">
             {user ? (
               <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="w-full font-bold bg-white text-red-600 py-3 px-4 text-center rounded shadow-lg uppercase tracking-wider">Logout</button>
             ) : (
               <Link to="/login" className="w-full font-bold bg-white text-red-600 py-3 px-4 text-center rounded shadow-lg uppercase tracking-wider block" onClick={() => setMenuOpen(false)}>Login</Link>
             )}
          </div>
        </div>
      )}
    </header>
  );
}
