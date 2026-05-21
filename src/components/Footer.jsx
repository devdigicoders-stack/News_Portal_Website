import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { categories } from '../data/news';
import { useApp } from '../context/AppContext';
import { uiTranslations } from '../data/translations';

export default function Footer() {
  const { language } = useApp();
  const t = (key) => uiTranslations[language]?.[key] || key;

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-600 text-white font-black text-lg px-2 py-0.5 rounded">NEWS</span>
            <span className="font-black text-lg text-white">PORTAL</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t("About Desc")}
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-blue-400 transition-colors"><FaFacebook size={18} /></a>
            <a href="#" className="hover:text-sky-400 transition-colors"><FaTwitter size={18} /></a>
            <a href="#" className="hover:text-pink-400 transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-red-500 transition-colors"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Categories")}</h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${cat.toLowerCase()}`} className="text-sm hover:text-red-400 transition-colors">
                  {t(cat)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">{t("Quick Links")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-400 transition-colors">{t("Home")}</Link></li>
            <li><Link to="/about" className="hover:text-red-400 transition-colors">{t("About Us")}</Link></li>
            <li><Link to="/contact" className="hover:text-red-400 transition-colors">{t("Contact Us")}</Link></li>
            <li><Link to="/saved" className="hover:text-red-400 transition-colors">{t("Bookmarks")}</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3">{language === 'hi' ? 'कानूनी' : 'Legal'}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-red-400 transition-colors">{t("Terms & Conditions")}</Link></li>
            <li><Link to="/privacy" className="hover:text-red-400 transition-colors">{t("Privacy Policy")}</Link></li>
          </ul>
          <div className="mt-4">
            <h4 className="text-white font-semibold mb-2">{t("Stay Updated")}</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder={t("Your Email Address")} 
                className="flex-1 px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-l outline-none text-white placeholder-gray-500" 
              />
              <button className="bg-red-600 text-white px-3 py-1.5 text-sm rounded-r hover:bg-red-700 transition-colors">
                {t("Subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} NewsPortal. {t("All Rights Reserved")}
      </div>
    </footer>
  );
}
