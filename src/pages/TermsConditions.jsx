import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';

const contentTranslations = {
  hi: {
    legalBadge: "कानूनी",
    pageTitle: "नियम और शर्तें",
    lastUpdated: "अंतिम अपडेट: 16 जुलाई, 2025 · प्रभावी तिथि: 1 जनवरी, 2025",
    warningText: "⚠️ कृपया न्यूज़पोर्टल वेबसाइट का उपयोग करने से पहले इन नियमों और शर्तों को ध्यान से पढ़ें। हमारी सेवा का उपयोग करके या पहुँचकर, आप इन शर्तों से बाध्य होने के लिए सहमत हैं।",
    sections: [
      { title: '1. शर्तों की स्वीकृति', content: "न्यूज़पोर्टल (\"वेबसाइट\") का उपयोग और पहुंच प्राप्त करके, आप इस समझौते के नियमों और शर्तों से बाध्य होने के लिए स्वीकार और सहमत होते हैं। इसके अलावा, वेबसाइट की विशेष सेवाओं का उपयोग करते समय, आप ऐसी सेवाओं पर लागू होने वाले किसी भी पोस्ट किए गए दिशानिर्देशों या नियमों के अधीन होंगे। इस सेवा में किसी भी प्रकार की भागीदारी इस समझौते की स्वीकृति मानी जाएगी।" },
      { title: '2. सेवा का विवरण', content: "न्यूज़पोर्टल उपयोगकर्ताओं को समाचार लेखों, मल्टीमीडिया सामग्री, टिप्पणियों और संबंधित सेवाओं के एक समृद्ध संग्रह तक पहुंच प्रदान करता है। पाठ, ग्राफिक्स, लोगो और मल्टीमीडिया सहित सभी सामग्री, न्यूज़पोर्टल मीडिया प्राइवेट लिमिटेड की अनन्य संपत्ति है और भारतीय और अंतर्राष्ट्रीय कॉपीराइट कानूनों के तहत संरक्षित है।" },
      { title: '3. उपयोगकर्ता आचरण', content: "आप वेबसाइट का उपयोग निम्नलिखित के लिए न करने पर सहमत हैं: (क) ऐसी किसी भी सामग्री को अपलोड, पोस्ट या संचारित करना जो गैर-कानूनी, हानिकारक, धमकी भरी, अपमानजनक या अन्यथा आपत्तिजनक हो; (ख) किसी व्यक्ति या संस्था का रूप धारण करना; (ग) ऐसी सामग्री अपलोड करना जो किसी पेटेंट, ट्रेडमार्क, व्यापार रहस्य, कॉपीराइट या अन्य मालिकाना अधिकारों का उल्लंघन करती हो; (घ) ऐसी सामग्री अपलोड करना जिसमें सॉफ़्टवेयर वायरस या विघटनकारी कोड शामिल हों; (ङ) लिखित अनुमति के बिना संग्रह, डेटाबेस या निर्देशिकाएं बनाने के लिए सामग्री की व्यवस्थित पुनर्प्राप्ति में शामिल होना।" },
      { title: '4. बौद्धिक संपदा अधिकार', content: "न्यूज़पोर्टल पर सभी सामग्री न्यूज़पोर्टल मीडिया प्राइवेट लिमिटेड की बौद्धिक संपदा है। आप स्पष्ट लिखित सहमति के बिना इस वेबसाइट के किसी भी हिस्से को पुनरुत्पादित, पुन: प्रकाशित, संशोधित, अनुकूलित, अनुवाद, व्युत्पन्न कार्य नहीं बना सकते या शोषण नहीं कर सकते हैं। व्यक्तिगत, गैर-व्यावसायिक उद्देश्यों के लिए सामग्री का सीमित उपयोग तब तक अनुमत है जब तक आप स्रोत को हाइपरलिंक के साथ श्रेय देते हैं।" },
      { title: '5. उपयोगकर्ता-जनित सामग्री', content: "यदि आप टिप्पणियां, प्रतिक्रिया, सुझाव या अन्य सामग्री प्रस्तुत करते हैं, तो आप न्यूज़पोर्टल को दुनिया भर में ऐसी सामग्री का उपयोग करने, पुनरुत्पादित करने, संशोधित करने, अनुकूलित करने, प्रकाशित करने और वितरित करने का एक गैर-अनन्य, रॉयल्टी-मुक्त, स्थायी और अपरिवर्तनीय अधिकार प्रदान करते हैं। आप प्रतिनिधित्व करते हैं कि आप इस लाइसेंस को प्रदान करने के लिए आवश्यक अधिकारों के स्वामी हैं या आपके पास आवश्यक अधिकार हैं।" },
      { title: '6. देयता की सीमा', content: "न्यूज़पोर्टल आपके वेबसाइट के उपयोग या वेबसाइट का उपयोग करने में असमर्थता के परिणामस्वरूप होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी नुकसान के लिए उत्तरदायी नहीं होगा। इसमें मुनाफे, डेटा, या अन्य अमूर्त नुकसान के नुकसान के लिए नुकसान शामिल हैं। हम यह वारंटी नहीं देते हैं कि वेबसाइट निर्बाध, त्रुटि रहित, या वायरस या अन्य हानिकारक घटकों से मुक्त होगी।" },
      { title: '7. तीसरे पक्ष के लिंक', content: "वेबसाइट में तीसरे पक्ष की वेबसाइटों के लिंक हो सकते हैं। ये केवल सुविधा के लिए प्रदान किए गए हैं। न्यूज़पोर्टल का उन साइटों की सामग्री पर कोई नियंत्रण नहीं है और उनके लिए कोई जिम्मेदारी स्वीकार नहीं करता है। हमारे द्वारा किसी भी लिंक को शामिल करने का अर्थ उन साइटों का समर्थन नहीं है।" },
      { title: '8. सेवा में संशोधन', content: "न्यूज़पोर्टल किसी भी समय बिना किसी सूचना के अस्थायी या स्थायी रूप से वेबसाइट (या उसके किसी भी हिस्से) को संशोधित या बंद करने का अधिकार सुरक्षित रखता है। आप सहमत हैं कि सेवा के किसी भी संशोधन, निलंबन या बंद होने के लिए न्यूज़पोर्टल आपके या किसी तीसरे पक्ष के प्रति उत्तरदायी नहीं होगा।" },
      { title: '9. शासी कानून', content: "ये शर्तें भारत के कानूनों के अनुसार शासित और विश्लेषित की जाएंगी, विशेष रूप से सूचना प्रौद्योगिकी अधिनियम, 2000 और उसके किसी भी संशोधन के अनुसार। वेबसाइट के उपयोग से उत्पन्न होने वाले किसी भी विवाद को नई दिल्ली, भारत की अदालतों के अनन्य अधिकार क्षेत्र के अधीन किया जाएगा।" },
      { title: '10. शर्तों में बदलाव', content: "न्यूज़पोर्टल किसी भी समय इन शर्तों को अपडेट करने या बदलने का अधिकार सुरक्षित रखता है। आपको किसी भी बदलाव के लिए समय-समय पर इस पृष्ठ की समीक्षा करने की सलाह दी जाती है। हमारे द्वारा परिवर्तन पोस्ट करने के बाद वेबसाइट का आपका निरंतर उपयोग उन परिवर्तनों की स्वीकृति माना जाएगा।" },
      { title: '11. संपर्क जानकारी', content: "यदि इन शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे legal@newsportal.in पर संपर्क करें या हमें लिखें: न्यूज़पोर्टल मीडिया प्राइवेट लिमिटेड, न्यूज़पोर्टल टॉवर, कनॉट प्लेस, नई दिल्ली - 110001।" },
    ]
  },
  en: {
    legalBadge: "Legal",
    pageTitle: "Terms & Conditions",
    lastUpdated: "Last Updated: July 16, 2025 · Effective Date: January 1, 2025",
    warningText: "⚠️ Please read these Terms & Conditions carefully before using the NewsPortal website. By accessing or using our service, you agree to be bound by these terms.",
    sections: [
      { title: '1. Acceptance of Terms', content: "By accessing and using NewsPortal (the \"Website\"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using the Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement." },
      { title: '2. Description of Service', content: "NewsPortal provides users with access to a rich collection of news articles, multimedia content, commentary, and related services. All content, including text, graphics, logos, and multimedia, is the exclusive property of NewsPortal Media Pvt. Ltd. and is protected under Indian and international copyright laws." },
      { title: '3. User Conduct', content: "You agree not to use the Website to: (a) upload, post or transmit any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable; (b) impersonate any person or entity; (c) upload content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights; (d) upload material that contains software viruses or disruptive code; (e) engage in any systematic retrieval of content to create collections, databases, or directories without written permission." },
      { title: '4. Intellectual Property Rights', content: "All content on NewsPortal is the intellectual property of NewsPortal Media Pvt. Ltd. You may not reproduce, republish, modify, adapt, translate, create derivative works, or exploit any part of this Website without explicit written consent. Limited use of content for personal, non-commercial purposes is permitted provided you attribute the source with a hyperlink." },
      { title: '5. User-Generated Content', content: "If you submit comments, feedback, suggestions, or other content, you grant NewsPortal a non-exclusive, royalty-free, perpetual, and irrevocable right to use, reproduce, modify, adapt, publish, and distribute such content worldwide. You represent that you own or have the necessary rights to grant this license." },
      { title: '6. Limitation of Liability', content: "NewsPortal shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the Website or inability to use the Website. This includes damages for loss of profits, data, or other intangible losses. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components." },
      { title: '7. Third-Party Links', content: "The Website may contain links to third-party websites. These are provided for convenience only. NewsPortal has no control over the content of those sites and accepts no responsibility for them. Our inclusion of any link does not imply endorsement of those sites." },
      { title: '8. Modifications to Service', content: "NewsPortal reserves the right to modify or discontinue, temporarily or permanently, the Website (or any part thereof) with or without notice at any time. You agree that NewsPortal shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service." },
      { title: '9. Governing Law', content: "These Terms shall be governed and construed in accordance with the laws of India, specifically the Information Technology Act, 2000, and any amendments thereof. Any disputes arising from use of the Website shall be subject to the exclusive jurisdiction of the courts of New Delhi, India." },
      { title: '10. Changes to Terms', content: "NewsPortal reserves the right to update or change these Terms at any time. You are advised to review this page periodically for any changes. Your continued use of the Website after we post changes constitutes your acceptance of those changes." },
      { title: '11. Contact Information', content: "If you have any questions about these Terms, please contact us at: legal@newsportal.in or write to us at NewsPortal Media Pvt. Ltd., NewsPortal Tower, Connaught Place, New Delhi - 110001." },
    ]
  }
};

export default function TermsConditions() {
  const { language } = useApp();
  const t = contentTranslations[language] || contentTranslations['en'];

  return (
    <div className="min-h-screen transition-colors">
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-14 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-red-600 text-white px-4 py-1 text-xs font-black uppercase tracking-widest mb-4 rounded shadow-sm">{t.legalBadge}</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md">{t.pageTitle}</h1>
          <p className="text-gray-400 text-sm font-semibold">{t.lastUpdated}</p>
        </div>
      </div>

      <div className="flex justify-center py-6 border-b border-gray-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md">
        <img src="/top_banner_ad.png" alt="Ad" className="max-w-[970px] w-full h-[90px] object-cover border border-gray-200 dark:border-zinc-800 rounded shadow-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 dark:border-amber-600 p-5 mb-10 rounded-r-lg shadow-sm">
              <p className="text-amber-800 dark:text-amber-200 font-bold text-sm leading-relaxed">{t.warningText}</p>
            </div>
            <div className="space-y-6 glass-card dark:glass-card-dark p-8 md:p-10 rounded-3xl shadow-xl">
              {t.sections.map((sec, i) => (
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
