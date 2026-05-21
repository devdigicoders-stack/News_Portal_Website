import { useParams, Link } from 'react-router-dom';
import { newsData } from '../data/news';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaHeart, FaBookmark, FaRegHeart, FaRegBookmark, FaShareAlt, FaUserCircle } from 'react-icons/fa';

export default function NewsDetail() {
  const { id } = useParams();
  const newsItem = newsData.find((n) => n.id === parseInt(id));
  const { user, likedNews, toggleLike, savedNews, toggleSave } = useApp();
  
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    if (newsItem) {
      setComments(newsItem.comments || []);
      // Filter out the current article, get articles from same category
      const related = newsData.filter(n => n.category === newsItem.category && n.id !== newsItem.id).slice(0, 3);
      setRelatedNews(related);
      window.scrollTo(0,0);
    }
  }, [newsItem]);

  if (!newsItem) {
    return <div className="text-center py-20 text-2xl font-bold">News not found.</div>;
  }

  const isLiked = likedNews.includes(newsItem.id);
  const isSaved = savedNews.includes(newsItem.id);

  const handleLike = () => {
    if (!user) return alert('Please login to like this news.');
    toggleLike(newsItem.id);
  };

  const handleSave = () => {
    if (!user) return alert('Please login to save this news.');
    toggleSave(newsItem.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post a comment.');
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

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-red-600">Home</Link> &gt; 
          <Link to={`/category/${newsItem.category.toLowerCase()}`} className="hover:text-red-600">{newsItem.category}</Link> &gt; 
          <span className="text-gray-800 line-clamp-1">{newsItem.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 bg-white p-6 shadow-sm border border-gray-200">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">{newsItem.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 border-y border-gray-200 py-3 mb-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="font-bold text-black border-r border-gray-300 pr-4">By {newsItem.author}</span>
                <span>Published: {newsItem.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-lg">
                  <button onClick={handleLike} className={`${isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'}`}>
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <span className="text-sm">{newsItem.likes + (isLiked ? 1 : 0)}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <button onClick={handleSave} className={`${isSaved ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}>
                    {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </div>
                <div className="flex items-center gap-3 ml-2 border-l border-gray-300 pl-4 text-xl">
                  <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebook /></a>
                  <a href="#" className="text-sky-500 hover:text-sky-700"><FaTwitter /></a>
                  <a href="#" className="text-green-500 hover:text-green-700"><FaWhatsapp /></a>
                </div>
              </div>
            </div>

            <h2 className="text-xl text-gray-700 font-medium italic mb-6 leading-relaxed border-l-4 border-red-600 pl-4">
              {newsItem.summary}
            </h2>

            {newsItem.video ? (
              <div className="mb-6 w-full bg-black aspect-video flex items-center justify-center">
                {/* Simulated Video Player */}
                <video src={newsItem.video} controls className="w-full h-full" poster={newsItem.image}>
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <img src={newsItem.image} alt={newsItem.title} className="w-full h-auto max-h-[500px] object-cover mb-6" />
            )}

            <div className="prose max-w-none text-gray-800 text-lg leading-loose mb-10 whitespace-pre-line">
              {newsItem.content}
            </div>

            {/* In-Article Ad */}
            <div className="mb-10 w-full flex justify-center">
               <img src="/article_ad.png" alt="Advertisement" className="w-full max-w-[300px] h-[250px] object-cover rounded shadow-md cursor-pointer border border-gray-200" />
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-black pt-6">
              <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
              
              {/* Comment Form */}
              <div className="mb-8 bg-gray-50 p-4 rounded border border-gray-200">
                <form onSubmit={handleCommentSubmit}>
                  <textarea 
                    rows="3" 
                    className="w-full border border-gray-300 rounded p-3 mb-3 focus:outline-none focus:border-red-500" 
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                  <button type="submit" className="bg-red-600 text-white font-bold py-2 px-6 rounded hover:bg-red-700">
                    Post Comment
                  </button>
                </form>
              </div>

              {/* Comment List */}
              <div className="space-y-6">
                {comments.length > 0 ? comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <FaUserCircle className="text-4xl text-gray-300 shrink-0" />
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-gray-900">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>

            {/* Related News Section */}
            {relatedNews.length > 0 && (
              <div className="mt-12 pt-8 border-t-4 border-gray-900">
                <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 inline-block"></span> Related News
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedNews.map(news => (
                     <div key={news.id} className="h-48">
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
