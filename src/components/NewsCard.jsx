import { Link } from 'react-router-dom';
import { FiBookmark, FiHeart, FiEye, FiClock } from 'react-icons/fi';
import { FaBookmark, FaHeart, FaFire, FaPlayCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export default function NewsCard({ news, variant = 'standard', featured = false }) {
  const { savedNews, toggleSave, likedNews, toggleLike, user } = useApp();
  const isSaved = savedNews.includes(news.id);
  const isLiked = likedNews.includes(news.id);

  const handleSave = (e) => {
    e.preventDefault();
    if (!user) { alert('Please login to save news.'); return; }
    toggleSave(news.id);
  };

  const handleLike = (e) => {
    e.preventDefault();
    if (!user) { alert('Please login to like news.'); return; }
    toggleLike(news.id);
  };

  const actionButtons = (
    <div className="flex items-center gap-3 mt-2 shrink-0">
      <button onClick={handleLike} className={`flex items-center gap-1 transition-colors ${isLiked ? 'text-red-600' : 'hover:text-red-600 text-gray-400'}`}>
        {isLiked ? <FaHeart size={14} /> : <FiHeart size={14} />}
      </button>
      <button onClick={handleSave} className={`transition-colors ${isSaved ? 'text-red-600' : 'hover:text-red-600 text-gray-400'}`}>
        {isSaved ? <FaBookmark size={14} /> : <FiBookmark size={14} />}
      </button>
    </div>
  );

  if (variant === 'overlay') {
    return (
      <Link to={`/news/${news.id}`} className="group relative block w-full h-full overflow-hidden bg-black">
        <img src={news.image} alt={news.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider">{news.category}</span>
            {news.breaking && <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 uppercase tracking-wider">Breaking</span>}
          </div>
          <h3 className={`font-black text-white leading-tight group-hover:text-red-400 transition-colors ${featured ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
            {news.title}
          </h3>
          {featured && <p className="text-gray-200 mt-2 line-clamp-2 text-sm sm:text-base">{news.summary}</p>}
          <div className="flex items-center gap-4 text-xs text-gray-300 mt-3 font-medium">
             <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
             <span className="flex items-center gap-1"><FiEye /> {(news.views / 1000).toFixed(1)}k</span>
          </div>
        </div>
        {news.video && (
          <div className="absolute top-4 right-4">
            <FaPlayCircle className="text-red-600 text-3xl sm:text-4xl drop-shadow-lg" />
          </div>
        )}
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/news/${news.id}`} className="flex gap-3 group items-start border-b border-gray-100 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
        <div className="relative shrink-0 w-24 h-20 sm:w-28 sm:h-24 overflow-hidden rounded-sm">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          {news.video && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <FaPlayCircle className="text-white text-xl" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <span className="text-[10px] uppercase font-bold text-red-600">{news.category}</span>
            <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight mt-0.5">{news.title}</h4>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
            <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
            {actionButtons}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'text-only') {
    return (
      <Link to={`/news/${news.id}`} className="block group border-b border-gray-100 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold text-red-600">{news.category}</span>
          {news.trending && <FaFire className="text-red-500 text-[10px]"/>}
        </div>
        <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">{news.title}</h4>
        <div className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
          <FiClock /> {news.date}
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 p-3 group hover:shadow-md transition-shadow">
        <Link to={`/news/${news.id}`} className="relative shrink-0 w-full sm:w-48 h-48 sm:h-32 overflow-hidden rounded-sm">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
           {news.video && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <FaPlayCircle className="text-white text-3xl" />
            </div>
          )}
        </Link>
        <div className="flex-1 flex flex-col">
           <Link to={`/news/${news.id}`} className="flex-1">
              <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider mb-1 block">{news.category}</span>
              <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-red-600 transition-colors line-clamp-2 mb-2">{news.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 hidden sm:block">{news.summary}</p>
           </Link>
           <div className="flex items-center justify-between text-xs text-gray-500 mt-4 border-t border-gray-100 pt-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><FiClock /> {news.date}</span>
                <span className="flex items-center gap-1"><FiEye /> {(news.views / 1000).toFixed(1)}k</span>
              </div>
              {actionButtons}
           </div>
        </div>
      </div>
    );
  }

  // standard variant
  return (
    <div className="bg-white border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow flex flex-col h-full">
      <Link to={`/news/${news.id}`} className="relative block h-48 sm:h-56 overflow-hidden">
        <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {news.video && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <FaPlayCircle className="text-white text-4xl drop-shadow-lg opacity-90 group-hover:scale-110 transition-transform" />
          </div>
        )}
        <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">{news.category}</span>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/news/${news.id}`} className="flex-1">
          <h3 className="font-black text-gray-900 text-lg leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-3">{news.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{news.summary}</p>
        </Link>
        <div className="flex items-center justify-between text-xs text-gray-500 font-medium border-t border-gray-100 pt-3 mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><FiClock size={12} /> {news.date}</span>
          </div>
          {actionButtons}
        </div>
      </div>
    </div>
  );
}
