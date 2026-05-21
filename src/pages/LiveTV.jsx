import { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { uiTranslations } from '../data/translations';
import { FaTv, FaVolumeMute, FaVolumeUp, FaUsers, FaRegCommentDots, FaClock } from 'react-icons/fa';

const chatTranslations = {
  hi: {
    'Rahul Saxena': 'लाइव स्ट्रीम शानदार काम कर रही है!',
    'Kiran Desai': 'कोलकाता से नमस्कार! असाधारण पैनल चर्चा।',
    'Ramesh Sharma': 'आर्थिक पैकेज का विवरण एमएसएमई के लिए बेहद आशाजनक है!',
    'Sania Patel': 'बुमराह आज बिल्कुल अजेय हैं! शानदार गेंदबाजी!',
    'Aditya Sen': 'सिंह राशि के लिए आज का राशिफल चौंकाने वाला सटीक है।',
    'Pooja Verma': 'इसरो पर गर्व है! चंद्रयान -4 इतिहास रचेगा।',
    'Amit K.': 'क्या अगली तिमाही में रेपो रेट कम होने जा रहा है?',
    'Dr. Vivek': 'एम्स कैंसर वैक्सीन परीक्षण के परिणाम एक वैश्विक सफलता हैं।',
    'Deepak G.': 'मुंबई में साइबरट्रक बिल्कुल भविष्य का लगता है।',
    'Neha Kapoor': 'बेंगलुरु के लिए सुंदर मौसम अपडेट।',
    'Suresh Raina': 'क्रिकेट का स्कोर रोमांचक है! क्या भारत जीत सकता है?',
    'Rajesh K.': 'न्यूज़ पोर्टल डेस्क द्वारा उत्कृष्ट समाचार कवरेज।',
    'Ananya S.': 'दिल्ली के लिए स्वच्छ हवा के निर्देश अत्यंत आवश्यक हैं।',
    'Kunal Roy': 'ब्लैक एंड व्हाइट डिबेट आज रात 8 बजे ऐतिहासिक होगी।',
    'Vikram N.': 'हिमालय में मिनिमलिस्टिक यात्रा गाइड बहुत उपयोगी हैं।',
    'Meera Singh': 'शिक्षा पेपर लीक सुधारों से हजारों बच्चों का भविष्य सुरक्षित होगा!',
    'You (दर्शक)': 'आप (दर्शक)',
    'You (Viewer)': 'आप (दर्शक)'
  },
  en: {
    'Rahul Saxena': 'Live stream is working flawlessly!',
    'Kiran Desai': 'Greetings from Kolkata! Exceptional panel discussion.',
    'Ramesh Sharma': 'Economic package details are highly promising for MSMEs!',
    'Sania Patel': 'Bumrah is simply unstoppable today! Brilliant bowling!',
    'Aditya Sen': 'Astrology reading is shockingly accurate for Leo sign today.',
    'Pooja Verma': 'Proud of ISRO! Chandrayaan-4 will capture history.',
    'Amit K.': 'Is the repo rate going down next quarter?',
    'Dr. Vivek': 'AIIMS cancer vaccine trial results are a global breakthrough.',
    'Deepak G.': 'Cybertruck in Mumbai looks absolutely futuristic.',
    'Neha Kapoor': 'Beautiful weather updates for Bengaluru.',
    'Suresh Raina': 'Cricket score is nail-biting! Can India win?',
    'Rajesh K.': 'Outstanding news coverage by NewsPortal desk.',
    'Ananya S.': 'Clean air directives for Delhi are highly needed.',
    'Kunal Roy': 'Black & White debate tonight at 8 PM will be epic.',
    'Vikram N.': 'Minimalist travel guides in Himalayas are very useful.',
    'Meera Singh': 'Education paper leak reforms will protect thousands of kids!',
    'You (दर्शक)': 'You (Viewer)',
    'You (Viewer)': 'You (Viewer)'
  }
};

const mockChats = [
  { user: 'Ramesh Sharma', textKey: 'Ramesh Sharma' },
  { user: 'Sania Patel', textKey: 'Sania Patel' },
  { user: 'Aditya Sen', textKey: 'Aditya Sen' },
  { user: 'Pooja Verma', textKey: 'Pooja Verma' },
  { user: 'Amit K.', textKey: 'Amit K.' },
  { user: 'Dr. Vivek', textKey: 'Dr. Vivek' },
  { user: 'Deepak G.', textKey: 'Deepak G.' },
  { user: 'Neha Kapoor', textKey: 'Neha Kapoor' },
  { user: 'Suresh Raina', textKey: 'Suresh Raina' },
  { user: 'Rajesh K.', textKey: 'Rajesh K.' },
  { user: 'Ananya S.', textKey: 'Ananya S.' },
  { user: 'Kunal Roy', textKey: 'Kunal Roy' },
  { user: 'Vikram N.', textKey: 'Vikram N.' },
  { user: 'Meera Singh', textKey: 'Meera Singh' }
];

const showScheduleBilingual = {
  hi: [
    { time: '09:00 AM', title: 'फटाफट खबरें 100', host: 'एंकर डेस्क' },
    { time: '12:00 PM', title: 'देश का गौरव', host: 'मीनाक्षी जोशी' },
    { time: '03:00 PM', title: 'विशेष बुलेटिन', host: 'राजेश कुमार' },
    { time: '05:00 PM', title: 'दंगल (Dangal Debate)', host: 'अंजना ओम कश्यप' },
    { time: '07:00 PM', title: 'क्रिकेट धमाका', host: 'विक्रम चंद्र' },
    { time: '08:00 PM', title: 'ब्लैक एंड व्हाइट', host: 'सुधीर चौधरी' },
    { time: '09:00 PM', title: '१० तक (10 Tak Prime Time)', host: 'संजना चौहान' }
  ],
  en: [
    { time: '09:00 AM', title: 'Speed News 100', host: 'Anchor Desk' },
    { time: '12:00 PM', title: 'Pride of the Nation (Desh Ka Gaurav)', host: 'Meenakshi Joshi' },
    { time: '03:00 PM', title: 'Special Bulletin', host: 'Rajesh Kumar' },
    { time: '05:00 PM', title: 'Dangal Debate', host: 'Anjana Om Kashyap' },
    { time: '07:00 PM', title: 'Cricket Dhamaka', host: 'Vikram Chandra' },
    { time: '08:00 PM', title: 'Black & White', host: 'Sudhir Chaudhary' },
    { time: '09:00 PM', title: '10 Tak Prime Time', host: 'Sanjana Chouhan' }
  ]
};

export default function LiveTV() {
  const { language } = useApp();
  const [isMuted, setIsMuted] = useState(true);
  const [viewerCount, setViewerCount] = useState(842050);
  const [chatFeed, setChatFeed] = useState([
    { id: 1, user: 'Rahul Saxena', textKey: 'Rahul Saxena' },
    { id: 2, user: 'Kiran Desai', textKey: 'Kiran Desai' }
  ]);
  const [chatText, setChatText] = useState('');
  
  const chatScrollRef = useRef(null);

  const t = (key) => uiTranslations[language]?.[key] || key;

  // High quality open video stream
  const liveVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Simulate viewer count fluctuation
  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 200) - 100);
    }, 3000);

    return () => clearInterval(viewerInterval);
  }, []);

  // Simulate scrolling live chats
  useEffect(() => {
    const chatInterval = setInterval(() => {
      const randomChat = mockChats[Math.floor(Math.random() * mockChats.length)];
      setChatFeed((prev) => [
        ...prev,
        {
          id: Date.now(),
          user: randomChat.user,
          textKey: randomChat.textKey
        }
      ].slice(-30)); // Limit to last 30 chats in state
    }, 2000);

    return () => clearInterval(chatInterval);
  }, []);

  // Auto-scroll chat window to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatFeed]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    setChatFeed((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: language === 'hi' ? 'You (दर्शक)' : 'You (Viewer)',
        customText: chatText
      }
    ]);
    setChatText('');
  };

  const getChatText = (chat) => {
    if (chat.customText) return chat.customText;
    return chatTranslations[language]?.[chat.textKey] || chatTranslations.en[chat.textKey] || chat.textKey;
  };

  const showSchedule = showScheduleBilingual[language] || showScheduleBilingual.en;

  return (
    <div className="bg-gray-100 dark:bg-zinc-950 min-h-screen py-8 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Page title header */}
        <div className="bg-red-600 dark:bg-red-700 text-white p-4 mb-6 shadow-md rounded-sm flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-white text-red-600 w-9 h-9 rounded-full flex items-center justify-center animate-pulse shadow">
              <FaTv className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tight">
                {language === 'hi' ? 'लाइव टीवी (NewsPortal Live 24x7)' : 'Live TV (NewsPortal Live 24x7)'}
              </h1>
              <p className="text-xs text-red-150 font-bold uppercase tracking-wider">
                {language === 'hi' ? 'तेज़ • निष्पक्ष • सत्य बुलेटिन डेस्क' : 'Fast • Unbiased • True Bulletin Desk'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold bg-black/30 px-4 py-2 rounded-full border border-white/10 shrink-0">
            <span className="flex items-center gap-1">
              <FaUsers className="text-yellow-300" /> {viewerCount.toLocaleString()} {language === 'hi' ? 'देख रहे हैं' : 'Watching'}
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          </div>
        </div>

        {/* Grid layout: Stream player on Left (8-col), Sidebar on Right (4-col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main live media container block */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Player + Simulated Chat layout grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 bg-black rounded shadow-2xl overflow-hidden border border-zinc-900">
              
              {/* Actual video streaming panel */}
              <div className="md:col-span-2 relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={liveVideoUrl}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Custom glowing live tag overlays */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2.5 py-1 uppercase tracking-widest rounded-sm shadow-lg flex items-center gap-1.5 animate-pulse">
                  <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span> LIVE
                </div>

                {/* Custom channel audio buttons overlay */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 bg-black/60 text-white p-2.5 rounded-full hover:bg-black transition-colors shadow-md border border-white/10"
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
                </button>
              </div>

              {/* simulated chat room panel */}
              <div className="bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-800 flex flex-col h-full h-[280px] md:h-auto min-h-[300px]">
                {/* Header */}
                <div className="bg-zinc-950 p-3 border-b border-zinc-800 flex items-center justify-between text-xs font-black uppercase text-zinc-300">
                  <span className="flex items-center gap-1.5"><FaRegCommentDots className="text-red-500" /> {t("Viewer Chat")}</span>
                  <span className="text-[9px] bg-red-950 text-red-400 border border-red-900/50 px-2 py-0.5 rounded font-extrabold uppercase">
                    {language === 'hi' ? 'सिम्युलेटेड' : 'Simulated'}
                  </span>
                </div>

                {/* Scrolling deck */}
                <div 
                  ref={chatScrollRef}
                  className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-800"
                >
                  {chatFeed.map((chat) => {
                    const isSelf = chat.user.includes('You') || chat.user.includes('You (दर्शक)');
                    return (
                      <div key={chat.id} className="text-xs leading-relaxed animate-fadeIn">
                        <span className={`font-black uppercase mr-1.5 rounded-[3px] text-[10px] px-1 ${
                          isSelf 
                            ? 'bg-yellow-400 text-zinc-950' 
                            : 'text-red-400 dark:text-red-300'
                        }`}>
                          {chat.user}:
                        </span>
                        <span className="text-zinc-300 font-semibold">{getChatText(chat)}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Sender form */}
                <form onSubmit={handleSendChat} className="p-2 border-t border-zinc-800 bg-zinc-950 flex gap-1">
                  <input 
                    type="text" 
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder={t("Join the conversation...")} 
                    className="flex-1 bg-zinc-850 border border-zinc-800 text-white rounded px-3 py-1.5 text-xs outline-none focus:border-red-600 font-medium"
                  />
                  <button 
                    type="submit" 
                    className="bg-red-600 text-white font-bold px-3 py-1.5 rounded text-xs hover:bg-red-700 transition-colors uppercase"
                  >
                    {t("Send")}
                  </button>
                </form>
              </div>
            </div>

            {/* Broadcast show details banner info */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-5 rounded-sm shadow-sm transition-colors">
              <h2 className="text-lg lg:text-xl font-black text-gray-900 dark:text-white leading-tight uppercase flex items-center gap-2 mb-2">
                <span className="w-3.5 h-3.5 bg-red-600 inline-block rounded-sm"></span>
                {language === 'hi' ? 'पीएम आर्थिक सुधार लाइव एक्सक्लूसिव बहस और पैनल विश्लेषण' : 'PM ECONOMIC REFORMS LIVE EXCLUSIVE DEBATE & PANEL ANALYSIS'}
              </h2>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed font-semibold">
                {language === 'hi' 
                  ? 'देश के सबसे बड़े आर्थिक सुधार पैकेज (₹10 लाख करोड़) पर बहस जारी है। देश भर के वरिष्ठ विशेषज्ञ, पत्रकार और राजनीतिक नेता हमारे लाइव बुलेटिन डेस्क पर सीधे जुड़ रहे हैं। देखते रहिए पल-पल की खबरें सिर्फ न्यूज़ पोर्टल पर।' 
                  : 'Debate continues on the nation\'s largest economic reform package (₹10 Lakh Crore). Senior experts, journalists and political leaders from across the country are joining live on our bulletin desk. Keep watching moment-to-moment updates only on NewsPortal.'}
              </p>
            </div>

            {/* Daily program timetable listing */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-sm shadow-sm transition-colors">
              <div className="flex items-center gap-2 border-b border-gray-150 dark:border-zinc-800 pb-3 mb-4">
                <FaClock className="text-red-600 text-lg animate-pulse" />
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-wider text-sm">
                  {t("Today's Schedule")}
                </h3>
              </div>

              <div className="divide-y divide-gray-150 dark:divide-zinc-800">
                {showSchedule.map((show, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center py-3.5 first:pt-0 last:pb-0 gap-2">
                    {/* Timing */}
                    <span className="text-xs font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded w-24 text-center shrink-0 uppercase tracking-widest">
                      {show.time}
                    </span>
                    {/* Show Name */}
                    <span className="text-sm font-black text-gray-900 dark:text-zinc-100 flex-1 pl-0 sm:pl-4">
                      {show.title}
                    </span>
                    {/* Host Anchor */}
                    <span className="text-xs text-gray-500 dark:text-zinc-400 font-extrabold bg-gray-50 dark:bg-zinc-800 px-3 py-1 rounded-full border border-gray-100 dark:border-zinc-700/60 shrink-0">
                      {language === 'hi' ? 'एंकर' : 'Anchor'}: {show.host}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Standard Sidebar deck) */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

        </div>

      </div>
    </div>
  );
}
