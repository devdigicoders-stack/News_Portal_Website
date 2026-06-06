import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';

export default function CategoryNews() {
  const { categoryId } = useParams();
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  const { articles } = useApp();
  const categoryNews = (articles || []).filter((n) => n.category.toLowerCase() === categoryId.toLowerCase());

  const featured = categoryNews[0];
  const rest = categoryNews.slice(1);

  return (
    <div className="py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-zinc-800 pb-4 mb-8">
           <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
             <span className="w-2 h-8 bg-red-600 inline-block rounded-full"></span>
             {categoryName} NEWS
           </h1>
           <span className="text-sm font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-zinc-900/50 px-4 py-1.5 rounded-full border border-gray-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-sm">
             {categoryNews.length} Articles
           </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {categoryNews.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Featured Top Article */}
                {featured && (
                  <div className="mb-6 h-[450px] shadow-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-zinc-800/50 transform hover:-translate-y-1 transition-transform">
                    <NewsCard news={featured} variant="overlay" featured={true} />
                  </div>
                )}
                
                {/* List for the rest */}
                {rest.length > 0 && (
                  <div className="flex flex-col gap-6">
                    {rest.map((news) => (
                      <div key={news.id} className="glass-card dark:glass-card-dark rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200/50 dark:border-zinc-800/50 transform hover:-translate-y-1">
                        <NewsCard news={news} variant="horizontal" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-12 text-center border-t border-gray-200 dark:border-zinc-800 pt-10">
                 <button className="bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black dark:border-white font-black py-3.5 px-14 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-lg transition-all uppercase tracking-widest text-sm shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
                   Load More
                 </button>
               </div>
              </div>
            ) : (
              <div className="glass-card dark:glass-card-dark p-12 text-center text-gray-500 shadow-xl border border-gray-200/50 dark:border-zinc-800/50 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                   <span className="text-2xl opacity-50">📰</span>
                </div>
                <p className="text-2xl font-black mb-2 text-gray-800 dark:text-gray-200">No news found in this category.</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Please check back later for updates.</p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
