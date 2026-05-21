import React from 'react';

export default function Legal() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 bg-white p-8 border-t-4 border-red-600 shadow-sm">
        <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase">Legal Information</h1>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Terms & Conditions</h2>
        <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4 text-sm">
          <p>By accessing this website, you agree to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          <p>The materials contained in this website are protected by applicable copyright and trade mark law.</p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">Privacy & Policy</h2>
        <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4 text-sm">
          <p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          <p>We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
        </div>
      </div>
    </div>
  );
}
