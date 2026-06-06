import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { newsAPI } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function SearchNews() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  const { language } = useApp();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await newsAPI.getAll({ search: query });
        setSearchResults(response.data || []);
      } catch (err) {
        console.error('Failed to perform search:', err);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  return (
    <div className="py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b-2 border-gray-200 dark:border-zinc-800 pb-4 mb-8">
           <h1 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
             Search Results for: <span className="text-red-600 dark:text-red-500">"{query}"</span>
           </h1>
           <span className="text-sm font-bold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-zinc-900/50 px-4 py-1.5 rounded-full border border-gray-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-sm">
             {searchResults.length} Results
           </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="text-center py-20 font-bold dark:text-white">
                {language === 'hi' ? 'खोज की जा रही है...' : 'Searching...'}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-6">
                {searchResults.map((news) => (
                  <div key={news.id} className="glass-card dark:glass-card-dark rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200/50 dark:border-zinc-800/50 transform hover:-translate-y-1">
                    <NewsCard news={news} variant="horizontal" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card dark:glass-card-dark p-12 text-center text-gray-500 shadow-xl border border-gray-200/50 dark:border-zinc-800/50 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                   <span className="text-3xl opacity-50">🔍</span>
                </div>
                <p className="text-2xl font-black mb-2 text-gray-800 dark:text-gray-200">No results found.</p>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Try using different keywords or check your spelling.</p>
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
