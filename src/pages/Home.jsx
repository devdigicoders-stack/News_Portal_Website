import React from 'react';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { newsData } from '../data/news';
import { FaPlayCircle, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  // Organizing data for different sections
  const topHeroNews = newsData.slice(0, 5); // 1 main, 4 small
  const mainHero = topHeroNews[0];
  const subHero = topHeroNews.slice(1, 5);

  const getCategoryNews = (cat, limit) => newsData.filter(n => n.category === cat).slice(0, limit);

  const sportsNews = getCategoryNews('Sports', 4);
  const techNews = getCategoryNews('Technology', 4);
  const businessNews = getCategoryNews('Business', 4);
  const entertainmentNews = getCategoryNews('Entertainment', 4);
  
  const videoNews = newsData.filter(n => n.video).slice(0, 4);
  
  // Exclude already featured from latest list
  const featuredIds = [...topHeroNews, ...sportsNews, ...techNews, ...businessNews].map(n => n.id);
  const latestNews = newsData.filter(n => !featuredIds.includes(n.id)).slice(0, 10);

  const SectionHeader = ({ title, link, color = 'red-600' }) => (
    <div className={`flex items-center justify-between border-b-2 border-black pb-2 mb-4`}>
       <h2 className={`text-xl font-black uppercase text-black flex items-center gap-2`}>
         <span className={`w-3 h-3 bg-${color}`}></span> {title}
       </h2>
       {link && <Link to={link} className={`text-xs font-bold text-${color} hover:underline uppercase`}>View All &raquo;</Link>}
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto py-4 px-4 hidden md:flex justify-center bg-gray-50 border-b border-gray-200">
        <div className="w-full max-w-[970px] flex justify-center">
          <img src="/top_banner_ad.png" alt="Advertisement" className="w-full h-[90px] object-cover bg-gray-200 border border-gray-300 cursor-pointer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-6 mb-10">
          {/* Main Featured (Left, larger) */}
          <div className="lg:col-span-7 xl:col-span-8 h-[400px] lg:h-[500px]">
            {mainHero && <NewsCard news={mainHero} variant="overlay" featured={true} />}
          </div>
          
          {/* Sub Featured Grid (Right, 2x2 grid) */}
          <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-1 lg:gap-4 mt-1 lg:mt-0">
             {subHero.map((news) => (
               <div key={news.id} className="h-[196px] lg:h-[242px]">
                 <NewsCard news={news} variant="overlay" />
               </div>
             ))}
          </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* 3-Column Highlights (Tech | Business | Entertainment) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
           {/* Tech */}
           <div>
             <SectionHeader title="Technology" link="/category/technology" />
             <div className="flex flex-col">
               {techNews[0] && <NewsCard news={techNews[0]} variant="standard" />}
               <div className="mt-4 flex flex-col gap-2">
                 {techNews.slice(1).map(news => <NewsCard key={news.id} news={news} variant="text-only" />)}
               </div>
             </div>
           </div>

           {/* Business */}
           <div>
             <SectionHeader title="Business" link="/category/business" color="blue-600" />
             <div className="flex flex-col">
               {businessNews[0] && <NewsCard news={businessNews[0]} variant="standard" />}
               <div className="mt-4 flex flex-col gap-2">
                 {businessNews.slice(1).map(news => <NewsCard key={news.id} news={news} variant="text-only" />)}
               </div>
             </div>
           </div>

           {/* Entertainment */}
           <div>
             <SectionHeader title="Entertainment" link="/category/entertainment" color="pink-600" />
             <div className="flex flex-col">
               {entertainmentNews[0] && <NewsCard news={entertainmentNews[0]} variant="standard" />}
               <div className="mt-4 flex flex-col gap-2">
                 {entertainmentNews.slice(1).map(news => <NewsCard key={news.id} news={news} variant="text-only" />)}
               </div>
             </div>
           </div>
        </div>

      </div> {/* End container for full width break */}

      {/* Full Width Videos Section (Dark) */}
      <div className="bg-gray-900 py-12 mb-10 border-y-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-black uppercase text-white flex items-center gap-2">
               <FaPlayCircle className="text-red-600" /> Video Hub
             </h2>
             <Link to="/" className="text-sm font-bold text-gray-400 hover:text-white uppercase">More Videos &raquo;</Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {videoNews.map((news) => (
                <div key={news.id} className="h-64">
                   <NewsCard news={news} variant="overlay" />
                </div>
             ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content Area (Left: Latest List, Right: Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Sports + Latest) */}
          <div className="lg:col-span-8">
             
             {/* Sports Horizontal List */}
             <div className="mb-10">
               <SectionHeader title="Sports Arena" link="/category/sports" color="green-600" />
               <div className="flex flex-col gap-4">
                 {sportsNews.map((news) => (
                   <NewsCard key={news.id} news={news} variant="horizontal" />
                 ))}
               </div>
             </div>

             {/* Latest News Feed */}
             <div>
               <SectionHeader title="Latest Updates" />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {latestNews.map((news) => (
                   <NewsCard key={news.id} news={news} variant="standard" />
                 ))}
               </div>
               
               {/* Load More */}
               <div className="mt-8 text-center border-t border-gray-200 pt-8">
                 <button className="border-2 border-black text-black font-black py-3 px-12 hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-sm">
                   Load More News
                 </button>
               </div>
             </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;