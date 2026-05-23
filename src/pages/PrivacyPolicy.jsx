import Sidebar from '../components/Sidebar';
import { FiShield } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const contentTranslations = {
  hi: {
    legalBadge: "कानूनी",
    pageTitle: "गोपनीयता नीति",
    lastUpdated: "अंतिम अपडेट: 16 जुलाई, 2025 · प्रभावी तिथि: 1 जनवरी, 2025",
    promiseTitle: "हमारा गोपनीयता वादा",
    highlights: [
      'हम कभी भी आपका व्यक्तिगत डेटा नहीं बेचते हैं',
      'आपके ईमेल का उपयोग केवल समाचार अलर्ट के लिए किया जाता है',
      'विज्ञापन डेटा को अज्ञात रखा जाता है',
      'आप कभी भी अपना खाता हटा सकते हैं',
    ],
    sections: [
      {
        title: "1. परिचय",
        content: "न्यूज़पोर्टल मीडिया प्राइवेट लिमिटेड ('हम', 'हमारा', या 'हमें') आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट, न्यूज़पोर्टल पर जाते हैं तो हम आपकी जानकारी को कैसे एकत्र, उपयोग, प्रकट और सुरक्षित करते हैं। कृपया इस नीति को ध्यान से पढ़ें। साइट का उपयोग करके, आप इस नीति के अनुसार जानकारी के संग्रह और उपयोग के लिए सहमत होते हैं।"
      },
      {
        title: "2. जानकारी जो हम एकत्र करते हैं",
        content: "हम आपके बारे में विभिन्न तरीकों से जानकारी एकत्र कर सकते हैं। इसमें शामिल हैं: (क) व्यक्तिगत डेटा - नाम, ईमेल पता, फोन नंबर, जनसांख्यिकीय जानकारी जब आप पंजीकरण या सदस्यता लेते हैं; (ख) उपयोग डेटा - आईपी पता, ब्राउज़र प्रकार, देखे गए पृष्ठ, पृष्ठों पर बिताया गया समय, रेफ़रिंग यूआरएल; (ग) कुकीज़ - आपके अनुभव को बढ़ाने के लिए आपके डिवाइस पर संग्रहीत छोटी डेटा फ़ाइलें; (घ) उपयोगकर्ता सामग्री - आपके खाते से जुड़ी टिप्पणियाँ, प्रतिक्रियाएँ और सहेजे गए लेख।"
      },
      {
        title: "3. हम आपकी जानकारी का उपयोग कैसे करते हैं",
        content: "हम एकत्रित जानकारी का उपयोग निम्न के लिए करते हैं: (क) वेबसाइट का संचालन और रखरखाव करना; (ख) आपको न्यूज़लेटर, ब्रेकिंग न्यूज़ अलर्ट और प्रचार ऑफ़र भेजना (सहमति के साथ); (ग) आपके समाचार फ़ीड और पढ़ने के अनुभव को व्यक्तिगत बनाना; (घ) उपयोग के रुझानों का विश्लेषण करना और हमारी सेवाओं में सुधार करना; (ङ) लेनदेन की प्रक्रिया करना और खरीद पुष्टि सहित संबंधित जानकारी भेजना; (च) ग्राहक सेवा अनुरोधों और सहायता आवश्यकताओं का जवाब देना; (छ) धोखाधड़ी गतिविधि को रोकना और वेबसाइट सुरक्षा सुनिश्चित करना।"
      },
      {
        title: "4. कुकीज़ और ट्रैकिंग तकनीक",
        content: "हम अपनी वेबसाइट पर गतिविधि को ट्रैक करने के लिए कुकीज़, वेब बीकन और इसी तरह की ट्रैकिंग तकनीकों का उपयोग करते हैं। कुकीज़ आपके डिवाइस पर रखी गई छोटी डेटा फ़ाइलें होती हैं। आप अपने ब्राउज़र को सभी कुकीज़ को अस्वीकार करने या कुकी भेजे जाने पर संकेत देने का निर्देश दे सकते हैं। हालांकि, यदि आप कुकीज़ स्वीकार नहीं करते हैं, तो आप हमारी सेवा के कुछ हिस्सों का उपयोग करने में सक्षम नहीं हो सकते हैं। हम सत्र कुकीज़, प्राथमिकता कुकीज़, विश्लेषिकी कुकीज़ और विज्ञापन कुकीज़ (हमारे तीसरे पक्ष के विज्ञापन भागीदारों जैसे कि Google AdSense द्वारा परोसी गई) का उपयोग करते हैं।"
      },
      {
        title: "5. तृतीय-पक्ष विज्ञापन",
        content: "जब आप हमारी वेबसाइट पर जाते हैं तो विज्ञापन दिखाने के लिए हम तीसरे पक्ष की विज्ञापन कंपनियों का उपयोग करते हैं। ये कंपनियां आपकी रुचि की वस्तुओं और सेवाओं के बारे में विज्ञापन प्रदान करने के लिए आपकी इस वेबसाइट या अन्य वेबसाइटों पर यात्राओं के बारे में जानकारी (जिसमें आपका नाम, पता, ईमेल या टेलीफोन नंबर शामिल नहीं है) का उपयोग कर सकती हैं। हम Google AdSense कार्यक्रम में भाग लेते हैं। Google हमारी वेबसाइट या अन्य वेबसाइटों पर आपकी पिछली यात्राओं के आधार पर विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है। आप Google विज्ञापन सेटिंग्स पर जाकर व्यक्तिगत विज्ञापनों से बाहर निकल सकते हैं।"
      },
      {
        title: "6. डेटा सुरक्षा",
        content: "हम आपकी व्यक्तिगत जानकारी की सुरक्षा बनाए रखने के लिए विभिन्न प्रकार के सुरक्षा उपायों को लागू करते हैं। सभी संवेदनशील जानकारी (क्रेडिट कार्ड, लॉगिन क्रेडेंशियल) को सिक्योर सॉकेट लेयर (SSL) तकनीक का उपयोग करके प्रसारित किया जाता है और हमारे डेटाबेस में एन्क्रिप्ट किया जाता है। केवल विशेष एक्सेस अधिकारों वाले अधिकृत कर्मचारियों को ही व्यक्तिगत रूप से पहचान योग्य जानकारी तक पहुंचने की अनुमति है, और उनके लिए जानकारी को गोपनीय रखना आवश्यक है।"
      },
      {
        title: "7. डेटा प्रतिधारण",
        content: "हम आपके व्यक्तिगत डेटा को केवल तब तक बनाए रखते हैं जब तक कि इस गोपनीयता नीति में निर्धारित उद्देश्यों के लिए आवश्यक हो। हम अपने कानूनी दायित्वों का पालन करने के लिए (उदाहरण के लिए, यदि हमें लागू कानूनों का पालन करने के लिए आपके डेटा को बनाए रखने की आवश्यकता है), विवादों को हल करने और हमारे कानूनी समझौतों और नीतियों को लागू करने के लिए आवश्यक सीमा तक आपके व्यक्तिगत डेटा को बनाए रखेंगे और उसका उपयोग करेंगे।"
      },
      {
        title: "8. आपके अधिकार (GDPR और आईटी अधिनियम)",
        content: "यदि आप यूरोपीय संघ या भारत के निवासी हैं, तो आपके पास कुछ डेटा सुरक्षा अधिकार हैं। इनमें शामिल हैं: (क) हमारे पास मौजूद आपकी जानकारी तक पहुँचने, अपडेट करने या हटाने का अधिकार; (ख) सुधार का अधिकार; (ग) प्रसंस्करण पर आपत्ति करने का अधिकार; (घ) प्रतिबंध का अधिकार; (ङ) डेटा सुवाह्यता का अधिकार; (च) सहमति वापस लेने का अधिकार। इन अधिकारों का प्रयोग करने के लिए, कृपया हमसे privacy@newsportal.in पर संपर्क करें।"
      },
      {
        title: "9. बच्चों की गोपनीयता",
        content: "हमारी वेबसाइट 13 वर्ष से कम उम्र के किसी भी व्यक्ति को संबोधित नहीं करती है। हम जानबूझकर 13 वर्ष से कम उम्र के बच्चों से व्यक्तिगत रूप से पहचान योग्य जानकारी एकत्र नहीं करते हैं। यदि आप माता-पिता या अभिभावक हैं और आपको पता है कि आपके बच्चे ने हमें व्यक्तिगत डेटा प्रदान किया है, तो कृपया हमसे संपर्क करें। यदि हमें पता चलता है कि 13 वर्ष से कम उम्र के बच्चे ने हमें व्यक्तिगत डेटा प्रदान किया है, तो हम ऐसी जानकारी को तुरंत अपने सर्वर से हटा देंगे।"
      },
      {
        title: "10. इस नीति में परिवर्तन",
        content: "हम समय-समय पर अपनी गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके और 'अंतिम अपडेट' तिथि को अपडेट करके आपको किसी भी बदलाव के बारे में सूचित करेंगे। हम आपको किसी भी बदलाव के लिए समय-समय पर इस पृष्ठ की समीक्षा करने की सलाह देते हैं। इस गोपनीयता नीति में परिवर्तन तब प्रभावी होते हैं जब उन्हें इस पृष्ठ पर पोस्ट किया जाता है।"
      },
      {
        title: "11. संपर्क करें",
        content: "यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमारे डेटा सुरक्षा अधिकारी से privacy@newsportal.in पर संपर्क करें, या लिखें: न्यूज़पोर्टल मीडिया प्रा. लिमिटेड, डेटा सुरक्षा अधिकारी, न्यूज़पोर्टल टॉवर, कनॉट प्लेस, नई दिल्ली - 110001, भारत।"
      }
    ]
  },
  en: {
    legalBadge: "Legal",
    pageTitle: "Privacy & Policy",
    lastUpdated: "Last Updated: July 16, 2025 · Effective Date: January 1, 2025",
    promiseTitle: "Our Privacy Promise",
    highlights: [
      'We never sell your personal data',
      'Your email is only used for news alerts',
      'Advertising data is anonymized',
      'You can delete your account anytime',
    ],
    sections: [
      { title: '1. Introduction', content: 'NewsPortal Media Pvt. Ltd. ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, NewsPortal. Please read this policy carefully. By using the site, you agree to the collection and use of information in accordance with this policy.' },
      { title: '2. Information We Collect', content: 'We may collect information about you in various ways. This includes: (a) Personal Data – Name, email address, phone number, demographic information when you register or subscribe; (b) Usage Data – IP address, browser type, pages visited, time spent on pages, referring URL; (c) Cookies – Small data files stored on your device to enhance your experience; (d) User Content – Comments, reactions, and saved articles associated with your account.' },
      { title: '3. How We Use Your Information', content: 'We use the collected information to: (a) Operate and maintain the Website; (b) Send you newsletters, breaking news alerts, and promotional offers (with consent); (c) Personalize your news feed and reading experience; (d) Analyze usage trends and improve our services; (e) Process transactions and send related information including purchase confirmations; (f) Respond to customer service requests and support needs; (g) Prevent fraudulent activity and ensure website security.' },
      { title: '4. Cookies & Tracking Technologies', content: 'We use cookies, web beacons, and similar tracking technologies to track activity on our Website. Cookies are small data files placed on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service. We use session cookies, preference cookies, analytics cookies, and advertising cookies (served by our third-party ad partners like Google AdSense).' },
      { title: '5. Third-Party Advertising', content: 'We use third-party advertising companies to serve ads when you visit our Website. These companies may use information (not including your name, address, email, or telephone number) about your visits to provide advertisements about goods and services of interest to you. We participate in the Google AdSense program. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google Ads Settings.' },
      { title: '6. Data Security', content: 'We implement a variety of security measures to maintain the safety of your personal information. All sensitive information (credit cards, login credentials) is transmitted using Secure Socket Layer (SSL) technology and encrypted in our database. Only authorized personnel with special access rights are permitted to access personally identifiable information, and they are required to keep the information confidential.' },
      { title: '7. Data Retention', content: 'We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.' },
      { title: '8. Your Rights (GDPR & IT Act)', content: 'If you are a resident of the European Union or India, you have certain data protection rights. These include: (a) The right to access, update, or delete the information we have on you; (b) The right of rectification; (c) The right to object to processing; (d) The right of restriction; (e) The right to data portability; (f) The right to withdraw consent. To exercise these rights, please contact us at privacy@newsportal.in.' },
      { title: '9. Children\'s Privacy', content: 'Our Website does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we discover that a child under 13 has provided us with Personal Data, we will delete such information from our servers immediately.' },
      { title: '10. Changes to This Policy', content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We recommend reviewing this page periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.' },
      { title: '11. Contact Us', content: 'If you have any questions about this Privacy Policy, please contact our Data Protection Officer at: privacy@newsportal.in, or write to: NewsPortal Media Pvt. Ltd., Data Protection Officer, NewsPortal Tower, Connaught Place, New Delhi - 110001, India.' },
    ]
  }
};

export default function PrivacyPolicy() {
  const { language } = useApp();
  const c = contentTranslations[language] || contentTranslations['en'];

  return (
    <div className="min-h-screen transition-colors">
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-14 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-red-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest mb-4 rounded shadow-sm">{c.legalBadge}</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">{c.pageTitle}</h1>
          <p className="text-gray-400 text-sm font-semibold">{c.lastUpdated}</p>
        </div>
      </div>

      <div className="flex justify-center py-6 border-b border-gray-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <img src="/top_banner_ad.png" alt="Ad" className="max-w-[970px] w-full h-[90px] object-cover border border-gray-200 dark:border-zinc-800 rounded shadow-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {/* Quick Summary */}
            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 dark:border-green-600 p-6 mb-10 rounded-r-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FiShield className="text-green-600 dark:text-green-500 text-2xl" />
                <h2 className="font-black text-green-800 dark:text-green-400 text-lg">{c.promiseTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {c.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300 font-semibold">
                    <span className="text-green-500 dark:text-green-400 font-black text-lg">✓</span> {h}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 glass-card dark:glass-card-dark p-8 md:p-10 rounded-3xl shadow-xl">
              {c.sections.map((sec, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-zinc-800/50 pb-8 last:border-0 last:pb-0">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-6 bg-red-600 inline-block rounded-full shrink-0 shadow-sm"></span>
                    {sec.title}
                  </h2>
                  <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">{sec.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4"><Sidebar /></div>
        </div>
      </div>
    </div>
  );
}
