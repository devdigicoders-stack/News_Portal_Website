import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

const staticOffices = [
  { phone: '+91-11-4567-8900', email: 'newdelhi@newsportal.in' },
  { phone: '+91-22-6789-0123', email: 'mumbai@newsportal.in' },
  { phone: '+91-80-4567-1234', email: 'bengaluru@newsportal.in' },
];

const contentTranslations = {
  hi: {
    contactUs: "संपर्क करें",
    getInTouch: "हमसे संपर्क करें",
    heroDesc: "क्या आपके पास कोई स्टोरी टिप, प्रेस पूछताछ या फीडबैक है? हमारी टीम 24/7 आपकी बात सुनने के लिए तैयार है।",
    callUs: "हमें कॉल करें",
    emailUs: "हमें ईमेल करें",
    whatsapp: "व्हाट्सएप",
    sendAMessage: "हमें एक संदेश भेजें",
    successMsg: "धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है।",
    nameLabel: "आपका नाम *",
    emailLabel: "ईमेल पता *",
    subjectLabel: "विषय *",
    selectTopic: "एक विषय चुनें...",
    topics: [
      "स्टोरी टिप / समाचार लीड",
      "प्रेस पूछताछ / मीडिया किट",
      "हमारे साथ विज्ञापन करें",
      "संशोधन और स्पष्टीकरण",
      "फीडबैक और सुझाव",
      "तकनीकी समस्या",
      "अन्य"
    ],
    messageLabel: "संदेश *",
    writeMsg: "अपना संदेश यहाँ लिखें...",
    sendBtn: "संदेश भेजें",
    ourOffices: "हमारे कार्यालय",
    mapLabel: "कनॉट प्लेस, नई दिल्ली",
    mapEmbed: "नक्शा यहाँ प्रदर्शित होगा",
    offices: [
      { city: 'नई दिल्ली (मुख्यालय)', address: 'न्यूज़पोर्टल टॉवर, कनॉट प्लेस, नई दिल्ली - 110001' },
      { city: 'मुंबई', address: 'मीडिया हाउस, बांद्रा कुर्ला कॉम्प्लेक्स, मुंबई - 400051' },
      { city: 'बेंगलुरु', address: 'टेक पार्क, व्हाइटफील्ड, बेंगलुरु - 560066' }
    ]
  },
  en: {
    contactUs: "Contact Us",
    getInTouch: "Get In Touch",
    heroDesc: "Have a story tip, press inquiry, or feedback? Our team is ready to hear from you 24/7.",
    callUs: "Call Us",
    emailUs: "Email Us",
    whatsapp: "WhatsApp",
    sendAMessage: "Send Us a Message",
    successMsg: "Thank you! Your message has been sent.",
    nameLabel: "Your Name *",
    emailLabel: "Email Address *",
    subjectLabel: "Subject *",
    selectTopic: "Select a topic...",
    topics: [
      "Story Tip / News Lead",
      "Press Inquiry / Media Kit",
      "Advertise with Us",
      "Corrections & Clarifications",
      "Feedback & Suggestions",
      "Technical Issue",
      "Other"
    ],
    messageLabel: "Message *",
    writeMsg: "Write your message here...",
    sendBtn: "Send Message",
    ourOffices: "Our Offices",
    mapLabel: "Connaught Place, New Delhi",
    mapEmbed: "Map Embed Here",
    offices: [
      { city: 'New Delhi (HQ)', address: 'NewsPortal Tower, Connaught Place, New Delhi - 110001' },
      { city: 'Mumbai', address: 'Media House, Bandra Kurla Complex, Mumbai - 400051' },
      { city: 'Bengaluru', address: 'Tech Park, Whitefield, Bengaluru - 560066' }
    ]
  }
};

