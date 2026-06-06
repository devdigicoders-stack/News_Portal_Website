import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FiBookmark, FiHeart, FiEye, FiClock } from 'react-icons/fi';
import { FaBookmark, FaHeart, FaFire, FaPlayCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { translateNews, uiTranslations } from '../data/translations';

export default function NewsCard({ news, variant = 'standard', featured = false }) {
  const { savedNews, toggleSave, likedNews, toggleLike, user, language, resolveMediaURL } = useApp();
  const isSaved = savedNews.includes(news.id);
  const isLiked = likedNews.includes(news.id);
  const videoRef = useRef(null);

  const t = (key) => uiTranslations[language]?.[key] || key;
  const translatedNews = translateNews(news, language);

  const getHoverGlowClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'politics': return 'hover-glow-politics';
      case 'sports': return 'hover-glow-sports';
      case 'technology': return 'hover-glow-tech';
      case 'business': return 'hover-glow-business';
      case 'entertainment': return 'hover-glow-entertainment';
      default: return 'hover-glow-default';
    }
  };

  const hoverGlow = getHoverGlowClass(news.category);

  const handleSave = (e) => {
    e.preventDefault();
    if (!user) { alert(language === 'hi' ? 'समाचार सहेजने के लिए कृपया लॉगिन करें।' : 'Please login to save news.'); return; }
    toggleSave(news.id);
  };

  const handleLike = (e) => {
    e.preventDefault();
    if (!user) { alert(language === 'hi' ? 'समाचार पसंद करने के लिए कृपया लॉगिन करें।' : 'Please login to like news.'); return; }
    toggleLike(news.id);
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const actionButtons = (
    <div className="flex items-center gap-3 mt-2 shrink-0">
      <button onClick={handleLike} className={`flex items-center gap-1 transition-all active:scale-75 hover:scale-125 ${isLiked ? 'text-red-650' : 'hover:text-red-650 text-gray-400 dark:text-zinc-500'}`} title={isLiked ? t("Liked") : t("Like")}>
        {isLiked ? <FaHeart size={14} className="text-red-600 animate-icon-pop" /> : <FiHeart size={14} />}
      </button>
      <button onClick={handleSave} className={`transition-all active:scale-75 hover:scale-125 ${isSaved ? 'text-red-650 font-bold' : 'hover:text-red-650 text-gray-400 dark:text-zinc-500'}`} title={isSaved ? t("Saved") : t("Save")}>
        {isSaved ? <FaBookmark size={14} className="text-red-600 animate-icon-pop" /> : <FiBookmark size={14} />}
      </button>
    </div>
  );

  if (variant === 'overlay') {
    return (
      <Link
        to={`/news/${news.id}`}
        className={`group relative block w-full h-full overflow-hidden bg-black rounded-2xl ${hoverGlow}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Image */}
        <img
          src={resolveMediaURL(news.image)}
          alt={translatedNews.title}
          className={`w-full h-full object-cover opacity-70 transition-all duration-700 ${news.video ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
        />
        {/* Video overlay - plays on hover */}
        {news.video && (
          <video
            ref={videoRef}
            src={resolveMediaURL(news.video)}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-4 sm:p-6 z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider">{translatedNews.category}</span>
            {news.breaking && <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 uppercase tracking-wider animate-pulse">{t("Breaking")}</span>}
            {news.video && <span className="bg-black/60 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider flex items-center gap-1"><FaPlayCircle className="text-red-500" /> {t("Video")}</span>}
          </div>
          <h3 className={`font-black text-white leading-tight group-hover:text-red-300 transition-colors ${featured ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
            {translatedNews.title}
          </h3>
          {featured && <p className="text-gray-200 mt-2 line-clamp-2 text-sm sm:text-base font-semibold">{translatedNews.summary}</p>}
          <div className="flex items-center gap-4 text-xs text-gray-300 mt-3 font-semibold">
             <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
             <span className="flex items-center gap-1"><FiEye /> {(news.views / 1000).toFixed(1)}k {t("views")}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/news/${news.id}`} className="flex gap-3 group items-start border-b border-gray-100 dark:border-zinc-800 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0 hover:bg-gray-50/50 dark:hover:bg-zinc-800/30 p-2 rounded-lg transition-all duration-300"
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative shrink-0 w-24 h-20 sm:w-28 sm:h-24 overflow-hidden rounded-sm bg-zinc-150 dark:bg-zinc-850">
          <img src={resolveMediaURL(news.image)} alt={translatedNews.title} className={`w-full h-full object-cover transition-all duration-500 ${news.video ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`} />
          {news.video && (
            <video ref={videoRef} src={resolveMediaURL(news.video)} muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          {news.video && !videoRef.current?.paused === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:opacity-0 transition-opacity">
              <FaPlayCircle className="text-white text-xl animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] uppercase font-black text-red-600 dark:text-red-400">{translatedNews.category}</span>
            <h4 className="text-sm font-black text-gray-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-tight mt-0.5">{translatedNews.title}</h4>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-zinc-400 mt-2 font-semibold">
            <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
            {actionButtons}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'text-only') {
    return (
      <Link to={`/news/${news.id}`} className="block group border-b border-gray-100 dark:border-zinc-800 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-black text-red-600 dark:text-red-400">{translatedNews.category}</span>
          {news.trending && <FaFire className="text-red-500 text-[10px]"/>}
          {news.breaking && <span className="text-[9px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-1 font-black uppercase rounded">{t("Breaking")}</span>}
        </div>
        <h4 className="text-sm font-black text-gray-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">{translatedNews.title}</h4>
        <div className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1.5 flex items-center gap-1 font-semibold">
          <FiClock /> {news.date}
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex flex-col sm:flex-row gap-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-3 group transition-all rounded-xl ${hoverGlow}`}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link to={`/news/${news.id}`} className="relative shrink-0 w-full sm:w-48 h-48 sm:h-32 overflow-hidden rounded-sm bg-zinc-150 dark:bg-zinc-850">
          <img src={resolveMediaURL(news.image)} alt={translatedNews.title} className={`w-full h-full object-cover transition-all duration-500 ${news.video ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`} />
          {news.video && (
            <video ref={videoRef} src={resolveMediaURL(news.video)} muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
          {news.video && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity">
              <FaPlayCircle className="text-white text-3xl" />
            </div>
          )}
        </Link>
        <div className="flex-1 flex flex-col justify-between">
           <Link to={`/news/${news.id}`} className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-black text-red-600 dark:text-red-400 tracking-wider">{translatedNews.category}</span>
                {news.breaking && <span className="text-[9px] bg-red-600 text-white px-1 font-black uppercase rounded animate-pulse">{t("Breaking")}</span>}
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-zinc-100 leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 mb-2">{translatedNews.title}</h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 hidden sm:block font-semibold">{translatedNews.summary}</p>
           </Link>
           <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 mt-4 border-t border-gray-100 dark:border-zinc-800 pt-2 font-semibold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
                <span className="flex items-center gap-1"><FiEye /> {(news.views / 1000).toFixed(1)}k {t("views")}</span>
              </div>
              {actionButtons}
           </div>
        </div>
      </div>
    );
  }

  // standard variant
  return (
    <div className={`bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 overflow-hidden group transition-all flex flex-col h-full rounded-xl ${hoverGlow}`}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={`/news/${news.id}`} className="relative block h-48 sm:h-56 overflow-hidden bg-zinc-150 dark:bg-zinc-850">
        <img src={resolveMediaURL(news.image)} alt={translatedNews.title} className={`w-full h-full object-cover transition-all duration-500 ${news.video ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`} />
        {news.video && (
          <video ref={videoRef} src={resolveMediaURL(news.video)} muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        {news.video && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:opacity-0 transition-opacity">
            <FaPlayCircle className="text-white text-4xl drop-shadow-lg opacity-90" />
          </div>
        )}
        <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider z-10 shadow">{translatedNews.category}</span>
        {news.breaking && <span className="absolute top-0 right-0 bg-yellow-400 text-black text-[9px] font-black px-2 py-1 uppercase tracking-wider z-10 animate-pulse shadow">{t("Breaking")}</span>}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/news/${news.id}`} className="flex-1">
          <h3 className="font-black text-gray-900 dark:text-zinc-100 text-lg leading-snug mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-3">{translatedNews.title}</h3>
          <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 mb-3 font-semibold">{translatedNews.summary}</p>
        </Link>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 font-semibold border-t border-gray-100 dark:border-zinc-800 pt-3 mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FiClock size={12} /> {news.date}</span>
            <span className="flex items-center gap-1"><FiEye size={12} /> {(news.views / 1000).toFixed(1)}k {t("views")}</span>
          </div>
          {actionButtons}
        </div>
      </div>
    </div>
  );
}
