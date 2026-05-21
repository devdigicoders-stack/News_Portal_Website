import React from 'react';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import SpeedNews from '../components/SpeedNews';
import { newsData } from '../data/news';
import { FaPlayCircle, FaFire, FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { uiTranslations } from '../data/translations';

const Home = () => {
  const { language } = useApp();
  const t = (key) => uiTranslations[language]?.[key] || key;

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
    <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-2 mb-4">
       <h2 className="text-xl font-black uppercase text-gray-950 dark:text-white flex items-center gap-2 leading-none">
         <span className={`w-3.5 h-3.5 bg-${color} rounded-sm shadow-sm inline-block`}></span> {title}
       </h2>
       {link && <Link to={link} className={`text-xs font-bold text-${color} hover:underline uppercase tracking-wider`}>{t("View All")} &raquo;</Link>}
    </div>
  );

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen pb-12 transition-colors">
      
      {/* Top Banner Ad */}
      <div className="max-w-7xl mx-auto py-4 px-4 hidden md:flex justify-center bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 transition-colors">
        <div className="w-full max-w-[970px] flex justify-center">
          <img src="/top_banner_ad.png" alt="Advertisement" className="w-full h-[90px] object-cover bg-gray-200 border border-gray-300 dark:border-zinc-800 cursor-pointer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* Interactive Live Highlights bar */}
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-600 p-3 mb-6 rounded-r flex items-center justify-between flex-wrap gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest shrink-0">{t("Live Updates:")}</span>
            <marquee className="text-xs font-semibold text-gray-800 dark:text-zinc-200 w-[200px] sm:w-[450px] md:w-[600px] lg:w-[800px]" scrollamount="4">
              {language === 'hi' 
                ? "[खेल] भारतीय क्रिकेट टीम ने ऑस्ट्रेलिया से 3-1 से जीती टी-20 श्रृंखला | [अंतरिक्ष] चंद्रयान-4 का सफल प्रक्षेपण, चांद के दक्षिणी ध्रुव पर पानी की खोज करेगा इसरो | [स्वास्थ्य] एम्स दिल्ली का बड़ा आविष्कार: कैंसर वैक्सीन का ट्रायल 94% सफल रहा | [बिज़नेस] शेयर बाजार में नया इतिहास: सेंसेक्स पहली बार 90,000 के पार बंद"
                : "[SPORTS] India Wins T20 Series Against Australia 3-1 | [SPACE] ISRO Launches Chandrayaan-4 successfully | [HEALTH] AIIMS Delhi develops vaccine showing 94% efficacy in clinical trials | [BUSINESS] BSE Sensex crosses historic 90,000 mark."}
            </marquee>
          </div>
          <Link to="/live-tv" className="text-[10px] bg-red-600 text-white font-black px-2.5 py-1 uppercase rounded hover:bg-red-700 transition-colors flex items-center gap-1 shadow-sm">
            <FaCircle className="text-[6px] animate-ping" /> {t("Watch Live")}
          </Link>
        </div>

        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-6 mb-10">
          {/* Main Featured (Left, larger) */}
          <div className="lg:col-span-7 xl:col-span-8 h-[400px] lg:h-[500px] shadow-lg rounded overflow-hidden">
            {mainHero && <NewsCard news={mainHero} variant="overlay" featured={true} />}
          </div>
          
          {/* Sub Featured Grid (Right, 2x2 grid) */}
          <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-2 gap-1 lg:gap-4 mt-1 lg:mt-0">
             {subHero.map((news) => (
                <div key={news.id} className="h-[196px] lg:h-[242px] shadow-md rounded overflow-hidden">
                   <NewsCard news={news} variant="overlay" />
                </div>
             ))}
          </div>
        </div>

        <hr className="border-gray-200 dark:border-zinc-800 mb-10" />

        {/* 3-Column Highlights (Tech | Business | Entertainment) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
           {/* Tech */}
           <div className="bg-gray-50/50 dark:bg-zinc-900/40 p-4 rounded-sm border border-gray-100 dark:border-zinc-900 shadow-sm">
             <SectionHeader title={t("Technology")} link="/category/technology" />
             <div className="flex flex-col">
               {techNews[0] && <NewsCard news={techNews[0]} variant="standard" />}
               <div className="mt-4 flex flex-col gap-2">
                 {techNews.slice(1).map(news => <NewsCard key={news.id} news={news} variant="text-only" />)}
               </div>
             </div>
           </div>

           {/* Business */}
           <div className="bg-gray-50/50 dark:bg-zinc-900/40 p-4 rounded-sm border border-gray-100 dark:border-zinc-900 shadow-sm">
             <SectionHeader title={t("Business")} link="/category/business" color="blue-650" />
             <div className="flex flex-col">
               {businessNews[0] && <NewsCard news={businessNews[0]} variant="standard" />}
               <div className="mt-4 flex flex-col gap-2">
                 {businessNews.slice(1).map(news => <NewsCard key={news.id} news={news} variant="text-only" />)}
               </div>
             </div>
           </div>

           {/* Entertainment */}
           <div className="bg-gray-50/50 dark:bg-zinc-900/40 p-4 rounded-sm border border-gray-100 dark:border-zinc-900 shadow-sm">
             <SectionHeader title={t("Entertainment")} link="/category/entertainment" color="pink-600" />
             <div className="flex flex-col">
               {entertainmentNews[0] && <NewsCard news={entertainmentNews[0]} variant="standard" />}
               <div className="mt-4 flex flex-col gap-2">
                 {entertainmentNews.slice(1).map(news => <NewsCard key={news.id} news={news} variant="text-only" />)}
               </div>
             </div>
           </div>
        </div>

      </div> {/* End container for full width break */}

      {/* Full Width Videos Section (Dark / Red Ticker) */}
      <div className="bg-zinc-950 py-12 mb-10 border-y-4 border-red-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase text-white flex items-center gap-2 tracking-tight">
                <FaPlayCircle className="text-red-600 animate-pulse" /> {t("Video Hub")}
              </h2>
              <Link to="/live-tv" className="text-xs font-black text-gray-400 hover:text-white uppercase tracking-widest border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded transition-all">{t("Watch More Videos")} &raquo;</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoNews.map((news) => (
                 <div key={news.id} className="h-64 shadow-lg rounded overflow-hidden">
                    <NewsCard news={news} variant="overlay" />
                 </div>
              ))}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content Area (Left: Dynamic Ticker + News Feed, Right: Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Sports + फटाफट खबरें + Latest Feed) */}
          <div className="lg:col-span-8 space-y-10">
             
             {/* Dynamic Row: SpeedNews Ticker on Left, Sports Arena on Right */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               {/* Speed News Col */}
               <div className="md:col-span-5">
                 <SpeedNews />
               </div>
               
               {/* Sports Col */}
               <div className="md:col-span-7">
                 <SectionHeader title={t("Sports Arena")} link="/category/sports" color="green-600" />
                 <div className="flex flex-col gap-4">
                   {sportsNews.slice(0, 2).map((news) => (
                     <NewsCard key={news.id} news={news} variant="horizontal" />
                   ))}
                 </div>
               </div>
             </div>

             {/* Rest of Sports */}
             {sportsNews.length > 2 && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {sportsNews.slice(2).map((news) => (
                   <NewsCard key={news.id} news={news} variant="compact" />
                 ))}
               </div>
             )}

             {/* Latest News Feed */}
             <div>
               <SectionHeader title={t("Latest Updates")} />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {latestNews.map((news) => (
                   <NewsCard key={news.id} news={news} variant="standard" />
                 ))}
               </div>
               
               {/* Load More */}
               <div className="mt-8 text-center border-t border-gray-200 dark:border-zinc-800 pt-8 transition-colors">
                 <button className="border-2 border-black dark:border-white text-black dark:text-white font-black py-3 px-12 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors uppercase tracking-widest text-xs rounded-sm">
                   {t("Load More News")}
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