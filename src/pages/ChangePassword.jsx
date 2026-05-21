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
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-black mb-6 text-center border-b border-gray-200 pb-4">Change Password</h1>
          {msg && <div className="bg-green-100 text-green-700 p-3 mb-4 text-center rounded font-bold">{msg}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
              <input type="password" required className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-red-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
              <input type="password" required className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-red-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" required className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-red-600" />
            </div>
            <button type="submit" className="bg-red-600 text-white font-bold py-2 rounded mt-2 hover:bg-red-700">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}
