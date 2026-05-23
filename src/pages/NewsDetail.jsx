import { useParams, Link } from 'react-router-dom';
import { newsData } from '../data/news';
import Sidebar from '../components/Sidebar';
import NewsCard from '../components/NewsCard';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaHeart, FaBookmark, FaRegHeart, FaRegBookmark, FaUserCircle } from 'react-icons/fa';
import { uiTranslations, translateNews } from '../data/translations';

export default function NewsDetail() {
  const { id } = useParams();
  const { language, user, likedNews, toggleLike, savedNews, toggleSave } = useApp();
  
  const newsItemRaw = newsData.find((n) => n.id === parseInt(id));
  const newsItem = translateNews(newsItemRaw, language);
  
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  
  // Premium accessibility features
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'xlarge'
  const [isSpeaking, setIsSpeaking] = useState(false);

  const t = (key) => uiTranslations[language]?.[key] || key;

  useEffect(() => {
    if (newsItemRaw) {
      setComments(newsItemRaw.comments || []);
      // Filter out the current article, get articles from same category
      const related = newsData.filter(n => n.category === newsItemRaw.category && n.id !== newsItemRaw.id).slice(0, 3);
      setRelatedNews(related);
      window.scrollTo(0,0);
      
      // Reset speech synthesis on article change
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [newsItemRaw]);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!newsItemRaw || !newsItem) {
    return <div className="text-center py-20 text-2xl font-bold dark:text-white">{language === 'hi' ? 'समाचार नहीं मिला।' : 'News not found.'}</div>;
  }

  const isLiked = likedNews.includes(newsItem.id);
  const isSaved = savedNews.includes(newsItem.id);

  const handleLike = () => {
    if (!user) return alert(language === 'hi' ? 'लाइक करने के लिए कृपया लॉगिन करें।' : 'Please login to like this news.');
    toggleLike(newsItem.id);
  };

  const handleSave = () => {
    if (!user) return alert(language === 'hi' ? 'बुकमार्क करने के लिए कृपया लॉगिन करें।' : 'Please login to save this news.');
    toggleSave(newsItem.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert(language === 'hi' ? 'टिप्पणी करने के लिए कृपया लॉगिन करें।' : 'Please login to post a comment.');
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: user.name,
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };

  // Text-To-Speech function
  const handleListen = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${newsItem.title}. ${language === 'hi' ? 'लेखक' : 'Written by'} ${newsItem.author}. ${language === 'hi' ? 'सारांश' : 'Summary'}: ${newsItem.summary}. ${language === 'hi' ? 'विवरण' : 'Content'}: ${newsItem.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large': return 'text-xl md:text-2xl';
      case 'xlarge': return 'text-2xl md:text-3xl';
      default: return 'text-lg';
    }
  };

  const readTime = Math.ceil((newsItem.summary.split(' ').length + newsItem.content.split(' ').length) / 200);

  return (
    <div className="py-8 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2 font-medium bg-white/50 dark:bg-zinc-900/50 w-fit px-4 py-2 rounded-full border border-gray-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">{t("Home")}</Link> <span className="text-gray-300 dark:text-zinc-700">&gt;</span> 
          <Link to={`/category/${newsItemRaw.category.toLowerCase()}`} className="hover:text-red-600 dark:hover:text-red-400 transition-colors">{t(newsItemRaw.category)}</Link> <span className="text-gray-300 dark:text-zinc-700">&gt;</span> 
          <span className="text-gray-800 dark:text-gray-200 line-clamp-1 max-w-[200px] sm:max-w-xs">{newsItem.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 glass-card dark:glass-card-dark p-6 sm:p-8 shadow-xl rounded-2xl border border-gray-200/50 dark:border-zinc-800/50">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6 drop-shadow-sm">{newsItem.title}</h1>
            
            {/* Metadata Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 dark:text-gray-400 border-y border-gray-200/50 dark:border-zinc-800/50 py-4 mb-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-black dark:text-white border-r border-gray-300 dark:border-zinc-700 pr-4">{language === 'hi' ? 'द्वारा ' : 'By '}{newsItem.author}</span>
                <span className="font-medium">{t("Publish Detail")}: {newsItem.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-lg">
                  <button onClick={handleLike} className={`transition-colors hover:scale-110 transform ${isLiked ? 'text-red-600 drop-shadow' : 'text-gray-400 hover:text-red-600'}`}>
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <span className="text-sm font-bold">{newsItem.likes + (isLiked ? 1 : 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <button onClick={handleSave} className={`transition-colors hover:scale-110 transform ${isSaved ? 'text-blue-600 dark:text-blue-400 drop-shadow' : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                    {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
                <div className="flex items-center gap-3 ml-2 border-l border-gray-300 dark:border-zinc-700 pl-4 text-xl">
                  <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"><FaFacebook /></a>
                  <a href="#" className="text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"><FaTwitter /></a>
                  <a href="#" className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"><FaWhatsapp /></a>
                </div>
              </div>
            </div>

            {/* Accessibility / Tool Bar */}
            <div className="bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 px-5 py-4 rounded-xl flex flex-wrap justify-between items-center mb-8 text-xs gap-4 shadow-inner">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 dark:text-gray-400 font-black">⏱️ {readTime} {t("Min Read")}</span>
                <button 
                  onClick={handleListen}
                  className={`flex items-center gap-1.5 font-bold px-4 py-2 rounded-full border transition-all shadow-sm ${isSpeaking ? 'bg-red-600 text-white border-red-600 animate-pulse shadow-red-600/30' : 'bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-zinc-700 hover:border-red-600 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400'}`}
                >
                  {isSpeaking ? `🛑 ${t("Stop Listening")}` : `🔊 ${t("Listen to Article")}`}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{t("Font Size:")}</span>
                <div className="flex bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border border-gray-300 dark:border-zinc-700 shadow-sm">
                  <button 
                    onClick={() => setFontSize('normal')}
                    className={`px-3 py-1.5 text-xs font-black transition-colors ${fontSize === 'normal' ? 'bg-red-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
                  >
                    A
                  </button>
                  <button 
                    onClick={() => setFontSize('large')}
                    className={`px-3 py-1.5 text-sm border-l border-gray-300 dark:border-zinc-700 font-black transition-colors ${fontSize === 'large' ? 'bg-red-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
                  >
                    A+
                  </button>
                  <button 
                    onClick={() => setFontSize('xlarge')}
                    className={`px-3 py-1.5 text-base border-l border-gray-300 dark:border-zinc-700 font-black transition-colors ${fontSize === 'xlarge' ? 'bg-red-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
                  >
                    A++
                  </button>
                </div>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium italic mb-8 leading-relaxed border-l-4 border-red-600 pl-5">
              {newsItem.summary}
            </h2>

            {newsItem.video ? (
              <div className="mb-8 w-full bg-black aspect-video flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-zinc-800">
                <video src={newsItem.video} controls className="w-full h-full" poster={newsItem.image}>
                  {language === 'hi' ? 'आपका ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।' : 'Your browser does not support the video tag.'}
                </video>
              </div>
            ) : (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-zinc-800 bg-black group relative">
                <img src={newsItem.image} alt={newsItem.title} className="w-full h-auto max-h-[550px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>
            )}

            <div className={`prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-loose mb-12 whitespace-pre-line ${getFontSizeClass()}`}>
              {newsItem.content}
            </div>

            {/* In-Article Ad */}
            <div className="mb-12 w-full flex justify-center">
               <img src="/article_ad.png" alt="Advertisement" className="w-full max-w-[300px] h-[250px] object-cover rounded-xl shadow-md cursor-pointer border border-gray-200 dark:border-zinc-800 opacity-90 hover:opacity-100 transition-opacity" />
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-gray-200 dark:border-zinc-800 pt-8">
              <h3 className="text-2xl font-black mb-8 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-600 inline-block rounded-full"></span>
                {t("Comments")} <span className="text-gray-400 text-lg">({comments.length})</span>
              </h3>
              
              {/* Comment Form */}
              <div className="mb-10 bg-gray-50/50 dark:bg-zinc-900/50 p-5 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-inner">
                <form onSubmit={handleCommentSubmit}>
                  <textarea 
                    rows="3" 
                    className="w-full border border-gray-300 dark:border-zinc-700 rounded-lg p-4 mb-4 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-white dark:bg-zinc-950 text-gray-900 dark:text-white transition-all shadow-sm resize-none" 
                    placeholder={t("Write a comment...")}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <button type="submit" className="bg-red-600 text-white font-black py-2.5 px-8 rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    {t("Post Comment")}
                  </button>
                </form>
              </div>

              {/* Comment List */}
              <div className="space-y-6">
                {comments.length > 0 ? comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 border-b border-gray-100 dark:border-zinc-800/50 pb-6 last:border-0">
                    <FaUserCircle className="text-4xl text-gray-300 dark:text-zinc-600 shrink-0 mt-1" />
                    <div>
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="font-bold text-gray-900 dark:text-white text-lg">{comment.user}</span>
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 bg-gray-50 dark:bg-zinc-900/30 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700">
                    <p className="text-gray-500 dark:text-gray-400 italic font-medium">{t("No comments yet")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Related News Section */}
            {relatedNews.length > 0 && (
              <div className="mt-12 pt-10 border-t-2 border-gray-200 dark:border-zinc-800">
                <h3 className="text-2xl font-black mb-8 uppercase flex items-center gap-2 dark:text-white">
                  <span className="w-1.5 h-6 bg-red-600 inline-block rounded-full"></span> {t("Related News")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedNews.map(news => (
                     <div key={news.id} className="h-56 transform hover:-translate-y-1 transition-transform">
                        <NewsCard news={news} variant="overlay" />
                     </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
