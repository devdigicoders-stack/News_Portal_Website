import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 bg-white p-8 border-t-4 border-red-600 shadow-sm">
        <h1 className="text-4xl font-black text-gray-900 mb-6 uppercase">About News Portal</h1>
        <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            Welcome to the ultimate news destination. We are committed to bringing you the fastest, most accurate, and unbiased news from around the globe.
          </p>
          <p>
            With a massive network of reporters and cutting-edge technology, we ensure that you are always ahead. From breaking news to in-depth analysis, we cover Politics, Sports, Entertainment, Business, and more.
          </p>
          <h3 className="text-2xl font-bold mt-8 mb-4">Our Mission</h3>
          <p>
            To empower our readers with the truth. We believe in journalism that matters, journalism that holds power accountable, and journalism that informs the public.
          </p>
        </div>
      </div>
    </div>
  );
}
