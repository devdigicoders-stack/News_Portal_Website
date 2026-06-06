import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login, register, loading, error, clearError } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    clearError();
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="py-16 flex items-center justify-center transition-colors min-h-[70vh]">
      <div className="glass-card dark:glass-card-dark p-8 md:p-10 border-t-4 border-red-600 shadow-2xl rounded-xl w-full max-w-md border border-gray-200/50 dark:border-zinc-800/50">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight flex items-center justify-center gap-2">
             <span className="w-1.5 h-6 bg-red-600 inline-block rounded-full"></span>
             {isRegister ? 'Register' : 'Login'}
           </h1>
           <p className="text-gray-500 dark:text-gray-400 font-medium">
             {isRegister ? 'Create your account' : 'Sign in to your account'}
           </p>
        </div>

        {error && <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">{error}</div>}

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="flex flex-col gap-5">
          {isRegister && (
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-lg p-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all shadow-inner" 
                required 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-lg p-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all shadow-inner" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-lg p-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-red-600 dark:focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all shadow-inner" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-red-600 text-white font-black py-3.5 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-widest mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : (isRegister ? 'Create Account' : 'Login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => { setIsRegister(!isRegister); clearError(); }}
              className="text-red-600 font-bold ml-1 hover:underline"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
