import { useApp } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Profile() {
  const { user } = useApp();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white shadow-sm border border-gray-200 p-8 text-center">
          <FaUserCircle className="text-8xl text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-black mb-2">{user.name}</h1>
          <p className="text-gray-500 mb-6">{user.email}</p>
          
          <div className="border-t border-gray-200 pt-6 text-left">
            <h3 className="font-bold text-lg mb-4 border-l-4 border-red-600 pl-2">Account Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                 <p className="text-xs text-gray-500 font-bold uppercase">Member Since</p>
                 <p className="font-medium text-gray-900">July 2025</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                 <p className="text-xs text-gray-500 font-bold uppercase">Subscription</p>
                 <p className="font-medium text-green-600">Active (Free Tier)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
