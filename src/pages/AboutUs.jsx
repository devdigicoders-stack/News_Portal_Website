import { FiMail, FiPhone, FiMapPin, FiSend, FiUsers, FiAward, FiGlobe, FiTrendingUp } from 'react-icons/fi';
import { FaNewspaper, FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { newsData } from '../data/news';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { translateNews } from '../data/translations';

const latestNews = newsData.slice(0, 4);

const teamImages = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop',
];

const contentTranslations = {
  hi: {
    aboutUs: "हमारे बारे में",
    heroTitle: "भारत का सबसे भरोसेमंद",
    heroTitleRed: "समाचार स्रोत",
    heroDesc: "न्यूज़पोर्टल 2010 से सटीक, निष्पक्ष और गहन समाचार कवरेज प्रदान कर रहा है। हम स्वतंत्र पत्रकारिता के सिद्धांतों के प्रति प्रतिबद्ध हैं।",
    
    ourMission: "हमारा उद्देश्य",
    missionSub: "हम कौन हैं और हम किस लिए खड़े हैं",
    
    m1Title: "सबसे पहले ब्रेकिंग न्यूज़",
    m1Desc: "हमारे पास सभी 28 राज्यों में 500+ संवाददाताओं का नेटवर्क है ताकि यह सुनिश्चित किया जा सके कि आपको समाचार उसी समय मिले जब वह घटित हो — सटीक रूप से और बिना सनसनी फैलाए।",
    
    m2Title: "वैश्विक कवरेज",
    m2Desc: "न्यूयॉर्क के संयुक्त राष्ट्र गलियारों से लेकर शंघाई के बाजारों तक, हमारे संवाददाता आपके लिए दुनिया की एक पूरी तस्वीर लाते हैं।",
    
    m3Title: "पुरस्कार विजेता पत्रकारिता",
    m3Desc: "हमारी खोजी टीम ने 25+ राष्ट्रीय और अंतर्राष्ट्रीय पत्रकारिता पुरस्कार जीते हैं, जिसमें प्रतिष्ठित रामनाथ गोयनका एक्सीलेंस अवार्ड भी शामिल है।",
    
    m4Title: "कम्युनिटी फर्स्ट",
    m4Desc: "हम अपने पाठकों द्वारा वित्तपोषित हैं, न कि विज्ञापनदाताओं या राजनीतिक दलों द्वारा। यह सुनिश्चित करता है कि हमारी संपादकीय स्वतंत्रता पूर्ण बनी रहे।",
    
    numbersTitle: "आंकड़ों में न्यूज़पोर्टल",
    readers: "मासिक पाठक",
    articles: "प्रकाशित लेख",
    countries: "पहुंचे देश",
    awards: "जीते गए पुरस्कार",
    
    teamTitle: "हमारी संपादकीय टीम",
    teamSub: "कहानियों के पीछे के लोग",
    
    team: [
      { name: 'राजेश कुमार', role: 'मुख्य संपादक', bio: 'प्रिंट और डिजिटल पत्रकारिता में 15+ वर्ष। पूर्व एनडीटीवी संवाददाता।' },
      { name: 'स्नेहा पटेल', role: 'वरिष्ठ खेल पत्रकार', bio: 'पुरस्कार विजेता खेल पत्रकार। 3 ओलंपिक खेलों को कवर किया।' },
      { name: 'अर्जुन मेहता', role: 'टेक्नोलॉजी संपादक', bio: 'पूर्व गूगल इंडिया इवेंजलिस्ट। एआई और स्टार्टअप्स में गहरी विशेषज्ञता।' },
      { name: 'कविता शर्मा', role: 'बिजनेस और फाइनेंस डेस्क', bio: 'पूर्व सेबी विश्लेषक। आईआईएम अहमदाबाद से एमबीए।' },
    ],
    
    latestDesk: "हमारे डेस्क से नवीनतम",
    followTitle: "लाइव अपडेट के लिए हमें फॉलो करें",
    followSub: "अपने पसंदीदा मंच पर तुरंत ब्रेकिंग न्यूज़ प्राप्त करें",
  },
  en: {
    aboutUs: "About Us",
    heroTitle: "India's Most Trusted",
    heroTitleRed: "News Source",
    heroDesc: "NewsPortal has been delivering accurate, unbiased, and in-depth news coverage since 2010. We are committed to the principles of independent journalism.",
    
    ourMission: "Our Mission",
    missionSub: "Who We Are & What We Stand For",
    
    m1Title: "Breaking News First",
    m1Desc: "We have a network of 500+ reporters across all 28 states to ensure you get the news the moment it breaks — accurately and without sensationalism.",
    
    m2Title: "Global Coverage",
    m2Desc: "From the UN corridors of New York to the markets of Shanghai, our correspondents bring you a complete picture of the world.",
    
    m3Title: "Award-Winning Journalism",
    m3Desc: "Our investigative team has won 25+ national and international journalism awards, including the prestigious Ramnath Goenka Excellence Award.",
    
    m4Title: "Community First",
    m4Desc: "We are funded by our readers, not advertisers or political parties. This ensures our editorial independence remains absolute.",
    
    numbersTitle: "NewsPortal By the Numbers",
    readers: "Monthly Readers",
    articles: "Articles Published",
    countries: "Countries Reached",
    awards: "Awards Won",
    
    teamTitle: "Our Editorial Team",
    teamSub: "The people behind the stories",
    
    team: [
      { name: 'Rajesh Kumar', role: 'Editor-in-Chief', bio: '15+ years in print and digital journalism. Former NDTV correspondent.' },
      { name: 'Sneha Patel', role: 'Senior Sports Journalist', bio: 'Award-winning sports journalist. Covered 3 Olympic Games.' },
      { name: 'Arjun Mehta', role: 'Technology Editor', bio: 'Former Google India evangelist. Deep expertise in AI and startups.' },
      { name: 'Kavita Sharma', role: 'Business & Finance Desk', bio: 'Former SEBI analyst. MBA from IIM Ahmedabad.' },
    ],
    
    latestDesk: "Latest From Our Desk",
    followTitle: "Follow Us for Live Updates",
    followSub: "Get breaking news instantly on your favourite platform",
  }
};

