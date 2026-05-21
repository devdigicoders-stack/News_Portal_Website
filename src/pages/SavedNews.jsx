import { useApp } from '../context/AppContext';
import { newsData } from '../data/news';
import NewsCard from '../components/NewsCard';
import { Navigate } from 'react-router-dom';

export default function SavedNews() {
  const { user, savedNews } = useApp();

  if (!user) return <Navigate to="/login" />;

  const savedArticles = newsData.filter(n => savedNews.includes(n.id));

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white border-l-4 border-red-600 p-4 mb-8 shadow-sm flex items-center justify-between">
           <h1 className="text-2xl font-black text-gray-900 uppercase">My Saved News</h1>
           <span className="text-sm font-bold text-gray-500">{savedArticles.length} Saved</span>
        </div>

        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 text-center shadow-sm">
            <p className="text-xl text-gray-500 mb-4">You haven't saved any news articles yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
