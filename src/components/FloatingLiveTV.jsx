import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaTimes, FaTv, FaVolumeMute, FaVolumeUp, FaExternalLinkAlt } from 'react-icons/fa';

export default function FloatingLiveTV() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // High quality open stream
  const liveVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const handleOpenBroadcastPage = () => {
    navigate('/live-tv');
    setIsOpen(false); // Close float widget upon entering full page
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans hidden sm:block">
      {isOpen ? (
        <div className="bg-black text-white w-80 shadow-2xl border-2 border-red-600 rounded overflow-hidden flex flex-col transition-all animate-fadeIn">
          {/* Header */}
          <div className="bg-red-600 px-3 py-2 flex items-center justify-between text-xs font-black uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span className="flex items-center gap-1"><FaTv /> Live 24x7 Broadcast</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="hover:text-gray-200 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
              <button 
                onClick={handleOpenBroadcastPage}
                className="hover:text-gray-200 transition-colors"
                title="Go to full page Live TV"
              >
                <FaExternalLinkAlt size={12} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:text-gray-200 transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>
          
          {/* Video Player */}
          <div className="relative aspect-video bg-black cursor-pointer" onClick={handleOpenBroadcastPage}>
            <video 
              src={liveVideoUrl} 
              autoPlay 
              muted={isMuted} 
              loop 
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 uppercase tracking-wide flex items-center gap-1.5 rounded-sm shadow-md animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
            </div>
            <div className="absolute inset-0 bg-black/45 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded flex items-center gap-1.5 shadow uppercase tracking-wider">
                Full Screen TV <FaExternalLinkAlt size={10} />
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-3 bg-zinc-950 text-zinc-400 text-[11px] leading-relaxed border-t border-zinc-900">
            <p className="font-bold text-white mb-0.5">PM Economic Reforms Live Analysis</p>
            <p>Reporters reporting live from Delhi, Mumbai & Bengaluru desks.</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white font-black uppercase text-xs tracking-widest px-4.5 py-3.5 rounded-full flex items-center gap-2 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all border-2 border-white dark:border-zinc-800 live-pulse-button"
        >
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          <FaTv className="text-sm" /> Watch Live TV
        </button>
      )}
    </div>
  );
}
