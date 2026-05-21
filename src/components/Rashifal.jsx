import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { uiTranslations } from '../data/translations';
import { 
  FaMoon, 
  FaHeartbeat, 
  FaBriefcase, 
  FaBullseye, 
  FaPalette 
} from 'react-icons/fa';
import { 
  TbZodiacAries, 
  TbZodiacTaurus, 
  TbZodiacGemini, 
  TbZodiacCancer, 
  TbZodiacLeo, 
  TbZodiacVirgo, 
  TbZodiacLibra, 
  TbZodiacScorpio, 
  TbZodiacSagittarius, 
  TbZodiacCapricorn, 
  TbZodiacAquarius, 
  TbZodiacPisces 
} from 'react-icons/tb';

const zodiacIcons = {
  Aries: TbZodiacAries,
  Taurus: TbZodiacTaurus,
  Gemini: TbZodiacGemini,
  Cancer: TbZodiacCancer,
  Leo: TbZodiacLeo,
  Virgo: TbZodiacVirgo,
  Libra: TbZodiacLibra,
  Scorpio: TbZodiacScorpio,
  Sagittarius: TbZodiacSagittarius,
  Capricorn: TbZodiacCapricorn,
  Aquarius: TbZodiacAquarius,
  Pisces: TbZodiacPisces
};

