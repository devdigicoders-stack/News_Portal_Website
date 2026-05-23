import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { categories } from '../data/news';
import { useApp } from '../context/AppContext';
import { uiTranslations } from '../data/translations';

export default function Footer() {
  const { language } = useApp();
  const t = (key) => uiTranslations[language]?.[key] || key;

  return (
    <footer className="mt-12 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-xl text-gray-300 relative overflow-hidden">
      {/* Decorative subtle gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-600/10 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gradient-to-br from-red-600 to-red-800 text-white font-black text-xl px-2.5 py-0.5 rounded shadow-lg border-b-2 border-red-900">NEWS</span>
            <span className="font-black text-xl text-white tracking-tight">PORTAL</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            {t("About Desc")}
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm"><FaFacebook size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-400 transition-all shadow-sm"><FaTwitter size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500 transition-all shadow-sm"><FaInstagram size={14} /></a>
            <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm"><FaYoutube size={14} /></a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-black uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {t("Categories")}
          </h4>
          <ul className="space-y-2.5">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${cat.toLowerCase()}`} className="text-sm text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">
                  {t(cat)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-black uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {t("Quick Links")}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">{t("Home")}</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">{t("About Us")}</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">{t("Contact Us")}</Link></li>
            <li><Link to="/saved" className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">{t("Bookmarks")}</Link></li>
          </ul>
        </div>

        {/* Legal & Subscribe */}
        <div>
          <h4 className="text-white font-black uppercase tracking-wider mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {language === 'hi' ? 'कानूनी' : 'Legal'}
          </h4>
          <ul className="space-y-2.5 text-sm mb-6">
            <li><Link to="/terms" className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">{t("Terms & Conditions")}</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-red-500 hover:translate-x-1 inline-block transition-all font-medium">{t("Privacy Policy")}</Link></li>
          </ul>
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-3">{t("Stay Updated")}</h4>
            <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden focus-within:border-red-500 transition-colors shadow-inner">
              <input 
                type="email" 
                placeholder={t("Your Email Address")} 
                className="flex-1 px-4 py-2 text-sm bg-transparent outline-none text-white placeholder-gray-500" 
              />
              <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold hover:bg-red-700 transition-colors">
                {t("Subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-6 text-center text-xs text-gray-500 font-medium bg-black/40">
        © {new Date().getFullYear()} NewsPortal. {t("All Rights Reserved")}
      </div>
    </footer>
  );
}
