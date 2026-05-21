import { useParams } from 'react-router-dom';
import { newsData } from '../data/news';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';

export default function CategoryNews() {
  const { categoryId } = useParams();
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  const categoryNews = newsData.filter((n) => n.category.toLowerCase() === categoryId.toLowerCase());

  const featured = categoryNews[0];
  const rest = categoryNews.slice(1);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-8">
           <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
             <span className="w-4 h-4 bg-red-600 inline-block"></span>
             {categoryName} NEWS
           </h1>
           <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{categoryNews.length} Articles</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {categoryNews.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Featured Top Article */}
                {featured && (
                  <div className="mb-6 h-[400px]">
                    <NewsCard news={featured} variant="overlay" featured={true} />
                  </div>
                )}
                
                {/* List for the rest */}
                {rest.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {rest.map((news) => (
                      <NewsCard key={news.id} news={news} variant="horizontal" />
                    ))}
                  </div>
                )}

                <div className="mt-8 text-center border-t border-gray-200 pt-8">
                 <button className="border-2 border-black text-black font-black py-3 px-12 hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm">
                   Load More
                 </button>
               </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-10 text-center text-gray-500 shadow-sm border border-gray-200">
                <p className="text-xl font-bold mb-2">No news found in this category.</p>
                <p className="text-sm">Please check back later for updates.</p>
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
