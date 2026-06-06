import { useApp } from '../context/AppContext';
import NewsCard from '../components/NewsCard';
import { Navigate } from 'react-router-dom';

export default function SavedNews() {
  const { user, savedNews, articles } = useApp();

  if (!user) return <Navigate to="/login" />;

  const savedArticles = (articles || []).filter(n => savedNews.includes(n.id));

  return (
    <div className="py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-card dark:glass-card-dark border border-gray-200/50 dark:border-zinc-800/50 border-l-4 border-l-red-600 p-5 rounded-xl mb-8 shadow-sm flex items-center justify-between">
           <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
             <span className="text-xl opacity-80">🔖</span> My Saved News
           </h1>
           <span className="text-sm font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-zinc-900/50 px-4 py-1.5 rounded-full border border-gray-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-sm">
             {savedArticles.length} Saved
           </span>
        </div>

        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((news) => (
              <div key={news.id} className="glass-card dark:glass-card-dark rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200/50 dark:border-zinc-800/50 transform hover:-translate-y-1">
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card dark:glass-card-dark p-16 text-center shadow-xl rounded-2xl border border-gray-200/50 dark:border-zinc-800/50 min-h-[400px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
               <span className="text-3xl opacity-50">🔖</span>
            </div>
            <p className="text-2xl font-black mb-2 text-gray-800 dark:text-gray-200">You haven't saved any news articles yet.</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Browse articles and click the bookmark icon to save them here for later reading.</p>
          </div>
        )}
      </div>
    </div>
  );
}
