import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function ChangePassword() {
  const { user } = useApp();
  const [msg, setMsg] = useState('');

  if (!user) return <Navigate to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('Password updated successfully! (Mocked)');
  };

  return (
    <div className="py-16 transition-colors min-h-[70vh]">
      <div className="max-w-md mx-auto px-4">
        <div className="glass-card dark:glass-card-dark shadow-2xl border border-gray-200/50 dark:border-zinc-800/50 p-8 rounded-2xl">
          <h1 className="text-2xl font-black mb-8 text-center text-gray-900 dark:text-white uppercase tracking-wider flex flex-col items-center gap-3 border-b border-gray-200 dark:border-zinc-800/50 pb-6">
            <span className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-2xl text-red-600 dark:text-red-500 mb-2">
              🔐
            </span>
            Change Password
          </h1>
          {msg && <div className="bg-green-100/80 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-400 p-4 mb-6 text-center rounded-xl font-bold shadow-sm backdrop-blur-sm animate-pulse">{msg}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Current Password</label>
              <input type="password" required className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-gray-900 dark:text-white transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">New Password</label>
              <input type="password" required className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-gray-900 dark:text-white transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Confirm New Password</label>
              <input type="password" required className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-gray-900 dark:text-white transition-all shadow-inner" />
            </div>
            <button type="submit" className="bg-red-600 text-white font-black py-3.5 rounded-lg mt-4 hover:bg-red-700 transition-colors uppercase tracking-widest shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
