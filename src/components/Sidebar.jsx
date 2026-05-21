import { Link } from 'react-router-dom';
import { newsData } from '../data/news';
import NewsCard from './NewsCard';

export default function Sidebar() {
  const trendingNews = newsData.filter(n => n.trending).slice(0, 5);
  const editorsPicks = newsData.filter(n => n.category === 'Technology' || n.category === 'World').slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Newsletter Signup Widget */}
      <div className="bg-gray-900 text-white p-6 rounded-sm shadow-md text-center">
        <h3 className="text-xl font-black mb-2 uppercase tracking-wide">Stay Updated</h3>
        <p className="text-sm text-gray-400 mb-4">Get the latest news delivered directly to your inbox daily.</p>
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Your Email Address" className="px-4 py-2 text-black w-full focus:outline-none focus:ring-2 focus:ring-red-600" />
          <button type="submit" className="bg-red-600 text-white font-bold py-2 uppercase tracking-wider hover:bg-red-700 transition-colors">Subscribe</button>
        </form>
      </div>

      {/* Ad Placeholder */}
      <div className="w-full flex justify-center bg-gray-100 border border-gray-200">
         <img src="/sidebar_ad.png" alt="Advertisement" className="w-full max-w-[300px] h-[250px] object-cover cursor-pointer" />
      </div>

      {/* Trending Section */}
      <div>
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-4">
           <span className="bg-red-600 w-3 h-3 rounded-full animate-pulse"></span>
           <h3 className="text-lg font-black uppercase">Trending Now</h3>
        </div>
        <div className="flex flex-col">
          {trendingNews.map((news, index) => (
             <Link key={news.id} to={`/news/${news.id}`} className="flex gap-4 group py-3 border-b border-gray-100 last:border-0">
               <div className="text-4xl font-black text-gray-200 group-hover:text-red-100 transition-colors w-8 text-center shrink-0 leading-none">
                 {index + 1}
               </div>
               <div>
                 <h4 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                   {news.title}
                 </h4>
               </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Editor's Picks */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
           <h3 className="text-lg font-black uppercase">Editor's Picks</h3>
        </div>
        <div className="flex flex-col gap-4">
          {editorsPicks.map((news) => (
             <NewsCard key={news.id} news={news} variant="compact" />
          ))}
        </div>
      </div>

      {/* Ad Placeholder Tall */}
      <div className="w-full flex justify-center bg-gray-100 border border-gray-200 sticky top-32">
         <img src="/sidebar_tall_ad.png" alt="Advertisement" className="w-full max-w-[300px] h-[600px] object-cover cursor-pointer" />
      </div>
    </div>
  );
}
