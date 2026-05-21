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
    <div className="bg-gray-100 min-h-screen py-16 flex items-center justify-center">
      <div className="bg-white p-8 border-t-4 border-red-600 shadow-md w-full max-w-md">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase">Login</h1>
           <p className="text-gray-500 text-sm">Sign in to like, comment, and save news.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Name (e.g. Rahul)" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 focus:border-red-600 outline-none" 
            required 
          />
          <input 
            type="email" 
            placeholder="Email (e.g. r@example.com)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 focus:border-red-600 outline-none" 
            required 
          />
          <button type="submit" className="bg-red-600 text-white font-bold py-3 hover:bg-red-700 transition uppercase mt-2">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
