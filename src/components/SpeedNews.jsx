import { useState, useEffect } from 'react';
import { FaClock, FaFire, FaAngleDoubleUp } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { uiTranslations, speedNewsTranslations } from '../data/translations';

const speedNewsInitial = [
  { time: 'Just Now', isLive: false, index: 0 },
  { time: '3 min ago', isLive: false, index: 1 },
  { time: '12 min ago', isLive: false, index: 2 },
  { time: '20 min ago', isLive: false, index: 3 },
  { time: '35 min ago', isLive: false, index: 4 },
  { time: '50 min ago', isLive: false, index: 5 },
  { time: '1 hour ago', isLive: false, index: 6 },
  { time: '2 hours ago', isLive: false, index: 7 },
  { time: '3 hours ago', isLive: false, index: 8 },
  { time: '4 hours ago', isLive: false, index: 9 }
];

export default function SpeedNews() {
  const { language } = useApp();
  const [items, setItems] = useState(speedNewsInitial);

  const t = (key) => uiTranslations[language]?.[key] || key;

  const translateTime = (timeStr) => {
    if (language === 'hi') {
      if (timeStr === 'Just Now') return 'अभी-अभी';
      if (timeStr.includes('min ago')) {
        const mins = timeStr.split(' ')[0];
        return `${mins} मिनट पहले`;
      }
      if (timeStr.includes('hour ago')) {
        const hrs = timeStr.split(' ')[0];
        return `${hrs} घंटा पहले`;
      }
      if (timeStr.includes('hours ago')) {
        const hrs = timeStr.split(' ')[0];
        return `${hrs} घंटे पहले`;
      }
    }
    return timeStr;
  };

  const getNewsText = (item) => {
    if (item.isLive) {
      return language === 'hi'
        ? speedNewsTranslations.liveHi[item.index]
        : speedNewsTranslations.liveEn[item.index];
    }
    return language === 'hi'
      ? speedNewsTranslations.hi[item.index]
      : speedNewsTranslations.en[item.index];
  };

  // Simulate incoming news bullets every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 5);
      setItems((prev) => {
        // Prevent duplicate texts in the feed
        if (prev.some(item => item.isLive && item.index === randomIndex)) return prev;

        const newBullet = {
          time: 'Just Now',
          isLive: true,
          index: randomIndex
        };
        
        // Update previous item times slightly
        const updated = prev.map((item, idx) => {
          if (idx === 0) return { ...item, time: '2 min ago' };
          if (idx === 1) return { ...item, time: '8 min ago' };
          if (idx === 2) return { ...item, time: '15 min ago' };
          return item;
        });

        // Insert new bullet at the top, limit list to 10 items
        return [newBullet, ...updated.slice(0, 9)];
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm p-4 font-sans h-[350px] flex flex-col rounded-sm">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b-2 border-red-600 pb-2 mb-3">
        <h3 className="text-sm font-black uppercase text-red-600 flex items-center gap-1.5 tracking-wider">
          <FaFire className="animate-bounce" /> {t("Speed 100")}
        </h3>
        <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span> {t("Live Updates Badge")}
        </span>
      </div>

      {/* Bullet Timeline Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700">
        {items.map((news, index) => (
          <div 
            key={index} 
            className="flex gap-3 group border-b border-gray-100 dark:border-zinc-800 pb-2.5 last:border-0 last:pb-0 relative pl-4 transition-all hover:bg-red-50/20 dark:hover:bg-red-950/10 rounded-sm p-1"
          >
            {/* Timeline dot */}
            <span className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-red-600 border border-white group-hover:scale-125 transition-transform"></span>

            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-0.5">
                <FaClock className="text-red-500 text-[9px]" /> {translateTime(news.time)}
              </div>
              <p className="text-xs text-gray-800 dark:text-zinc-200 font-semibold leading-relaxed group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {getNewsText(news)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Ticker */}
      <div className="mt-2.5 border-t border-gray-100 dark:border-zinc-800 pt-2 text-[10px] text-gray-400 dark:text-zinc-500 font-bold flex items-center justify-between">
        <span>{t("Auto bulletins")}</span>
        <button 
          onClick={() => {
            const el = document.querySelector('.overflow-y-auto');
            if (el) el.scrollTop = 0;
          }}
          className="hover:text-red-600 flex items-center gap-0.5 uppercase tracking-wider text-[9px]"
        >
          {t("Top")} <FaAngleDoubleUp />
        </button>
      </div>
    </div>
  );
}
