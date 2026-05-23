import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Profile() {
  const { user } = useApp();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="py-12 transition-colors">
      <div className="max-w-3xl mx-auto px-4">
        <div className="glass-card dark:glass-card-dark shadow-xl border border-gray-200/50 dark:border-zinc-800/50 rounded-2xl p-8 text-center">
          <FaUserCircle className="text-8xl text-gray-300 dark:text-zinc-600 mx-auto mb-6" />
          <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">{user.email}</p>
          
          <div className="border-t border-gray-200 dark:border-zinc-800/50 pt-8 text-left">
            <h3 className="font-black text-xl mb-6 border-l-4 border-red-600 pl-3 text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
              Account Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50/50 dark:bg-zinc-900/50 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-inner">
                 <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Member Since</p>
                 <p className="font-black text-xl text-gray-900 dark:text-white">July 2025</p>
              </div>
              <div className="bg-gray-50/50 dark:bg-zinc-900/50 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-inner">
                 <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">Subscription</p>
                 <p className="font-black text-xl text-green-600 dark:text-green-400 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                   Active (Free Tier)
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