export default function AboutUs() {
  const { language } = useApp();
  const c = contentTranslations[language] || contentTranslations['en'];

  const stats = [
    { icon: FiUsers, value: '50M+', label: c.readers },
    { icon: FaNewspaper, value: '10,000+', label: c.articles },
    { icon: FiGlobe, value: '120+', label: c.countries },
    { icon: FiAward, value: '25+', label: c.awards },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&auto=format&fit=crop" alt="Newsroom" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 text-xs font-black uppercase tracking-widest mb-6">
            <FaNewspaper /> {c.aboutUs}
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            {c.heroTitle} <span className="text-red-500">{c.heroTitleRed}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {c.heroDesc}
          </p>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="flex justify-center py-6 bg-gray-50 border-b border-gray-200">
        <img src="/top_banner_ad.png" alt="Ad" className="max-w-[970px] w-full h-[90px] object-cover border border-gray-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">

            {/* Our Mission */}
            <section className="mb-14">
              <h2 className="text-3xl font-black mb-2 border-l-4 border-red-600 pl-4">{c.ourMission}</h2>
              <p className="text-gray-500 text-sm mb-6 pl-5">{c.missionSub}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 border border-gray-100">
                  <FiTrendingUp className="text-red-600 text-3xl mb-3" />
                  <h3 className="text-lg font-black mb-2">{c.m1Title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.m1Desc}</p>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-100">
                  <FiGlobe className="text-red-600 text-3xl mb-3" />
                  <h3 className="text-lg font-black mb-2">{c.m2Title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.m2Desc}</p>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-100">
                  <FiAward className="text-red-600 text-3xl mb-3" />
                  <h3 className="text-lg font-black mb-2">{c.m3Title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.m3Desc}</p>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-100">
                  <FiUsers className="text-red-600 text-3xl mb-3" />
                  <h3 className="text-lg font-black mb-2">{c.m4Title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.m4Desc}</p>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="bg-gray-900 text-white p-10 mb-14">
              <h2 className="text-2xl font-black mb-8 text-center uppercase tracking-wider">{c.numbersTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <s.icon className="text-red-500 text-3xl mx-auto mb-3" />
                    <p className="text-4xl font-black text-white">{s.value}</p>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-wide mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section className="mb-14">
              <h2 className="text-3xl font-black mb-2 border-l-4 border-red-600 pl-4">{c.teamTitle}</h2>
              <p className="text-gray-500 text-sm mb-6 pl-5">{c.teamSub}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {c.team.map((m, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-gray-100 hover:shadow-md transition-shadow">
                    <img src={teamImages[i]} alt={m.name} className="w-20 h-20 object-cover rounded-full shrink-0 border-4 border-red-100" />
                    <div>
                      <h3 className="font-black text-gray-900">{m.name}</h3>
                      <p className="text-xs font-bold text-red-600 uppercase mb-2">{m.role}</p>
                      <p className="text-sm text-gray-600">{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News from us */}
            <section>
              <h2 className="text-2xl font-black mb-6 border-l-4 border-red-600 pl-4">{c.latestDesk}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestNews.map(n => <NewsCard key={n.id} news={translateNews(n, language)} variant="standard" />)}
              </div>
            </section>

          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Social Follow Bar */}
      <div className="bg-red-600 text-white py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-black mb-2">{c.followTitle}</h3>
          <p className="text-red-200 text-sm mb-6">{c.followSub}</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="#" className="flex items-center gap-2 bg-white text-blue-700 font-black px-6 py-3 rounded hover:bg-gray-100 transition-colors"><FaFacebook size={20} /> Facebook · 12M</a>
            <a href="#" className="flex items-center gap-2 bg-white text-sky-500 font-black px-6 py-3 rounded hover:bg-gray-100 transition-colors"><FaTwitter size={20} /> Twitter · 8.5M</a>
            <a href="#" className="flex items-center gap-2 bg-white text-red-600 font-black px-6 py-3 rounded hover:bg-gray-100 transition-colors"><FaYoutube size={20} /> YouTube · 6M</a>
            <a href="#" className="flex items-center gap-2 bg-white text-pink-600 font-black px-6 py-3 rounded hover:bg-gray-100 transition-colors"><FaInstagram size={20} /> Instagram · 5M</a>
          </div>
        </div>
      </div>
    </div>
  );
}