const zodiacDataBilingual = {
  hi: [
    { sign: 'Aries', displaySign: 'मेष', health: '★★★★☆ (आज ऊर्जा का स्तर बेहतरीन रहेगा। नए व्यायाम शुरू करें।)', career: '★★★☆☆ (वरिष्ठों के साथ विवादों से बचें। धैर्य रखें।)', luckyNum: 9, luckyColor: 'लाल', prediction: 'आज आपको व्यापार में नए अवसर प्राप्त होंगे। स्वास्थ्य उत्तम रहेगा। परिजनों का सहयोग मिलेगा।' },
    { sign: 'Taurus', displaySign: 'वृष', health: '★★★☆☆ (अपने खान-पान का ध्यान रखें, हाइड्रेटेड रहें।)', career: '★★★★☆ (आर्थिक लाभ की उम्मीद है। निवेश सकारात्मक रहेगा।)', luckyNum: 6, luckyColor: 'सफेद', prediction: 'रुके हुए काम आज पूरे होंगे। धन लाभ के योग हैं। वाणी पर संयम रखें।' },
    { sign: 'Gemini', displaySign: 'मिथुन', health: '★★★★☆ (मानसिक शांति और स्पष्टता। ध्यान के लिए अच्छा दिन।)', career: '★★★★★ (उत्कृष्ट रचनात्मक प्रवाह, उच्च उत्पादकता।)', luckyNum: 5, luckyColor: 'हरा', prediction: 'नौकरीपेशा जातकों को पदोन्नति की खुशखबरी मिल सकती है। यात्रा के योग हैं।' },
    { sign: 'Cancer', displaySign: 'कर्क', health: '★★☆☆☆ (थोड़ी थकान महसूस हो रही है। पर्याप्त आराम करें।)', career: '★★★☆☆ (नियमित कार्यों पर ध्यान केंद्रित रखें, जोखिम भरे प्रोजेक्ट्स से बचें।)', luckyNum: 2, luckyColor: 'चांदी जैसा', prediction: 'भावुकता में आकर कोई बड़ा निर्णय न लें। बच्चों के साथ समय बिताएं।' },
    { sign: 'Leo', displaySign: 'सिंह', health: '★★★★☆ (मजबूत फिटनेस, काम पूरा करने की उच्च प्रेरणा।)', career: '★★★★☆ (आज बैठकों में नेतृत्व गुण चमकेंगे।)', luckyNum: 1, luckyColor: 'सुनहरा', prediction: 'आत्मविश्वास से लबरेज रहेंगे। समाज में मान-सम्मान बढ़ेगा। शुभ समाचार मिलेगा।' },
    { sign: 'Virgo', displaySign: 'कन्या', health: '★★★☆☆ (जोड़ों में मामूली दर्द की संभावना। भारी वजन उठाने से बचें।)', career: '★★★★☆ (विस्तृत ऑडिटिंग और अकाउंटेंसी कार्यों से सफलता मिलेगी।)', luckyNum: 3, luckyColor: 'पन्ना हरा', prediction: 'लंबे समय से चली आ रही आर्थिक समस्याएं समाप्त होंगी। मित्रों से भेंट होगी।' },
    { sign: 'Libra', displaySign: 'तुला', health: '★★★★★ (जीवंत स्वास्थ्य। बाहर का आनंद लेने के लिए आदर्श समय।)', career: '★★★★☆ (शानदार टीम वर्क, बातचीत अनुकूल रूप से पूरी हुई।)', luckyNum: 7, luckyColor: 'गुलाबी', prediction: 'वैवाहिक जीवन में मधुरता बनी रहेगी। कलात्मक कार्यों में रुचि बढ़ेगी।' },
    { sign: 'Scorpio', displaySign: 'वृश्चिक', health: '★★★☆☆ (आंखों के तनाव का ध्यान रखें, स्क्रीन टाइम कम करें।)', career: '★★★☆☆ (मामूली छिपे हुए प्रतिस्पर्धियों से सावधान रहें।)', luckyNum: 8, luckyColor: 'मरून', prediction: 'गुस्से पर नियंत्रण रखें। नए काम की शुरुआत के लिए समय अभी अनुकूल नहीं है।' },
    { sign: 'Sagittarius', displaySign: 'धनु', health: '★★★★☆ (अच्छा स्टैमिना। बाहर दौड़ने की सलाह दी जाती है।)', career: '★★★★★ (विदेशी व्यापार संपर्क असाधारण विकास के अवसर लाते हैं।)', luckyNum: 3, luckyColor: 'पीला', prediction: 'आध्यात्मिक यात्रा के योग हैं। भाग्य का पूरा साथ मिलेगा। धन संचय होगा।' },
    { sign: 'Capricorn', displaySign: 'मकर', health: '★★★☆☆ (पूरी नींद सुनिश्चित करें। गहरी सांस लेने से तनाव प्रबंधित करें।)', career: '★★★☆☆ (धीमी प्रगति, लेकिन दीर्घकालिक लाभ सुरक्षित हैं।)', luckyNum: 4, luckyColor: 'काला', prediction: 'कठिन परिश्रम का फल देर से ही सही, लेकिन अवश्य मिलेगा। वाहन सावधानी से चलाएं।' },
    { sign: 'Aquarius', displaySign: 'कुंभ', health: '★★★★☆ (सक्रिय चयापचय दर। ताजगी महसूस हो रही है।)', career: '★★★★☆ (उत्कृष्ट टीम मंथन। नई तकनीक अपनाना काम करता है।)', luckyNum: 11, luckyColor: 'नीला', prediction: 'आज कोई नया कारोबारी संबंध बन सकता है। घरेलू सुख-सुविधाओं में वृद्धि होगी।' },
    { sign: 'Pisces', displaySign: 'मीन', health: '★★☆☆☆ (सर्दी/फ्लू के प्रति संवेदनशील। गर्म रहें।)', career: '★★★★☆ (आकर्षक रियल एस्टेट सौदे पूरे हो सकते हैं।)', luckyNum: 12, luckyColor: 'समुद्री हरा', prediction: 'अनावश्यक खर्चों पर नियंत्रण रखें। स्वास्थ्य के प्रति सचेत रहने की आवश्यकता है।' }
  ],
  en: [
    { sign: 'Aries', displaySign: 'Aries', health: '★★★★☆ (Excellent energy levels today. Start new workouts.)', career: '★★★☆☆ (Avoid conflicts with seniors. Be patient.)', luckyNum: 9, luckyColor: 'Red', prediction: 'Today you will get new business opportunities. Health will be excellent. Family support will be received.' },
    { sign: 'Taurus', displaySign: 'Taurus', health: '★★★☆☆ (Watch your diet, stay hydrated.)', career: '★★★★☆ (Financial gains expected. Investments turn positive.)', luckyNum: 6, luckyColor: 'White', prediction: 'Pending works will be completed today. There are chances of financial gains. Maintain control over speech.' },
    { sign: 'Gemini', displaySign: 'Gemini', health: '★★★★☆ (Mental peace and clarity. Good day for meditation.)', career: '★★★★★ (Outstanding creative flow, high productivity.)', luckyNum: 5, luckyColor: 'Green', prediction: 'Salaried individuals may get good news of promotion. Travel is likely.' },
    { sign: 'Cancer', displaySign: 'Cancer', health: '★★☆☆☆ (Feeling a bit fatigued. Take adequate rest.)', career: '★★★☆☆ (Stay focused on routine tasks, skip risky projects.)', luckyNum: 2, luckyColor: 'Silver', prediction: 'Do not take any major decision driven by emotions. Spend time with children.' },
    { sign: 'Leo', displaySign: 'Leo', health: '★★★★☆ (Strong fitness, high motivation to complete chores.)', career: '★★★★☆ (Leadership qualities will shine in meetings today.)', luckyNum: 1, luckyColor: 'Gold', prediction: 'You will be full of self-confidence. Respect will increase in society. Good news will be received.' },
    { sign: 'Virgo', displaySign: 'Virgo', health: '★★★☆☆ (Minor joint pain potential. Avoid heavy lifting.)', career: '★★★★☆ (Detailed auditing and accountancy tasks yield success.)', luckyNum: 3, luckyColor: 'Emerald', prediction: 'Long-standing financial problems will end. Will meet friends.' },
    { sign: 'Libra', displaySign: 'Libra', health: '★★★★★ (Vibrant well-being. Ideal time to enjoy outdoors.)', career: '★★★★☆ (Great teamwork, negotiations completed favorably.)', luckyNum: 7, luckyColor: 'Pink', prediction: 'Sweetness will remain in married life. Interest in artistic works will increase.' },
    { sign: 'Scorpio', displaySign: 'Scorpio', health: '★★★☆☆ (Take care of eye strain, reduce screen time.)', career: '★★★☆☆ (Watch out for minor hidden competitors.)', luckyNum: 8, luckyColor: 'Maroon', prediction: 'Control anger. Time is not yet favorable for starting new work.' },
    { sign: 'Sagittarius', displaySign: 'Sagittarius', health: '★★★★☆ (Good stamina. Outdoor running recommended.)', career: '★★★★★ (Exotic trade contacts bring exceptional growth opportunities.)', luckyNum: 3, luckyColor: 'Yellow', prediction: 'There are chances of spiritual travel. You will get full support of luck. Wealth will accumulate.' },
    { sign: 'Capricorn', displaySign: 'Capricorn', health: '★★★☆☆ (Ensure full sleep. Manage stress with deep breathing.)', career: '★★★☆☆ (Slow progress, but long-term gains are safe.)', luckyNum: 4, luckyColor: 'Black', prediction: 'The fruit of hard work will be delayed, but you will definitely get it. Drive vehicle carefully.' },
    { sign: 'Aquarius', displaySign: 'Aquarius', health: '★★★★☆ (Active metabolic rate. Feeling fresh.)', career: '★★★★☆ (Excellent team brainstorms. New tech adoption works.)', luckyNum: 11, luckyColor: 'Blue', prediction: 'Today a new business relationship can be formed. Domestic comforts will increase.' },
    { sign: 'Pisces', displaySign: 'Pisces', health: '★★☆☆☆ (Susceptible to cold/flu. Stay warm.)', career: '★★★★☆ (Lucrative real estate deals can go through.)', luckyNum: 12, luckyColor: 'Sea Green', prediction: 'Control unnecessary expenses. Need to be conscious about health.' }
  ]
};

