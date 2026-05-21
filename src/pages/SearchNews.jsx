import { useLocation } from 'react-router-dom';
import { newsData } from '../data/news';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';

export default function SearchNews() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  const searchResults = newsData.filter((n) => 
    n.title.toLowerCase().includes(query.toLowerCase()) || 
    n.summary.toLowerCase().includes(query.toLowerCase()) ||
    n.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-8">
           <h1 className="text-2xl font-black text-gray-900 uppercase">
             Search Results for: <span className="text-red-600">"{query}"</span>
           </h1>
           <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{searchResults.length} Results</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-4">
                {searchResults.map((news) => (
                  <NewsCard key={news.id} news={news} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-10 text-center text-gray-500 border border-gray-200">
                <p className="text-xl font-bold mb-2">No results found.</p>
                <p className="text-sm">Try using different keywords or check your spelling.</p>
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
