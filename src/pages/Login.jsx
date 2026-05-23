import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: name || 'Test User', email: email || 'test@user.com' });
    navigate('/');
  };

  return (
    <div className="py-16 flex items-center justify-center transition-colors min-h-[70vh]">
      <div className="glass-card dark:glass-card-dark p-8 md:p-10 border-t-4 border-red-600 shadow-2xl rounded-xl w-full max-w-md border border-gray-200/50 dark:border-zinc-800/50">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight flex items-center justify-center gap-2">
             <span className="w-1.5 h-6 bg-red-600 inline-block rounded-full"></span>
             Login
           </h1>
           <p className="text-gray-500 dark:text-gray-400 font-medium">Sign in to like, comment, and save news.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Rahul" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-lg p-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all shadow-inner" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. r@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-lg p-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all shadow-inner" 
              required 
            />
          </div>
          <button type="submit" className="bg-red-600 text-white font-black py-3.5 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Continue to Account
          </button>
        </form>
      </div>
    </div>
  );
}