export default function Rashifal() {
  const { language } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(null);

  const t = (key) => uiTranslations[language]?.[key] || key;

  const zodiacData = zodiacDataBilingual[language] || zodiacDataBilingual.en;

  const handleToggle = (idx) => {
    setSelectedIdx(selectedIdx === idx ? null : idx);
  };

  const activeZodiac = selectedIdx !== null ? zodiacData[selectedIdx] : null;
  const ActiveIcon = activeZodiac ? zodiacIcons[activeZodiac.sign] : null;

  return (
    <div className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm rounded-sm font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 mb-4">
        <FaMoon className="text-amber-500 text-sm animate-pulse" />
        <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
          {t("Daily Rashifal")} <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-semibold">(Daily Rashifal)</span>
        </h3>
      </div>

      <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-snug mb-4">
        {t("Rashifal Sub")}
      </p>

      {/* Grid of Zodiacs */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {zodiacData.map((z, idx) => {
          const isActive = selectedIdx === idx;
          const ZodiacIcon = zodiacIcons[z.sign];
          return (
            <button
              key={idx}
              onClick={() => handleToggle(idx)}
              className={`p-2 flex flex-col items-center justify-center border rounded-md transition-all ${
                isActive 
                  ? 'bg-red-600 border-red-600 text-white font-extrabold shadow shadow-red-300' 
                  : 'bg-gray-50 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700/60 text-gray-800 dark:text-zinc-200 hover:border-red-600 hover:bg-red-50/10'
              }`}
            >
              {ZodiacIcon && <ZodiacIcon className="text-xl mb-0.5" />}
              <span className="text-[11px] font-bold block leading-none">{z.displaySign}</span>
              <span className="text-[8px] opacity-75 font-semibold leading-none mt-1">{z.sign}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Zodiac Details Panel */}
      {activeZodiac ? (
        <div className="bg-red-50/30 dark:bg-zinc-800/40 border border-red-200 dark:border-zinc-800/80 p-3.5 rounded transition-all animate-fadeIn">
          <div className="flex items-center justify-between border-b border-red-100 dark:border-zinc-700/50 pb-2 mb-2">
            <span className="font-extrabold text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
              {ActiveIcon && <ActiveIcon className="text-lg" />}
              <span>{activeZodiac.displaySign} ({activeZodiac.sign}) {t("Daily Rashifal")}</span>
            </span>
            <button 
              onClick={() => setSelectedIdx(null)}
              className="text-[10px] text-gray-400 dark:text-zinc-500 hover:text-red-600 font-bold uppercase tracking-wider"
            >
              {t("Clear")}
            </button>
          </div>

          <p className="text-xs text-gray-700 dark:text-zinc-300 leading-relaxed font-semibold mb-3 border-l-2 border-red-500 pl-2">
            {activeZodiac.prediction}
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-[10px]">
            <div className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-gray-100 dark:border-zinc-700/30">
              <span className="font-bold text-gray-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-0.5">
                <FaHeartbeat className="text-red-500 text-xs" /> {t("Health")}:
              </span>
              <span className="font-semibold text-gray-700 dark:text-zinc-300">{activeZodiac.health}</span>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-gray-100 dark:border-zinc-700/30">
              <span className="font-bold text-gray-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-0.5">
                <FaBriefcase className="text-amber-500 text-xs" /> {t("Career")}:
              </span>
              <span className="font-semibold text-gray-700 dark:text-zinc-300">{activeZodiac.career}</span>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-gray-100 dark:border-zinc-700/30">
              <span className="font-bold text-gray-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-0.5">
                <FaBullseye className="text-blue-500 text-xs" /> {t("Lucky No")}:
              </span>
              <span className="font-extrabold text-red-600 dark:text-red-400 text-xs">{activeZodiac.luckyNum}</span>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-1.5 rounded border border-gray-100 dark:border-zinc-700/30">
              <span className="font-bold text-gray-400 dark:text-zinc-500 uppercase flex items-center gap-1 mb-0.5">
                <FaPalette className="text-purple-500 text-xs" /> {t("Lucky Color")}:
              </span>
              <span className="font-bold text-gray-700 dark:text-zinc-300 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full inline-block border border-gray-200" style={{ backgroundColor: activeZodiac.sign === 'Cancer' ? '#c0c0c0' : activeZodiac.sign === 'Virgo' ? '#046307' : activeZodiac.sign === 'Pisces' ? '#2e8b57' : activeZodiac.sign === 'Taurus' ? '#f5f5f5' : activeZodiac.luckyColor }}></span>
                {activeZodiac.luckyColor}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-850 p-4 text-center rounded">
          <p className="text-xs text-gray-400 dark:text-zinc-500 font-semibold italic">{t("Select Sign")}</p>
        </div>
      )}
    </div>
  );
}