export default function ContactUs() {
  const { language } = useApp();
  const c = contentTranslations[language] || contentTranslations['en'];

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen transition-colors">
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-red-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest mb-4">{c.contactUs}</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{c.getInTouch}</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">{c.heroDesc}</p>
        </div>
      </div>

      <div className="flex justify-center py-6 border-b border-gray-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <img src="/top_banner_ad.png" alt="Ad" className="max-w-[970px] w-full h-[90px] object-cover border border-gray-200 dark:border-zinc-800 rounded shadow-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              <div className="glass-card dark:glass-card-dark bg-gradient-to-b from-red-600 to-red-700 text-white p-8 text-center rounded-2xl shadow-lg border border-red-500/50 transition-transform hover:-translate-y-1">
                <FiPhone className="text-4xl mx-auto mb-4 animate-bounce" />
                <h3 className="font-black text-xl mb-2">{c.callUs}</h3>
                <p className="text-red-100 font-semibold tracking-wide">+91-11-4567-8900</p>
              </div>
              <div className="glass-card dark:glass-card-dark bg-gradient-to-b from-gray-900 to-black text-white p-8 text-center rounded-2xl shadow-lg border border-gray-800 transition-transform hover:-translate-y-1">
                <FiMail className="text-4xl mx-auto mb-4" />
                <h3 className="font-black text-xl mb-2">{c.emailUs}</h3>
                <p className="text-gray-300 font-semibold tracking-wide">news@newsportal.in</p>
              </div>
              <div className="glass-card dark:glass-card-dark p-8 text-center rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
                <FaWhatsapp className="text-4xl mx-auto mb-4 text-green-500 drop-shadow-md" />
                <h3 className="font-black text-xl mb-2 text-gray-900 dark:text-white">{c.whatsapp}</h3>
                <p className="text-gray-600 dark:text-zinc-400 font-semibold tracking-wide">+91-98765-43210</p>
              </div>
            </div>

            <div className="mb-14 glass-card dark:glass-card-dark p-8 md:p-10 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-black mb-8 border-l-4 border-red-600 pl-4 text-gray-900 dark:text-white">{c.sendAMessage}</h2>
              {sent && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-300 text-green-800 p-4 mb-6 font-bold">
                  <FiCheckCircle className="text-green-600 text-xl" /> {c.successMsg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-700 dark:text-zinc-300 uppercase tracking-widest mb-2">{c.nameLabel}</label>
                    <input type="text" required placeholder={language === 'hi' ? "राहुल शर्मा" : "Rahul Sharma"} value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-700 dark:text-zinc-300 uppercase tracking-widest mb-2">{c.emailLabel}</label>
                    <input type="email" required placeholder="rahul@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-zinc-300 uppercase tracking-widest mb-2">{c.subjectLabel}</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                    className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white px-5 py-3.5 rounded-xl text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all">
                    <option value="" className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">{c.selectTopic}</option>
                    {c.topics.map((t, idx) => (
                      <option key={idx} value={t} className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 dark:text-zinc-300 uppercase tracking-widest mb-2">{c.messageLabel}</label>
                  <textarea required rows={6} placeholder={c.writeMsg} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white px-5 py-4 rounded-xl text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 resize-none transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"></textarea>
                </div>
                <button type="submit" className="flex items-center justify-center w-full sm:w-auto gap-2 bg-red-600 text-white font-black px-12 py-4 rounded-xl hover:bg-red-700 transition-colors uppercase tracking-widest text-sm shadow-md hover:shadow-lg">
                  <FiSend className="text-lg" /> {c.sendBtn}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-6 border-l-4 border-red-600 pl-4 text-gray-900 dark:text-white">{c.ourOffices}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {c.offices.map((o, i) => (
                  <div key={i} className="glass-card dark:glass-card-dark p-6 rounded-2xl hover:border-red-600/50 dark:hover:border-red-600/50 transition-all shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <FiMapPin className="text-red-600 text-xl" />
                      <h3 className="font-black text-gray-900 dark:text-white text-base">{o.city}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mb-4">{o.address}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2"><FiPhone className="text-red-600" /> {staticOffices[i].phone}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiMail className="text-red-600" /> {staticOffices[i].email}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-2 border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-900/50 rounded-2xl h-64 flex items-center justify-center text-gray-400 dark:text-zinc-600">
                <div className="text-center">
                  <FiMapPin className="text-5xl mx-auto mb-3 text-red-400/50 dark:text-red-900" />
                  <p className="font-bold text-gray-600 dark:text-zinc-400">{c.mapLabel}</p>
                  <p className="text-sm mt-1">{c.mapEmbed}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4"><Sidebar /></div>
        </div>
      </div>
    </div>
  );
}
