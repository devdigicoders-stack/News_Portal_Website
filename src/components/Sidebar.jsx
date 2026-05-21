import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsData } from '../data/news';
import NewsCard from './NewsCard';
import Rashifal from './Rashifal';
import { FiCheckCircle, FiSun, FiCloudRain, FiCloud, FiCloudLightning, FiMapPin } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { uiTranslations, cityTranslations, translateNews } from '../data/translations';

const cityMeta = {
  delhi: {
    temp: '34°C',
    icon: <FiSun className="text-amber-500 text-xl animate-spin" />
  },
  mumbai: {
    temp: '29°C',
    icon: <FiCloudRain className="text-blue-500 text-xl animate-bounce" />
  },
  kolkata: {
    temp: '31°C',
    icon: <FiCloud className="text-gray-400 text-xl animate-pulse" />
  },
  bengaluru: {
    temp: '26°C',
    icon: <FiCloudLightning className="text-amber-400 text-xl" />
  },
  patna: {
    temp: '33°C',
    icon: <FiSun className="text-amber-500 text-xl animate-pulse" />
  }
};

export default function Sidebar() {
  const { language } = useApp();
  const t = (key) => uiTranslations[language]?.[key] || key;

  const trendingNews = newsData.filter(n => n.trending).slice(0, 5);
  const editorsPicks = newsData.filter(n => n.category === 'Technology' || n.category === 'World').slice(0, 3);

  // Newsletter subscription
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Live Poll State
  const [pollVoted, setPollVoted] = useState(false);
  const [votes, setVotes] = useState({ yes: 1450, no: 720, neutral: 210 });
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const voted = localStorage.getItem('news_poll_voted');
    if (voted) {
      setPollVoted(true);
      const savedVotes = localStorage.getItem('news_poll_votes');
      if (savedVotes) {
        setVotes(JSON.parse(savedVotes));
      }
    }
  }, []);

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption) return;
    
    const newVotes = {
      ...votes,
      [selectedOption]: votes[selectedOption] + 1
    };
    setVotes(newVotes);
    setPollVoted(true);
    localStorage.setItem('news_poll_voted', 'true');
    localStorage.setItem('news_poll_votes', JSON.stringify(newVotes));
  };

  const totalVotes = votes.yes + votes.no + votes.neutral;
  const yesPercent = Math.round((votes.yes / totalVotes) * 100);
  const noPercent = Math.round((votes.no / totalVotes) * 100);
  const neutralPercent = Math.round((votes.neutral / totalVotes) * 100);

  // City weather & news state
  const [activeCity, setActiveCity] = useState('delhi');
  
  const currentCityTrans = cityTranslations[language]?.[activeCity] || cityTranslations['en'][activeCity];
  const currentCityMeta = cityMeta[activeCity];
  
  const activeCityData = {
    name: currentCityTrans?.name || activeCity,
    condition: currentCityTrans?.condition || '',
    news: currentCityTrans?.news || [],
    temp: currentCityMeta?.temp || '30°C',
    icon: currentCityMeta?.icon || <FiSun className="text-amber-500 text-xl" />
  };

  return (
    <div className="w-full flex flex-col gap-8 font-sans transition-colors">
      
      {/* 1. City News & Weather Selector Widget */}
      <div className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm rounded-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 mb-4">
          <FiMapPin className="text-red-600 animate-bounce" />
          <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">
            {t("City Updates")}
          </h3>
        </div>

        {/* Buttons for city list */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {Object.keys(cityMeta).map((key) => {
            const isActive = activeCity === key;
            const cityDisplayName = cityTranslations[language]?.[key]?.name || key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <button
                key={key}
                onClick={() => setActiveCity(key)}
                className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-sm border transition-all ${
                  isActive 
                    ? 'bg-red-600 border-red-600 text-white shadow shadow-red-300' 
                    : 'bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700/60 text-gray-700 dark:text-zinc-300 hover:border-red-600 hover:text-red-600'
                }`}
              >
                {cityDisplayName}
              </button>
            );
          })}
        </div>

        {/* Selected City Weather Plate */}
        <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/40 border border-gray-150 dark:border-zinc-800 p-3 mb-4 rounded-sm">
          <div>
            <span className="text-xs font-black text-gray-800 dark:text-zinc-200 block mb-0.5">{activeCityData.name}</span>
            <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">{activeCityData.condition}</span>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-200 dark:border-zinc-700 pl-3">
            {activeCityData.icon}
            <span className="text-base font-black text-gray-900 dark:text-white tracking-tight">{activeCityData.temp}</span>
          </div>
        </div>

        {/* Selected City Local Bullet Headlines */}
        <div className="space-y-3">
          {activeCityData.news.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-start text-xs border-b border-gray-100 dark:border-zinc-800 pb-2.5 last:border-0 last:pb-0">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0 mt-1.5"></span>
              <p className="text-gray-700 dark:text-zinc-300 font-semibold leading-relaxed hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Rashifal Horoscope Grid Widget */}
      <Rashifal />

      {/* 3. Interactive Live Readers Poll Widget */}
      <div className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm rounded-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs">{t("Live Readers Poll")}</h3>
        </div>
        <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-snug mb-4">
          {t("Poll Ques")}
        </p>

        {pollVoted ? (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                <span>{t("Yes, absolutely")}</span>
                <span>{yesPercent}% ({votes.yes} {language === 'hi' ? 'वोट' : 'votes'})</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full transition-all duration-1000" style={{ width: `${yesPercent}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                <span>{t("No, it's not enough")}</span>
                <span>{noPercent}% ({votes.no} {language === 'hi' ? 'वोट' : 'votes'})</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-zinc-800 dark:bg-zinc-600 h-full transition-all duration-1000" style={{ width: `${noPercent}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1">
                <span>{t("Undecided / Neutral")}</span>
                <span>{neutralPercent}% ({votes.neutral} {language === 'hi' ? 'वोट' : 'votes'})</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gray-400 dark:bg-zinc-500 h-full transition-all duration-1000" style={{ width: `${neutralPercent}%` }}></div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-zinc-500 text-center font-bold pt-2 border-t border-gray-100 dark:border-zinc-800">
              {t("Total Votes")}: {totalVotes} · {t("Real-time results")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleVoteSubmit} className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/60 hover:border-red-600 cursor-pointer transition-colors text-xs font-bold text-gray-700 dark:text-zinc-300">
              <input 
                type="radio" 
                name="poll" 
                value="yes"
                checked={selectedOption === 'yes'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="accent-red-600" 
              />
              {t("Yes, absolutely")}
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/60 hover:border-red-600 cursor-pointer transition-colors text-xs font-bold text-gray-700 dark:text-zinc-300">
              <input 
                type="radio" 
                name="poll" 
                value="no"
                checked={selectedOption === 'no'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="accent-red-600" 
              />
              {t("No, it's not enough")}
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/60 hover:border-red-600 cursor-pointer transition-colors text-xs font-bold text-gray-700 dark:text-zinc-300">
              <input 
                type="radio" 
                name="poll" 
                value="neutral"
                checked={selectedOption === 'neutral'}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="accent-red-600" 
              />
              {t("Undecided / Neutral")}
            </label>
            
            <button 
              type="submit" 
              disabled={!selectedOption}
              className="w-full bg-red-600 text-white font-black py-2.5 uppercase tracking-widest text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded shadow-md"
            >
              {t("Submit Vote")}
            </button>
          </form>
        )}
      </div>

      {/* 4. Newsletter Signup Widget */}
      <div className="bg-zinc-950 text-white p-6 rounded-sm shadow-md text-center border-b-4 border-red-600">
        <h3 className="text-xl font-black mb-2 uppercase tracking-wide">{t("Stay Updated")}</h3>
        <p className="text-sm text-gray-400 mb-4">{t("Newsletter Sub")}</p>
        
        {subscribed ? (
          <div className="flex flex-col items-center justify-center gap-2 bg-emerald-950/50 border border-emerald-500/50 p-4 rounded text-emerald-300 font-bold text-sm">
            <FiCheckCircle className="text-2xl text-emerald-400" />
            <span>{t("Successfully Subscribed!")}</span>
          </div>
        ) : (
          <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t("Your Email Address")} 
              className="px-4 py-2.5 text-black w-full focus:outline-none focus:ring-2 focus:ring-red-600 text-sm font-semibold rounded-sm" 
            />
            <button type="submit" className="bg-red-600 text-white font-black py-2.5 uppercase tracking-wider hover:bg-red-700 transition-colors text-xs rounded-sm">{t("Subscribe")}</button>
          </form>
        )}
      </div>

      {/* Ad Placeholder */}
      <div className="w-full flex justify-center bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-sm">
         <img src="/sidebar_ad.png" alt="Advertisement" className="w-full max-w-[300px] h-[250px] object-cover cursor-pointer" />
      </div>

      {/* 5. Trending Section */}
      <div>
        <div className="flex items-center gap-2 border-b-2 border-black dark:border-zinc-700 pb-2 mb-4">
           <span className="bg-red-600 w-3 h-3 rounded-full animate-pulse"></span>
           <h3 className="text-lg font-black uppercase text-gray-950 dark:text-white">{t("Trending Now")}</h3>
        </div>
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-zinc-800/80">
          {trendingNews.map((news, index) => {
             const translatedItem = translateNews(news, language);
             return (
               <Link key={news.id} to={`/news/${news.id}`} className="flex gap-4 group py-3.5 first:pt-0">
                 <div className="text-4xl font-black text-gray-200 dark:text-zinc-800 group-hover:text-red-150 transition-colors w-8 text-center shrink-0 leading-none">
                   {index + 1}
                 </div>
                 <div className="flex-1">
                   <h4 className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-3">
                     {translatedItem.title}
                   </h4>
                 </div>
               </Link>
             );
          })}
        </div>
      </div>

      {/* 6. Editor's Picks */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-black dark:border-zinc-700 pb-2 mb-4">
           <h3 className="text-lg font-black uppercase text-gray-950 dark:text-white">{t("Editor's Picks")}</h3>
        </div>
        <div className="flex flex-col gap-4">
          {editorsPicks.map((news) => (
             <NewsCard key={news.id} news={news} variant="compact" />
          ))}
        </div>
      </div>

      {/* Ad Placeholder Tall */}
      <div className="w-full flex justify-center bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 sticky top-32">
         <img src="/sidebar_tall_ad.png" alt="Advertisement" className="w-full max-w-[300px] h-[600px] object-cover cursor-pointer" />
      </div>
    </div>
  );
}
