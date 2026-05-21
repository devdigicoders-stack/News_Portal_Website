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
    <div className="bg-white min-h-screen">
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-red-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest mb-4">{c.contactUs}</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{c.getInTouch}</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">{c.heroDesc}</p>
        </div>
      </div>

      <div className="flex justify-center py-6 bg-gray-50 border-b border-gray-200">
        <img src="/top_banner_ad.png" alt="Ad" className="max-w-[970px] w-full h-[90px] object-cover border border-gray-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-red-600 text-white p-6 text-center">
                <FiPhone className="text-3xl mx-auto mb-3" />
                <h3 className="font-black text-lg mb-1">{c.callUs}</h3>
                <p className="text-red-100 text-sm">+91-11-4567-8900</p>
              </div>
              <div className="bg-gray-900 text-white p-6 text-center">
                <FiMail className="text-3xl mx-auto mb-3" />
                <h3 className="font-black text-lg mb-1">{c.emailUs}</h3>
                <p className="text-gray-300 text-sm">news@newsportal.in</p>
              </div>
              <div className="bg-gray-100 text-gray-900 p-6 text-center">
                <FaWhatsapp className="text-3xl mx-auto mb-3 text-green-600" />
                <h3 className="font-black text-lg mb-1">{c.whatsapp}</h3>
                <p className="text-gray-600 text-sm">+91-98765-43210</p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-black mb-6 border-l-4 border-red-600 pl-4">{c.sendAMessage}</h2>
              {sent && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-300 text-green-800 p-4 mb-6 font-bold">
                  <FiCheckCircle className="text-green-600 text-xl" /> {c.successMsg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">{c.nameLabel}</label>
                    <input type="text" required placeholder={language === 'hi' ? "राहुल शर्मा" : "Rahul Sharma"} value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">{c.emailLabel}</label>
                    <input type="email" required placeholder="rahul@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">{c.subjectLabel}</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                    className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-600 bg-white">
                    <option value="">{c.selectTopic}</option>
                    {c.topics.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">{c.messageLabel}</label>
                  <textarea required rows={6} placeholder={c.writeMsg} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-red-600 resize-none"></textarea>
                </div>
                <button type="submit" className="flex items-center gap-2 bg-red-600 text-white font-black px-10 py-4 hover:bg-red-700 transition-colors uppercase tracking-wider text-sm">
                  <FiSend /> {c.sendBtn}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-6 border-l-4 border-red-600 pl-4">{c.ourOffices}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {c.offices.map((o, i) => (
                  <div key={i} className="border border-gray-200 p-5 hover:border-red-600 transition-colors">
                    <div className="flex items-center gap-2 mb-3"><FiMapPin className="text-red-600" /><h3 className="font-black text-sm">{o.city}</h3></div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3">{o.address}</p>
                    <p className="text-xs font-bold flex items-center gap-1"><FiPhone className="text-red-600" /> {staticOffices[i].phone}</p>
                    <p className="text-xs font-bold flex items-center gap-1 mt-1"><FiMail className="text-red-600" /> {staticOffices[i].email}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-2 border-dashed border-gray-300 bg-gray-50 h-56 flex items-center justify-center text-gray-400">
                <div className="text-center"><FiMapPin className="text-4xl mx-auto mb-2 text-red-400" /><p className="font-bold">{c.mapLabel}</p><p className="text-sm">{c.mapEmbed}</p></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4"><Sidebar /></div>
        </div>
      </div>
    </div>
  );
}
